'use client'

import { useState, useEffect } from 'react'
import { useUnifiedAuth } from '@/context/UnifiedAuthContext'

interface Notification {
  id: string
  type: 'sale' | 'purchase' | 'upload' | 'system'
  title: string
  message: string
  read: boolean
  createdAt: Date
}

export default function NotificationCenter() {
  const { user } = useUnifiedAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (user) {
      // Mock notifications for demo
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'sale',
          title: 'Beat Sold!',
          message: 'Your beat "Dark Trap" was purchased for R299.99',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 min ago
        },
        {
          id: '2',
          type: 'upload',
          title: 'Upload Complete',
          message: 'Your beat "Amapiano Vibes" has been uploaded successfully',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        }
      ]
      
      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter(n => !n.read).length)
    }
  }, [user])

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'sale': return '💰'
      case 'purchase': return '🛒'
      case 'upload': return '📤'
      default: return '🔔'
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 2a7 7 0 00-7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 001 1h16a1 1 0 001-1v-2.26C18.19 13.47 17 11.38 17 9a7 7 0 00-7-7zM9 21h6" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{getIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{formatTime(notification.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="p-3 border-t">
              <button
                onClick={() => {
                  setNotifications(prev => prev.map(n => ({ ...n, read: true })))
                  setUnreadCount(0)
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}