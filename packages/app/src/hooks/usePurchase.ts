'use client'

import { useState } from 'react'
import { useContract } from './useContract'
import { useAuth } from '@/context/AuthContext'
import { Beat } from '@/types'

interface PurchaseOptions {
  licenseType: 'basic' | 'premium' | 'exclusive'
  paymentMethod: 'crypto' | 'card'
}

export function usePurchase() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { buyBeat, isPending, isConfirming, isConfirmed, hash } = useContract()

  const purchaseBeat = async (beat: Beat, options: PurchaseOptions) => {
    if (!user) {
      throw new Error('User must be authenticated')
    }

    setLoading(true)
    setError(null)

    try {
      if (options.paymentMethod === 'crypto') {
        // Web3 purchase flow
        const licenseMultiplier = {
          basic: 1,
          premium: 3,
          exclusive: 10
        }[options.licenseType]

        const totalPrice = beat.price * licenseMultiplier
        const priceInEth = totalPrice / 1000 // Convert USD to ETH (mock rate)

        if (beat.isNFT && beat.tokenId) {
          // Purchase existing NFT
          await buyBeat(beat.tokenId, priceInEth)
        } else {
          // For non-NFT beats, simulate purchase
          console.log('Purchasing non-NFT beat:', {
            beatId: beat.id,
            price: totalPrice,
            license: options.licenseType
          })
        }
      } else {
        // Card payment flow (mock)
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log('Card payment processed:', {
          beatId: beat.id,
          license: options.licenseType,
          amount: beat.price
        })
      }

      return {
        success: true,
        transactionHash: hash,
        beatId: beat.id,
        licenseType: options.licenseType
      }
    } catch (err: any) {
      setError(err.message || 'Purchase failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const mintAndSell = async (beat: Beat, priceInEth: number, royaltyPercentage: number = 5) => {
    if (!user) {
      throw new Error('User must be authenticated')
    }

    setLoading(true)
    setError(null)

    try {
      // Mock IPFS metadata upload
      const metadata = {
        name: beat.title,
        description: beat.description,
        image: beat.coverImageUrl,
        audio: beat.audioUrl,
        attributes: [
          { trait_type: 'Genre', value: beat.genre },
          { trait_type: 'BPM', value: beat.bpm },
          { trait_type: 'Key', value: beat.key },
          { trait_type: 'Producer', value: beat.producerId }
        ]
      }

      const metadataUri = `ipfs://mock-hash-${beat.id}`
      
      // Mint NFT with royalties
      // Note: This would need the user's wallet address
      const mockWalletAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
      
      console.log('Minting NFT:', {
        to: mockWalletAddress,
        metadataUri,
        royaltyRecipient: mockWalletAddress,
        royaltyPercentage
      })

      // In real implementation, would call mintBeat function
      // await mintBeat(mockWalletAddress, metadataUri, mockWalletAddress, royaltyPercentage)

      return {
        success: true,
        tokenId: Math.floor(Math.random() * 10000), // Mock token ID
        metadataUri,
        transactionHash: hash
      }
    } catch (err: any) {
      setError(err.message || 'Minting failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    purchaseBeat,
    mintAndSell,
    loading: loading || isPending || isConfirming,
    error,
    isConfirmed,
    transactionHash: hash
  }
}