'use client'

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        color: '#1f2937',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            🚀 How BeatsChain Works
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Your complete guide to buying, selling, and owning beats as NFTs
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(31,41,55,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(31,41,55,0.2)' }}>
              🎵 Create & Upload
            </div>
            <div style={{ background: 'rgba(31,41,55,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(31,41,55,0.2)' }}>
              💰 Earn Royalties
            </div>
            <div style={{ background: 'rgba(31,41,55,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(31,41,55,0.2)' }}>
              🔒 True Ownership
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* How It Works Steps */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#1f2937' }}>
            Simple 4-Step Process
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                step: '1',
                icon: '🎵',
                title: 'Create Your Beat',
                description: 'Produce your beat using any DAW. Export as high-quality MP3 or WAV file.',
                details: ['Use FL Studio, Ableton, Logic Pro', 'Export at 320kbps or higher', 'Add cover artwork (optional)']
              },
              {
                step: '2',
                icon: '📤',
                title: 'Upload & Set Price',
                description: 'Upload your beat, add metadata, and set your price in South African Rand.',
                details: ['Add title, genre, BPM, key', 'Set competitive pricing', 'Choose license types']
              },
              {
                step: '3',
                icon: '🛒',
                title: 'Artists Discover & Buy',
                description: 'Artists browse the marketplace and purchase beats with crypto or card payments.',
                details: ['Global marketplace exposure', 'Instant payments', 'Multiple license options']
              },
              {
                step: '4',
                icon: '💎',
                title: 'Earn Forever',
                description: 'Receive automatic royalties on every resale through smart contracts.',
                details: ['Blockchain-verified ownership', 'Automatic royalty distribution', 'Transparent earnings']
              }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '20px',
                  background: '#3b82f6',
                  color: 'white',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}>
                  {item.step}
                </div>
                
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  {item.description}
                </p>
                <ul style={{ textAlign: 'left', color: '#6b7280', fontSize: '0.875rem' }}>
                  {item.details.map((detail, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#10b981' }}>✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <div style={{ textAlign: 'center', background: '#1f2937', color: 'white', padding: '3rem', borderRadius: '1rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            Join the future of music ownership and start earning today
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/dashboard"
              style={{
                background: '#fbbf24',
                color: '#1f2937',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.125rem'
              }}
            >
              🎵 Start Selling Beats
            </a>
            <a
              href="/marketplace"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.125rem',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              🛒 Browse Marketplace
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}