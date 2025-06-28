'use client'

import { useState } from 'react'
import { Beat } from '@/types'
import BeatCard from '@/components/BeatCard'

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const mockBeats: Beat[] = [
    {
      id: '1',
      title: 'Dark Trap Beat',
      description: 'Hard hitting trap beat with dark melodies',
      producerId: 'producer-1',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      coverImageUrl: '',
      price: 29.99,
      genre: 'Trap',
      bpm: 140,
      key: 'Am',
      tags: ['dark', 'trap', 'hard'],
      isNFT: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Melodic Hip Hop',
      description: 'Smooth melodic hip hop with soulful samples',
      producerId: 'producer-2',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      coverImageUrl: '',
      price: 24.99,
      genre: 'Hip Hop',
      bpm: 85,
      key: 'C',
      tags: ['melodic', 'hip hop', 'smooth'],
      isNFT: false,
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-16')
    },
    {
      id: '3',
      title: 'Future Bass Drop',
      description: 'Energetic future bass with massive drops',
      producerId: 'producer-3',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      coverImageUrl: '',
      price: 34.99,
      genre: 'Electronic',
      bpm: 128,
      key: 'G',
      tags: ['future bass', 'electronic', 'drop'],
      isNFT: false,
      createdAt: new Date('2024-01-17'),
      updatedAt: new Date('2024-01-17')
    }
  ]

  const filteredBeats = mockBeats.filter(beat => {
    const matchesSearch = beat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beat.genre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || beat.genre.toLowerCase() === selectedGenre.toLowerCase()
    return matchesSearch && matchesGenre
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          Marketplace
        </h1>
        <p className="text-gray-600 text-lg">
          Discover and purchase beats from talented producers worldwide
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search beats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Genres</option>
            <option value="amapiano">Amapiano</option>
            <option value="afrobeats">Afrobeats</option>
            <option value="hip hop">Hip Hop</option>
            <option value="trap">Trap</option>
            <option value="house">House</option>
            <option value="electronic">Electronic</option>
            <option value="drill">Drill</option>
            <option value="gqom">Gqom</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredBeats.length} beat{filteredBeats.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Beats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeats.map(beat => (
          <BeatCard key={beat.id} beat={beat} />
        ))}
      </div>

      {filteredBeats.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No beats found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Development Notice */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <p className="text-blue-800 text-sm">
            <strong>Marketplace:</strong> Full functionality with real audio player and purchase flow. 
            Using mock data - will integrate with Firestore when ready.
          </p>
        </div>
      </div>
    </div>
  )
}