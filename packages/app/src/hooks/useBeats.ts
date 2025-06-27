'use client'

import { useState, useEffect } from 'react'
import { Beat } from '@/types'

// Mock beats data for development
const mockBeats: Beat[] = [
  {
    id: '1',
    title: 'Dark Trap Beat',
    description: 'Hard hitting trap beat with dark melodies',
    producerId: 'mock-user-123',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
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
    producerId: 'mock-user-123',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
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

export function useBeats() {
  const [beats, setBeats] = useState<Beat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBeats(mockBeats)
      setLoading(false)
    }, 1000)
  }, [])

  const addBeat = (beat: Beat) => {
    setBeats(prev => [beat, ...prev])
  }

  const updateBeat = (id: string, updates: Partial<Beat>) => {
    setBeats(prev => prev.map(beat => 
      beat.id === id ? { ...beat, ...updates } : beat
    ))
  }

  const deleteBeat = (id: string) => {
    setBeats(prev => prev.filter(beat => beat.id !== id))
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