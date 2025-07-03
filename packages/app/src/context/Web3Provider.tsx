'use client'

import { PropsWithChildren } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, sepolia } from '@reown/appkit/networks'
import { SIWEProvider } from '@/context/SIWEContext'
import { Web3DataProvider } from '@/context/Web3DataContext'

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
      description: 'Decentralized marketplace for beat creators and artists',
      url: typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL || 'https://beatschain.vercel.app',
      icons: [typeof window !== 'undefined' ? `${window.location.origin}/favicon.ico` : `${process.env.NEXT_PUBLIC_APP_URL || 'https://beatschain.vercel.app'}/favicon.ico`]
    },
    features: {
      analytics: false, // Disable analytics to avoid COOP issues
      email: false,
      socials: [],
      onramp: false // Disable onramp to avoid external redirects
    },
    themeMode: 'light',
    themeVariables: {
      '--w3m-color-mix': '#3b82f6',
      '--w3m-color-mix-strength': 20
    },
    enableWalletConnect: true,
    enableInjected: true,
    enableEIP6963: true,
    enableCoinbase: true // Re-enable for production
  })
} catch (error) {
  console.warn('Web3 wallet connection setup failed:', error)
}

export function Web3Provider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <SIWEProvider>
          <Web3DataProvider>
            {children}
          </Web3DataProvider>
        </SIWEProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}