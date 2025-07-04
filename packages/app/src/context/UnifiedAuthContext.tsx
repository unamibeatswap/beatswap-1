'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { useSIWE } from './SIWEContext'
import { useAuth } from './AuthContext'
import { useWeb3Profile } from '@/hooks/useWeb3Profile'

// Super admin wallets (add your wallet here)
const SUPER_ADMIN_WALLETS = [
  '0x1234567890123456789012345678901234567890', // Replace with your actual wallet
  // Add your actual wallet address here
  // Example: '0xYourActualWalletAddress',
  // Add more super admin wallets as needed
]

interface UnifiedUser {
  address: string
  displayName: string
  email?: string
  role: 'user' | 'producer' | 'admin' | 'super_admin'
  permissions: string[]
  isVerified: boolean
  profileImage?: string
  createdAt: Date
}

interface UnifiedAuthContextType {
  user: UnifiedUser | null
  loading: boolean
  isAuthenticated: boolean
  
  // Permission checks
  hasPermission: (permission: string) => boolean
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  
  // Authentication methods
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  
  // Wallet info
  wallet: {
    address?: string
    isConnected: boolean
  }
}

const ROLE_PERMISSIONS = {
  user: ['browse', 'purchase', 'profile'],
  producer: ['browse', 'purchase', 'profile', 'upload', 'dashboard', 'analytics', 'producer_stats'],
  admin: ['browse', 'purchase', 'profile', 'upload', 'dashboard', 'analytics', 'producer_stats', 'admin_panel', 'user_management', 'content_moderation'],
  super_admin: ['browse', 'purchase', 'profile', 'upload', 'dashboard', 'analytics', 'producer_stats', 'admin_panel', 'user_management', 'content_moderation', 'system_settings', 'role_management']
}

const UnifiedAuthContext = createContext<UnifiedAuthContextType | undefined>(undefined)

export function UnifiedAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UnifiedUser | null>(null)
  const [loading, setLoading] = useState(true)
  
  const { address, isConnected } = useAccount()
  const { user: siweUser, signIn: siweSignIn, signOut: siweSignOut, isAuthenticated: siweAuth } = useSIWE()
  const { user: firebaseUser, userProfile: firebaseProfile } = useAuth()
  const { profile: web3Profile, loading: profileLoading } = useWeb3Profile()

  useEffect(() => {
    if (!profileLoading) {
      buildUnifiedUser()
    }
  }, [address, isConnected, siweUser, firebaseUser, firebaseProfile, web3Profile, profileLoading])

  const buildUnifiedUser = () => {
    setLoading(true)
    
    try {
      // No wallet connected
      if (!address || !isConnected) {
        // Check if Firebase user exists (legacy support)
        if (firebaseUser && firebaseProfile) {
          const legacyUser: UnifiedUser = {
            address: firebaseProfile.walletAddress || '',
            displayName: firebaseProfile.displayName,
            email: firebaseProfile.email,
            role: firebaseProfile.role as any,
            permissions: ROLE_PERMISSIONS[firebaseProfile.role as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.user,
            isVerified: firebaseProfile.isVerified,
            profileImage: firebaseProfile.profileImage,
            createdAt: firebaseProfile.createdAt
          }
          setUser(legacyUser)
          setLoading(false)
          return
        }
        
        setUser(null)
        setLoading(false)
        return
      }

      // Determine role based on wallet and existing data
      const role = determineUserRole(address, firebaseProfile)
      
      // Build unified user from available data
      const unifiedUser: UnifiedUser = {
        address,
        displayName: web3Profile?.displayName || firebaseProfile?.displayName || `User ${address.slice(0, 6)}...${address.slice(-4)}`,
        email: firebaseProfile?.email || web3Profile?.email,
        role,
        permissions: ROLE_PERMISSIONS[role],
        isVerified: web3Profile?.isVerified || firebaseProfile?.isVerified || role === 'super_admin' || role === 'admin',
        profileImage: web3Profile?.profileImage || firebaseProfile?.profileImage,
        createdAt: web3Profile?.createdAt || firebaseProfile?.createdAt || new Date()
      }

      setUser(unifiedUser)
      
      // Auto-upgrade profile if needed
      if (role === 'super_admin' || role === 'admin') {
        upgradeProfileRole(address, role)
      }
      
    } catch (error) {
      console.error('Error building unified user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const determineUserRole = (walletAddress: string, firebaseProfile?: any): UnifiedUser['role'] => {
    // Super admin check (your wallet)
    if (SUPER_ADMIN_WALLETS.includes(walletAddress.toLowerCase())) {
      return 'super_admin'
    }
    
    // Admin email check (Firebase fallback)
    if (firebaseProfile?.email === 'info@unamifoundation.org') {
      return 'admin'
    }
    
    // Check Web3 profile role
    if (web3Profile?.role) {
      return web3Profile.role as UnifiedUser['role']
    }
    
    // Check Firebase profile role
    if (firebaseProfile?.role) {
      return firebaseProfile.role as UnifiedUser['role']
    }
    
    // Default to user
    return 'user'
  }

  const upgradeProfileRole = async (walletAddress: string, role: string) => {
    try {
      // Update Web3 profile
      const profileKey = `web3_profile_${walletAddress.toLowerCase()}`
      const existingProfile = localStorage.getItem(profileKey)
      
      if (existingProfile) {
        const profile = JSON.parse(existingProfile)
        profile.role = role
        profile.isVerified = true
        profile.updatedAt = new Date()
        localStorage.setItem(profileKey, JSON.stringify(profile))
      } else {
        // Create new admin profile
        const newProfile = {
          address: walletAddress,
          displayName: role === 'super_admin' ? 'Super Admin' : 'Admin',
          bio: 'Platform administrator',
          role,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        localStorage.setItem(profileKey, JSON.stringify(newProfile))
      }
      
      // Update admin config
      const adminConfig = {
        adminWallets: [walletAddress.toLowerCase()],
        setupComplete: true,
        createdAt: new Date()
      }
      localStorage.setItem('admin_config', JSON.stringify(adminConfig))
      
    } catch (error) {
      console.error('Error upgrading profile role:', error)
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  const hasRole = (role: string): boolean => {
    if (!user) return false
    return user.role === role
  }

  const hasAnyRole = (roles: string[]): boolean => {
    if (!user) return false
    return roles.includes(user.role)
  }

  const signIn = async () => {
    if (isConnected && address) {
      // Use SIWE for wallet authentication
      await siweSignIn()
    }
  }

  const signOut = async () => {
    await siweSignOut()
    setUser(null)
  }

  const isAuthenticated = Boolean(
    (isConnected && address && siweAuth) || // Web3 auth
    (firebaseUser && firebaseProfile) // Firebase fallback
  )

  const value: UnifiedAuthContextType = {
    user,
    loading,
    isAuthenticated,
    hasPermission,
    hasRole,
    hasAnyRole,
    signIn,
    signOut,
    wallet: {
      address,
      isConnected
    }
  }

  return (
    <UnifiedAuthContext.Provider value={value}>
      {children}
    </UnifiedAuthContext.Provider>
  )
}

export function useUnifiedAuth() {
  const context = useContext(UnifiedAuthContext)
  if (!context) {
    throw new Error('useUnifiedAuth must be used within UnifiedAuthProvider')
  }
  return context
}