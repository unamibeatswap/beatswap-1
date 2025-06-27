'use client'

import { useState } from 'react'
import { useWeb3Notifications } from '@/hooks/useWeb3Notifications'

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, clearNotifications, markAsRead } = useWeb3Notifications()
  
  const unreadCount = notifications.filter(n => !n.read).length

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'purchase': return '🎵'
      case 'sale': return '💰'
      case 'mint': return '✨'
      case 'transfer': return '🔄'
      default: return '📢'
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: '0.375rem',
          color: '#6b7280',
          fontSize: '1.25rem'
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '0.25rem',
            right: '0.25rem',
            background: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: '1.25rem',
            height: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Panel */}
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            width: '400px',
            maxWidth: '90vw',
            background: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            border: '1px solid #e5e7eb',
            zIndex: 20,
            maxHeight: '500px',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              padding: '1rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1f2937',
                margin: 0
              }}>
                Notifications
              </h3>
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div style={{
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {notifications.length === 0 ? (
                <div style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#6b7280'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔕</div>
                  <p style={{ margin: 0 }}>No notifications yet</p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
                    Web3 events will appear here
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    style={{
                      padding: '1rem',
                      borderBottom: '1px solid #f3f4f6',
                      cursor: 'pointer',
                      background: notification.read ? 'white' : '#f8fafc',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#f1f5f9'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = notification.read ? 'white' : '#f8fafc'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        fontSize: '1.25rem',
                        flexShrink: 0
                      }}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '0.25rem'
                        }}>
                          <h4 style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#1f2937',
                            margin: 0
                          }}>
                            {notification.title}
                          </h4>
                          <span style={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            flexShrink: 0,
                            marginLeft: '0.5rem'
                          }}>
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          margin: '0 0 0.5rem 0',
                          lineHeight: '1.4'
                        }}>
                          {notification.message}
                        </p>
                        {notification.txHash && (
                          <a
                            href={`https://etherscan.io/tx/${notification.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '0.75rem',
                              color: '#3b82f6',
                              textDecoration: 'none'
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Transaction →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div style={{
                padding: '0.75rem 1rem',
                borderTop: '1px solid #e5e7eb',
                background: '#f9fafb',
                textAlign: 'center'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  🟢 Live Web3 notifications active
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}