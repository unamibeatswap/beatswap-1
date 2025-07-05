'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePublicClient, useAccount } from 'wagmi'
import { parseAbiItem } from 'viem'
import { Beat } from '@/types'

interface Web3DataContextType {
  beats: Beat[]
  loading: boolean
  error: string | null
  refreshBeats: () => Promise<void>
  getBeatsByProducer: (producerId: string) => Beat[]
}

const Web3DataContext = createContext<Web3DataContextType | undefined>(undefined)

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export function Web3DataProvider({ children }: { children: ReactNode }) {
  const [beats, setBeats] = useState<Beat[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  const publicClient = usePublicClient()
  const { address } = useAccount()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Prevent execution during build or SSR
  if (!mounted) {
    return (
      <Web3DataContext.Provider value={{
        beats: [],
        loading: false,
        error: null,
        refreshBeats: async () => {},
        getBeatsByProducer: () => []
      }}>
        {children}
      </Web3DataContext.Provider>
    )
  }

  const refreshBeats = async () => {
    if (!mounted || !publicClient || !CONTRACT_ADDRESS) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Get BeatMinted events from contract
      const logs = await publicClient.getLogs({
        address: CONTRACT_ADDRESS,
        event: parseAbiItem('event BeatMinted(uint256 indexed tokenId, address indexed producer, uint256 price)'),
        fromBlock: 'earliest'
      })

      // Process events into beats
      const processedBeats: Beat[] = []
      
      for (const log of logs) {
        try {
          // Get token URI for metadata
          const tokenURI = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: [
              {
                name: 'tokenURI',
                type: 'function',
                stateMutability: 'view',
                inputs: [{ name: 'tokenId', type: 'uint256' }],
                outputs: [{ name: '', type: 'string' }]
              }
            ],
            functionName: 'tokenURI',
            args: [log.args.tokenId!]
          })

          // Fetch metadata from IPFS
          if (tokenURI) {
            const metadataResponse = await fetch(tokenURI as string)
            const metadata = await metadataResponse.json()
            
            const beat: Beat = {
              id: log.args.tokenId!.toString(),
              title: metadata.name,
              description: metadata.description,
              producerId: log.args.producer!,
              audioUrl: metadata.audio,
              coverImageUrl: metadata.image,
              price: Number(log.args.price!) / 1e18, // Convert from wei
              genre: metadata.attributes?.find((attr: any) => attr.trait_type === 'Genre')?.value || 'Unknown',
              bpm: metadata.attributes?.find((attr: any) => attr.trait_type === 'BPM')?.value || 120,
              key: metadata.attributes?.find((attr: any) => attr.trait_type === 'Key')?.value || 'C',
              tags: metadata.attributes?.map((attr: any) => attr.value).filter(Boolean) || [],
              isNFT: true,
              tokenId: Number(log.args.tokenId!),
              createdAt: new Date(),
              updatedAt: new Date()
            }
            
            processedBeats.push(beat)
          }
        } catch (err) {
          console.warn('Failed to process beat:', log.args.tokenId, err)
        }
      }
      
      setBeats(processedBeats)
    } catch (err: any) {
      setError(err.message)
      console.error('Failed to fetch beats:', err)
    } finally {
      setLoading(false)
    }
  }

  const getBeatsByProducer = (producerId: string) => {
    return beats.filter(beat => beat.producerId.toLowerCase() === producerId.toLowerCase())
  }

  useEffect(() => {
    if (mounted && publicClient && CONTRACT_ADDRESS) {
      refreshBeats()
    }
  }, [mounted, publicClient, CONTRACT_ADDRESS, address])

  return (
    <Web3DataContext.Provider value={{
      beats,
      loading,
      error,
      refreshBeats,
      getBeatsByProducer
    }}>
      {children}
    </Web3DataContext.Provider>
  )
}

export function useWeb3Data() {
  const context = useContext(Web3DataContext)
  if (!context) {
    throw new Error('useWeb3Data must be used within Web3DataProvider')
  }
  return context
}