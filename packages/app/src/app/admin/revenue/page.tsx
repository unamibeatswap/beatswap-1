'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { usePlatformStats } from '@/hooks/usePlatformStats'

export default function RevenueTrackingPage() {
  const { userProfile } = useAuth()
  const { totalRevenue, isLoading } = usePlatformStats()
  const [timeRange, setTimeRange] = useState('30d')

  if (userProfile?.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600">Admin access required</p>
        </div>
      </div>
    )
  }

  const revenueData = {
    totalRevenue: totalRevenue,
    platformCommission: totalRevenue * 0.15, // 15% commission
    producerPayouts: totalRevenue * 0.85, // 85% to producers
    monthlyGrowth: 18.5,
    transactions: Math.floor(totalRevenue / 363.2), // Estimate based on avg transaction
    avgTransactionValue: 363.2
  }

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        padding: '4rem 2rem',
        marginBottom: '2rem'
      }}>
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">💰 Revenue Tracking</h1>
            <p className="text-xl opacity-90 mb-6">Monitor platform revenue and commission splits</p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-full">
                💵 R{isLoading ? '...' : revenueData.totalRevenue.toFixed(0)} Total
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                🏦 R{isLoading ? '...' : revenueData.platformCommission.toFixed(0)} Commission
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                🎤 R{isLoading ? '...' : revenueData.producerPayouts.toFixed(0)} Payouts
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">

      {/* Time Range Selector */}
      <div className="mb-6">
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">R{isLoading ? '...' : revenueData.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-green-600 text-sm">+{revenueData.monthlyGrowth}% this month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Platform Commission (15%)</p>
              <p className="text-2xl font-bold text-blue-600">R{isLoading ? '...' : revenueData.platformCommission.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Producer Payouts (85%)</p>
              <p className="text-2xl font-bold text-purple-600">R{isLoading ? '...' : revenueData.producerPayouts.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Transaction Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Transactions</span>
              <span className="font-semibold">{revenueData.transactions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Transaction Value</span>
              <span className="font-semibold">R{revenueData.avgTransactionValue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Methods</span>
              <span className="font-semibold">Crypto: 65% | Fiat: 35%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Top Earning Producers</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Beat Master Pro</p>
                <p className="text-sm text-gray-600">45 beats sold</p>
              </div>
              <span className="font-semibold text-green-600">R23,400</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Synth Wave</p>
                <p className="text-sm text-gray-600">32 beats sold</p>
              </div>
              <span className="font-semibold text-green-600">R18,900</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Lo-Fi Dreams</p>
                <p className="text-sm text-gray-600">28 beats sold</p>
              </div>
              <span className="font-semibold text-green-600">R15,600</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Revenue Breakdown</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Transaction</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Commission</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Producer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Method</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm">2024-01-25</td>
                  <td className="py-3 px-4 text-sm">Beat Purchase</td>
                  <td className="py-3 px-4 text-sm font-medium">R459.99</td>
                  <td className="py-3 px-4 text-sm text-blue-600">R69.00</td>
                  <td className="py-3 px-4 text-sm">Beat Master Pro</td>
                  <td className="py-3 px-4 text-sm">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">Crypto</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm">2024-01-25</td>
                  <td className="py-3 px-4 text-sm">Beat Purchase</td>
                  <td className="py-3 px-4 text-sm font-medium">R299.99</td>
                  <td className="py-3 px-4 text-sm text-blue-600">R45.00</td>
                  <td className="py-3 px-4 text-sm">Synth Wave</td>
                  <td className="py-3 px-4 text-sm">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Stripe</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm">2024-01-24</td>
                  <td className="py-3 px-4 text-sm">Beat Purchase</td>
                  <td className="py-3 px-4 text-sm font-medium">R899.99</td>
                  <td className="py-3 px-4 text-sm text-blue-600">R135.00</td>
                  <td className="py-3 px-4 text-sm">Lo-Fi Dreams</td>
                  <td className="py-3 px-4 text-sm">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">Crypto</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}