'use client'

import React, { useState } from 'react'
import { LinkComponent } from './LinkComponent'
import { Connect } from './Connect'
import { useAuth } from '@/context/AuthContext'
import SignInModal from './auth/SignInModal'
import SignUpModal from './auth/SignUpModal'

export function Header() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, userProfile, logout } = useAuth()

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <LinkComponent href="/">
            <h1 className="text-2xl font-bold text-gray-900">BeatsChain</h1>
          </LinkComponent>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <LinkComponent href="/" className="text-gray-600 hover:text-gray-900">Home</LinkComponent>
            <LinkComponent href="/marketplace" className="text-gray-600 hover:text-gray-900">Marketplace</LinkComponent>
            <LinkComponent href="/producers" className="text-gray-600 hover:text-gray-900">Producers</LinkComponent>
            <LinkComponent href="/blog" className="text-gray-600 hover:text-gray-900">Blog</LinkComponent>
            <LinkComponent href="/contact" className="text-gray-600 hover:text-gray-900">Contact</LinkComponent>
            
            {user && (
              <>
                <LinkComponent href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</LinkComponent>
                <LinkComponent href="/library" className="text-gray-600 hover:text-gray-900">Library</LinkComponent>
                <LinkComponent href="/profile" className="text-gray-600 hover:text-gray-900">Profile</LinkComponent>
                {userProfile?.role === 'admin' && (
                  <LinkComponent href="/admin" className="text-gray-600 hover:text-gray-900">Admin</LinkComponent>
                )}
              </>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Connect />
            
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{userProfile?.displayName || 'User'}</span>
                <button 
                  onClick={logout}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Sign Out
                </button>
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <LinkComponent href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</LinkComponent>
                  </div>
                  <LinkComponent href="/library" className="text-gray-600 hover:text-gray-900">Library</LinkComponent>
                  <LinkComponent href="/profile" className="text-gray-600 hover:text-gray-900">Profile</LinkComponent>
                  {userProfile?.role === 'admin' && (
                    <LinkComponent href="/admin" className="text-gray-600 hover:text-gray-900">Admin</LinkComponent>
                  )}
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
