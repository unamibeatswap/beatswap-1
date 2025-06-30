'use client'

import { useAuth } from '@/context/AuthContext'
import { LinkComponent } from './LinkComponent'

export function BackToDashboard() {
  const { userProfile } = useAuth()
  
  if (!userProfile) return null
  
  const dashboardPath = userProfile.role === 'admin' ? '/admin' : '/dashboard'
  
  return (
    <div className="mb-4">
      <LinkComponent 
        href={dashboardPath}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </LinkComponent>
    </div>
  )
}