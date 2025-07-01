'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useAuth } from '@/context/AuthContext'
import { useUsers, UserProfile } from '@/hooks/useUsers'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

function UserManagement() {
  const { userProfile } = useAuth()
  const [realUsers, setRealUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Fetch real users from Firestore
  useEffect(() => {
    const fetchRealUsers = async () => {
      try {
        setLoading(true)
        const usersSnapshot = await getDocs(collection(db, 'users'))
        const users = usersSnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          lastActive: doc.data().lastActive?.toDate() || new Date()
        })) as UserProfile[]
        setRealUsers(users)
      } catch (err: any) {
        setError(err.message)
        console.error('Error fetching users:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRealUsers()
  }, [])

  const filteredUsers = realUsers.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const stats = {
    total: realUsers.length,
    producers: realUsers.filter(u => u.role === 'producer').length,
    verified: realUsers.filter(u => u.isVerified).length,
    activeToday: realUsers.filter(u => {
      const today = new Date()
      return u.lastActive && new Date(u.lastActive).toDateString() === today.toDateString()
    }).length
  }

  if (userProfile?.role !== 'admin') {
    return (
      <div className="p-8 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600">You need admin privileges to access this page.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="text-6xl mb-4">⏳</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Users...</h2>
        <p className="text-gray-600">Fetching user data from database...</p>
      </div>
    )
  }

  const handleRoleUpdate = async (userId: string, newRole: 'user' | 'producer' | 'admin') => {
    setActionLoading(`role-${userId}`)
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole })
      setRealUsers(prev => prev.map(user => 
        user.uid === userId ? { ...user, role: newRole } : user
      ))
      toast.success(`User role updated to ${newRole}`)
    } catch (error) {
      toast.error('Failed to update user role')
    } finally {
      setActionLoading(null)
    }
  }

  const handleVerificationToggle = async (userId: string) => {
    setActionLoading(`verify-${userId}`)
    try {
      const user = realUsers.find(u => u.uid === userId)
      if (!user) return
      
      const newStatus = !user.isVerified
      await updateDoc(doc(db, 'users', userId), { isVerified: newStatus })
      setRealUsers(prev => prev.map(u => 
        u.uid === userId ? { ...u, isVerified: newStatus } : u
      ))
      toast.success('User verification status updated')
    } catch (error) {
      toast.error('Failed to update verification status')
    } finally {
      setActionLoading(null)
    }
  }

  const handleSuspendUser = async (userId: string) => {
    if (!confirm('Are you sure you want to suspend this user?')) return
    
    setActionLoading(`suspend-${userId}`)
    try {
      await updateDoc(doc(db, 'users', userId), { suspended: true })
      toast.success('User suspended successfully')
    } catch (error) {
      toast.error('Failed to suspend user')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return
    
    setActionLoading(`delete-${userId}`)
    try {
      // Note: In production, you'd typically soft delete or use Firebase Admin SDK
      toast.info('User deletion requires admin privileges')
    } catch (error) {
      toast.error('Failed to delete user')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
        color: 'white',
        padding: '4rem 2rem',
        marginBottom: '2rem'
      }}>
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">👥 User Management</h1>
            <p className="text-xl opacity-90 mb-6">Manage users, roles, and permissions across the platform</p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-full">
                👤 {stats.total} Total Users
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                🎤 {stats.producers} Producers
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                ✓ {stats.verified} Verified
              </div>
            </div>
            {error && (
              <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <p className="text-sm">⚠️ {error}</p>
                <p className="text-xs mt-1">Using demo data. Check Firebase connection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-600">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-600">Producers</p>
          <p className="text-2xl font-bold text-gray-900">{stats.producers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-600">Verified</p>
          <p className="text-2xl font-bold text-gray-900">{stats.verified}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-600">Active Today</p>
          <p className="text-2xl font-bold text-gray-900">{stats.activeToday}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Users</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by email or name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="producer">Producers</option>
              <option value="admin">Admins</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Export Users
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Users ({filteredUsers.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user.uid, e.target.value as any)}
                      disabled={actionLoading === `role-${user.uid}`}
                      className="text-sm border border-gray-300 rounded px-2 py-1 disabled:opacity-50"
                    >
                      <option value="user">User</option>
                      <option value="producer">Producer</option>
                      <option value="admin">Admin</option>
                    </select>
                    {actionLoading === `role-${user.uid}` && (
                      <span className="ml-2 text-xs text-blue-600">Updating...</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isVerified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.isVerified ? 'Verified' : 'Unverified'}
                      </span>
                      <button
                        onClick={() => handleVerificationToggle(user.uid)}
                        disabled={actionLoading === `verify-${user.uid}`}
                        className="text-blue-600 hover:text-blue-800 text-xs disabled:opacity-50"
                      >
                        {actionLoading === `verify-${user.uid}` ? 'Updating...' : 'Toggle'}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>Joined: {user.createdAt.toLocaleDateString()}</div>
                      <div>Last: {user.lastActive.toLocaleDateString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>Spent: R{user.totalSpent.toFixed(2)}</div>
                      <div>Earned: R{user.totalEarned.toFixed(2)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleSuspendUser(user.uid)}
                        disabled={actionLoading === `suspend-${user.uid}`}
                        className="text-yellow-600 hover:text-yellow-900 disabled:opacity-50"
                      >
                        {actionLoading === `suspend-${user.uid}` ? 'Suspending...' : 'Suspend'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Display Name</label>
                  <p className="text-gray-900">{selectedUser.displayName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <p className="text-gray-900 capitalize">{selectedUser.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className="text-gray-900">{selectedUser.isVerified ? 'Verified' : 'Unverified'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Spent</label>
                  <p className="text-gray-900">R{selectedUser.totalSpent.toFixed(2)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Earned</label>
                  <p className="text-gray-900">R{selectedUser.totalEarned.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Send Message
                </button>
                <button 
                  onClick={() => handleSuspendUser(selectedUser.uid)}
                  disabled={actionLoading === `suspend-${selectedUser.uid}`}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 disabled:opacity-50"
                >
                  {actionLoading === `suspend-${selectedUser.uid}` ? 'Suspending...' : 'Suspend Account'}
                </button>
                <button 
                  onClick={() => handleDeleteUser(selectedUser.uid)}
                  disabled={actionLoading === `delete-${selectedUser.uid}`}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {actionLoading === `delete-${selectedUser.uid}` ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(UserManagement), {
  ssr: false
})