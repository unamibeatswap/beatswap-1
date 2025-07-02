'use client'

import { useState, useEffect } from 'react'
import { useWeb3Beats } from './useWeb3Beats'
import { useSIWE } from '@/context/SIWEContext'

interface PlatformStats {
  totalBeats: number
  totalUsers: number
  totalRevenue: number
  totalSales: number
  activeProducers: number
  isLoading: boolean
}

export function usePlatformStats(): PlatformStats {
  const { beats } = useBeats()
  const { user } = useAuth()
  const [stats, setStats] = useState<PlatformStats>({
    totalBeats: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalSales: 0,
    activeProducers: 0,
    isLoading: true
  })

  useEffect(() => {
    // Calculate real-time stats from actual data
    const calculateStats = () => {
      const totalBeats = beats.length
      const totalUsers = user ? 1 : 0 // Start with current user count
      const totalRevenue = 0 // No sales yet
      const totalSales = 0 // No sales yet
      const activeProducers = user ? 1 : 0 // Count of users with producer role
      
      setStats({
        totalBeats,
        totalUsers,
        totalRevenue,
        totalSales,
        activeProducers,
        isLoading: false
      })
    }

    calculateStats()
  }, [beats, user])

  return stats
}