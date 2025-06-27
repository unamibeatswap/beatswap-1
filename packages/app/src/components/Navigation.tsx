'use client'

import { useState } from 'react'
import { LinkComponent } from './LinkComponent'
import { useAuth } from '@/context/AuthContext'

export default function Navigation() {
  const { user, userProfile } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { name: 'Marketplace', href: '/marketplace', icon: '🛒' },
    { name: 'Browse', href: '/browse', icon: '🔍' },
    { name: 'Genres', href: '/genres', icon: '🎵' },
    { name: 'Producers', href: '/producers', icon: '👨‍🎤' },
  ]

  const userItems = user ? [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'My Library', href: '/library', icon: '📚' },
    { name: 'Profile', href: '/profile', icon: '👤' },
    ...(userProfile?.role === 'admin' ? [{ name: 'Admin', href: '/admin', icon: '⚙️' }] : [])
  ] : []

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <LinkComponent
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </LinkComponent>
            ))}
          </div>

          {/* User Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              {userItems.map((item) => (
                <LinkComponent
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </LinkComponent>
              ))}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <LinkComponent
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </LinkComponent>
              ))}
              
              {user && (
                <>
                  <div className="border-t my-2"></div>
                  {userItems.map((item) => (
                    <LinkComponent
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </LinkComponent>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}