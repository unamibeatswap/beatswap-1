'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useProducerStats } from '@/hooks/useProducerStats'

export default function ProducerPage() {
  const params = useParams()
  const producerId = params.id as string
  const [selectedGenre, setSelectedGenre] = useState('all')
  const { stats, incrementProfileView } = useProducerStats(producerId)
  
  // Track profile view on page load
  useEffect(() => {
    incrementProfileView()
  }, [])

  const genres = [
    'all', 'amapiano', 'afrobeats', 'house', 'deep-house', 'tech-house', 'trap', 
    'hip-hop', 'drill', 'gqom', 'kwaito', 'electronic', 'techno', 'progressive',
    'trance', 'dubstep', 'drum-bass', 'garage', 'breakbeat', 'ambient'
  ]

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        height: '400px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'end',
        padding: '2rem',
        color: 'white'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '2rem'
            }}>🎵</div>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>
                Beat Master Pro ✓
              </h1>
              <p style={{ fontSize: '1.125rem', opacity: 0.9, margin: 0 }}>
                Johannesburg, SA • 0 beats • 0 sales
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Bio */}
        <div style={{
          background: 'white', padding: '2rem', borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem', border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>About</h2>
          <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
            Professional music producer from Johannesburg, specializing in Amapiano and Afrobeats. Ready to upload beats to the platform.
          </p>
        </div>

        {/* Genre Filters */}
        <div style={{
          background: 'white', padding: '1.5rem', borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem', border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>Filter by Genre</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {genres.map(genre => (
              <button key={genre} onClick={() => setSelectedGenre(genre)} style={{
                padding: '0.5rem 1rem', borderRadius: '1rem', border: 'none',
                background: selectedGenre === genre ? '#3b82f6' : '#f3f4f6',
                color: selectedGenre === genre ? 'white' : '#6b7280',
                cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500', textTransform: 'capitalize'
              }}>
                {genre.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Beats Collection */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
              Beats Collection (0)
            </h2>
          </div>
          
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6b7280' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎵</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>No beats uploaded yet</h3>
            <p>This producer hasn't uploaded any beats to the platform yet.</p>
          </div>
        </div>
      </div>
    </div>
  )
}