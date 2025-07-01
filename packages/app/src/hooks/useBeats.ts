'use client'

import { useState, useEffect } from 'react'
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Beat } from '@/types'

export function useBeats(filters?: { genre?: string, producerId?: string }) {
  const [beats, setBeats] = useState<Beat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try to fetch real beats from Firestore
        let q = query(collection(db, 'beats'), orderBy('createdAt', 'desc'))
        
        if (filters?.genre) {
          q = query(collection(db, 'beats'), where('genre', '==', filters.genre), orderBy('createdAt', 'desc'))
        }
        
        if (filters?.producerId) {
          q = query(collection(db, 'beats'), where('producerId', '==', filters.producerId), orderBy('createdAt', 'desc'))
        }
        
        const querySnapshot = await getDocs(q)
        
        if (querySnapshot.empty) {
          // If no beats in Firestore, use mock data for demo
          console.log('No beats found in Firestore, using mock data')
          setBeats(getMockBeats(filters))
        } else {
          const firestoreBeats = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date()
          })) as Beat[]
          
          setBeats(firestoreBeats)
        }
      } catch (err: any) {
        console.error('Error fetching beats:', err)
        // Fallback to mock data if Firestore fails
        console.log('Firestore error, using mock data as fallback')
        setBeats(getMockBeats(filters))
        setError(`Database connection issue: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBeats()
  }, [filters?.genre, filters?.producerId])

  const refreshBeats = async () => {
    try {
      let q = query(collection(db, 'beats'), orderBy('createdAt', 'desc'))
      
      if (filters?.genre) {
        q = query(collection(db, 'beats'), where('genre', '==', filters.genre), orderBy('createdAt', 'desc'))
      }
      
      if (filters?.producerId) {
        q = query(collection(db, 'beats'), where('producerId', '==', filters.producerId), orderBy('createdAt', 'desc'))
      }
      
      const querySnapshot = await getDocs(q)
      
      if (querySnapshot.empty) {
        setBeats(getMockBeats(filters))
      } else {
        const firebaseBeats = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date()
        })) as Beat[]
        
        setBeats(firebaseBeats)
      }
    } catch (err: any) {
      console.error('Error refreshing beats:', err)
      setBeats(getMockBeats(filters))
      setError(err.message)
    }
  }

  const getBeatsByProducer = (producerId: string) => {
    return beats.filter(beat => beat.producerId === producerId)
  }

  const addBeat = async (beatData: Omit<Beat, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBeat: Beat = {
      ...beatData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setBeats(prev => [newBeat, ...prev])
    return newBeat
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

// Mock data fallback
function getMockBeats(filters?: { genre?: string, producerId?: string }): Beat[] {
  const mockBeats: Beat[] = [
    {
      id: '1',
      title: 'Amapiano Fire',
      description: 'Hot amapiano beat with deep basslines',
      producerId: 'producer-1',
      audioUrl: '/audio/sample1.mp3',
      coverImageUrl: 'https://via.placeholder.com/300x300/667eea/ffffff?text=Amapiano+Fire',
      price: 299.99,
      genre: 'amapiano',
      bpm: 112,
      key: 'Am',
      tags: ['amapiano', 'fire', 'deep'],
      isNFT: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Afrobeats Groove',
      description: 'Smooth afrobeats rhythm',
      producerId: 'producer-2',
      audioUrl: '/audio/sample2.mp3',
      coverImageUrl: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=Afrobeats+Groove',
      price: 249.99,
      genre: 'afrobeats',
      bpm: 102,
      key: 'C',
      tags: ['afrobeats', 'smooth', 'groove'],
      isNFT: false,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '3',
      title: 'Trap Banger',
      description: 'Hard hitting trap beat',
      producerId: 'producer-3',
      audioUrl: '/audio/sample3.mp3',
      coverImageUrl: 'https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Trap+Banger',
      price: 399.99,
      genre: 'trap',
      bpm: 140,
      key: 'Gm',
      tags: ['trap', 'hard', 'banger'],
      isNFT: false,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25')
    }
  ]
  
  // Apply filters
  let filteredBeats = mockBeats
  if (filters?.genre) {
    filteredBeats = mockBeats.filter(beat => beat.genre === filters.genre)
  }
  if (filters?.producerId) {
    filteredBeats = mockBeats.filter(beat => beat.producerId === filters.producerId)
  }
  
  return filteredBeats
}