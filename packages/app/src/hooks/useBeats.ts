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
        
        let q = query(collection(db, 'beats'), orderBy('createdAt', 'desc'))
        
        if (filters?.genre) {
          q = query(collection(db, 'beats'), where('genre', '==', filters.genre), orderBy('createdAt', 'desc'))
        }
        
        if (filters?.producerId) {
          q = query(collection(db, 'beats'), where('producerId', '==', filters.producerId), orderBy('createdAt', 'desc'))
        }
        
        const querySnapshot = await getDocs(q)
        const firebaseBeats = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date()
        })) as Beat[]
        
        setBeats(firebaseBeats)
      } catch (err: any) {
        console.error('Error fetching beats:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBeats()
  }, [filters?.genre, filters?.producerId])

  const refreshBeats = async () => {
    const fetchBeats = async () => {
      try {
        let q = query(collection(db, 'beats'), orderBy('createdAt', 'desc'))
        
        if (filters?.genre) {
          q = query(collection(db, 'beats'), where('genre', '==', filters.genre), orderBy('createdAt', 'desc'))
        }
        
        if (filters?.producerId) {
          q = query(collection(db, 'beats'), where('producerId', '==', filters.producerId), orderBy('createdAt', 'desc'))
        }
        
        const querySnapshot = await getDocs(q)
        const firebaseBeats = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date()
        })) as Beat[]
        
        setBeats(firebaseBeats)
      } catch (err: any) {
        setError(err.message)
      }
    }
    
    await fetchBeats()
  }

  const getBeatsByProducer = (producerId: string) => {
    return beats.filter(beat => beat.producerId === producerId)
  }

  return {
    beats,
    loading,
    error,
    refreshBeats,
    getBeatsByProducer
  }
}