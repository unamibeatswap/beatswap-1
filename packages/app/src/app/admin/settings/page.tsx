'use client'

import React, { useState } from 'react'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { useWeb3Profile } from '@/hooks/useWeb3Profile'
import { LinkComponent } from '@/components/LinkComponent'
import { toast } from 'react-toastify'

export default function AdminSettingsPage() {
  const { profile, isConnected } = useWeb3Profile()
  const { 
    settings, 
    loading, 
    saving,
    updateSettings,
    addFeaturedGenre,
    removeFeaturedGenre,
    toggleMaintenanceMode,
    validateSettings
  } = useSiteSettings()
  
  const [newGenre, setNewGenre] = useState('')
  const [formData, setFormData] = useState(settings)

  React.useEffect(() => {
    setFormData(settings)
  }, [settings])

  if (!isConnected) {
    return (
      <div className="p-8 text-center">
        <div className="text-6xl mb-4">🔗</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
        <p className="text-gray-600">Please connect your wallet to access admin settings.</p>
        <div className="mt-4">
          <w3m-button />
        </div>
      </div>
    )
  }

  if (profile?.role !== 'admin') {
    return <div className="p-8 text-center">Access Denied</div>
  }

  const handleSave = async () => {
    const validationErrors = validateSettings(formData)
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error))
      return
    }

    const success = await updateSettings(formData)
    if (success) {
      toast.success('Settings saved successfully!')
    } else {
      toast.error('Failed to save settings')
    }
  }

  const handleAddGenre = async () => {
    if (!newGenre.trim()) return
    
    const success = await addFeaturedGenre(newGenre.trim())
    if (success) {
      setNewGenre('')
      toast.success('Genre added successfully!')
    } else {
      toast.error('Genre already exists or failed to add')
    }
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
                value={formData.platformFee}
                onChange={(e) => setFormData({...formData, platformFee: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md"
                min="0" max="10" step="0.1"
              />
              <p className="text-sm text-gray-600 mt-1">Commission taken from each sale (0-10%)</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Upload Size (MB)</label>
              <input
                type="number"
                value={formData.maxUploadSize}
                onChange={(e) => setFormData({...formData, maxUploadSize: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md"
                min="1" max="100"
              />
              <p className="text-sm text-gray-600 mt-1">Maximum audio file size for uploads</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Min Price (ETH)</label>
                <input
                  type="number"
                  value={formData.minimumPrice}
                  onChange={(e) => setFormData({...formData, minimumPrice: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0" step="0.001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Price (ETH)</label>
                <input
                  type="number"
                  value={formData.maximumPrice}
                  onChange={(e) => setFormData({...formData, maximumPrice: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0" step="0.1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Featured Genres</label>
              <div className="mb-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Add new genre"
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                  <button
                    onClick={handleAddGenre}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {settings.featuredGenres.map(genre => (
                  <span
                    key={genre}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {genre}
                    <button
                      onClick={() => removeFeaturedGenre(genre)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h3 className="font-medium text-green-800">Registration Open</h3>
                <p className="text-sm text-green-600">Allow new user registrations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.registrationOpen}
                  onChange={(e) => setFormData({...formData, registrationOpen: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
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
                  onChange={toggleMaintenanceMode}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}