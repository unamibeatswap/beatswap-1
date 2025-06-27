'use client'

import React, { useState } from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_EMOJI } from '@/utils/site'
import { Connect } from './Connect'
import { NotificationsDrawer } from './NotificationsDrawer'
import { useMockAuth as useAuth } from '@/context/MockAuthContext'
import SignInModal from './auth/SignInModal'
import SignUpModal from './auth/SignUpModal'

export function Header() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const { user, userProfile, logout } = useAuth()

  return (
    <>
      <header className='navbar flex justify-between p-4 pt-0'>
        <LinkComponent href='/'>
          <h1 className='text-xl font-bold'>{SITE_EMOJI}</h1>
        </LinkComponent>

        <div className='flex gap-2 items-center'>
          <Connect />
          <NotificationsDrawer />
          
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                {userProfile?.displayName || 'User'}
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><LinkComponent href="/profile">Profile</LinkComponent></li>
                <li><LinkComponent href="/dashboard">Dashboard</LinkComponent></li>
                <li><button onClick={logout}>Sign Out</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => setShowSignIn(true)}
                className="btn btn-ghost btn-sm"
              >
                Sign In
              </button>
              <button 
                onClick={() => setShowSignUp(true)}
                className="btn btn-primary btn-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
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
