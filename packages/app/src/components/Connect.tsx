import React from 'react'
import { useAccount } from 'wagmi'

export function Connect() {
  const { isConnected } = useAccount()
  
  return (
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
  )
}
