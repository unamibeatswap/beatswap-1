'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { LinkComponent } from '@/components/LinkComponent'

export default function AdminSettingsPage() {
  const { userProfile } = useAuth()
  const [settings, setSettings] = useState({
    platformFee: 10,
    maxFileSize: 50,
    allowedGenres: ['hip-hop', 'trap', 'r&b', 'pop', 'electronic', 'amapiano', 'afrobeats'],
    autoApproval: false,
    maintenanceMode: false
  })

  const handleSave = () => {
    // TODO: Save to Firebase
    alert('Settings saved successfully!')
  }

  if (userProfile?.role !== 'admin') {
    return <div className="p-8 text-center">Access Denied</div>
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">⚙️ System Settings</h1>
          <LinkComponent href="/admin" className="text-white/80 hover:text-white">← Back to Admin</LinkComponent>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Platform Fee (%)</label>
              <input
                type="number"
                value={settings.platformFee}
                onChange={(e) => setSettings({...settings, platformFee: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md"
                min="0" max="50"
              />
              <p className="text-sm text-gray-600 mt-1">Commission taken from each sale</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max File Size (MB)</label>
              <input
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => setSettings({...settings, maxFileSize: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md"
                min="1" max="100"
              />
              <p className="text-sm text-gray-600 mt-1">Maximum audio file size for uploads</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Allowed Genres</label>
              <div className="grid grid-cols-2 gap-2">
                {['hip-hop', 'trap', 'r&b', 'pop', 'electronic', 'amapiano', 'afrobeats', 'house'].map(genre => (
                  <label key={genre} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.allowedGenres.includes(genre)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSettings({...settings, allowedGenres: [...settings.allowedGenres, genre]})
                        } else {
                          setSettings({...settings, allowedGenres: settings.allowedGenres.filter(g => g !== genre)})
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="capitalize">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Auto-Approval</h3>
                <p className="text-sm text-gray-600">Automatically approve new beat uploads</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoApproval}
                  onChange={(e) => setSettings({...settings, autoApproval: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <h3 className="font-medium text-red-800">Maintenance Mode</h3>
                <p className="text-sm text-red-600">Temporarily disable the platform</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}