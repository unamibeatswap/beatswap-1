'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useAuth } from '@/context/AuthContext'
import { useBeats } from '@/hooks/useBeats'
import AudioPlayer from '@/components/audio/AudioPlayer'

interface ContentReview {
  id: string
  beatId: string
  beatTitle: string
  producerName: string
  uploadDate: Date
  status: 'pending' | 'approved' | 'rejected'
  flagReason?: string
  reviewedBy?: string
  reviewDate?: Date
}

const mockReviews: ContentReview[] = [
  {
    id: '1',
    beatId: '1',
    beatTitle: 'Dark Trap Beat',
    producerName: 'Beat Master',
    uploadDate: new Date('2024-01-25'),
    status: 'pending'
  },
  {
    id: '2',
    beatId: '2',
    beatTitle: 'Melodic Hip Hop',
    producerName: 'Producer Pro',
    uploadDate: new Date('2024-01-24'),
    status: 'approved',
    reviewedBy: 'Admin',
    reviewDate: new Date('2024-01-24')
  }
]

function ContentModeration() {
  const { userProfile } = useAuth()
  const { beats } = useBeats()
  const [reviews, setReviews] = useState(mockReviews)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedReview, setSelectedReview] = useState<ContentReview | null>(null)

  if (userProfile?.role !== 'admin') {
    return <div className="p-8 text-center">Access Denied</div>
  }

  const filteredReviews = reviews.filter(review => 
    statusFilter === 'all' || review.status === statusFilter
  )

  const updateReviewStatus = (reviewId: string, status: 'approved' | 'rejected', reason?: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            status, 
            flagReason: reason,
            reviewedBy: userProfile?.displayName || 'Admin',
            reviewDate: new Date()
          }
        : review
    ))
    setSelectedReview(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Content Moderation</h1>
        <p className="text-gray-600">Review and moderate beat uploads</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-600">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600">
            {reviews.filter(r => r.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {reviews.filter(r => r.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-600">Rejected</p>
          <p className="text-2xl font-bold text-red-600">
            {reviews.filter(r => r.status === 'rejected').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-600">Total Beats</p>
          <p className="text-2xl font-bold text-gray-900">{beats.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Bulk Actions
            </button>
          </div>
        </div>
      </div>

      {/* Content Review List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Content Reviews ({filteredReviews.length})</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredReviews.map((review) => {
            const beat = beats.find(b => b.id === review.beatId)
            return (
              <div key={review.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      {beat?.coverImageUrl && (
                        <img
                          src={beat.coverImageUrl}
                          alt={review.beatTitle}
                          className="w-16 h-16 rounded object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{review.beatTitle}</h3>
                        <p className="text-gray-600">by {review.producerName}</p>
                        <p className="text-sm text-gray-500">
                          Uploaded: {review.uploadDate.toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </span>
                    </div>

                    {beat && (
                      <div className="mb-4">
                        <AudioPlayer beat={beat} previewMode={true} />
                      </div>
                    )}

                    {beat && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-medium">Genre:</span> {beat.genre}
                        </div>
                        <div>
                          <span className="font-medium">BPM:</span> {beat.bpm}
                        </div>
                        <div>
                          <span className="font-medium">Key:</span> {beat.key}
                        </div>
                        <div>
                          <span className="font-medium">Price:</span> ${beat.price}
                        </div>
                      </div>
                    )}

                    {beat?.tags && (
                      <div className="mb-4">
                        <span className="font-medium text-sm">Tags:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {beat.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {review.status !== 'pending' && (
                      <div className="text-sm text-gray-600">
                        <p>Reviewed by {review.reviewedBy} on {review.reviewDate?.toLocaleDateString()}</p>
                        {review.flagReason && (
                          <p className="text-red-600 mt-1">Reason: {review.flagReason}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {review.status === 'pending' && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => updateReviewStatus(review.id, 'approved')}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setSelectedReview(review)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Rejection Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Reject Content</h2>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Rejecting: <strong>{selectedReview.beatTitle}</strong>
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for rejection
                </label>
                <select
                  id="rejectionReason"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select reason...</option>
                  <option value="Copyright violation">Copyright violation</option>
                  <option value="Inappropriate content">Inappropriate content</option>
                  <option value="Poor audio quality">Poor audio quality</option>
                  <option value="Misleading metadata">Misleading metadata</option>
                  <option value="Spam or duplicate">Spam or duplicate</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setSelectedReview(null)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const reason = (document.getElementById('rejectionReason') as HTMLSelectElement)?.value
                    updateReviewStatus(selectedReview.id, 'rejected', reason)
                  }}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default dynamic(() => Promise.resolve(ContentModeration), {
  ssr: false
})