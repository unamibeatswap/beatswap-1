'use client'

import { useState, useRef } from 'react'
import { useAuth } from '@/context/AuthContext'
import { BackToDashboard } from '@/components/BackToDashboard'
import { toast } from 'react-toastify'

export default function ProfilePage() {
  const { user, userProfile } = useAuth()
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [profileImage, setProfileImage] = useState(userProfile?.profileImage || null)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false
  })
  const [formData, setFormData] = useState({
    firstName: userProfile?.displayName?.split(' ')[0] || 'Beat',
    lastName: userProfile?.displayName?.split(' ')[1] || 'Producer',
    email: userProfile?.email || 'producer@beatswap.com',
    bio: userProfile?.bio || 'Professional music producer specializing in trap and hip-hop beats. Creating fire beats since 2020.',
    walletAddress: userProfile?.walletAddress || '0x742d35Cc6634C0532925a3b8D4C9db96590b5'
  })
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would typically save to Firebase
      // await updateUserProfile(user.uid, { ...formData, settings })
      
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <BackToDashboard />
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
          Profile Settings
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: profileImage ? `url(${profileImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: '3px solid #e5e7eb'
            }} onClick={() => fileInputRef.current?.click()}>
              {!profileImage && (userProfile?.displayName?.[0] || 'U')}
              {uploading && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.7)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.75rem'
                }}>
                  {uploadProgress}%
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'absolute',
                bottom: '-5px',
                right: '-5px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              📷
            </button>
            {profileImage && (
              <button
                onClick={() => {
                  setProfileImage(null)
                  alert('Profile image removed!')
                }}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                ✕
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setUploading(true)
                  setUploadProgress(0)
                  
                  // Simulate upload progress
                  const interval = setInterval(() => {
                    setUploadProgress(prev => {
                      if (prev >= 100) {
                        clearInterval(interval)
                        setUploading(false)
                        // Create object URL for preview
                        const imageUrl = URL.createObjectURL(file)
                        setProfileImage(imageUrl)
                        alert('Profile image uploaded successfully!')
                        return 100
                      }
                      return prev + 10
                    })
                  }, 200)
                }
              }}
            />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
              Beat Producer
            </h2>
            <p style={{ color: '#6b7280' }}>producer@beatswap.com</p>
            <p style={{ color: '#059669', fontSize: '0.875rem', fontWeight: '500' }}>
              ✓ Verified Producer
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Wallet Address
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={formData.walletAddress}
                readOnly
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  background: '#f9fafb'
                }}
              />
              <button style={{
                background: '#3b82f6',
                color: 'white',
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}>
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem' }}>
          Account Settings
        </h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications about sales and updates' },
            { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional emails and newsletters' },
            { key: 'twoFactorAuth', label: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' }
          ].map((setting, index) => (
            <div key={setting.key} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 0',
              borderBottom: index < 2 ? '1px solid #f3f4f6' : 'none'
            }}>
              <div>
                <p style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem' }}>
                  {setting.label}
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  {setting.description}
                </p>
              </div>
              <button
                onClick={() => handleSettingChange(setting.key, !settings[setting.key as keyof typeof settings])}
                style={{
                  position: 'relative',
                  width: '44px',
                  height: '24px',
                  background: settings[setting.key as keyof typeof settings] ? '#3b82f6' : '#d1d5db',
                  borderRadius: '24px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                <span style={{
                  position: 'absolute',
                  height: '18px',
                  width: '18px',
                  left: settings[setting.key as keyof typeof settings] ? '23px' : '3px',
                  top: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'left 0.3s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}></span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button style={{
          background: 'white',
          color: '#6b7280',
          padding: '0.75rem 1.5rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Cancel
        </button>
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{
            background: saving ? '#9ca3af' : '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: '500',
            cursor: saving ? 'not-allowed' : 'pointer'
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>


    </div>
  )
}