'use client'

import { useState } from 'react'
import { Beat, License } from '@/types'
import { useAuth } from '@/context/AuthContext'

interface PurchaseModalProps {
  beat: Beat
  isOpen: boolean
  onClose: () => void
  onPurchaseComplete?: (beatId: string, licenseType: string) => void
}

const LICENSE_TYPES: Record<string, License> = {
  basic: {
    type: 'basic',
    price: 1,
    description: 'Basic license for non-commercial use',
    allowCommercialUse: false,
    allowDistribution: false,
    maxCopies: 2000
  },
  premium: {
    type: 'premium',
    price: 3,
    description: 'Premium license with commercial rights',
    allowCommercialUse: true,
    allowDistribution: true,
    maxCopies: 10000
  },
  exclusive: {
    type: 'exclusive',
    price: 10,
    description: 'Exclusive rights - beat removed from marketplace',
    allowCommercialUse: true,
    allowDistribution: true
  }
}

export default function PurchaseModal({ beat, isOpen, onClose, onPurchaseComplete }: PurchaseModalProps) {
  const { user } = useAuth()
  const [selectedLicense, setSelectedLicense] = useState<string>('basic')
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>('crypto')
  const [processing, setProcessing] = useState(false)
  const [step, setStep] = useState<'license' | 'payment' | 'confirmation'>('license')

  if (!isOpen) return null

  const selectedLicenseData = LICENSE_TYPES[selectedLicense]
  const totalPrice = beat.price * selectedLicenseData.price

  const handlePurchase = async () => {
    if (!user) return

    setProcessing(true)
    
    try {
      // Mock purchase process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setStep('confirmation')
      
      if (onPurchaseComplete) {
        onPurchaseComplete(beat.id, selectedLicense)
      }
    } catch (error) {
      console.error('Purchase failed:', error)
    } finally {
      setProcessing(false)
    }
  }

  const handleClose = () => {
    setStep('license')
    setSelectedLicense('basic')
    setPaymentMethod('crypto')
    setProcessing(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Purchase Beat</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Beat Info */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-center gap-4">
            {beat.coverImageUrl && (
              <img
                src={beat.coverImageUrl}
                alt={beat.title}
                className="w-16 h-16 rounded object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{beat.title}</h3>
              <p className="text-gray-600">{beat.genre} • {beat.bpm} BPM • {beat.key}</p>
              <p className="text-sm text-gray-500">{beat.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'license' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Choose License Type</h3>
              
              <div className="space-y-3">
                {Object.entries(LICENSE_TYPES).map(([key, license]) => (
                  <div
                    key={key}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedLicense === key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedLicense(key)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={selectedLicense === key}
                            onChange={() => setSelectedLicense(key)}
                            className="text-blue-600"
                          />
                          <h4 className="font-medium capitalize">{license.type} License</h4>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{license.description}</p>
                        
                        <div className="mt-2 space-y-1 text-xs text-gray-500">
                          <p>• Commercial use: {license.allowCommercialUse ? 'Yes' : 'No'}</p>
                          <p>• Distribution: {license.allowDistribution ? 'Yes' : 'No'}</p>
                          {license.maxCopies && <p>• Max copies: {license.maxCopies.toLocaleString()}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">${(beat.price * license.price).toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{license.price}x base price</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setStep('payment')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Payment Method</h3>
                <button
                  onClick={() => setStep('license')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ← Back
                </button>
              </div>

              <div className="space-y-3">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'crypto'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('crypto')}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={paymentMethod === 'crypto'}
                      onChange={() => setPaymentMethod('crypto')}
                      className="text-blue-600"
                    />
                    <div>
                      <h4 className="font-medium">Cryptocurrency</h4>
                      <p className="text-sm text-gray-600">Pay with ETH, USDC, or other tokens</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-blue-600"
                    />
                    <div>
                      <h4 className="font-medium">Credit Card</h4>
                      <p className="text-sm text-gray-600">Pay with Visa, Mastercard, or other cards</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <p className="text-yellow-800 text-sm">
                    <strong>Mock Payment:</strong> This is a development demo. No real payment will be processed.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
                </div>
                <button
                  onClick={handlePurchase}
                  disabled={processing}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {processing ? 'Processing...' : 'Complete Purchase'}
                </button>
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-green-600">Purchase Successful!</h3>
                <p className="text-gray-600 mt-2">
                  You now have a {selectedLicenseData.type} license for "{beat.title}"
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h4 className="font-medium mb-2">License Details</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• License Type: {selectedLicenseData.type.charAt(0).toUpperCase() + selectedLicenseData.type.slice(1)}</p>
                  <p>• Commercial Use: {selectedLicenseData.allowCommercialUse ? 'Allowed' : 'Not Allowed'}</p>
                  <p>• Distribution: {selectedLicenseData.allowDistribution ? 'Allowed' : 'Not Allowed'}</p>
                  {selectedLicenseData.maxCopies && <p>• Max Copies: {selectedLicenseData.maxCopies.toLocaleString()}</p>}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Download Beat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}