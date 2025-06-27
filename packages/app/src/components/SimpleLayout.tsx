'use client'

import React, { PropsWithChildren } from 'react'
import NotificationCenter from './NotificationCenter'
import ToastProvider from './ToastProvider'

export function SimpleLayout(props: PropsWithChildren) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Simple Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
          BeatSwap
        </div>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</a>
          <a href="/marketplace" style={{ color: '#6b7280', textDecoration: 'none' }}>Marketplace</a>
          <a href="/producers" style={{ color: '#6b7280', textDecoration: 'none' }}>Producers</a>
          <a href="/dashboard" style={{ color: '#6b7280', textDecoration: 'none' }}>Dashboard</a>
          <a href="/profile" style={{ color: '#6b7280', textDecoration: 'none' }}>Profile</a>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <NotificationCenter />
            <button 
              style={{
                background: 'white',
                color: '#3b82f6',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: '1px solid #3b82f6',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              onClick={() => alert('Sign In - Firebase Auth Ready')}
            >
              Sign In
            </button>
            <button 
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              onClick={() => alert('Connect Wallet - Web3 Ready')}
            >
              Connect Wallet
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {props.children}
      </main>
      
      <ToastProvider />

      {/* Simple Footer */}
      <footer style={{
        background: '#f9fafb',
        padding: '2rem',
        textAlign: 'center',
        color: '#6b7280',
        borderTop: '1px solid #e5e7eb'
      }}>
        <p>&copy; 2024 BeatSwap. The future of music ownership.</p>
      </footer>
    </div>
  )
}