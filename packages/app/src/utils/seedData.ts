import { collection, addDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

// Test Users Data
const testUsers = [
  {
    uid: 'user-001',
    email: 'producer1@beatschain.com',
    displayName: 'Beat Master Pro',
    role: 'producer',
    bio: 'Professional producer from Johannesburg specializing in Amapiano and Afrobeats',
    location: 'Johannesburg, SA',
    genres: ['amapiano', 'afrobeats', 'house'],
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date()
  },
  {
    uid: 'user-002', 
    email: 'producer2@beatschain.com',
    displayName: 'Synth Wave',
    role: 'producer',
    bio: 'Electronic music producer creating future bass and synthwave',
    location: 'Cape Town, SA',
    genres: ['electronic', 'synthwave', 'future-bass'],
    isVerified: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date()
  },
  {
    uid: 'user-003',
    email: 'user1@beatschain.com', 
    displayName: 'Music Lover',
    role: 'user',
    bio: 'Hip hop enthusiast and beat collector',
    location: 'Durban, SA',
    isVerified: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date()
  },
  {
    uid: 'admin-001',
    email: 'admin@beatschain.com',
    displayName: 'BeatsChain Admin',
    role: 'admin',
    bio: 'Platform administrator',
    location: 'Remote',
    isVerified: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date()
  }
]

// Test Beats Data
const testBeats = [
  {
    id: 'beat-001',
    title: 'Amapiano Vibes',
    description: 'Smooth amapiano beat with piano melodies and log drum',
    producerId: 'user-001',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    coverImageUrl: '',
    price: 45.99,
    genre: 'amapiano',
    bpm: 112,
    key: 'Am',
    tags: ['amapiano', 'piano', 'smooth'],
    duration: 180,
    isNFT: false,
    plays: 1250,
    likes: 89,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date()
  },
  {
    id: 'beat-002',
    title: 'Afrobeat Groove',
    description: 'Energetic afrobeat with traditional percussion',
    producerId: 'user-001', 
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    coverImageUrl: '',
    price: 39.99,
    genre: 'afrobeats',
    bpm: 102,
    key: 'C',
    tags: ['afrobeats', 'percussion', 'groove'],
    duration: 195,
    isNFT: false,
    plays: 890,
    likes: 67,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date()
  },
  {
    id: 'beat-003',
    title: 'Deep House Flow',
    description: 'Deep house track with atmospheric pads',
    producerId: 'user-002',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    coverImageUrl: '',
    price: 52.99,
    genre: 'deep-house',
    bpm: 124,
    key: 'Gm',
    tags: ['deep-house', 'atmospheric', 'pads'],
    duration: 210,
    isNFT: false,
    plays: 2100,
    likes: 156,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date()
  }
]

// Producer Stats Data
const testProducerStats = [
  {
    userId: 'user-001',
    totalBeats: 15,
    totalSales: 234,
    totalEarnings: 8950.50,
    profileViews: 3420,
    followers: 89,
    rating: 4.8,
    ratingCount: 45,
    lastActive: new Date()
  },
  {
    userId: 'user-002',
    totalBeats: 12,
    totalSales: 156,
    totalEarnings: 6780.25,
    profileViews: 2100,
    followers: 67,
    rating: 4.6,
    ratingCount: 32,
    lastActive: new Date()
  }
]

// Test Purchases Data
const testPurchases = [
  {
    id: 'purchase-001',
    beatId: 'beat-001',
    buyerId: 'user-003',
    producerId: 'user-001',
    amount: 45.99,
    licenseType: 'basic',
    paymentMethod: 'stripe',
    status: 'completed',
    createdAt: new Date('2024-01-21')
  },
  {
    id: 'purchase-002', 
    beatId: 'beat-002',
    buyerId: 'user-003',
    producerId: 'user-001',
    amount: 39.99,
    licenseType: 'premium',
    paymentMethod: 'crypto',
    status: 'completed',
    createdAt: new Date('2024-01-22')
  }
]

export async function seedFirebaseData() {
  try {
    console.log('🌱 Seeding Firebase with test data...')
    
    // Seed Users
    for (const user of testUsers) {
      await setDoc(doc(db, 'users', user.uid), user)
      console.log(`✅ Created user: ${user.displayName}`)
    }
    
    // Seed Beats
    for (const beat of testBeats) {
      await setDoc(doc(db, 'beats', beat.id), beat)
      console.log(`✅ Created beat: ${beat.title}`)
    }
    
    // Seed Producer Stats
    for (const stats of testProducerStats) {
      await setDoc(doc(db, 'producer-stats', stats.userId), stats)
      console.log(`✅ Created stats for: ${stats.userId}`)
    }
    
    // Seed Purchases
    for (const purchase of testPurchases) {
      await setDoc(doc(db, 'purchases', purchase.id), purchase)
      console.log(`✅ Created purchase: ${purchase.id}`)
    }
    
    console.log('🎉 Firebase seeding completed successfully!')
    return true
    
  } catch (error) {
    console.error('❌ Error seeding Firebase:', error)
    return false
  }
}

// Function to clear test data (for development)
export async function clearTestData() {
  console.log('🧹 This would clear test data in production implementation')
  // Implementation would delete test documents
}