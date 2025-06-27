'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'

// BeatNFT Contract ABI (minimal for core functions)
const BEAT_NFT_ABI = [
  {
    "inputs": [
      {"name": "to", "type": "address"},
      {"name": "uri", "type": "string"},
      {"name": "royaltyRecipient", "type": "address"},
      {"name": "royaltyValue", "type": "uint96"}
    ],
    "name": "mintBeat",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "tokenId", "type": "uint256"},
      {"name": "price", "type": "uint256"}
    ],
    "name": "listForSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "buyBeat",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export function useContract() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const mintBeat = async (
    to: string,
    metadataUri: string,
    royaltyRecipient: string,
    royaltyPercentage: number
  ) => {
    const royaltyValue = Math.floor(royaltyPercentage * 100) // Convert to basis points
    
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: BEAT_NFT_ABI,
      functionName: 'mintBeat',
      args: [to as `0x${string}`, metadataUri, royaltyRecipient as `0x${string}`, royaltyValue],
    })
  }

  const listForSale = async (tokenId: number, priceInEth: number) => {
    const price = parseEther(priceInEth.toString())
    
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: BEAT_NFT_ABI,
      functionName: 'listForSale',
      args: [BigInt(tokenId), price],
    })
  }

  const buyBeat = async (tokenId: number, priceInEth: number) => {
    const value = parseEther(priceInEth.toString())
    
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: BEAT_NFT_ABI,
      functionName: 'buyBeat',
      args: [BigInt(tokenId)],
      value,
    })
  }

  return {
    mintBeat,
    listForSale,
    buyBeat,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}

export function useContractRead() {
  const getOwner = (tokenId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: BEAT_NFT_ABI,
      functionName: 'ownerOf',
      args: [BigInt(tokenId)],
    })
  }

  const getTokenURI = (tokenId: number) => {
    return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: BEAT_NFT_ABI,
      functionName: 'tokenURI',
      args: [BigInt(tokenId)],
    })
  }

  return {
    getOwner,
    getTokenURI,
  }
}