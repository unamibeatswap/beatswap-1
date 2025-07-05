'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { BeatNFTCreditSystemAbi, BeatNFTCreditSystemAddress } from '@/contracts/BeatNFTCreditSystem'
import { parseEther } from 'viem'

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
    if (!address || typeof window === 'undefined') return

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
    if (!address || balance.hasProNFT || typeof window === 'undefined') return true
    
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

  const { writeContract } = useWriteContract()
  
  const buyCredits = async (amount: number): Promise<boolean> => {
    if (!address) return false
    
    try {
      // Calculate cost: 10 credits = 0.01 ETH, 25 credits = 0.02 ETH, 50 credits = 0.035 ETH
      let cost = 0.001 * amount // Base rate
      if (amount >= 50) cost = 0.035
      else if (amount >= 25) cost = 0.02
      else if (amount >= 10) cost = 0.01
      
      await writeContract({
        address: BeatNFTCreditSystemAddress[1] as `0x${string}`,
        abi: BeatNFTCreditSystemAbi,
        functionName: 'purchaseCredits',
        args: [BigInt(amount)],
        value: parseEther(cost.toString())
      })
      
      // Update local storage for immediate UI feedback
      if (typeof window !== 'undefined') {
        const newBalance = {
          ...balance,
          credits: balance.credits + amount
        }
        localStorage.setItem(`beatnft_balance_${address}`, JSON.stringify(newBalance))
        setBalance(newBalance)
      }
      return true
    } catch (error) {
      console.error('Failed to buy credits:', error)
      return false
    }
  }

  const upgradeToProNFT = async (): Promise<boolean> => {
    if (!address) return false
    
    try {
      await writeContract({
        address: BeatNFTCreditSystemAddress[1] as `0x${string}`,
        abi: BeatNFTCreditSystemAbi,
        functionName: 'upgradeToProNFT',
        args: [],
        value: parseEther('0.1') // 0.1 ETH for Pro NFT
      })
      
      // Update local storage for immediate UI feedback
      if (typeof window !== 'undefined') {
        const newBalance = {
          ...balance,
          hasProNFT: true
        }
        localStorage.setItem(`beatnft_balance_${address}`, JSON.stringify(newBalance))
        setBalance(newBalance)
      }
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