'use client'

import { useMockAuth as useAuth } from '@/context/MockAuthContext'
import AudioPlayer from '@/components/audio/AudioPlayer'

// Mock purchased beats data
const mockPurchasedBeats = [
  {
    id: '1',
    title: 'Dark Trap Beat',
    description: 'Hard hitting trap beat with dark melodies',
    producerId: 'producer-1',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    coverImageUrl: 'https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Dark+Trap',
    price: 29.99,
    genre: 'trap',
    bpm: 140,
    key: 'Am',
    tags: ['dark', 'trap', 'hard'],
    isNFT: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    purchaseDate: new Date('2024-01-20'),
    licenseType: 'premium',
    downloadCount: 3
  }
]

export default function LibraryPage() {
  const { user, userProfile, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your library</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Library</h1>
        <p className="text-gray-600">Your purchased beats and downloads</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Beats</p>
              <p className="text-2xl font-bold text-gray-900">{mockPurchasedBeats.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                ${mockPurchasedBeats.reduce((sum, beat) => sum + beat.price, 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Downloads</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPurchasedBeats.reduce((sum, beat) => sum + beat.downloadCount, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Purchased Beats */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Purchased Beats</h2>
        </div>
        
        {mockPurchasedBeats.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No beats purchased yet</h3>
            <p className="text-gray-500 mb-4">Browse the marketplace to find beats you love</p>
            <a
              href="/marketplace"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Browse Marketplace
            </a>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {mockPurchasedBeats.map((beat) => (
              <div key={beat.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    {beat.coverImageUrl && (
                      <img
                        src={beat.coverImageUrl}
                        alt={beat.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{beat.title}</h3>
                      <p className="text-gray-600">{beat.genre} • {beat.bpm} BPM • {beat.key}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>Purchased: {beat.purchaseDate.toLocaleDateString()}</span>
                        <span className="capitalize">{beat.licenseType} License</span>
                        <span>{beat.downloadCount} downloads</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                      Download
                    </button>
                    <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 text-sm">
                      License
                    </button>
                  </div>
                </div>

                <AudioPlayer beat={beat} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mock Data Notice */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <p className="text-yellow-800 text-sm">
            <strong>Development Mode:</strong> Using mock library data. Real purchases will be stored in Firestore.
          </p>
        </div>
      </div>
    </div>
  )
}