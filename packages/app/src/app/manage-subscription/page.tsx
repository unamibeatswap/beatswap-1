'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { SUBSCRIPTION_PLANS } from '@/types/subscription'

export default function ManageSubscriptionPage() {
  const { user } = useAuth()
  const [currentPlan] = useState('free')

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600">Please sign in to manage your subscription</p>
        </div>
      </div>
    )
  }

  const handleUpgrade = (planId: string) => {
    alert('Stripe integration required for subscription management')
  }

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        color: 'white',
        padding: '4rem 2rem',
        marginBottom: '2rem'
      }}>
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">💳 Manage Subscription</h1>
            <p className="text-xl opacity-90 mb-6">Choose the plan that works best for your music journey</p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-full">
                🎆 Current: Free Plan
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                📊 Upgrade for More Features
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                🔒 Cancel Anytime
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-blue-900">Current Plan: Free</h2>
            <p className="text-blue-700">You're currently on the free plan</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900">R0</div>
            <div className="text-sm text-blue-700">per month</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`bg-white rounded-lg shadow-lg p-6 ${
              plan.id === 'producer' ? 'ring-2 ring-blue-500 relative' : ''
            }`}
          >
            {plan.id === 'producer' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                R{(plan.price * 18).toFixed(0)}
                <span className="text-lg text-gray-500">/{plan.interval}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleUpgrade(plan.id)}
              disabled={plan.id === currentPlan}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                plan.id === currentPlan
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : plan.id === 'producer'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {plan.id === currentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Current Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Beats Uploaded</span>
              <span className="text-sm text-gray-500">2 / 5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Storage Used</span>
              <span className="text-sm text-gray-500">0.3 / 1 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Analytics Period</span>
              <span className="text-sm text-gray-500">30 days</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}