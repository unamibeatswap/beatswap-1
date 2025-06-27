'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy, where, limit, startAfter, DocumentSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Producer {
  id: string
  name: string
  email: string
  avatar?: string
  genre: string
  totalBeats: number
  totalSales: number
  rating: number
  verified: boolean
  location: string
  bio?: string
  createdAt: Date
}

export function useProducers() {
  const [producers, setProducers] = useState<Producer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const getProducers = async (filters?: { genre?: string, location?: string }, pageSize = 12, isLoadMore = false) => {
    try {
      setLoading(true)
      
      let q = query(
        collection(db, 'users'),
        where('role', '==', 'producer'),
        orderBy('totalSales', 'desc'),
        limit(pageSize)
      )

      if (filters?.genre) {
        q = query(q, where('genre', '==', filters.genre))
      }

      if (isLoadMore && lastDoc) {
        q = query(q, startAfter(lastDoc))
      }

      const querySnapshot = await getDocs(q)
      
      if (querySnapshot.empty && !isLoadMore) {
        // No producers in Firestore, use mock data
        const mockProducers: Producer[] = [
          {
            id: '1',
            name: 'Beat Master Pro',
            email: 'beatmaster@example.com',
            avatar: '🎵',
            genre: 'Trap, Hip Hop',
            totalBeats: 45,
            totalSales: 234,
            rating: 4.8,
            verified: true,
            location: 'Atlanta, GA',
            bio: 'Professional trap producer with 5+ years experience',
            createdAt: new Date('2020-01-01')
          },
          {
            id: '2',
            name: 'Synth Wave',
            email: 'synthwave@example.com',
            avatar: '🎹',
            genre: 'Electronic, Future Bass',
            totalBeats: 32,
            totalSales: 156,
            rating: 4.6,
            verified: true,
            location: 'Los Angeles, CA',
            bio: 'Electronic music specialist creating future sounds',
            createdAt: new Date('2019-06-15')
          },
          {
            id: '3',
            name: 'Melody Maker',
            email: 'melody@example.com',
            avatar: '🎼',
            genre: 'R&B, Soul',
            totalBeats: 28,
            totalSales: 89,
            rating: 4.9,
            verified: false,
            location: 'Nashville, TN',
            bio: 'Soulful melodies and R&B vibes',
            createdAt: new Date('2021-03-10')
          }
        ]
        
        setProducers(isLoadMore ? [...producers, ...mockProducers] : mockProducers)
        setHasMore(false)
        return mockProducers
      }

      const firestoreProducers: Producer[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        firestoreProducers.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date()
        } as Producer)
      })

      if (isLoadMore) {
        setProducers(prev => [...prev, ...firestoreProducers])
      } else {
        setProducers(firestoreProducers)
      }

      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
      setHasMore(querySnapshot.docs.length === pageSize)
      
      return firestoreProducers
    } catch (err: any) {
      console.warn('Firestore error, using mock data:', err)
      
      // Fallback to mock data
      const mockProducers: Producer[] = [
        {
          id: '1',
          name: 'Beat Master Pro',
          email: 'beatmaster@example.com',
          avatar: '🎵',
          genre: 'Trap, Hip Hop',
          totalBeats: 45,
          totalSales: 234,
          rating: 4.8,
          verified: true,
          location: 'Atlanta, GA',
          createdAt: new Date()
        }
      ]
      
      setProducers(isLoadMore ? [...producers, ...mockProducers] : mockProducers)
      setError('Using demo data - Firestore unavailable')
      setHasMore(false)
      return mockProducers
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      getProducers(undefined, 12, true)
    }
  }

  useEffect(() => {
    getProducers()
  }, [])

  return {
    producers,
    loading,
    error,
    hasMore,
    getProducers,
    loadMore
  }
}