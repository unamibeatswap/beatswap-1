'use client'

export default function MarketplacePage() {
  const mockBeats = [
    {
      id: '1',
      title: 'Dark Trap Beat',
      price: 29.99,
      genre: 'Trap',
      bpm: 140,
      producer: 'BeatMaker Pro'
    },
    {
      id: '2', 
      title: 'Melodic Hip Hop',
      price: 24.99,
      genre: 'Hip Hop',
      bpm: 85,
      producer: 'Sound Wave'
    },
    {
      id: '3',
      title: 'Future Bass Drop',
      price: 34.99,
      genre: 'Electronic',
      bpm: 128,
      producer: 'Synth Master'
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
          Marketplace
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          Discover and purchase beats from talented producers worldwide
        </p>
      </div>

      {/* Search and Filters */}
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
            placeholder="Search beats..."
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
            <option>Amapiano</option>
            <option>Afrobeats</option>
            <option>Hip Hop</option>
            <option>Trap</option>
            <option>House</option>
            <option>Deep House</option>
            <option>Tech House</option>
            <option>Electronic</option>
            <option>Drill</option>
            <option>Gqom</option>
            <option>Kwaito</option>
            <option>R&B</option>
            <option>Pop</option>
            <option>Techno</option>
            <option>Trance</option>
          </select>
          <select style={{
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem'
          }}>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>

      {/* Beats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {mockBeats.map(beat => (
          <div key={beat.id} style={{
            background: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}>
            {/* Beat Cover */}
            <div style={{
              height: '200px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600'
            }}>
              🎵 {beat.title}
            </div>

            {/* Beat Info */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                    {beat.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    by {beat.producer}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      background: '#dbeafe',
                      color: '#1e40af',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      Basic License
                    </span>
                    <span style={{
                      background: '#f0fdf4',
                      color: '#166534',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      Commercial Use
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                    ${beat.price}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <span>{beat.genre}</span>
                <span>•</span>
                <span>{beat.bpm} BPM</span>
              </div>

              {/* Audio Player Placeholder */}
              <div style={{
                background: '#f3f4f6',
                padding: '1rem',
                borderRadius: '0.375rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <button style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '2rem',
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>
                  ▶
                </button>
                <div style={{ flex: 1, height: '4px', background: '#d1d5db', borderRadius: '2px' }}>
                  <div style={{ width: '30%', height: '100%', background: '#3b82f6', borderRadius: '2px' }}></div>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>0:30 / 2:15</span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => alert(`Purchasing ${beat.title} for $${beat.price}`)}
                  style={{
                    flex: 1,
                    background: '#3b82f6',
                    color: 'white',
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Purchase Beat
                </button>
                <button 
                  onClick={() => alert('Added to favorites!')}
                  style={{
                    padding: '0.75rem',
                    background: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  ♡
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Development Notice */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '0.5rem',
        color: '#92400e'
      }}>
        <p style={{ fontSize: '0.875rem' }}>
          <strong>Development Mode:</strong> This is a working demo with mock data. 
          Real Firebase authentication and Firestore database are configured and ready.
        </p>
      </div>
    </div>
  )
}