'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { useAuth } from './useAuth'
import { useFirestore } from './useFirestore'

interface PurchaseData {
  beatId: string
  price: number
  licenseType: 'basic' | 'premium' | 'exclusive'
  producerId: string
}

export function usePayments() {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { address } = useAccount()
  const { user } = useAuth()
  const { addPurchase } = useFirestore()
  const { writeContract, data: hash } = useWriteContract()
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash })

  // Crypto payment for beats (Web3)
  const purchaseWithCrypto = async (purchaseData: PurchaseData) => {
    if (!address || !user) throw new Error('Must be connected and logged in')
    
    setProcessing(true)
    setError(null)

    try {
      // Send payment to producer's wallet
      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: [
          {
            name: 'purchaseBeat',
            type: 'function',
            inputs: [
              { name: 'beatId', type: 'uint256' },
              { name: 'producer', type: 'address' }
            ],
            outputs: [],
            stateMutability: 'payable'
          }
        ],
        functionName: 'purchaseBeat',
        args: [BigInt(purchaseData.beatId), purchaseData.producerId as `0x${string}`],
        value: parseEther(purchaseData.price.toString())
      })

      // Record purchase in Firestore
      await addPurchase({
        beatId: purchaseData.beatId,
        buyerId: user.uid,
        producerId: purchaseData.producerId,
        price: purchaseData.price,
        licenseType: purchaseData.licenseType,
        paymentMethod: 'crypto',
        transactionHash: hash,
        status: 'completed',
        purchasedAt: new Date()
      })

      return { success: true, transactionHash: hash }
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setProcessing(false)
    }
  }

  // Fiat payment for beats (Stripe/PayPal)
  const purchaseWithFiat = async (purchaseData: PurchaseData) => {
    if (!user) throw new Error('Must be logged in')
    
    setProcessing(true)
    setError(null)

    try {
      // In production, integrate with Stripe/PayPal
      // For now, simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Record purchase in Firestore
      await addPurchase({
        beatId: purchaseData.beatId,
        buyerId: user.uid,
        producerId: purchaseData.producerId,
        price: purchaseData.price,
        licenseType: purchaseData.licenseType,
        paymentMethod: 'fiat',
        status: 'completed',
        purchasedAt: new Date()
      })

      return { success: true, paymentId: `pay_${Date.now()}` }
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setProcessing(false)
    }
  }

  // Subscription payment (for premium features)
  const createSubscription = async (plan: 'basic' | 'pro' | 'enterprise') => {
    if (!user) throw new Error('Must be logged in')
    
    setProcessing(true)
    setError(null)

    try {
      // In production, integrate with Stripe subscriptions
      const subscriptionData = {
        userId: user.uid,
        plan,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        price: plan === 'basic' ? 9.99 : plan === 'pro' ? 29.99 : 99.99
      }

      // Store subscription in Firestore
      // await addSubscription(subscriptionData)

      return { success: true, subscription: subscriptionData }
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setProcessing(false)
    }
  }

  return {
    processing: processing || isConfirming,
    error,
    purchaseWithCrypto,
    purchaseWithFiat,
    createSubscription
  }
}