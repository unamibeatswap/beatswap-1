'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

export interface BeatNFTBalance {
  credits: number
  hasProNFT: boolean
  totalUsed: number
}

export function useBeatNFT() {
  const [balance, setBalance] = useState<BeatNFTBalance>({
    credits: 10, // Default free credits
    hasProNFT: false,
    totalUsed: 0
  })
  const [loading, setLoading] = useState(false)
  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected && address) {
      loadBalance()
    }
  }, [address, isConnected])

  const loadBalance = async () => {
    if (!address) return

    try {
      setLoading(true)
      
      // Load from localStorage (temporary until smart contract integration)
      const stored = localStorage.getItem(`beatnft_balance_${address}`)
      if (stored) {
        const balanceData = JSON.parse(stored)
        setBalance(balanceData)
      } else {
        // New user gets 10 free credits
        const newBalance = {
          credits: 10,
          hasProNFT: false,
          totalUsed: 0
        }
        localStorage.setItem(`beatnft_balance_${address}`, JSON.stringify(newBalance))
        setBalance(newBalance)
      }
    } catch (error) {
      console.error('Failed to load BeatNFT balance:', error)
    } finally {
      setLoading(false)
    }
  }

  const canUpload = (fileType: string): { allowed: boolean; cost: number; reason?: string } => {
    const costs = {
      'mp3': 1,
      'wav': 2,
      'zip': 3
    }
    
    const cost = costs[fileType as keyof typeof costs] || 1
    
    if (balance.hasProNFT) {
      return { allowed: true, cost: 0 }
    }
    
    if (balance.credits >= cost) {
      return { allowed: true, cost }
    }
    
    return { 
      allowed: false, 
      cost, 
      reason: `Need ${cost} BeatNFT credits. You have ${balance.credits}.`
    }
  }

  const useCredits = async (amount: number): Promise<boolean> => {
    if (!address || balance.hasProNFT) return true
    
    if (balance.credits < amount) return false
    
    try {
      const newBalance = {
        ...balance,
        credits: balance.credits - amount,
        totalUsed: balance.totalUsed + amount
      }
      
      localStorage.setItem(`beatnft_balance_${address}`, JSON.stringify(newBalance))
      setBalance(newBalance)
      return true
    } catch (error) {
      console.error('Failed to use credits:', error)
      return false
    }
  }

  const buyCredits = async (amount: number): Promise<boolean> => {
    // Mock purchase for now
    try {
      const newBalance = {
        ...balance,
        credits: balance.credits + amount
      }
      
      localStorage.setItem(`beatnft_balance_${address}`, JSON.stringify(newBalance))
      setBalance(newBalance)
      return true
    } catch (error) {
      console.error('Failed to buy credits:', error)
      return false
    }
  }

  const upgradeToProNFT = async (): Promise<boolean> => {
    // Mock upgrade for now
    try {
      const newBalance = {
        ...balance,
        hasProNFT: true
      }
      
      localStorage.setItem(`beatnft_balance_${address}`, JSON.stringify(newBalance))
      setBalance(newBalance)
      return true
    } catch (error) {
      console.error('Failed to upgrade to Pro NFT:', error)
      return false
    }
  }

  return {
    balance,
    loading,
    canUpload,
    useCredits,
    buyCredits,
    upgradeToProNFT,
    isConnected: isConnected && !!address
  }
}