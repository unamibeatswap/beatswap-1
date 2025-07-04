'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'

interface SIWEUser {
  address: string
  chainId: number
  isVerified: boolean
  nonce?: string
}

interface SIWEContextType {
  user: SIWEUser | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

const SIWEContext = createContext<SIWEContextType | undefined>(undefined)

export function SIWEProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SIWEUser | null>(null)
  const [loading, setLoading] = useState(false)
  const { address, chainId, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()

  const signIn = async () => {
    if (!address || !chainId) return
    
    setLoading(true)
    try {
      // Get nonce from server
      const nonceRes = await fetch('/api/auth/nonce')
      const { nonce } = await nonceRes.json()

      // Create SIWE message with dynamic import
      const { SiweMessage } = await import('siwe')
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to BeatsChain',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce
      })

      // Sign message
      const signature = await signMessageAsync({
        message: message.prepareMessage()
      })

      // Verify signature
      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature })
      })

      if (verifyRes.ok) {
        setUser({
          address,
          chainId,
          isVerified: true,
          nonce
        })
      }
    } catch (error) {
      console.error('SIWE sign in failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setUser(null)
    disconnect()
  }

  useEffect(() => {
    if (!isConnected) {
      setUser(null)
    }
  }, [isConnected])

  return (
    <SIWEContext.Provider value={{
      user,
      loading,
      signIn,
      signOut,
      isAuthenticated: !!user?.isVerified
    }}>
      {children}
    </SIWEContext.Provider>
  )
}

export function useSIWE() {
  const context = useContext(SIWEContext)
  if (!context) {
    throw new Error('useSIWE must be used within SIWEProvider')
  }
  return context
}