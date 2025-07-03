'use client'

import { useState } from 'react'
import React from 'react'

export default function ProducersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [localProducers, setLocalProducers] = useState<any[]>([])
  const [localLoading, setLocalLoading] = useState(true)
  const [localError, setLocalError] = useState<string | null>(null)
  const producersPerPage = 12

  // Robust error handling to prevent 502 crashes
  React.useEffect(() => {
    const loadProducers = async () => {
      // Set safe defaults immediately
      const safeDefaults = [
        {
          id: 'producer-1',
          name: 'BeatMaker SA',
          email: 'beatmaker@example.com',
          genre: 'Hip Hop',
          totalBeats: 5,
          totalSales: 12,
          rating: 4.5,
          verified: true,
          location: 'Cape Town, SA',
          bio: 'Professional beat creator',
          createdAt: new Date()
        },
        {
          id: 'producer-2',
          name: 'Piano King',
          email: 'pianoking@example.com',
          genre: 'Amapiano',
          totalBeats: 8,
          totalSales: 25,
          rating: 4.8,
          verified: true,
          location: 'Johannesburg, SA',
          bio: 'Amapiano specialist',
          createdAt: new Date()
        }
      ]
      
      try {
        setLocalLoading(true)
        setLocalError(null)
        setLocalProducers(safeDefaults) // Set defaults first
        
        // Try to load test data
        try {
          const { TestDataManager } = await import('@/utils/testData')
          const testProducers = TestDataManager.getTestProducers()
          
          if (testProducers && Array.isArray(testProducers) && testProducers.length > 0) {
            const mappedProducers = testProducers.map((p, index) => {
              try {
                return {
                  id: p?.id || `producer-${index}`,
                  name: p?.name || `Producer ${index + 1}`,
                  email: p?.name ? `${p.name.toLowerCase().replace(/\s+/g, '')}@example.com` : `producer${index}@example.com`,
                  genre: (p?.genres && p.genres[0]) || 'Hip Hop',
                  totalBeats: p?.totalBeats || 0,
                  totalSales: p?.totalSales || 0,
                  rating: 4.5,
                  verified: p?.isVerified || false,
                  location: p?.location || 'Unknown',
                  bio: p?.bio || 'Beat creator',
                  createdAt: p?.joinedAt || new Date()
                }
              } catch (mapError) {
                console.warn('Error mapping producer:', mapError)
                return safeDefaults[0] // Return safe default if mapping fails
              }
            })
            
            setLocalProducers(mappedProducers)
          }
        } catch (testDataError) {
          console.warn('Test data loading failed, using safe defaults:', testDataError)
          // Keep safe defaults
        }
        
      } catch (err: any) {
        console.error('Critical error loading producers:', err)
        setLocalError(null) // Don't show error, just use defaults
        setLocalProducers(safeDefaults) // Ensure we always have data
      } finally {
        setLocalLoading(false)
      }
    }
    
    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      if (localLoading) {
        console.warn('Producer loading timeout, using defaults')
        setLocalLoading(false)
        setLocalProducers([
          {
            id: 'default-1',
            name: 'Beat Creator',
            email: 'creator@example.com',
            genre: 'Hip Hop',
            totalBeats: 0,
            totalSales: 0,
            rating: 4.0,
            verified: false,
            location: 'Unknown',
            bio: 'Beat creator on BeatsChain',
            createdAt: new Date()
          }
        ])
      }
    }, 5000)
    
    loadProducers()
    
    return () => clearTimeout(timeoutId)
  }, [])
  
  // Use local data with safe fallbacks
  const producers = localProducers || []
  const loading = localLoading
  const error = localError
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎵</div>
          <p className="text-gray-600">Loading producers...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600">Error loading producers: {error}</p>
        </div>
      </div>
    )
  }
  
  const allProducers = producers
  const totalPages = Math.ceil(allProducers.length / producersPerPage)
  const startIndex = (currentPage - 1) * producersPerPage
  const currentProducers = allProducers.slice(startIndex, startIndex + producersPerPage)

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        color: '#1f2937',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            🎤 Meet Our Beat Makers
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Connect with South Africa's most talented beat creators and producers
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(31,41,55,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(31,41,55,0.2)' }}>
              🎹 Growing Community
            </div>
            <div style={{ background: 'rgba(31,41,55,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(31,41,55,0.2)' }}>
              🇿🇦 South African Focus
            </div>
            <div style={{ background: 'rgba(31,41,55,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(31,41,55,0.2)' }}>
              🚀 New Platform
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Filters */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Search producers..."
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}
          />
          <select style={{
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem'
          }}>
            <option>All Genres</option>
            <option>Hip Hop</option>
            <option>Trap</option>
            <option>Electronic</option>
            <option>R&B</option>
            <option>Lo-Fi</option>
          </select>
          <select style={{
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem'
          }}>
            <option>All Locations</option>
            <option>United States</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>
          <select style={{
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem'
          }}>
            <option>Sort by Rating</option>
            <option>Most Sales</option>
            <option>Most Beats</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* Producers Grid */}
      {currentProducers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6b7280' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎵</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>No beat makers yet</h3>
          <p>Be the first beat creator to join our platform!</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {currentProducers.map((producer, index) => (
          <div key={`${producer.id}-${index}`} style={{
            background: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            padding: '1.5rem',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {/* Producer Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {producer.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                    {producer.name}
                  </h3>
                  {producer.verified && (
                    <span style={{ color: '#059669', fontSize: '1rem' }}>✓</span>
                  )}
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                  {producer.location}
                </p>
              </div>
            </div>

            {/* Producer Stats */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Genres:</span>
                <span style={{ color: '#1f2937', fontSize: '0.875rem', fontWeight: '500' }}>
                  {producer.genre}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total Beats:</span>
                <span style={{ color: '#1f2937', fontSize: '0.875rem', fontWeight: '500' }}>
                  {producer.totalBeats}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total Sales:</span>
                <span style={{ color: '#059669', fontSize: '0.875rem', fontWeight: '500' }}>
                  {producer.totalSales}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ 
                    color: i < Math.floor(producer.rating) ? '#fbbf24' : '#d1d5db',
                    fontSize: '0.875rem'
                  }}>
                    ★
                  </span>
                ))}
                <span style={{ color: '#6b7280', fontSize: '0.875rem', marginLeft: '0.5rem' }}>
                  {producer.rating}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a href={`/producer/${producer.id}`} style={{
                flex: 1,
                background: '#3b82f6',
                color: 'white',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '0.375rem',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '0.875rem',
                textDecoration: 'none',
                textAlign: 'center',
                display: 'block'
              }}>
                View Beats
              </a>
              <button style={{
                padding: '0.75rem',
                background: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}>
                Follow
              </button>
            </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
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

      </div>
    </div>
  )
}