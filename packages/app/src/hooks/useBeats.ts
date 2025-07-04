'use client'

import { useState, useEffect } from 'react'
import { Beat } from '@/types'
import { useAuth } from '@/context/AuthContext'
import { EventIndexer } from '@/lib/indexing'
import { DecentralizedBeat } from '@/lib/metadata'
import { useContract } from './useContract'

// Feature flag for Web3 data source
const USE_WEB3_DATA = process.env.NEXT_PUBLIC_USE_WEB3_DATA === 'true'

export function useBeats(filters?: { genre?: string, producerId?: string }) {
  const [beats, setBeats] = useState<Beat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { contract } = useContract()

  useEffect(() => {
    let retryCount = 0
    const maxRetries = 3
    
    const fetchBeatsWithRetry = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if (USE_WEB3_DATA) {
          await fetchWeb3Beats()
        } else {
          await fetchFirebaseBeats()
        }
        retryCount = 0 // Reset on success
      } catch (err: any) {
        console.error(`Error fetching beats (attempt ${retryCount + 1}):`, err)
        
        if (retryCount < maxRetries) {
          retryCount++
          const delay = Math.pow(2, retryCount) * 1000 // Exponential backoff
          setTimeout(fetchBeatsWithRetry, delay)
          return
        }
        
        // Final failure - show error and fallback
        setBeats([])
        setError(`Failed to load beats after ${maxRetries + 1} attempts. Please check your connection.`)
      } finally {
        if (retryCount === 0 || retryCount >= maxRetries) {
          setLoading(false)
        }
      }
    }
    
    fetchBeatsWithRetry()
  }, [filters?.genre, filters?.producerId, contract])

  const fetchWeb3Beats = async () => {
    if (!contract) {
      // Load from local index while contract loads
      const indexedBeats = EventIndexer.getStoredBeatIndex()
      if (indexedBeats.length === 0) {
        // Load test data if no Web3 data available
        const { TestDataManager } = await import('@/utils/testData')
        const testBeats = TestDataManager.getTestBeats()
        setBeats(testBeats.map(beat => ({
          id: beat.id,
          title: beat.title,
          description: beat.description,
          genre: beat.genre,
          bpm: beat.bpm,
          key: beat.key,
          tags: beat.tags,
          price: beat.price,
          audioUrl: beat.audioUrl,
          coverImageUrl: beat.coverImageUrl,
          producerId: beat.producerId,
          createdAt: beat.createdAt,
          updatedAt: beat.updatedAt,
          tokenId: beat.tokenId,
          royaltyPercentage: beat.royaltyPercentage,
          isActive: beat.isActive
        })))
        return
      }
      const filteredBeats = applyFilters(indexedBeats)
      setBeats(convertToBeats(filteredBeats))
      return
    }

    // Build fresh index from contract events
    const contractAddress = contract.address
    const decentralizedBeats = await EventIndexer.buildBeatIndex(contractAddress)
    const filteredBeats = applyFilters(decentralizedBeats)
    setBeats(convertToBeats(filteredBeats))
  }

  const fetchFirebaseBeats = async () => {
    // Build query parameters
    const params = new URLSearchParams()
    if (filters?.genre) params.append('genre', filters.genre)
    if (filters?.producerId) params.append('producerId', filters.producerId)
    params.append('limit', '50')
    
    const response = await fetch(`/api/beats?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.beats && data.beats.length > 0) {
      setBeats(data.beats.map((beat: any) => ({
        ...beat,
        createdAt: new Date(beat.createdAt),
        updatedAt: new Date(beat.updatedAt)
      })))
    } else {
      setBeats([])
    }
  }

  const applyFilters = (beats: DecentralizedBeat[]): DecentralizedBeat[] => {
    let filtered = beats
    
    if (filters?.genre) {
      filtered = filtered.filter(beat => beat.genre === filters.genre)
    }
    
    if (filters?.producerId) {
      filtered = filtered.filter(beat => beat.producer === filters.producerId)
    }
    
    return filtered
  }

  const convertToBeats = (decentralizedBeats: DecentralizedBeat[]): Beat[] => {
    return decentralizedBeats.map(beat => ({
      id: beat.tokenId,
      title: beat.title,
      description: beat.description,
      genre: beat.genre,
      bpm: beat.bpm,
      key: beat.key,
      tags: beat.tags,
      price: parseFloat(beat.price),
      audioUrl: beat.audioUrl,
      coverImageUrl: beat.coverImageUrl,
      producerId: beat.producer,
      createdAt: beat.createdAt,
      updatedAt: beat.updatedAt,
      // Web3 specific fields
      tokenId: parseInt(beat.tokenId),
      royaltyPercentage: beat.royaltyPercentage,
      isActive: beat.isActive
    }))
  }

  const refreshBeats = async () => {
    try {
      if (USE_WEB3_DATA) {
        await fetchWeb3Beats()
      } else {
        await fetchFirebaseBeats()
      }
    } catch (err: any) {
      console.error('Error refreshing beats:', err)
      setBeats([])
      setError(err.message)
    }
  }

  const getBeatsByProducer = (producerId: string) => {
    return beats.filter(beat => beat.producerId === producerId)
  }

  const addBeat = async (beatData: Omit<Beat, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('User not authenticated')
    
    // Optimistic update - add beat immediately
    const optimisticBeat: Beat = {
      ...beatData,
      id: `temp-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setBeats(prev => [optimisticBeat, ...prev])
    
    try {
      const idToken = await user.getIdToken()
      
      const response = await fetch('/api/beats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(beatData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        const newBeat = {
          ...data.beat,
          createdAt: new Date(data.beat.createdAt),
          updatedAt: new Date(data.beat.updatedAt)
        }
        
        // Replace optimistic beat with real beat
        setBeats(prev => prev.map(beat => 
          beat.id === optimisticBeat.id ? newBeat : beat
        ))
        
        return newBeat
      } else {
        throw new Error(data.error || 'Failed to create beat')
      }
    } catch (err: any) {
      // Remove optimistic beat on error
      setBeats(prev => prev.filter(beat => beat.id !== optimisticBeat.id))
      console.error('Error adding beat:', err)
      throw err
    }
  }

  return {
    beats,
    loading,
    error,
    refreshBeats,
    getBeatsByProducer,
    addBeat,
    isWeb3Mode: USE_WEB3_DATA
  }
}

