'use client'

import { useState, useEffect } from 'react'
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: 'user' | 'producer' | 'admin'
  isVerified: boolean
  createdAt: Date
  walletAddress?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        
        // Get or create user profile
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          
          if (userDoc.exists()) {
            const profileData = userDoc.data()
            setUserProfile({
              ...profileData,
              createdAt: profileData.createdAt?.toDate() || new Date()
            } as UserProfile)
          } else {
            // Create new user profile
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'User',
              role: 'user',
              isVerified: false,
              createdAt: new Date()
            }
            
            await setDoc(doc(db, 'users', firebaseUser.uid), newProfile)
            setUserProfile(newProfile)
          }
        } catch (err) {
          console.warn('Failed to get user profile, using fallback:', err)
          // Fallback profile
          setUserProfile({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'User',
            role: 'user',
            isVerified: false,
            createdAt: new Date()
          })
        }
      } else {
        setUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null)
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      setError(null)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      
      // Create user profile
      const newProfile: UserProfile = {
        uid: result.user.uid,
        email: result.user.email || '',
        displayName,
        role: 'user',
        isVerified: false,
        createdAt: new Date()
      }
      
      await setDoc(doc(db, 'users', result.user.uid), newProfile)
      return result.user
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const signInWithGoogle = async () => {
    try {
      setError(null)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in')
    
    try {
      const updatedProfile = { ...userProfile, ...updates }
      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true })
      setUserProfile(updatedProfile as UserProfile)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return {
    user,
    userProfile,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout,
    updateProfile
  }
}