'use client'

import React, { useState } from 'react'
import { LinkComponent } from './LinkComponent'
import { Connect } from './Connect'
import { useAuth } from '@/context/AuthContext'
import SignInModal from './auth/SignInModal'
import SignUpModal from './auth/SignUpModal'
import NotificationCenter from './NotificationCenter'

export function Header() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  
  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen && !(event.target as Element).closest('.relative')) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])
  const { user, userProfile, logout } = useAuth()

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <LinkComponent href="/">
            <h1 className="text-2xl font-bold text-gray-900">BeatsChain</h1>
          </LinkComponent>

          {/* Desktop Navigation - Public Links Only */}
          <nav className="hidden md:flex items-center space-x-6">
            <LinkComponent href="/" className="text-gray-600 hover:text-gray-900">Home</LinkComponent>
            <LinkComponent href="/marketplace" className="text-gray-600 hover:text-gray-900">Marketplace</LinkComponent>
            <LinkComponent href="/producers" className="text-gray-600 hover:text-gray-900">Producers</LinkComponent>
            <LinkComponent href="/blog" className="text-gray-600 hover:text-gray-900">Blog</LinkComponent>
            <LinkComponent href="/contact" className="text-gray-600 hover:text-gray-900">Contact</LinkComponent>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Connect />
            <NotificationCenter />
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <span>{userProfile?.displayName || 'User'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-2">
                      <LinkComponent href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Dashboard
                      </LinkComponent>
                      <LinkComponent href="/library" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Library
                      </LinkComponent>
                      <LinkComponent href="/manage-subscription" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Subscription
                      </LinkComponent>
                      <LinkComponent href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </LinkComponent>
                      {userProfile?.role === 'admin' && (
                        <LinkComponent href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Admin Panel
                        </LinkComponent>
                      )}
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button 
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowSignIn(true)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setShowSignUp(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button - Always show on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Always show when open */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <LinkComponent href="/" className="text-gray-600 hover:text-gray-900">Home</LinkComponent>
              <LinkComponent href="/marketplace" className="text-gray-600 hover:text-gray-900">Marketplace</LinkComponent>
              <LinkComponent href="/producers" className="text-gray-600 hover:text-gray-900">Producers</LinkComponent>
              <LinkComponent href="/blog" className="text-gray-600 hover:text-gray-900">Blog</LinkComponent>
              <LinkComponent href="/contact" className="text-gray-600 hover:text-gray-900">Contact</LinkComponent>
              {user && (
                <>
                  <div className="border-t border-gray-200 mt-3 pt-3 space-y-3">
                    <LinkComponent href="/dashboard" className="text-gray-600 hover:text-gray-900">📊 Dashboard</LinkComponent>
                    <LinkComponent href="/library" className="text-gray-600 hover:text-gray-900">📚 My Library</LinkComponent>
                    <LinkComponent href="/profile" className="text-gray-600 hover:text-gray-900">👤 Profile</LinkComponent>
                    {userProfile?.role === 'admin' && (
                      <LinkComponent href="/admin" className="text-gray-600 hover:text-gray-900">⚙️ Admin Panel</LinkComponent>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <SignInModal 
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false)
          setShowSignUp(true)
        }}
      />
      
      <SignUpModal 
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => {
          setShowSignUp(false)
          setShowSignIn(true)
        }}
      />
    </>
  )
}
