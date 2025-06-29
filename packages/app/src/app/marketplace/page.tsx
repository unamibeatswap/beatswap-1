'use client'

import { useState } from 'react'
import { Beat } from '@/types'
import BeatCard from '@/components/BeatCard'
import { useBeats } from '@/hooks/useBeats'

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const { beats, loading, error } = useBeats()
  
  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎵</div>
          <p className="text-gray-600">Loading beats...</p>
        </div>
      </div>
    )
  }
  
  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600">Error loading beats: {error}</p>
        </div>
      </div>
    )
  }

  const filteredBeats = beats.filter(beat => {
    const matchesSearch = beat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         beat.genre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || beat.genre.toLowerCase() === selectedGenre.toLowerCase()
    return matchesSearch && matchesGenre
  })

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            🎵 Beat Marketplace
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Discover and purchase premium beats from talented South African producers
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.3)' }}>
              🔥 Hot Amapiano Beats
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.3)' }}>
              🎶 Afrobeats Collection
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.3)' }}>
              💎 Exclusive Drops
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

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

      </div>
    </div>
  )
}