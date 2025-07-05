'use client'

import { useState, useEffect } from 'react'
import { BackToDashboard } from '@/components/BackToDashboard'
import { useUnifiedAuth } from '@/context/UnifiedAuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import ProducerDashboardStats from '@/components/ProducerDashboardStats'

interface ProducerStats {
  totalEarnings: number
  totalSales: number
  totalPlays: number
  monthlyEarnings: number
}

function DashboardContent() {
  const { user } = useUnifiedAuth()
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            🎤 Producer Dashboard
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
            Manage your beats, track sales, and grow your music business
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {(user?.role === 'admin' || user?.role === 'super_admin') && (
          <div className="mb-6">
            <BackToDashboard />
          </div>
        )}
        
        <ProducerDashboardStats />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute 
      anyRole={['producer', 'admin', 'super_admin']} 
      requireWallet={true}
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md">
            <div className="text-6xl mb-4">🎤</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Producer Dashboard</h2>
            <p className="text-gray-600 mb-6">
              This dashboard is for music producers. Switch to producer role to access.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-blue-700 text-sm">
                <strong>How to become a producer:</strong><br/>
                1. Connect your wallet<br/>
                2. Go to Profile settings<br/>
                3. Change role to "Producer"
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <a href="/profile" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Update Profile
              </a>
              <a href="/beatnfts" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                Browse BeatNFTs
              </a>
            </div>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </ProtectedRoute>
  )
}