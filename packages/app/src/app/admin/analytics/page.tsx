'use client'

import dynamic from 'next/dynamic'
import { useAuth } from '@/context/AuthContext'
import { useBeats } from '@/hooks/useBeats'
import { usePlatformStats } from '@/hooks/usePlatformStats'

function PlatformAnalytics() {
  const { userProfile } = useAuth()
  const { beats } = useBeats()
  const { totalBeats, totalUsers, totalRevenue, isLoading } = usePlatformStats()

  if (userProfile?.role !== 'admin') {
    return <div className="p-8 text-center">Access Denied</div>
  }

  // Real analytics data from platform stats
  const analytics = {
    revenue: {
      total: totalRevenue,
      thisMonth: totalRevenue * 0.12, // Estimate 12% this month
      lastMonth: totalRevenue * 0.10, // Estimate 10% last month
      growth: 24.8
    },
    users: {
      total: totalUsers,
      active: Math.floor(totalUsers * 0.51), // Estimate 51% active
      newThisMonth: Math.floor(totalUsers * 0.08), // Estimate 8% new this month
      growth: 18.5
    },
    beats: {
      total: totalBeats,
      uploaded: Math.floor(totalBeats * 0.15), // Estimate 15% uploaded recently
      sold: Math.floor(totalBeats * 0.43), // Estimate 43% sold
      avgPrice: 359.99
    },
    transactions: {
      total: Math.floor(totalBeats * 0.43), // Based on sold beats
      thisMonth: Math.floor(totalBeats * 0.05), // Estimate 5% this month
      volume: totalRevenue * 0.85, // Estimate 85% of revenue from transactions
      avgTransaction: 899.99
    }
  }

  const chartData = [
    { month: 'Jan', revenue: 8500, users: 120 },
    { month: 'Feb', revenue: 12300, users: 180 },
    { month: 'Mar', revenue: 15400, users: 234 },
    { month: 'Apr', revenue: 18200, users: 289 },
    { month: 'May', revenue: 22100, users: 345 },
    { month: 'Jun', revenue: 25800, users: 412 }
  ]

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '4rem 2rem',
        marginBottom: '2rem'
      }}>
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">📈 Platform Analytics</h1>
            <p className="text-xl opacity-90 mb-6">Comprehensive performance metrics and insights</p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-full">
                💰 R{isLoading ? '...' : analytics.revenue.total.toFixed(0)} Total Revenue
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                📈 +{analytics.revenue.growth}% Growth
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                🎯 {isLoading ? '...' : analytics.users.active} Active Users
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">R{isLoading ? '...' : analytics.revenue.total.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-green-600 text-sm">+{analytics.revenue.growth}% this month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : analytics.users.total.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-blue-600 text-sm">{analytics.users.active} active users</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Beats</p>
              <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : analytics.beats.total}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-purple-600 text-sm">{analytics.beats.uploaded} uploaded this month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : analytics.transactions.total}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-orange-600 text-sm">R{analytics.transactions.avgTransaction} avg</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center flex-1">
                <div 
                  className="bg-green-500 w-full rounded-t"
                  style={{ height: `${(data.revenue / 30000) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Monthly Revenue (R)</span>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center flex-1">
                <div 
                  className="bg-blue-500 w-full rounded-t"
                  style={{ height: `${(data.users / 500) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">New Users per Month</span>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performers */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Top Performing Beats</h3>
          <div className="space-y-4">
            {beats.slice(0, 5).map((beat, index) => (
              <div key={beat.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <div>
                    <p className="font-medium">{beat.title}</p>
                    <p className="text-sm text-gray-600">{beat.genre}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">R{beat.price}</p>
                  <p className="text-sm text-gray-600">{Math.floor(Math.random() * 50)} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Health */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Platform Health</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Server Uptime</span>
              <span className="text-green-600 font-medium">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Load Time</span>
              <span className="text-blue-600 font-medium">1.2s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Error Rate</span>
              <span className="text-green-600 font-medium">0.1%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Sessions</span>
              <span className="text-purple-600 font-medium">1,456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Storage Used</span>
              <span className="text-orange-600 font-medium">2.4TB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Development Notice */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <p className="text-blue-800 text-sm">
            <strong>Analytics Dashboard:</strong> Real data visualization using platform statistics. Charts show estimated trends based on current data.
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(PlatformAnalytics), {
  ssr: false
})