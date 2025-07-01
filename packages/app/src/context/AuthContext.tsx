'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { doc, setDoc, getDoc, connectFirestoreEmulator } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

// Firebase connection health check
let firebaseHealthy = true
let lastHealthCheck = 0

const checkFirebaseHealth = async () => {
  const now = Date.now()
  if (now - lastHealthCheck < 30000) return firebaseHealthy // Cache for 30s
  
  try {
    await getDoc(doc(db, '_health', 'check'))
    firebaseHealthy = true
  } catch (error: any) {
    console.warn('Firebase health check failed:', error.code)
    firebaseHealthy = false
  }
  
  lastHealthCheck = now
  return firebaseHealthy
}

interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: 'user' | 'producer' | 'admin'
  walletAddress?: string
  profileImage?: string
  isVerified: boolean
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName: string, role?: 'user' | 'producer') => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user) {
        const isHealthy = await checkFirebaseHealth()
        
        if (isHealthy) {
          try {
            // Fetch user profile from Firestore
            const profileDoc = await getDoc(doc(db, 'users', user.uid))
            if (profileDoc.exists()) {
              setUserProfile(profileDoc.data() as UserProfile)
            } else {
              // Create fallback profile if none exists
              const fallbackProfile: UserProfile = {
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || user.email?.split('@')[0] || 'User',
                role: 'user',
                isVerified: false,
                createdAt: new Date()
              }
              setUserProfile(fallbackProfile)
            }
          } catch (err) {
            console.warn('Firebase error, using fallback profile:', err)
            firebaseHealthy = false
            // Create offline fallback profile
            const fallbackProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || user.email?.split('@')[0] || 'User',
              role: 'user',
              isVerified: false,
              createdAt: new Date()
            }
            setUserProfile(fallbackProfile)
          }
        } else {
          // Firebase is unhealthy, use fallback immediately
          const fallbackProfile: UserProfile = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
            role: 'user',
            isVerified: false,
            createdAt: new Date()
          }
          setUserProfile(fallbackProfile)
        }
      } else {
        setUserProfile(null)
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    // Hardcoded admin login
    if (email === 'info@unamifoundation.org' && password === 'Proof321#') {
      // Create mock admin user
      const mockAdminProfile: UserProfile = {
        uid: 'admin-mock-123',
        email: 'info@unamifoundation.org',
        displayName: 'Admin User',
        role: 'admin',
        isVerified: true,
        createdAt: new Date()
      }
      setUserProfile(mockAdminProfile)
      // Create mock Firebase user
      const mockUser = {
        uid: 'admin-mock-123',
        email: 'info@unamifoundation.org',
        displayName: 'Admin User'
      } as User
      setUser(mockUser)
      return
    }
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string, displayName: string, role: 'user' | 'producer' = 'user') => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    
    // Create user profile in Firestore
    const profile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      role,
      isVerified: false,
      createdAt: new Date()
    }
    
    await setDoc(doc(db, 'users', user.uid), profile)
    setUserProfile(profile)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)
    
    // Check if profile exists, create if not
    const profileDoc = await getDoc(doc(db, 'users', user.uid))
    if (!profileDoc.exists()) {
      const profile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || 'User',
        role: 'user',
        profileImage: user.photoURL || undefined,
        isVerified: false,
        createdAt: new Date()
      }
      
      await setDoc(doc(db, 'users', user.uid), profile)
      setUserProfile(profile)
    }
  }

  const logout = async () => {
    try {
      // Clear local state first
      setUser(null)
      setUserProfile(null)
      
      // Then sign out from Firebase
      await signOut(auth)
      
      // Force reload to clear any cached state
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
      // Force clear state even if Firebase fails
      setUser(null)
      setUserProfile(null)
      window.location.href = '/'
    }
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user || !userProfile) {
      throw new Error('User not authenticated or profile not loaded')
    }
    
    const updatedProfile = { 
      ...userProfile, 
      ...data,
      updatedAt: new Date()
    }
    
    const isHealthy = await checkFirebaseHealth()
    
    if (isHealthy) {
      try {
        console.log('Updating profile in Firestore:', updatedProfile)
        await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true })
        setUserProfile(updatedProfile as UserProfile)
        console.log('Profile updated successfully')
      } catch (err: any) {
        console.error('Failed to update profile in Firestore:', err)
        firebaseHealthy = false
        
        // Always update locally as fallback
        setUserProfile(updatedProfile as UserProfile)
        
        // Check if it's a network/permission error
        if (err.code === 'permission-denied') {
          throw new Error('Permission denied. Profile updated locally.')
        } else {
          throw new Error('Network error. Profile updated locally but may not sync until online.')
        }
      }
    } else {
      // Firebase is unhealthy, update locally only
      console.warn('Firebase unhealthy, updating profile locally only')
      setUserProfile(updatedProfile as UserProfile)
      // Don't throw error, just update locally
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}