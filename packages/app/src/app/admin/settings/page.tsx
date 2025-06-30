'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'react-toastify'

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
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: 'BeatsChain - Web3 Music Marketplace',
    metaDescription: 'Decentralized marketplace for music producers and artists. Buy, sell, and trade beats using blockchain technology.',
    contactEmail: 'info@unamifoundation.org',
    primaryDomain: 'https://www.beatschain.app',
    twitterHandle: '@BeatsChain',
    instagramHandle: '@beatschain',
    facebookPage: 'BeatsChain',
    linkedinCompany: 'beatschain',
    tiktokHandle: '@beatschain',
    ogImageUrl: 'https://www.beatschain.app/og-image.jpg',
    gtmId: ''
  })
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

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

  const handleSiteSettingChange = (key: string, value: any) => {
    setSiteSettings(prev => ({ ...prev, [key]: value }))
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      // Simulate API call to Firebase
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would save to Firebase Firestore
      // await updateDoc(doc(db, 'site-settings', 'main'), { ...settings, ...siteSettings })
      
      setLastSaved(new Date())
      toast.success('Settings saved successfully!')
      
      console.log('Settings saved:', { settings, siteSettings })
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Here you would load from Firebase
        // const doc = await getDoc(doc(db, 'site-settings', 'main'))
        // if (doc.exists()) {
        //   const data = doc.data()
        //   setSettings(data.settings || settings)
        //   setSiteSettings(data.siteSettings || siteSettings)
        // }
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }
    
    loadSettings()
  }, [])

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
              { id: 'site', name: 'Site Settings' },
              { id: 'payments', name: 'Payments' },
              { id: 'uploads', name: 'Uploads' },
              { id: 'notifications', name: 'Notifications' },
              { id: 'cms', name: 'CMS' }
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

        {/* Site Settings */}
        {activeTab === 'site' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Site Settings</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3">🔍 SEO & Analytics</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Google Tag Manager ID
                    </label>
                    <input
                      type="text"
                      value={siteSettings.gtmId}
                      onChange={(e) => handleSiteSettingChange('gtmId', e.target.value)}
                      placeholder="GTM-XXXXXXX"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Configure in environment: NEXT_PUBLIC_GTM_ID</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Title
                    </label>
                    <input
                      type="text"
                      value={siteSettings.siteTitle}
                      onChange={(e) => handleSiteSettingChange('siteTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      rows={3}
                      value={siteSettings.metaDescription}
                      onChange={(e) => handleSiteSettingChange('metaDescription', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-3">📱 Social Media</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter Handle
                    </label>
                    <input
                      type="text"
                      value={siteSettings.twitterHandle}
                      onChange={(e) => handleSiteSettingChange('twitterHandle', e.target.value)}
                      placeholder="@BeatsChain"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={siteSettings.instagramHandle}
                      onChange={(e) => handleSiteSettingChange('instagramHandle', e.target.value)}
                      placeholder="@beatschain"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Facebook Page
                    </label>
                    <input
                      type="text"
                      value={siteSettings.facebookPage}
                      onChange={(e) => handleSiteSettingChange('facebookPage', e.target.value)}
                      placeholder="BeatsChain"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn Company
                    </label>
                    <input
                      type="text"
                      value={siteSettings.linkedinCompany}
                      onChange={(e) => handleSiteSettingChange('linkedinCompany', e.target.value)}
                      placeholder="beatschain"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      TikTok Handle
                    </label>
                    <input
                      type="text"
                      value={siteSettings.tiktokHandle}
                      onChange={(e) => handleSiteSettingChange('tiktokHandle', e.target.value)}
                      placeholder="@beatschain"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Open Graph Image URL
                    </label>
                    <input
                      type="url"
                      value={siteSettings.ogImageUrl}
                      onChange={(e) => handleSiteSettingChange('ogImageUrl', e.target.value)}
                      placeholder="https://www.beatschain.app/og-image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-3">🌐 Site Configuration</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Domain
                    </label>
                    <input
                      type="url"
                      value={siteSettings.primaryDomain}
                      onChange={(e) => handleSiteSettingChange('primaryDomain', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => handleSiteSettingChange('contactEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Enable Robots.txt
                      </label>
                      <p className="text-sm text-gray-500">
                        Allow search engines to index the site
                      </p>
                    </div>
                    <button
                      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-blue-600"
                    >
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                </div>
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

        {/* CMS Settings */}
        {activeTab === 'cms' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Content Management System</h3>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Sanity Studio</h4>
                    <p className="text-blue-700 text-sm">Manage blog posts, featured content, and site content</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <a
                    href="https://3tpr4tci.sanity.studio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open Sanity Studio
                  </a>
                  <a
                    href="/blog"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 font-medium"
                  >
                    View Blog
                  </a>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Studio URL:</strong> https://3tpr4tci.sanity.studio/<br/>
                    <strong>Project ID:</strong> 3tpr4tci<br/>
                    <strong>Dataset:</strong> production<br/>
                    <strong>Status:</strong> <span className="text-green-600">✅ Active</span>
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    <p>• Blog posts and content management</p>
                    <p>• Featured producers and beats</p>
                    <p>• Homepage content and announcements</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">📝 Blog Management</h5>
                  <p className="text-sm text-gray-600 mb-3">Create and manage blog posts, categories, and authors</p>
                  <div className="text-xs text-gray-500">
                    Access: /studio → Posts
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">🎵 Featured Content</h5>
                  <p className="text-sm text-gray-600 mb-3">Manage featured beats, producers, and homepage content</p>
                  <div className="text-xs text-gray-500">
                    Access: /studio → Featured
                  </div>
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
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {lastSaved && (
                <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
              )}
            </div>
            <button
              onClick={saveSettings}
              disabled={saving}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                saving 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}