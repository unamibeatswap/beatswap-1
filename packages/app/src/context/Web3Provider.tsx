'use client'

import { PropsWithChildren } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, sepolia } from '@reown/appkit/networks'

// Setup queryClient
const queryClient = new QueryClient()

// Get projectId from environment
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'aa91d5eab1d0156ff3d90cc596741756'

if (!projectId) {
  console.warn('Using default WalletConnect Project ID. For production, set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID')
}

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, sepolia],
  projectId,
  ssr: true
})

// Create AppKit instance
try {
  createAppKit({
    adapters: [wagmiAdapter],
    networks: [mainnet, sepolia],
    projectId,
    metadata: {
      name: 'BeatsChain',
      description: 'Decentralized marketplace for music producers and artists',
      url: 'https://www.beatschain.app',
      icons: ['https://www.beatschain.app/favicon.ico']
    },
    features: {
      analytics: true,
      email: false,
      socials: []
    },
    themeMode: 'light',
    themeVariables: {
      '--w3m-color-mix': '#3b82f6',
      '--w3m-color-mix-strength': 20
    }
  })
} catch (error) {
  console.warn('Web3 wallet connection setup failed:', error)
}

export function Web3Provider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}