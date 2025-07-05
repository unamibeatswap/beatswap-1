export default function GuidePage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
        BeatsChain User Guide
      </h1>
      
      <div style={{ fontSize: '1rem', lineHeight: '1.7', color: '#374151' }}>
        
        {/* Getting Started */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            🚀 Getting Started
          </h2>
          <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e40af' }}>
              1. Connect Your Wallet
            </h3>
            <p>Connect your Web3 wallet (MetaMask, WalletConnect) to start using BeatsChain. Your wallet is your identity on the platform.</p>
          </div>
          
          <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#059669' }}>
              2. Get Free BeatNFT Credits
            </h3>
            <p>New users receive 10 free BeatNFT credits to start uploading beats. Each credit allows specific upload types.</p>
          </div>
        </section>

        {/* For Producers */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            🎵 For Beat Producers
          </h2>
          
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Upload Credits System
          </h3>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>MP3 uploads:</strong> 1 BeatNFT credit (preview/demo quality)</li>
            <li><strong>WAV uploads:</strong> 2 BeatNFT credits (studio-ready quality)</li>
            <li><strong>ZIP packages:</strong> 3-5 BeatNFT credits (stems/trackouts)</li>
            <li><strong>Pro NFT:</strong> Unlimited uploads (0.1 ETH one-time)</li>
          </ul>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Beat Upload Process
          </h3>
          <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>Go to Upload page and drag/drop your audio file</li>
            <li>Add beat details: title, <strong>stage name</strong>, genre, BPM, key</li>
            <li>Set your price in ETH (automatically converts to ZAR)</li>
            <li>Add cover image (optional but recommended)</li>
            <li>Add tags for better discoverability</li>
            <li>Submit - credits are deducted automatically</li>
          </ol>

          <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <p><strong>💡 Pro Tip:</strong> Always include your stage name - it appears on all your beats and helps build your brand identity.</p>
          </div>
        </section>

        {/* Preview System */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            🎧 Preview & Access System
          </h2>
          
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Preview Options
          </h3>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>30-second previews:</strong> Free for all users to discover beats</li>
            <li><strong>Full beat streaming:</strong> Available with Listen Credits or passes</li>
            <li><strong>Stem previews:</strong> Individual layers (drums, melody, bass, vocals)</li>
            <li><strong>Interactive stem player:</strong> Toggle layers on/off during preview</li>
          </ul>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Stem Package Previews
          </h3>
          <p style={{ marginBottom: '1rem' }}>
            ZIP packages containing stems offer enhanced preview options:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>Individual stem previews (15 seconds each)</li>
            <li>Layered preview system (progressive reveals)</li>
            <li>Interactive mixing during preview</li>
            <li>Full stems access requires purchase or credits</li>
          </ul>
        </section>

        {/* For Buyers */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            🛒 For Beat Buyers
          </h2>
          
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Purchasing Beats
          </h3>
          <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>Browse beats using search and filters</li>
            <li>Preview beats (30 seconds free)</li>
            <li>Check producer stage name and credentials</li>
            <li>Purchase with ETH - instant NFT ownership</li>
            <li>Download full files from your library</li>
            <li>Producer receives automatic royalties on resales</li>
          </ol>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            What You Get
          </h3>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>NFT Ownership:</strong> Blockchain-verified ownership certificate</li>
            <li><strong>Usage Rights:</strong> Commercial use according to license terms</li>
            <li><strong>Full Files:</strong> High-quality audio files for production</li>
            <li><strong>Stems (if included):</strong> Individual track layers for mixing</li>
            <li><strong>Resale Rights:</strong> Can resell NFT with automatic royalties to producer</li>
          </ul>
        </section>

        {/* Credit System */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            🎫 BeatNFT Credit System
          </h2>
          
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Credit Packages
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem' }}>
              <h4 style={{ fontWeight: '600', color: '#1f2937' }}>10 Credits</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>0.01 ETH (~R180)</p>
            </div>
            <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem' }}>
              <h4 style={{ fontWeight: '600', color: '#1f2937' }}>25 Credits</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>0.02 ETH (~R360)</p>
            </div>
            <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem' }}>
              <h4 style={{ fontWeight: '600', color: '#1f2937' }}>50 Credits</h4>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>0.035 ETH (~R630)</p>
            </div>
            <div style={{ background: '#ddd6fe', padding: '1rem', borderRadius: '0.5rem' }}>
              <h4 style={{ fontWeight: '600', color: '#5b21b6' }}>Pro NFT</h4>
              <p style={{ fontSize: '0.875rem', color: '#7c3aed' }}>0.1 ETH (~R1800) - Unlimited</p>
            </div>
          </div>

          <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <p><strong>⚠️ Important:</strong> Credits are consumed upon successful upload. Failed uploads don't consume credits.</p>
          </div>
        </section>

        {/* Stage Names */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            🎤 Stage Names & Branding
          </h2>
          
          <p style={{ marginBottom: '1rem' }}>
            Your stage name is your artistic identity on BeatsChain. It appears on all your beats and helps build recognition.
          </p>
          
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Best Practices
          </h3>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>Use a consistent stage name across all uploads</li>
            <li>Keep it memorable and easy to spell</li>
            <li>Consider trademark implications for commercial use</li>
            <li>Update your profile with bio and social links</li>
            <li>Stage names appear in NFT metadata permanently</li>
          </ul>
        </section>

        {/* Troubleshooting */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            🔧 Troubleshooting
          </h2>
          
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Common Issues
          </h3>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Upload failed:</strong> Check file format (MP3, WAV, ZIP) and size limits</li>
            <li><strong>Insufficient credits:</strong> Purchase more BeatNFT credits or upgrade to Pro NFT</li>
            <li><strong>Preview not playing:</strong> Check browser audio permissions and file format</li>
            <li><strong>Wallet connection issues:</strong> Refresh page and reconnect wallet</li>
            <li><strong>Transaction failed:</strong> Check ETH balance for gas fees</li>
          </ul>

          <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '0.5rem' }}>
            <p><strong>💬 Need Help?</strong> Contact support through the platform or join our community Discord for assistance.</p>
          </div>
        </section>

        <div style={{ background: '#f9fafb', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
            Ready to Start?
          </h3>
          <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
            Connect your wallet and get your free BeatNFT credits to begin your journey on BeatsChain.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/upload"
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              🎵 Upload Beat
            </a>
            <a
              href="/beatnfts"
              style={{
                background: '#10b981',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              🎧 Browse Beats
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}