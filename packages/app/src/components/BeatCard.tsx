'use client'

import { useState } from 'react'
import { Beat } from '@/types'
import AudioPlayer from './audio/AudioPlayer'
import PurchaseModal from './purchase/PurchaseModal'
import { useAuth } from '@/context/AuthContext'

interface BeatCardProps {
  beat: Beat
}

export default function BeatCard({ beat }: BeatCardProps) {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const { user } = useAuth()

  const handlePurchase = () => {
    if (!user) {
      // Show sign in modal or redirect
      alert('Please sign in to purchase beats')
      return
    }
    setShowPurchaseModal(true)
  }

  const handlePurchaseComplete = (beatId: string, licenseType: string) => {
    console.log(`Purchase completed: ${beatId} with ${licenseType} license`)
    setShowPurchaseModal(false)
    // Add to user's library, show success notification, etc.
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
        {/* Beat Cover */}
        <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
          {beat.coverImageUrl ? (
            <img
              src={beat.coverImageUrl}
              alt={beat.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-2">🎵</div>
              <div className="text-sm font-medium">{beat.title}</div>
            </div>
          )}
        </div>

        {/* Beat Info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 truncate">
                {beat.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {beat.genre} • {beat.bpm} BPM • {beat.key}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {beat.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right ml-3">
              <p className="text-xl font-bold text-green-600">
                ${beat.price}
              </p>
            </div>
          </div>

          {/* Audio Player */}
          <div className="mb-4">
            <AudioPlayer beat={beat} previewMode={true} />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handlePurchase}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Purchase Beat
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        beat={beat}
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </>
  )
}