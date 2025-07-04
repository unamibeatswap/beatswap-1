import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useUnifiedAuth } from '@/context/UnifiedAuthContext'
import Web3AccountModal from './Web3AccountModal'

export function Connect() {
  const [showAccountModal, setShowAccountModal] = useState(false)
  const { isConnected, address } = useAccount()
  const { isAuthenticated, signIn } = useUnifiedAuth()
  
  // Handle wallet connection flow
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (isConnected && address && !isAuthenticated) {
      // Auto-sign in when wallet connects
      signIn().catch(() => {
        // If SIWE fails, show account modal for profile creation
        setShowAccountModal(true)
      })
    }
  }, [isConnected, address, isAuthenticated])
  
  // Only show Web3Modal button when not authenticated
  if (isAuthenticated) return null
  
  return (
    <>
      <div className="flex items-center">
        {/* Desktop */}
        <div className="hidden sm:block">
          <w3m-button label='🔗 Wallet' balance='hide' size='sm' />
        </div>
        
        {/* Mobile */}
        <div className="sm:hidden">
          <w3m-button label='💳' balance='hide' size='sm' />
        </div>
      </div>
      
      <Web3AccountModal 
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      />
    </>
  )
}
