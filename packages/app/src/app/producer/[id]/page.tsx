'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useProducerStats } from '@/hooks/useProducerStats'
import BeatCard from '@/components/BeatCard'

export default function ProducerPage() {
  const params = useParams()
  const producerId = params.id as string
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const beatsPerPage = 6
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

  const mockBeats = [
    { id: '1', title: 'Amapiano Vibes', genre: 'amapiano', bpm: 112, key: 'Am', price: 459.99, duration: '3:24', plays: 1250 },
    { id: '2', title: 'Afrobeat Groove', genre: 'afrobeats', bpm: 102, key: 'C', price: 399.99, duration: '2:58', plays: 890 },
    { id: '3', title: 'Deep House Flow', genre: 'deep-house', bpm: 124, key: 'Gm', price: 529.99, duration: '4:12', plays: 2100 }
  ]

  // Expand mock beats for pagination demo
  const expandedBeats = [...mockBeats, ...mockBeats, ...mockBeats, ...mockBeats]
  const filteredBeats = selectedGenre === 'all' ? expandedBeats : expandedBeats.filter(beat => beat.genre === selectedGenre)
  
  // Pagination logic
  const totalPages = Math.ceil(filteredBeats.length / beatsPerPage)
  const startIndex = (currentPage - 1) * beatsPerPage
  const currentBeats = filteredBeats.slice(startIndex, startIndex + beatsPerPage)
  
  // Reset to page 1 when genre changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedGenre])

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
                Johannesburg, SA • 45 beats • 234 sales
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
            Professional music producer from Johannesburg, specializing in Amapiano and Afrobeats. Creating fire beats since 2020.
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
              Beats Collection ({filteredBeats.length})
            </h2>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Page {currentPage} of {totalPages}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {currentBeats.map((beat, index) => (
              <BeatCard key={`${beat.id}-${index}`} beat={{
                id: beat.id,
                title: beat.title,
                genre: beat.genre,
                bpm: beat.bpm,
                key: beat.key,
                price: beat.price,
                tags: [],
                producerId: producerId,
                audioUrl: '',
                coverImageUrl: '',
                createdAt: new Date(),
                updatedAt: new Date()
              }} />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '2rem'
            }}>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  background: currentPage === 1 ? '#f9fafb' : 'white',
                  color: currentPage === 1 ? '#9ca3af' : '#374151',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    background: currentPage === i + 1 ? '#3b82f6' : 'white',
                    color: currentPage === i + 1 ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontWeight: currentPage === i + 1 ? '600' : '400'
                  }}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  background: currentPage === totalPages ? '#f9fafb' : 'white',
                  color: currentPage === totalPages ? '#9ca3af' : '#374151',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}