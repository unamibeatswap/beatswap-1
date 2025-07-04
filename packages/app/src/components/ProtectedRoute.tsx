'use client'

import { ReactNode } from 'react'
import { useUnifiedAuth } from '@/context/UnifiedAuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  permission?: string
  role?: string
  anyRole?: string[]
  fallback?: ReactNode
  requireWallet?: boolean
}

export default function ProtectedRoute({ 
  children, 
  permission, 
  role, 
  anyRole, 
  fallback,
  requireWallet = false 
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated, hasPermission, hasRole, hasAnyRole, wallet } = useUnifiedAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Check wallet requirement
  if (requireWallet && !wallet.isConnected) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">🔗</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">Please connect your wallet to access this feature.</p>
          <div className="mt-4">
            <w3m-button />
          </div>
        </div>
      </div>
    )
  }

  // Check authentication
  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to access this area.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    )
  }

  // Check specific permission
  if (permission && !hasPermission(permission)) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="text-8xl mb-4">🚫</div>
            <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
            <p className="text-xl opacity-90">You don't have permission to access this feature</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Permission Required</h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <p className="text-blue-700 text-lg mb-2">
                  <strong>Required:</strong> <code className="bg-blue-100 px-3 py-1 rounded text-sm">{permission}</code>
                </p>
                <p className="text-blue-700 text-lg">
                  <strong>Your Role:</strong> <code className="bg-blue-100 px-3 py-1 rounded text-sm">{user?.role || 'None'}</code>
                </p>
              </div>
              <div className="text-gray-600 mb-6">
                <p className="mb-4">To access this feature, you need specific permissions. Here's how to get access:</p>
                <ul className="text-left space-y-2">
                  <li>• Contact an administrator for role upgrade</li>
                  <li>• Check if you're signed in with the correct account</li>
                  <li>• Ensure your wallet is connected</li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => window.history.back()}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium"
                >
                  ← Go Back
                </button>
                <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
                  🏠 Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Check specific role
  if (role && !hasRole(role)) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="text-8xl mb-4">👮‍♂️</div>
            <h1 className="text-4xl font-bold mb-4">Role Required</h1>
            <p className="text-xl opacity-90">This area requires a specific role to access</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Level Required</h2>
              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <p className="text-purple-700 text-lg mb-2">
                  <strong>Required Role:</strong> <code className="bg-purple-100 px-3 py-1 rounded text-sm">{role}</code>
                </p>
                <p className="text-purple-700 text-lg">
                  <strong>Your Role:</strong> <code className="bg-purple-100 px-3 py-1 rounded text-sm">{user?.role || 'None'}</code>
                </p>
              </div>
              <div className="text-gray-600 mb-6">
                <p className="mb-4">You need a higher access level to view this content. Consider:</p>
                <ul className="text-left space-y-2">
                  <li>• Upgrading your account type in Profile settings</li>
                  <li>• Contacting support for role verification</li>
                  <li>• Ensuring you're logged in correctly</li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => window.history.back()}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium"
                >
                  ← Go Back
                </button>
                <a href="/profile" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium">
                  👤 Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Check any of multiple roles
  if (anyRole && !hasAnyRole(anyRole)) {
    return fallback || (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="text-8xl mb-4">🎭</div>
            <h1 className="text-4xl font-bold mb-4">Authorized Roles Only</h1>
            <p className="text-xl opacity-90">This area requires one of several authorized roles</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Multiple Role Access</h2>
              <div className="bg-indigo-50 p-6 rounded-lg mb-6">
                <p className="text-indigo-700 text-lg mb-2">
                  <strong>Accepted Roles:</strong>
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-3">
                  {anyRole.map(r => (
                    <code key={r} className="bg-indigo-100 px-3 py-1 rounded text-sm">{r}</code>
                  ))}
                </div>
                <p className="text-indigo-700 text-lg">
                  <strong>Your Role:</strong> <code className="bg-indigo-100 px-3 py-1 rounded text-sm">{user?.role || 'None'}</code>
                </p>
              </div>
              <div className="text-gray-600 mb-6">
                <p className="mb-4">You need one of the authorized roles to access this area:</p>
                <ul className="text-left space-y-2">
                  <li>• Switch to an authorized role in your Profile</li>
                  <li>• Request role upgrade from an administrator</li>
                  <li>• Verify your account permissions</li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => window.history.back()}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium"
                >
                  ← Go Back
                </button>
                <a href="/profile" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium">
                  👤 Update Role
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // All checks passed, render children
  return <>{children}</>
}