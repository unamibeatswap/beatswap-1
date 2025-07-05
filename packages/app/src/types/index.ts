// User Types
export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: 'user' | 'producer' | 'admin'
  walletAddress?: string
  profileImage?: string
  isVerified: boolean
  createdAt: Date
}

// Beat Types
export interface Beat {
  id: string
  title: string
  description: string
  producerId: string
  stageName?: string // Producer's stage/artist name
  audioUrl: string
  coverImageUrl: string
  price: number
  genre: string
  bpm: number
  key: string
  tags: string[]
  isNFT: boolean
  tokenId?: number
  contractAddress?: string
  royaltyPercentage?: number
  isActive?: boolean
  status?: string
  createdAt: Date
  updatedAt: Date
}

// Purchase Types
export interface Purchase {
  id: string
  beatId: string
  buyerId: string
  producerId: string
  amount: number
  licenseType: 'basic' | 'premium' | 'exclusive'
  transactionHash?: string
  createdAt: Date
}

// License Types
export interface License {
  type: 'basic' | 'premium' | 'exclusive'
  price: number
  description: string
  allowCommercialUse: boolean
  allowDistribution: boolean
  maxCopies?: number
}