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
      // Simulate crypto payment for demo
      await new Promise(resolve => setTimeout(resolve, 2000))
      const mockHash = `0x${Math.random().toString(16).substr(2, 64)}`

      // Record purchase in Firestore
      await addPurchase({
        beatId: purchaseData.beatId,
        buyerId: user.uid,
        producerId: purchaseData.producerId,
        amount: purchaseData.price,
        licenseType: purchaseData.licenseType,
        transactionHash: mockHash
      })

      return { success: true, transactionHash: mockHash }
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setProcessing(false)
    }
  }

  // Fiat payment for beats (PayFast for South Africa)
  const purchaseWithFiat = async (purchaseData: PurchaseData) => {
    if (!user) throw new Error('Must be logged in')
    
    setProcessing(true)
    setError(null)

    try {
      // PayFast integration for South Africa
      const paymentData = {
        merchant_id: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID,
        merchant_key: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY,
        amount: purchaseData.price.toFixed(2),
        item_name: `Beat License - ${purchaseData.licenseType}`,
        return_url: `${window.location.origin}/purchase/success`,
        cancel_url: `${window.location.origin}/purchase/cancel`,
        notify_url: `${window.location.origin}/api/payfast/notify`
      }

      // Redirect to PayFast payment page
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = 'https://sandbox.payfast.co.za/eng/process' // Use www.payfast.co.za for production
      
      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value || ''
        form.appendChild(input)
      })
      
      document.body.appendChild(form)
      form.submit()

      return { success: true, paymentId: `payfast_${Date.now()}` }
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