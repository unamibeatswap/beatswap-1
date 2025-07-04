'use client'

import { useState, useEffect } from 'react'
import { BackToDashboard } from '@/components/BackToDashboard'
import { useUnifiedAuth } from '@/context/UnifiedAuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { ApiClient } from '@/lib/api'
import { Beat } from '@/types'

interface ProducerStats {
  totalEarnings: number
  totalSales: number
  totalPlays: number
  monthlyEarnings: number
}

function DashboardContent() {
  const { user } = useUnifiedAuth()
  const [beats, setBeats] = useState<Beat[]>([])
  const [stats, setStats] = useState<ProducerStats>({ 
    totalEarnings: 0, 
    totalSales: 0, 
    totalPlays: 0,
    monthlyEarnings: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.address) {
      fetchDashboardData()
    }
  }, [user?.address])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const userBeats = await ApiClient.getBeats({ producerId: user!.address })
      const producerStats = await fetchProducerStats(user!.address)
      setBeats(userBeats)
      setStats(producerStats)
    } catch (error) {
      console.error('Dashboard data fetch error:', error)
      // Return zeros for new platform
      setStats({ 
        totalEarnings: 0, 
        totalSales: 0, 
        totalPlays: 0,
        monthlyEarnings: 0
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchProducerStats = async (producerId: string): Promise<ProducerStats> => {
    // Return zeros for new platform
    return {
      totalEarnings: 0,
      totalSales: 0,
      totalPlays: 0,
      monthlyEarnings: 0
    }
  }
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

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {(user?.role === 'admin' || user?.role === 'super_admin') && (
          <div style={{ marginBottom: '1rem' }}>
            <BackToDashboard />
          </div>
        )}

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { title: 'Total Beats', value: beats.length.toString(), icon: '🎵', color: '#3b82f6', note: beats.length === 0 ? 'Upload your first beat!' : 'Keep creating!' },
          { title: 'Total Sales', value: `R${stats.totalSales * 299.99}`, icon: '💰', color: '#059669', note: stats.totalSales === 0 ? 'Start earning today' : `${stats.totalSales} sales` },
          { title: 'Total Earnings', value: `R${stats.totalEarnings}`, icon: '💎', color: '#8b5cf6', note: 'Your earnings' },
          { title: 'This Month', value: `R${(stats.totalEarnings * 0.3).toFixed(2)}`, icon: '📈', color: '#7c3aed', note: 'Monthly earnings' },
          { title: 'Total Plays', value: stats.totalPlays.toLocaleString(), icon: '▶️', color: '#f59e0b', note: 'Get discovered' }
        ].map((stat, index) => (
          <div key={index} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  {stat.title}
                </p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  {stat.note}
                </p>
              </div>
              <div style={{
                background: stat.color + '20',
                padding: '0.75rem',
                borderRadius: '50%',
                fontSize: '1.5rem'
              }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/upload" style={{
            background: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none'
          }}>
            📤 Upload New Beat
          </a>
          <a href="/admin/analytics" style={{
            background: 'white',
            color: '#3b82f6',
            padding: '0.75rem 1.5rem',
            border: '1px solid #3b82f6',
            borderRadius: '0.375rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none'
          }}>
            📊 View Analytics
          </a>
          <a href="/producer/current-user" style={{
            background: 'white',
            color: '#8b5cf6',
            padding: '0.75rem 1.5rem',
            border: '1px solid #8b5cf6',
            borderRadius: '0.375rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none'
          }}>
            👁️ View My Profile
          </a>
          <button onClick={() => alert('Withdraw feature coming soon!')} style={{
            background: 'white',
            color: '#059669',
            padding: '0.75rem 1.5rem',
            border: '1px solid #059669',
            borderRadius: '0.375rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            💳 Withdraw Earnings
          </button>
        </div>
      </div>

      {/* Recent Beats */}
      <div style={{
        background: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
            Your Recent Beats
          </h2>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {(beats.length === 0 ? [
            { title: 'Upload your first beat', status: 'Get Started', sales: 0, earnings: 'R0.00', isPlaceholder: true }
          ] : beats.slice(0, 5)).map((beat, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 0',
              borderBottom: index < 2 ? '1px solid #f3f4f6' : 'none'
            }}>
              <div>
                <h3 style={{ fontWeight: '500', color: beat.isPlaceholder ? '#6b7280' : '#1f2937', marginBottom: '0.25rem' }}>
                  {beat.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {beat.isPlaceholder ? 'Click "Upload New Beat" to get started' : `${beat.genre} • ${beat.bpm} BPM`}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: '600', color: '#1f2937' }}>
                  {beat.isPlaceholder ? beat.earnings : `R${beat.price}`}
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {beat.isPlaceholder ? `${beat.sales} sales` : new Date(beat.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute anyRole={['producer', 'admin', 'super_admin']} requireWallet={true}>
      <DashboardContent />
    </ProtectedRoute>
  )
}