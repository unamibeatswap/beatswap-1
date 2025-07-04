'use client'

import { useState, useEffect } from 'react'
import { useUnifiedAuth } from '@/context/UnifiedAuthContext'
import { ApiClient } from '@/lib/api'
import { LinkComponent } from '@/components/LinkComponent'

export default function AdminContentPage() {
  const { userProfile } = useUnifiedAuth()
  const [beats, setBeats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.role === 'admin') {
      ApiClient.getBeats({ limit: 50 })
        .then(setBeats)
        .catch(() => setBeats([
          { id: '1', title: 'Sample Beat', genre: 'trap', status: 'pending', createdAt: new Date() }
        ]))
        .finally(() => setLoading(false))
    }
  }, [userProfile])

  const handleApprove = async (id: string) => {
    try {
      await ApiClient.updateBeat(id, { status: 'approved' })
      setBeats(beats.map(b => b.id === id ? { ...b, status: 'approved' } : b))
    } catch (err) {
      console.error('Approve failed:', err)
    }
  }

  const handleReject = async (id: string) => {
    try {
      await ApiClient.updateBeat(id, { status: 'rejected' })
      setBeats(beats.map(b => b.id === id ? { ...b, status: 'rejected' } : b))
    } catch (err) {
      console.error('Reject failed:', err)
    }
  }

  if (user?.role !== 'admin') {
    return <div className="p-8 text-center">Access Denied</div>
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">🎵 Content Moderation</h1>
          <LinkComponent href="/admin" className="text-white/80 hover:text-white">← Back to Admin</LinkComponent>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Beats Awaiting Review ({beats.length})</h2>
            </div>
            <div className="divide-y">
              {beats.map((beat) => (
                <div key={beat.id} className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{beat.title}</h3>
                    <p className="text-sm text-gray-600">Genre: {beat.genre} • Uploaded: {new Date(beat.createdAt).toLocaleDateString()}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                      beat.status === 'approved' ? 'bg-green-100 text-green-800' :
                      beat.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {beat.status || 'pending'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(beat.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(beat.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}