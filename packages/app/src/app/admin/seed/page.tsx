'use client'

import { useState } from 'react'
import { seedFirebaseData } from '@/utils/seedData'
import { useAuth } from '@/context/AuthContext'

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
      const success = await seedFirebaseData()
      if (success) {
        setResult('✅ Firebase seeded successfully with test data!')
      } else {
        setResult('❌ Failed to seed Firebase data')
      }
    } catch (error) {
      setResult(`❌ Error: ${error}`)
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
            <li>4 Test Users (2 producers, 1 user, 1 admin)</li>
            <li>3 Test Beats with metadata</li>
            <li>Producer statistics</li>
            <li>2 Test purchases</li>
          </ul>

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