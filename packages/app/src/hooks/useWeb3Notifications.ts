'use client'

import { useState, useEffect } from 'react'
import { useWatchContractEvent, useConfig } from 'wagmi'
import { parseEther } from 'viem'
import { toast } from 'react-toastify'

interface NotificationEvent {
  id: string
  type: 'purchase' | 'sale' | 'mint' | 'transfer'
  title: string
  message: string
  timestamp: Date
  txHash: string
  amount?: string
  beatId?: string
  from?: string
  to?: string
  read?: boolean
}

export function useWeb3Notifications() {
  const [notifications, setNotifications] = useState<NotificationEvent[]>([])
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if we're in a Web3 context
  let hasWeb3Context = true
  let config = null
  try {
    config = useConfig()
    hasWeb3Context = !!config
  } catch (e) {
    hasWeb3Context = false
    setError('Web3 provider not found - notifications will use mock data')
  }

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

  // Only watch contract events if Web3 context is available
  if (hasWeb3Context && contractAddress) {
    // Watch for Beat Purchase events
    useWatchContractEvent({
      address: contractAddress,
      abi: [
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'tokenId', type: 'uint256' },
            { indexed: true, name: 'buyer', type: 'address' },
            { indexed: true, name: 'seller', type: 'address' },
            { indexed: false, name: 'price', type: 'uint256' }
          ],
          name: 'BeatPurchased',
          type: 'event'
        }
      ],
      eventName: 'BeatPurchased',
      onLogs(logs) {
        logs.forEach((log) => {
          const notification: NotificationEvent = {
            id: `purchase-${log.transactionHash}-${Date.now()}`,
            type: 'purchase',
            title: '🎵 Beat Purchased!',
            message: `Beat #${log.args.tokenId} sold for ${parseEther(log.args.price?.toString() || '0')} ETH`,
            timestamp: new Date(),
            txHash: log.transactionHash,
            amount: parseEther(log.args.price?.toString() || '0').toString(),
            beatId: log.args.tokenId?.toString(),
            from: log.args.seller,
            to: log.args.buyer
          }
          
          addNotification(notification)
          showToast(notification)
        })
      }
    })
  }

  const addNotification = (notification: NotificationEvent) => {
    setNotifications(prev => [notification, ...prev.slice(0, 49)]) // Keep last 50
    
    // Store in localStorage for persistence
    try {
      const stored = localStorage.getItem('web3-notifications')
      const existing = stored ? JSON.parse(stored) : []
      const updated = [notification, ...existing.slice(0, 49)]
      localStorage.setItem('web3-notifications', JSON.stringify(updated))
    } catch (e) {
      console.warn('Failed to store notifications:', e)
    }
  }

  const showToast = (notification: NotificationEvent) => {
    const toastOptions = {
      position: 'top-right' as const,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }

    switch (notification.type) {
      case 'purchase':
        toast.success(notification.message, toastOptions)
        break
      case 'mint':
        toast.info(notification.message, toastOptions)
        break
      case 'sale':
        toast.success(notification.message, toastOptions)
        break
      case 'transfer':
        toast.info(notification.message, toastOptions)
        break
      default:
        toast(notification.message, toastOptions)
    }
  }

  const clearNotifications = () => {
    setNotifications([])
    try {
      localStorage.removeItem('web3-notifications')
    } catch (e) {
      console.warn('Failed to clear notifications:', e)
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  // Load notifications from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('web3-notifications')
      if (stored) {
        const parsed = JSON.parse(stored)
        setNotifications(parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })))
      }
    } catch (error) {
      console.warn('Failed to parse stored notifications:', error)
    }
    
    setIsListening(hasWeb3Context && !!contractAddress)
  }, [hasWeb3Context, contractAddress])

  // Add demo notification if no Web3 context
  useEffect(() => {
    if (!hasWeb3Context && notifications.length === 0) {
      const demoNotification: NotificationEvent = {
        id: 'demo-1',
        type: 'purchase',
        title: '🎵 Demo Notification',
        message: 'Web3 notifications will appear here when connected',
        timestamp: new Date(),
        txHash: '0x123...',
        read: false
      }
      setNotifications([demoNotification])
    }
  }, [hasWeb3Context, notifications.length])

  return {
    notifications,
    isListening,
    error,
    clearNotifications,
    markAsRead,
    addNotification
  }
}