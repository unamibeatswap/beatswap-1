'use client'

import { useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useAuth } from '@/context/AuthContext'

export function useSIWE() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { updateProfile } = useAuth()

  const signInWithEthereum = async () => {
    if (!address || !isConnected) {
      setError('Please connect your wallet first')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to BeatsChain with Ethereum',
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce: Math.random().toString(36).substring(7)
      })

      const messageString = message.prepareMessage()
      
      // Sign the message
      const signature = await signMessageAsync({
        message: messageString
      })

      // Verify signature (in production, verify on backend)
      const verified = await message.verify({ signature })
      
      if (verified.success) {
        // Link wallet to user profile
        await updateProfile({ walletAddress: address })
        return { success: true, address }
      } else {
        throw new Error('Signature verification failed')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Ethereum')
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    signInWithEthereum,
    loading,
    error,
    isConnected,
    address
  }
}