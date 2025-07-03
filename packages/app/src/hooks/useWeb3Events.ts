import { useState, useEffect, useCallback } from 'react'
import { useWatchContractEvent } from 'wagmi'
import { EventIndexer, IndexedEvent } from '@/lib/indexing'
import { BEAT_NFT_EVENTS } from '@/utils/web3Events'

export function useWeb3Events(contractAddress?: string) {
  const [events, setEvents] = useState<IndexedEvent[]>([])
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load stored events on mount
  useEffect(() => {
    const storedEvents = EventIndexer.getStoredEvents()
    setEvents(storedEvents)
  }, [])

  const handleNewEvent = useCallback((eventData: any, eventType: string) => {
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
  }, [])

  // Watch for BeatMinted events
  useWatchContractEvent({
    address: contractAddress as `0x${string}`,
    abi: [BEAT_NFT_EVENTS.BeatMinted],
    eventName: 'BeatMinted',
    onLogs: (logs) => {
      logs.forEach(log => handleNewEvent(log, 'mint'))
    },
    enabled: !!contractAddress
  })

  // Watch for BeatPurchased events
  useWatchContractEvent({
    address: contractAddress as `0x${string}`,
    abi: [BEAT_NFT_EVENTS.BeatPurchased],
    eventName: 'BeatPurchased',
    onLogs: (logs) => {
      logs.forEach(log => handleNewEvent(log, 'purchase'))
    },
    enabled: !!contractAddress
  })

  // Watch for Transfer events
  useWatchContractEvent({
    address: contractAddress as `0x${string}`,
    abi: [BEAT_NFT_EVENTS.Transfer],
    eventName: 'Transfer',
    onLogs: (logs) => {
      logs.forEach(log => handleNewEvent(log, 'transfer'))
    },
    enabled: !!contractAddress
  })

  const indexHistoricalEvents = async () => {
    if (!contractAddress) return
    
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
    localStorage.removeItem('web3-events-index')
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