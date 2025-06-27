'use client'

import { useState, useEffect } from 'react'
import { Beat } from '@/types'
import { useFirestore } from './useFirestore'

export function useBeats(filters?: { genre?: string, producerId?: string }) {
  const [beats, setBeats] = useState<Beat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getBeats, subscribeToBeats, addBeat: addBeatToFirestore, updateBeat: updateBeatInFirestore, deleteBeat: deleteBeatFromFirestore } = useFirestore()

  useEffect(() => {
    setLoading(true)
    
    // Try to get real Firestore data first
    getBeats(filters)
      .then((firestoreBeats) => {
        if (firestoreBeats.length > 0) {
          setBeats(firestoreBeats)
        } else {
          // Fallback to mock data if Firestore is empty
          const mockBeats = [
            {
              id: '1',
              title: 'Dark Trap Beat',
              description: 'Hard hitting trap beat with dark melodies',
              producerId: 'mock-producer-1',
              audioUrl: '/api/placeholder-audio',
              coverImageUrl: 'https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Dark+Trap',
              price: 29.99,
              genre: 'trap',
              bpm: 140,
              key: 'Am',
              tags: ['dark', 'trap', 'hard'],
              isNFT: false,
              createdAt: new Date('2024-01-15'),
              updatedAt: new Date('2024-01-15')
            },
            {
              id: '2',
              title: 'Melodic Hip Hop',
              description: 'Smooth melodic hip hop instrumental',
              producerId: 'mock-producer-2',
              audioUrl: '/api/placeholder-audio',
              coverImageUrl: 'https://via.placeholder.com/300x300/4a90e2/ffffff?text=Melodic+Hip+Hop',
              price: 24.99,
              genre: 'hip-hop',
              bpm: 85,
              key: 'C',
              tags: ['melodic', 'smooth', 'hip-hop'],
              isNFT: false,
              createdAt: new Date('2024-01-10'),
              updatedAt: new Date('2024-01-10')
            }
          ]
          setBeats(mockBeats)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.warn('Firestore unavailable, using mock data:', err)
        // Use mock data as fallback
        const mockBeats = [
          {
            id: '1',
            title: 'Dark Trap Beat',
            description: 'Hard hitting trap beat',
            producerId: 'mock-producer-1',
            audioUrl: '/api/placeholder-audio',
            coverImageUrl: 'https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Dark+Trap',
            price: 29.99,
            genre: 'trap',
            bpm: 140,
            key: 'Am',
            tags: ['dark', 'trap'],
            isNFT: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
        setBeats(mockBeats)
        setLoading(false)
      })
  }, [filters])

  const addBeat = async (beatData: Omit<Beat, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const beatId = await addBeatToFirestore(beatData)
      // Refresh beats list
      const updatedBeats = await getBeats(filters)
      setBeats(updatedBeats)
      return beatId
    } catch (err: any) {
      console.warn('Failed to add beat to Firestore:', err)
      // Add to local state as fallback
      const newBeat = {
        ...beatData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setBeats(prev => [newBeat, ...prev])
      return newBeat.id
    }
  }

  const updateBeat = async (id: string, updates: Partial<Beat>) => {
    try {
      await updateBeatInFirestore(id, updates)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const deleteBeat = async (id: string) => {
    try {
      await deleteBeatFromFirestore(id)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const getBeatsByProducer = (producerId: string) => {
    return beats.filter(beat => beat.producerId === producerId)
  }

  return {
    beats,
    loading,
    error,
    addBeat,
    updateBeat,
    deleteBeat,
    getBeatsByProducer
  }
}