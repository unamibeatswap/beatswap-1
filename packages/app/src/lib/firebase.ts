import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyB5YAsAbKf3aeTegpXYZPBOzCqW2abCORg',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'beatswap-36c32.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'beatswap-36c32',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'beatswap-36c32.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '750321012530',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:750321012530:web:1349ade6e8897015b0912b',
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Handle network connectivity
if (typeof window !== 'undefined') {
  // Enable network and handle offline scenarios
  enableNetwork(db).catch((error) => {
    console.warn('Firebase network enable failed:', error)
  })
  
  // Listen for online/offline events
  window.addEventListener('online', () => {
    enableNetwork(db).catch(console.warn)
  })
  
  window.addEventListener('offline', () => {
    console.log('App is offline, using cached data')
  })
}

export default app