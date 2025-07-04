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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this feature.</p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-700 text-sm">
              Required permission: <code className="bg-blue-100 px-2 py-1 rounded">{permission}</code>
            </p>
            <p className="text-blue-700 text-sm mt-1">
              Your role: <code className="bg-blue-100 px-2 py-1 rounded">{user?.role}</code>
            </p>
          </div>
          <button 
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  // Check specific role
  if (role && !hasRole(role)) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">👮‍♂️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Role Required</h2>
          <p className="text-gray-600 mb-6">This area requires a specific role to access.</p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-700 text-sm">
              Required role: <code className="bg-blue-100 px-2 py-1 rounded">{role}</code>
            </p>
            <p className="text-blue-700 text-sm mt-1">
              Your role: <code className="bg-blue-100 px-2 py-1 rounded">{user?.role}</code>
            </p>
          </div>
          <button 
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  // Check any of multiple roles
  if (anyRole && !hasAnyRole(anyRole)) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">🎭</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authorized Roles Only</h2>
          <p className="text-gray-600 mb-6">This area requires one of several authorized roles.</p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-700 text-sm">
              Required roles: <code className="bg-blue-100 px-2 py-1 rounded">{anyRole.join(', ')}</code>
            </p>
            <p className="text-blue-700 text-sm mt-1">
              Your role: <code className="bg-blue-100 px-2 py-1 rounded">{user?.role}</code>
            </p>
          </div>
          <button 
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  // All checks passed, render children
  return <>{children}</>
}