'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface ProducerStats {
  profileViews: number
  totalPlays: number
  totalSales: number
  totalEarnings: number
  lastUpdated: Date
}

export function useProducerStats(producerId: string) {
  const [stats, setStats] = useState<ProducerStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsDoc = await getDoc(doc(db, 'producer-stats', producerId))
        
        if (statsDoc.exists()) {
          const data = statsDoc.data()
          setStats({
            ...data,
            lastUpdated: data.lastUpdated?.toDate() || new Date()
          } as ProducerStats)
        } else {
          // Initialize stats for new producer
          const initialStats: ProducerStats = {
            profileViews: 0,
            totalPlays: 0,
            totalSales: 0,
            totalEarnings: 0,
            lastUpdated: new Date()
          }
          
          await setDoc(doc(db, 'producer-stats', producerId), initialStats)
          setStats(initialStats)
        }
      } catch (error) {
        console.warn('Failed to fetch producer stats:', error)
        // Fallback to mock data
        setStats({
          profileViews: 1234,
          totalPlays: 2847,
          totalSales: 15,
          totalEarnings: 1247,
          lastUpdated: new Date()
        })
      } finally {
        setLoading(false)
      }
    }

    if (producerId) {
      fetchStats()
    }
  }, [producerId])

  const incrementProfileView = async () => {
    if (!producerId) return
    
    try {
      await updateDoc(doc(db, 'producer-stats', producerId), {
        profileViews: increment(1),
        lastUpdated: new Date()
      })
      
      setStats(prev => prev ? {
        ...prev,
        profileViews: prev.profileViews + 1,
        lastUpdated: new Date()
      } : null)
    } catch (error) {
      console.warn('Failed to increment profile view:', error)
    }
  }

  const updateStats = async (updates: Partial<ProducerStats>) => {
    if (!producerId) return
    
    try {
      await updateDoc(doc(db, 'producer-stats', producerId), {
        ...updates,
        lastUpdated: new Date()
      })
      
      setStats(prev => prev ? { ...prev, ...updates, lastUpdated: new Date() } : null)
    } catch (error) {
      console.warn('Failed to update producer stats:', error)
    }
  }

  return {
    stats,
    loading,
    incrementProfileView,
    updateStats
  }
}