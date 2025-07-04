'use client'

// This page is deprecated - admin access is now handled by UnifiedAuth
// Redirect to main admin dashboard
export default function AdminSetupPage() {
  if (typeof window !== 'undefined') {
    window.location.href = '/admin'
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔄</div>
        <p className="text-gray-600">Redirecting to admin dashboard...</p>
      </div>
    </div>
  )
}