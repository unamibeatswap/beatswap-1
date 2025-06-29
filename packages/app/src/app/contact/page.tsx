'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    walletAddress: '',
    subject: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      // Send email via API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'info@unamifoundation.org'
        })
      })
      
      if (response.ok) {
        alert('Message sent successfully! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', walletAddress: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Failed to send message. Please try again or contact us directly at info@unamifoundation.org')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Contact BeatsChain
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
          Get in touch with our team for support, partnerships, or general inquiries
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
        {/* Contact Info */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1f2937' }}>
            Get in Touch
          </h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
              Admin Contact
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
              <strong>Bhekithemba Simelane (Uncle Smesh)</strong>
            </p>
            <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
              Platform Administrator
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
              Address
            </h3>
            <p style={{ color: '#6b7280' }}>
              1033 Section 1<br/>
              Madadeni, 2951<br/>
              South Africa
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
              Platform Info
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
              Blockchain: Ethereum Network
            </p>
            <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
              Smart Contracts: Verified & Audited
            </p>
            <p style={{ color: '#6b7280' }}>
              Support: 24/7 Community Discord
            </p>
          </div>
        </div>

        {/* Web3 Contact Form */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1f2937' }}>
            Web3 Contact Form
          </h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Wallet Address (Optional)
              </label>
              <input
                type="text"
                value={formData.walletAddress}
                onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                placeholder="0x..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Subject *
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              >
                <option value="">Select a subject</option>
                <option value="producer-support">Producer Support</option>
                <option value="buyer-support">Buyer Support</option>
                <option value="technical-issue">Technical Issue</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="media-press">Media & Press</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                background: submitting ? '#9ca3af' : '#3b82f6',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '0.375rem',
                fontWeight: '600',
                cursor: submitting ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem'
              }}
            >
              {submitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* Additional Info */}
      <div style={{
        background: '#f0f9ff',
        padding: '2rem',
        borderRadius: '0.5rem',
        border: '1px solid #0ea5e9'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#0c4a6e' }}>
          Web3 Platform Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', color: '#0c4a6e' }}>
          <div>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <strong>Blockchain:</strong> Ethereum Mainnet
            </p>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <strong>Token Standard:</strong> ERC-721 (NFTs)
            </p>
            <p style={{ fontSize: '0.875rem' }}>
              <strong>Payment Methods:</strong> ETH, USDC, Credit Card
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <strong>Smart Contract:</strong> Verified & Open Source
            </p>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <strong>Royalties:</strong> Automatic Distribution
            </p>
            <p style={{ fontSize: '0.875rem' }}>
              <strong>Security:</strong> Multi-sig Protected
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}