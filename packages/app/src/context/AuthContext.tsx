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
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

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
  signUp: (email: string, password: string, displayName: string) => Promise<void>
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
          console.warn('Firebase offline, using fallback profile:', err)
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

  const signUp = async (email: string, password: string, displayName: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    
    // Create user profile in Firestore
    const profile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      role: 'user',
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
    await signOut(auth)
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return
    
    const updatedProfile = { ...userProfile, ...data }
    try {
      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true })
      setUserProfile(updatedProfile as UserProfile)
    } catch (err) {
      console.warn('Failed to update profile online, updating locally:', err)
      setUserProfile(updatedProfile as UserProfile)
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