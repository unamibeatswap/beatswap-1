'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useAdminSetup } from '@/hooks/useAdminSetup'
import { TestDataManager } from '@/utils/testData'
import { toast } from 'react-toastify'

export default function AdminSetupPage() {
  const { address, isConnected } = useAccount()
  const { setupAdmin, needsSetup, loading } = useAdminSetup()
  const [setting, setSetting] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!needsSetup()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Already Setup</h2>
          <p className="text-gray-600 mb-4">The platform admin has already been configured.</p>
          <a href="/admin" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Go to Admin Dashboard
          </a>
        </div>
      </div>
    )
  }

  const handleSetup = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first')
      return
    }

    setSetting(true)
    try {
      const success = setupAdmin(address)
      if (success) {
        TestDataManager.initializeTestData()
        toast.success('Admin setup complete! Test data initialized.')
        setTimeout(() => window.location.href = '/admin', 2000)
      } else {
        toast.error('Failed to setup admin')
      }
    } catch (error) {
      toast.error('Setup failed')
    } finally {
      setSetting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🛡️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Setup Admin Access</h1>
          <p className="text-gray-600">Configure the first admin wallet for BeatsChain.</p>
        </div>

        {!isConnected ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Connect your wallet to become the admin</p>
            <w3m-button />
          </div>
        ) : (
          <div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Your Wallet</h3>
              <p className="text-sm text-gray-600 break-all">{address}</p>
            </div>

            <button
              onClick={handleSetup}
              disabled={setting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
            >
              {setting ? 'Setting up...' : 'Setup Admin Access'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}