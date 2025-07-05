'use client'

import { useState, useEffect, useCallback } from 'react'
import { useWatchContractEvent } from 'wagmi'
import { EventIndexer, IndexedEvent } from '@/lib/indexing'
import { BEAT_NFT_EVENTS } from '@/utils/web3Events'

export function useWeb3Events(contractAddress?: string) {
  const [events, setEvents] = useState<IndexedEvent[]>([])
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Load stored events on mount (client-side only)
  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const storedEvents = EventIndexer.getStoredEvents()
      setEvents(storedEvents)
    }
  }, [])

  const handleNewEvent = useCallback((eventData: any, eventType: string) => {
    if (!mounted || typeof window === 'undefined') return
    
    const newEvent: IndexedEvent = {
      id: `${eventType}-${eventData.transactionHash}-${Date.now()}`,
      type: eventType as any,
      tokenId: eventData.args?.tokenId?.toString() || '',
      blockNumber: eventData.blockNumber,
      txHash: eventData.transactionHash,
      timestamp: new Date(),
      data: eventData.args
    }

    setEvents(prev => [newEvent, ...prev.slice(0, 99)])
    EventIndexer.storeEvents([newEvent])
  }, [mounted])

  // Watch for BeatMinted events (client-side only)
  useWatchContractEvent({
    address: contractAddress as `0x${string}`,
    abi: [BEAT_NFT_EVENTS.BeatMinted],
    eventName: 'BeatMinted',
    onLogs: (logs) => {
      logs.forEach(log => handleNewEvent(log, 'mint'))
    },
    enabled: !!contractAddress && mounted
  })

  // Watch for BeatPurchased events (client-side only)
  useWatchContractEvent({
    address: contractAddress as `0x${string}`,
    abi: [BEAT_NFT_EVENTS.BeatPurchased],
    eventName: 'BeatPurchased',
    onLogs: (logs) => {
      logs.forEach(log => handleNewEvent(log, 'purchase'))
    },
    enabled: !!contractAddress && mounted
  })

  // Watch for Transfer events (client-side only)
  useWatchContractEvent({
    address: contractAddress as `0x${string}`,
    abi: [BEAT_NFT_EVENTS.Transfer],
    eventName: 'Transfer',
    onLogs: (logs) => {
      logs.forEach(log => handleNewEvent(log, 'transfer'))
    },
    enabled: !!contractAddress && mounted
  })

  const indexHistoricalEvents = async () => {
    if (!contractAddress || !mounted || typeof window === 'undefined') return
    
    try {
      setError(null)
      await EventIndexer.indexContractEvents(contractAddress)
      const updatedEvents = EventIndexer.getStoredEvents()
      setEvents(updatedEvents)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const getEventsByTokenId = (tokenId: string) => {
    return events.filter(event => event.tokenId === tokenId)
  }

  const getEventsByType = (type: IndexedEvent['type']) => {
    return events.filter(event => event.type === type)
  }

  const clearEvents = () => {
    setEvents([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('web3-events-index')
    }
  }

  useEffect(() => {
    setIsListening(!!contractAddress)
  }, [contractAddress])

  return {
    events,
    isListening,
    error,
    indexHistoricalEvents,
    getEventsByTokenId,
    getEventsByType,
    clearEvents
  }
}