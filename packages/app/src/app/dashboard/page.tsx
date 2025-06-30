'use client'

import { BackToDashboard } from '@/components/BackToDashboard'
import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const { userProfile } = useAuth()
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
        {userProfile?.role === 'admin' && (
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
          { title: 'Total Beats', value: '0', icon: '🎵', color: '#3b82f6', note: 'Upload your first beat!' },
          { title: 'Total Sales', value: 'R0.00', icon: '💰', color: '#059669', note: 'Start earning today' },
          { title: 'Profile Views', value: '0', icon: '👁️', color: '#8b5cf6', note: 'Build your audience' },
          { title: 'This Month', value: 'R0.00', icon: '📈', color: '#7c3aed', note: 'Monthly earnings' },
          { title: 'Plays', value: '0', icon: '▶️', color: '#f59e0b', note: 'Get discovered' }
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
          {[
            { title: 'Upload your first beat', status: 'Get Started', sales: 0, earnings: 'R0.00', isPlaceholder: true }
          ].map((beat, index) => (
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
                  {beat.isPlaceholder ? 'Click "Upload New Beat" to get started' : `Status: ${beat.status}`}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: '600', color: '#1f2937' }}>
                  {beat.earnings}
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {beat.sales} sales
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