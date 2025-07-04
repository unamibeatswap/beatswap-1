'use client'

import { NextStudio } from 'next-sanity/studio'
import { useEffect, useState } from 'react'

export default function StudioPage() {
  const [config, setConfig] = useState(null)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const sanityConfig = await import('../../../../../../packages/sanity/sanity.config')
        setConfig(sanityConfig.default)
      } catch (err) {
        console.error('Failed to load Sanity config:', err)
        setError('Studio configuration not found')
      }
    }
    
    loadConfig()
  }, [])
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">🎨 Studio</h1>
          <p className="text-gray-600 mb-4">Content management studio is being configured.</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-700 text-sm">Studio will be available once Sanity CMS is fully configured.</p>
          </div>
        </div>
      </div>
    )
  }
  
  if (!config) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-4xl mb-4">🎨</div>
          <p className="text-gray-600">Loading studio...</p>
        </div>
      </div>
    )
  }
  
  return <NextStudio config={config} />
}