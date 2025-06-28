'use client'

import { useState } from 'react'

export default function ProducersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const producersPerPage = 12

  const mockProducers = [
    {
      id: '1',
      name: 'Beat Master Pro',
      avatar: '🎵',
      genre: 'Trap, Hip Hop',
      totalBeats: 45,
      totalSales: 234,
      rating: 4.8,
      verified: true,
      location: 'Atlanta, GA'
    },
    {
      id: '2', 
      name: 'Synth Wave',
      avatar: '🎹',
      genre: 'Electronic, Future Bass',
      totalBeats: 32,
      totalSales: 156,
      rating: 4.6,
      verified: true,
      location: 'Los Angeles, CA'
    },
    {
      id: '3',
      name: 'Melody Maker',
      avatar: '🎼',
      genre: 'R&B, Soul',
      totalBeats: 28,
      totalSales: 89,
      rating: 4.9,
      verified: false,
      location: 'Nashville, TN'
    },
    {
      id: '4',
      name: 'Bass Drop King',
      avatar: '🔊',
      genre: 'Dubstep, EDM',
      totalBeats: 67,
      totalSales: 445,
      rating: 4.7,
      verified: true,
      location: 'Miami, FL'
    },
    {
      id: '5',
      name: 'Lo-Fi Dreams',
      avatar: '🌙',
      genre: 'Lo-Fi, Chill',
      totalBeats: 89,
      totalSales: 678,
      rating: 4.9,
      verified: true,
      location: 'Portland, OR'
    },
    {
      id: '6',
      name: 'Drill Sergeant',
      avatar: '⚡',
      genre: 'Drill, UK Drill',
      totalBeats: 23,
      totalSales: 123,
      rating: 4.5,
      verified: false,
      location: 'Chicago, IL'
    }
  ]

  // Duplicate for pagination demo
  const allProducers = [...mockProducers, ...mockProducers, ...mockProducers]
  const totalPages = Math.ceil(allProducers.length / producersPerPage)
  const startIndex = (currentPage - 1) * producersPerPage
  const currentProducers = allProducers.slice(startIndex, startIndex + producersPerPage)

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
          Featured Producers
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          Discover talented music producers from around the world
        </p>
      </div>

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
                {producer.avatar}
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

      {/* Development Notice */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#f0f9ff',
        border: '1px solid #0ea5e9',
        borderRadius: '0.5rem',
        color: '#0c4a6e'
      }}>
        <p style={{ fontSize: '0.875rem', margin: 0 }}>
          <strong>Producers Directory:</strong> Full pagination system implemented. 
          Sanity CMS can manage producer profiles, or use Firestore for dynamic content.
        </p>
      </div>
    </div>
  )
}