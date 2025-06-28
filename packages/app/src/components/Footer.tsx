import React from 'react'

export function Footer() {
  return (
    <footer style={{
      background: '#1f2937',
      color: 'white',
      padding: '3rem 0 2rem',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }} className="footer-grid">
          {/* Company Info */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>BeatsChain</h3>
            <p style={{ color: '#d1d5db', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Connecting South African producers with global artists through blockchain technology.
            </p>
            <p style={{ color: '#d1d5db', fontSize: '0.875rem' }}>
              1033 Section 1, Madadeni, 2951<br/>
              South Africa
            </p>
          </div>
          
          {/* Platform */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="/marketplace" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Marketplace</a>
              <a href="/producers" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Producers</a>
              <a href="/upload" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Upload Beats</a>
              <a href="/dashboard" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Dashboard</a>
            </div>
          </div>
          
          {/* Resources */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="/blog" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Blog</a>
              <a href="/api/rss" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>RSS Feed</a>
              <a href="/contact" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Contact</a>
              <a href="/disclaimer" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Web3 Disclaimer</a>
            </div>
          </div>
          
          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="/terms" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Terms of Use</a>
              <a href="/privacy" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Privacy Policy</a>
              <a href="/disclaimer" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Risk Disclaimer</a>
              <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>POPIA Compliant</span>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', flexDirection: 'column' }} className="footer-bottom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#d1d5db' }}>
              &copy; 2025 BeatsChain. Powered by Ethereum blockchain.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>
              <span>🇿🇦 Made in South Africa</span>
              <span>•</span>
              <span>⛓️ Web3 Native</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }} className="social-links">
            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Follow us:</span>
            <a href="https://twitter.com/beatschain" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Twitter</a>
            <a href="https://discord.gg/beatschain" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Discord</a>
            <a href="https://instagram.com/beatschain" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>Instagram</a>
          </div>
        </div>
        
        {/* Compliance Notice */}
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#374151', borderRadius: '0.375rem' }}>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#d1d5db', textAlign: 'center' }}>
            ⚠️ Cryptocurrency trading involves risk. BeatsChain is not a financial advisor. 
            Users must comply with local regulations including SARB and FICA requirements. 
            Only invest what you can afford to lose.
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row !important;
          }
          .social-links {
            justify-content: flex-end !important;
          }
        }
      `}</style>
    </footer>
  )
}
