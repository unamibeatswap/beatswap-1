'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

interface RoleSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onRoleSelected: (role: 'user' | 'producer') => void
}

export function RoleSelectionModal({ isOpen, onClose, onRoleSelected }: RoleSelectionModalProps) {
  const [selectedRole, setSelectedRole] = useState<'user' | 'producer'>('user')
  const { address } = useAccount()

  if (!isOpen) return null

  const handleSubmit = () => {
    // Save profile with selected role
    if (address) {
      const profile = {
        address,
        displayName: selectedRole === 'producer' ? 'Producer' : 'Music Fan',
        bio: selectedRole === 'producer' ? 'Beat creator and producer' : 'Music enthusiast',
        role: selectedRole,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      localStorage.setItem(`web3_profile_${address.toLowerCase()}`, JSON.stringify(profile))
    }
    
    onRoleSelected(selectedRole)
    onClose()
    window.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to BeatsChain! 🎵</h2>
        <p className="text-gray-600 mb-6">Choose your role to get started:</p>
        
        <div className="space-y-4 mb-6">
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              selectedRole === 'user' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            onClick={() => setSelectedRole('user')}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎧</div>
              <div>
                <h3 className="font-semibold">Music Fan</h3>
                <p className="text-sm text-gray-600">Browse and purchase beats</p>
              </div>
            </div>
          </div>
          
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              selectedRole === 'producer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            onClick={() => setSelectedRole('producer')}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎤</div>
              <div>
                <h3 className="font-semibold">Producer</h3>
                <p className="text-sm text-gray-600">Upload and sell your beats</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Continue as {selectedRole === 'producer' ? 'Producer' : 'Music Fan'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}