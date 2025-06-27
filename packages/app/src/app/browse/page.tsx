'use client'

import { useState } from 'react'
import { useBeats } from '@/hooks/useBeats'
import AudioPlayer from '@/components/audio/AudioPlayer'
import PurchaseModal from '@/components/purchase/PurchaseModal'
import { Beat } from '@/types'

export default function BrowsePage() {
  const { beats, loading } = useBeats()
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading beats...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Beats</h1>
          <p className="text-gray-600">Discover new beats from talented producers</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <p className="text-2xl font-bold text-blue-600">{beats.length}</p>
          <p className="text-sm text-gray-600">Total Beats</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <p className="text-2xl font-bold text-green-600">{new Set(beats.map(b => b.genre)).size}</p>
          <p className="text-sm text-gray-600">Genres</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <p className="text-2xl font-bold text-purple-600">{new Set(beats.map(b => b.producerId)).size}</p>
          <p className="text-sm text-gray-600">Producers</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <p className="text-2xl font-bold text-orange-600">
            ${Math.min(...beats.map(b => b.price)).toFixed(0)}+
          </p>
          <p className="text-sm text-gray-600">Starting Price</p>
        </div>
      </div>

      {/* Beats Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beats.map(beat => (
            <div key={beat.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              {/* Cover Image */}
              {beat.coverImageUrl && (
                <div className="aspect-square bg-gray-100">
                  <img
                    src={beat.coverImageUrl}
                    alt={beat.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{beat.title}</h3>
                    <p className="text-sm text-gray-600">{beat.genre} • {beat.bpm} BPM</p>
                  </div>
                  <p className="text-lg font-bold text-green-600 ml-2">${beat.price}</p>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {beat.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedBeat(beat)
                      setShowPurchaseModal(true)
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
                  >
                    Buy
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {beats.map(beat => (
            <div key={beat.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-6">
                {/* Cover */}
                {beat.coverImageUrl && (
                  <img
                    src={beat.coverImageUrl}
                    alt={beat.title}
                    className="w-20 h-20 rounded object-cover flex-shrink-0"
                  />
                )}
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{beat.title}</h3>
                      <p className="text-gray-600">{beat.genre} • {beat.bpm} BPM • {beat.key}</p>
                    </div>
                    <p className="text-xl font-bold text-green-600">${beat.price}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{beat.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {beat.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Audio Player */}
                  <AudioPlayer beat={beat} previewMode={true} />
                </div>
                
                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      setSelectedBeat(beat)
                      setShowPurchaseModal(true)
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  >
                    Purchase
                  </button>
                  <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50">
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Purchase Modal */}
      {selectedBeat && (
        <PurchaseModal
          beat={selectedBeat}
          isOpen={showPurchaseModal}
          onClose={() => {
            setShowPurchaseModal(false)
            setSelectedBeat(null)
          }}
          onPurchaseComplete={(beatId, licenseType) => {
            console.log('Purchase completed:', beatId, licenseType)
          }}
        />
      )}
    </div>
  )
}