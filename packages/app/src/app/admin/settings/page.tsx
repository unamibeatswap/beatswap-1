'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function SystemSettingsPage() {
  const { userProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    platformCommission: 15,
    maxFileSize: 50,
    allowedFormats: ['mp3', 'wav', 'flac'],
    autoApproval: false,
    maintenanceMode: false,
    emailNotifications: true,
    web3Enabled: true,
    stripeEnabled: true,
    payfastEnabled: true
  })

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

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    // In production, this would save to Firebase
    console.log('Saving settings:', settings)
    alert('Settings saved successfully!')
  }

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
        color: 'white',
        padding: '4rem 2rem',
        marginBottom: '2rem'
      }}>
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">⚙️ System Settings</h1>
            <p className="text-xl opacity-90 mb-6">Configure platform settings and preferences</p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-full">
                💰 {settings.platformCommission}% Commission
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                💾 {settings.maxFileSize}MB Max Size
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                {settings.maintenanceMode ? '🔴 Maintenance' : '🟢 Active'}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'general', name: 'General' },
              { id: 'payments', name: 'Payments' },
              { id: 'uploads', name: 'Uploads' },
              { id: 'notifications', name: 'Notifications' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">General Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Commission (%)
                </label>
                <input
                  type="number"
                  value={settings.platformCommission}
                  onChange={(e) => handleSettingChange('platformCommission', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="50"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Percentage of each sale that goes to the platform
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Maintenance Mode
                  </label>
                  <p className="text-sm text-gray-500">
                    Enable to temporarily disable the platform
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('maintenanceMode', !settings.maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.maintenanceMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Auto-Approval for Beats
                  </label>
                  <p className="text-sm text-gray-500">
                    Automatically approve uploaded beats without manual review
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('autoApproval', !settings.autoApproval)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoApproval ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoApproval ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Settings */}
        {activeTab === 'payments' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Web3/Crypto Payments
                  </label>
                  <p className="text-sm text-gray-500">
                    Enable Ethereum and Polygon payments
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('web3Enabled', !settings.web3Enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.web3Enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.web3Enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stripe Payments
                  </label>
                  <p className="text-sm text-gray-500">
                    Enable credit card payments via Stripe
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('stripeEnabled', !settings.stripeEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.stripeEnabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.stripeEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    PayFast Payments (South Africa)
                  </label>
                  <p className="text-sm text-gray-500">
                    Enable local South African payments
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('payfastEnabled', !settings.payfastEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.payfastEnabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.payfastEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <p className="text-yellow-800 text-sm">
                    <strong>Payment Configuration:</strong> Ensure API keys are configured in environment variables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Settings */}
        {activeTab === 'uploads' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upload Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum File Size (MB)
                </label>
                <input
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="100"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Maximum file size allowed for beat uploads
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allowed File Formats
                </label>
                <div className="space-y-2">
                  {['mp3', 'wav', 'flac', 'aiff'].map((format) => (
                    <label key={format} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.allowedFormats.includes(format)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleSettingChange('allowedFormats', [...settings.allowedFormats, format])
                          } else {
                            handleSettingChange('allowedFormats', settings.allowedFormats.filter(f => f !== format))
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 uppercase">{format}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Send email notifications for important events
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Notification Types</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• New user registrations</li>
                  <li>• Beat uploads requiring review</li>
                  <li>• Payment transactions</li>
                  <li>• System errors and alerts</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex justify-end">
            <button
              onClick={saveSettings}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}