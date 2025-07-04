'use client'

import { useState, useEffect } from 'react'
import { useUnifiedAuth } from '@/context/UnifiedAuthContext'
import { ApiClient } from '@/lib/api'
import { UserProfile } from '@/types'
import { LinkComponent } from '@/components/LinkComponent'

export default function AdminUsersPage() {
  const { userProfile } = useUnifiedAuth()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'user' | 'producer' | 'admin'>('all')

  useEffect(() => {
    if (user?.role !== 'admin') return

    const fetchUsers = async () => {
      try {
        setLoading(true)
        const fetchedUsers = await ApiClient.getUsers({
          role: filter === 'all' ? undefined : filter,
          limit: 100
        })
        setUsers(fetchedUsers)
      } catch (err: any) {
        setError(err.message)
        // Mock data fallback
        setUsers([
          {
            uid: '1',
            email: 'producer1@example.com',
            displayName: 'Beat Producer',
            role: 'producer',
            isVerified: true,
            createdAt: new Date('2024-01-15')
          },
          {
            uid: '2',
            email: 'user1@example.com',
            displayName: 'Music Fan',
            role: 'user',
            isVerified: false,
            createdAt: new Date('2024-01-20')
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [userProfile, filter])

  if (user?.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p>Admin access required</p>
          <LinkComponent href="/admin" className="text-blue-600 hover:underline">
            Back to Admin
          </LinkComponent>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">👥 User Management</h1>
              <p className="opacity-90">Manage platform users and permissions</p>
            </div>
            <LinkComponent 
              href="/admin" 
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              ← Back to Admin
            </LinkComponent>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <h2 className="text-lg font-semibold">Filter Users</h2>
          </div>
          <div className="flex gap-2">
            {(['all', 'user', 'producer', 'admin'] as const).map((roleFilter) => (
              <button
                key={roleFilter}
                onClick={() => setFilter(roleFilter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === roleFilter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {roleFilter === 'all' ? 'All Users' : roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}s
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">
              Users ({users.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading users...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-600 mb-2">Error: {error}</p>
              <p className="text-sm text-gray-600">Showing mock data</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.uid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
                              {user.displayName.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.displayName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-red-100 text-red-800'
                            : user.role === 'producer'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isVerified
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.isVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Suspend
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}