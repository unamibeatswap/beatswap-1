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
          // Return empty stats for new producer without creating document
          const initialStats: ProducerStats = {
            profileViews: 0,
            totalPlays: 0,
            totalSales: 0,
            totalEarnings: 0,
            lastUpdated: new Date()
          }
          setStats(initialStats)
        }
      } catch (error) {
        console.warn('Failed to fetch producer stats:', error)
        // Return zeros for new platform
        setStats({
          profileViews: 0,
          totalPlays: 0,
          totalSales: 0,
          totalEarnings: 0,
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
    // Disabled for new platform to prevent saving loops
    return
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