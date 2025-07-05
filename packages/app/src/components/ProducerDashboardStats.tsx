'use client'

import { useState, useEffect } from 'react'
import { useUnifiedAuth } from '@/context/UnifiedAuthContext'
import { useBeatNFT } from '@/hooks/useBeatNFT'
import { LinkComponent } from '@/components/LinkComponent'

interface ProducerStats {
  totalBeats: number
  totalSales: number
  totalEarnings: number
  creditsUsed: number
  creditsRemaining: number
  recentActivity: Array<{
    type: 'upload' | 'sale' | 'credit_purchase'
    description: string
    timestamp: Date
    amount?: number
  }>
}

export default function ProducerDashboardStats() {
  const { user } = useUnifiedAuth()
  const { balance } = useBeatNFT()
  const [stats, setStats] = useState<ProducerStats>({
    totalBeats: 0,
    totalSales: 0,
    totalEarnings: 0,
    creditsUsed: 0,
    creditsRemaining: 0,
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducerStats()
    const interval = setInterval(loadProducerStats, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [user, balance])

  const loadProducerStats = async () => {
    if (!user?.address) return

    try {
      setLoading(true)
      
      // Load producer-specific data from localStorage (temporary)
      const producerKey = `producer_stats_${user.address}`
      const stored = localStorage.getItem(producerKey)
      
      let producerData = {
        totalBeats: 0,
        totalSales: 0,
        totalEarnings: 0,
        uploads: []
      }
      
      if (stored) {
        producerData = JSON.parse(stored)
      }
      
      // Generate recent activity
      const recentActivity = [
        ...(balance.totalUsed > 0 ? [{
          type: 'upload' as const,
          description: `Used ${balance.totalUsed} credits for beat uploads`,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          amount: balance.totalUsed
        }] : []),
        ...(balance.hasProNFT ? [{
          type: 'credit_purchase' as const,
          description: 'Upgraded to Pro NFT - Unlimited uploads',
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          amount: 0.1
        }] : []),
        {
          type: 'upload' as const,
          description: 'Joined BeatsChain platform',
          timestamp: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000)
        }
      ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5)

      setStats({
        totalBeats: producerData.totalBeats,
        totalSales: producerData.totalSales,
        totalEarnings: producerData.totalEarnings,
        creditsUsed: balance.totalUsed,
        creditsRemaining: balance.hasProNFT ? -1 : balance.credits,
        recentActivity
      })
      
    } catch (error) {
      console.error('Error loading producer stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    const diffInWeeks = Math.floor(diffInDays / 7)
    return `${diffInWeeks}w ago`
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload': return '🎵'
      case 'sale': return '💰'
      case 'credit_purchase': return '🎫'
      default: return '📊'
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Beats</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.totalBeats}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-2xl">🎵</span>
            </div>
          </div>
          <div className="mt-2">
            <LinkComponent href="/upload" className="text-blue-600 text-sm hover:underline">
              Upload new beat →
            </LinkComponent>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.totalSales}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-green-600 text-sm">
              R{stats.totalEarnings.toLocaleString()} earned
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Credits Used</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.creditsUsed}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <span className="text-2xl">🎫</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-purple-600 text-sm">
              {stats.creditsRemaining === -1 ? 'Unlimited remaining' : `${stats.creditsRemaining} remaining`}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Account Status</p>
              <p className="text-lg font-bold text-gray-900">
                {balance.hasProNFT ? 'Pro NFT' : 'Free Tier'}
              </p>
            </div>
            <div className={`p-3 rounded-full ${balance.hasProNFT ? 'bg-yellow-100' : 'bg-gray-100'}`}>
              <span className="text-2xl">{balance.hasProNFT ? '♾️' : '🆓'}</span>
            </div>
          </div>
          <div className="mt-2">
            {!balance.hasProNFT && (
              <LinkComponent href="/manage-subscription" className="text-yellow-600 text-sm hover:underline">
                Upgrade to Pro →
              </LinkComponent>
            )}
            {balance.hasProNFT && (
              <span className="text-yellow-600 text-sm">Unlimited uploads</span>
            )}
          </div>
        </div>
      </div>

      {/* Credit Status Card */}
      <div className={`rounded-lg p-6 border-2 ${
        balance.hasProNFT 
          ? 'bg-gradient-to-r from-yellow-50 to-purple-50 border-yellow-200' 
          : balance.credits < 3 
            ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
            : 'bg-gradient-to-r from-blue-50 to-green-50 border-blue-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {balance.hasProNFT ? '♾️ Pro NFT Status' : '🎫 BeatNFT Credits'}
            </h3>
            <p className="text-gray-600">
              {balance.hasProNFT 
                ? 'Upload unlimited beats in any format'
                : `${balance.credits} credits remaining • Upload costs: MP3 (1), WAV (2), ZIP (3-5)`
              }
            </p>
          </div>
          <div className="text-right">
            {!balance.hasProNFT && balance.credits < 3 && (
              <LinkComponent 
                href="/manage-subscription"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm font-medium"
              >
                Buy More Credits
              </LinkComponent>
            )}
            {!balance.hasProNFT && balance.credits >= 3 && (
              <LinkComponent 
                href="/upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Upload Beat
              </LinkComponent>
            )}
            {balance.hasProNFT && (
              <LinkComponent 
                href="/upload"
                className="bg-gradient-to-r from-purple-600 to-yellow-600 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-yellow-700 text-sm font-medium"
              >
                Upload Beat
              </LinkComponent>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          {stats.recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-600">No recent activity</p>
              <p className="text-sm text-gray-500 mt-2">Start uploading beats to see your activity here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-white p-2 rounded-full border">
                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.description}</p>
                    {activity.amount && (
                      <p className="text-sm text-gray-600">
                        {activity.type === 'credit_purchase' ? `${activity.amount} ETH` : `${activity.amount} credits`}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}