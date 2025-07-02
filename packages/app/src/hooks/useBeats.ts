'use client'

import { useState, useEffect } from 'react'
import { Beat } from '@/types'
import { useAuth } from '@/context/AuthContext'

export function useBeats(filters?: { genre?: string, producerId?: string }) {
  const [beats, setBeats] = useState<Beat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        setLoading(true)
        setError(null)
        
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
      } catch (err: any) {
        console.error('Error fetching beats:', err)
        setBeats([])
        setError(`API connection issue: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBeats()
  }, [filters?.genre, filters?.producerId])

  const refreshBeats = async () => {
    try {
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
    try {
      if (!user) throw new Error('User not authenticated')
      
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
        setBeats(prev => [newBeat, ...prev])
        return newBeat
      } else {
        throw new Error(data.error || 'Failed to create beat')
      }
    } catch (err: any) {
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
    addBeat
  }
}

