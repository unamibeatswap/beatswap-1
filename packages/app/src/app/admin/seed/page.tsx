'use client'

import { useState } from 'react'
import { seedDatabase, clearDatabase } from '@/utils/seedDatabase'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'react-toastify'

export default function SeedDataPage() {
  const { userProfile } = useAuth()
  const [seeding, setSeeding] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  if (userProfile?.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600">Admin access required</p>
        </div>
      </div>
    )
  }

  const handleSeedData = async () => {
    setSeeding(true)
    setResult(null)
    
    try {
      const result = await seedDatabase()
      if (result.success) {
        setResult('✅ Database seeded successfully with test data!')
        toast.success('Database seeded successfully!')
      } else {
        setResult(`❌ Error: ${result.message}`)
        toast.error('Failed to seed database')
      }
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`)
      toast.error('Failed to seed database')
    } finally {
      setSeeding(false)
    }
  }

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear all test data? This action cannot be undone.')) {
      return
    }
    
    setSeeding(true)
    setResult(null)
    
    try {
      const result = await clearDatabase()
      if (result.success) {
        setResult('✅ Database cleared successfully!')
        toast.success('Database cleared successfully!')
      } else {
        setResult(`❌ Error: ${result.message}`)
        toast.error('Failed to clear database')
      }
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`)
      toast.error('Failed to clear database')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Seed Test Data</h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-yellow-800 mb-2">⚠️ Warning</h2>
          <p className="text-yellow-700 text-sm">
            This will add test data to your Firebase database. Only use in development/testing environments.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Data Includes:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
            <li>3 Test Users (1 producer, 1 user, 1 admin)</li>
            <li>4 Test Beats with metadata and cover images</li>
            <li>User statistics and activity data</li>
            <li>Producer earnings and verification status</li>
          </ul>

          <div className="space-y-3">
            <button
              onClick={handleSeedData}
              disabled={seeding}
              className={`w-full py-3 px-4 rounded-md font-medium ${
                seeding
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
            >
              {seeding ? 'Seeding Data...' : 'Seed Firebase Data'}
            </button>
            
            <button
              onClick={handleClearData}
              disabled={seeding}
              className={`w-full py-3 px-4 rounded-md font-medium ${
                seeding
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white transition-colors`}
            >
              {seeding ? 'Clearing Data...' : 'Clear Test Data'}
            </button>
          </div>

          {result && (
            <div className="mt-4 p-3 rounded-md bg-gray-50">
              <p className="text-sm">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}