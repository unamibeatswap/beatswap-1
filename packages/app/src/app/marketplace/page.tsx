'use client'

import { useState, useEffect } from 'react'
import { Beat } from '@/types'
import BeatCard from '@/components/BeatCard'
import { useBeats } from '@/hooks/useBeats'
import { toast } from 'react-toastify'

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const beatsPerPage = 8

  const { beats, loading, error } = useBeats()
  
  // Reset to page 1 when filters change - MUST be at top level
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedGenre, sortBy])
  
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

  // Pagination logic
  const totalPages = Math.ceil(filteredBeats.length / beatsPerPage)
  const startIndex = (currentPage - 1) * beatsPerPage
  const currentBeats = filteredBeats.slice(startIndex, startIndex + beatsPerPage)

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
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          Showing {startIndex + 1}-{Math.min(startIndex + beatsPerPage, filteredBeats.length)} of {filteredBeats.length} beat{filteredBeats.length !== 1 ? 's' : ''}
        </p>
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Beats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentBeats.map(beat => (
          <BeatCard key={beat.id} beat={beat} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-2 border rounded-md ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {currentBeats.length === 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🎵</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">No beats found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search terms or filters to discover more beats</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['amapiano', 'afrobeats', 'trap', 'hip hop'].map(genre => (
              <button
                key={genre}
                onClick={() => {
                  setSelectedGenre(genre)
                  setSearchTerm('')
                }}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                Try {genre}
              </button>
            ))}
          </div>
        </div>
      )}

      </div>
    </div>
  )
}