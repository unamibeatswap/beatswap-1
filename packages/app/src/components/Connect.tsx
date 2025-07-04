import React from 'react'

export function Connect() {
  return (
    <div className="flex items-center">
      {/* Original Nexth multi-wallet button */}
      <div className="hidden sm:block">
        <w3m-button label='🔗 Wallet' balance='hide' size='sm' />
      </div>
      <div className="sm:hidden">
        <w3m-button label='💳' balance='hide' size='sm' />
      </div>
    </div>
  )
}
