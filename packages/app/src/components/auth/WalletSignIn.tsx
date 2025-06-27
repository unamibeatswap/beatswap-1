'use client'

import { useSIWE } from '@/hooks/useSIWE'
import { useAuth } from '@/context/AuthContext'

interface WalletSignInProps {
  onSuccess?: () => void
}

export default function WalletSignIn({ onSuccess }: WalletSignInProps) {
  const { signInWithEthereum, loading, error, isConnected, address } = useSIWE()
  const { user, userProfile } = useAuth()

  const handleWalletSignIn = async () => {
    const result = await signInWithEthereum()
    if (result?.success && onSuccess) {
      onSuccess()
    }
  }

  if (!isConnected) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600 mb-2">Connect your wallet to link it to your account</p>
        <p className="text-sm text-gray-500">Use the Connect button in the header first</p>
      </div>
    )
  }

  if (user && userProfile?.walletAddress === address) {
    return (
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <p className="text-green-700">✅ Wallet linked successfully</p>
        <p className="text-sm text-gray-600">{address}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-700 mb-4">
          Link your wallet ({address?.slice(0, 6)}...{address?.slice(-4)}) to your account
        </p>
        
        <button
          onClick={handleWalletSignIn}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Signing...' : 'Sign with Ethereum'}
        </button>
        
        <p className="text-xs text-gray-500 mt-2">
          This will prompt you to sign a message to verify wallet ownership
        </p>
      </div>
    </div>
  )
}