'use client'

import { useState, useEffect } from 'react'

interface SiteSettings {
  gtmId: string
  gtmEnabled: boolean
  analyticsEnabled: boolean
  maintenanceMode: boolean
}

const defaultSettings: SiteSettings = {
  gtmId: '',
  gtmEnabled: false,
  analyticsEnabled: true,
  maintenanceMode: false
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load settings from localStorage or API
    const loadSettings = () => {
      try {
        const saved = localStorage.getItem('beatschain-site-settings')
        if (saved) {
          setSettings({ ...defaultSettings, ...JSON.parse(saved) })
        }
      } catch (error) {
        console.warn('Failed to load site settings:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    
    try {
      localStorage.setItem('beatschain-site-settings', JSON.stringify(updated))
    } catch (error) {
      console.warn('Failed to save site settings:', error)
    }
  }

  return {
    settings,
    updateSettings,
    loading
  }
}