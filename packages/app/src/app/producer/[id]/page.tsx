'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function ProducerPage() {
  const params = useParams()
  const producerId = params.id as string
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [producer, setProducer] = useState<any>(null)
  const [beats, setBeats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    let isMounted = true
    
    const loadProducerData = async () => {
      if (!producerId || typeof producerId !== 'string') {
        console.warn('Invalid producer ID:', producerId)
        setLoading(false)
        return
      }
      
      try {
        const { TestDataManager } = await import('@/utils/testData')
        const testProducers = TestDataManager.getTestProducers() || []
        const testBeats = TestDataManager.getTestBeats() || []
        
        const foundProducer = testProducers.find(p => p?.id === producerId)
        
        if (isMounted) {
          if (foundProducer) {
            setProducer({
              id: foundProducer.id,
              name: foundProducer.name || 'Beat Creator',
              displayName: foundProducer.displayName || foundProducer.name || 'Beat Creator',
              bio: foundProducer.bio || 'Beat creator on BeatsChain.',
              location: foundProducer.location || 'Unknown',
              genres: foundProducer.genres || ['Hip Hop'],
              totalBeats: foundProducer.totalBeats || 0,
              totalSales: foundProducer.totalSales || 0,
              isVerified: foundProducer.isVerified || false
            })
            
            const producerBeats = testBeats.filter(b => b?.producerId === producerId)
            setBeats(producerBeats)
          } else {
            // Default producer if not found
            setProducer({
              id: producerId,
              name: 'Beat Creator',
              displayName: 'Beat Creator',
              bio: 'Beat creator on BeatsChain platform.',
              location: 'Unknown',
              genres: ['Hip Hop'],
              totalBeats: 0,
              totalSales: 0,
              isVerified: false
            })
            setBeats([])
          }
          setLoading(false)
        }
      } catch (error) {
        console.error('Error loading producer data:', error)
        if (isMounted) {
          setProducer({
            id: producerId,
            name: 'Beat Creator',
            displayName: 'Beat Creator',
            bio: 'Beat creator on BeatsChain platform.',
            location: 'Unknown',
            genres: ['Hip Hop'],
            totalBeats: 0,
            totalSales: 0,
            isVerified: false
          })
          setBeats([])
          setLoading(false)
        }
      }
    }
    
    loadProducerData()
    
    return () => {
      isMounted = false
    }
  }, [producerId])

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
                {producer?.name || 'Beat Creator'} {producer?.isVerified ? ' ✓' : ''}
              </h1>
              <p style={{ fontSize: '1.125rem', opacity: 0.9, margin: 0 }}>
                {producer?.location || 'Unknown'} • {beats?.length || 0} beats • {producer?.totalSales || 0} sales
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
            {producer?.bio || 'Beat creator on BeatsChain platform.'}
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
              Beats Collection ({beats?.length || 0})
            </h2>
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6b7280' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎵</div>
              <p>Loading beats...</p>
            </div>
          ) : !beats || beats.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6b7280' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎵</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>No beats uploaded yet</h3>
              <p>This beat creator hasn't uploaded any beats to the platform yet.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {beats.map((beat) => (
                <div key={beat.id} style={{
                  background: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '200px',
                    background: beat.coverImageUrl ? `url(${beat.coverImageUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '3rem'
                  }}>
                    {!beat.coverImageUrl && '🎵'}
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                      {beat.title}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                      {beat.genre} • {beat.bpm} BPM • {beat.key}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#059669' }}>
                          {beat.price.toFixed(3)} ETH
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                          ~R{Math.round(beat.price * 18000).toLocaleString()}
                        </div>
                      </div>
                      <button style={{
                        background: '#3b82f6',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}>
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}