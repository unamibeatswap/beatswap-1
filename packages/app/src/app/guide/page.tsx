'use client'

import { useState } from 'react'

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: '🎯 Overview', icon: '🎯' },
    { id: 'wallet', label: '💳 Wallet Setup', icon: '💳' },
    { id: 'producers', label: '🎵 For Producers', icon: '🎵' },
    { id: 'buyers', label: '🛒 For Buyers', icon: '🛒' },
    { id: 'beatnfts', label: '🎫 BeatNFT Credits', icon: '🎫' }
  ]

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            📖 BeatsChain Guide
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Your complete guide to the world's first Web3 music marketplace
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.3)' }}>
              ⛓️ Blockchain Powered
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.3)' }}>
              🎫 BeatNFT Credits
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.3)' }}>
              🌍 Global Access
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">📖 Welcome to BeatsChain Guide</h2>
                <p className="text-lg text-gray-600">The world's first Web3-native music marketplace connecting South African producers with global artists</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                  <div className="text-4xl mb-4">🎵</div>
                  <h3 className="text-xl font-semibold mb-2">Upload & Mint</h3>
                  <p className="text-gray-600">Producers upload beats and mint them as NFTs using BeatNFT credits</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                  <div className="text-4xl mb-4">🛒</div>
                  <h3 className="text-xl font-semibold mb-2">Browse & Buy</h3>
                  <p className="text-gray-600">Artists discover and purchase beats with cryptocurrency payments</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-xl font-semibold mb-2">Earn & Trade</h3>
                  <p className="text-gray-600">Automatic royalties and NFT ownership create ongoing revenue streams</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">🌟 What Makes BeatsChain Special?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">🎫 BeatNFT Credit System</h4>
                    <p className="text-blue-700 text-sm">Upload beats using blockchain credits instead of traditional subscriptions</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">⛓️ True Ownership</h4>
                    <p className="text-blue-700 text-sm">Beats are minted as NFTs, giving you verifiable blockchain ownership</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">💎 Automatic Royalties</h4>
                    <p className="text-blue-700 text-sm">Smart contracts ensure producers earn from every resale automatically</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">🌍 Global Access</h4>
                    <p className="text-blue-700 text-sm">Cryptocurrency payments remove geographic and banking barriers</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">💳 Wallet Setup Guide</h2>
                <p className="text-lg text-gray-600">Connect your crypto wallet to start using BeatsChain</p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Important</h3>
                <p className="text-yellow-700">You need a crypto wallet to use BeatsChain. Don't worry - we'll guide you through the setup!</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">📱 Step 1: Choose Your Wallet</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">🦊 MetaMask (Recommended)</h4>
                      <p className="text-sm text-gray-600 mb-3">Most popular wallet for beginners</p>
                      <ul className="text-sm space-y-1">
                        <li>• Browser extension</li>
                        <li>• Mobile app available</li>
                        <li>• Easy to use</li>
                        <li>• Wide compatibility</li>
                      </ul>
                      <a href="https://metamask.io" target="_blank" className="inline-block mt-3 bg-orange-500 text-white px-4 py-2 rounded text-sm hover:bg-orange-600">
                        Download MetaMask
                      </a>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">🌈 Rainbow Wallet</h4>
                      <p className="text-sm text-gray-600 mb-3">Beautiful mobile-first wallet</p>
                      <ul className="text-sm space-y-1">
                        <li>• Mobile focused</li>
                        <li>• Great design</li>
                        <li>• Easy onboarding</li>
                        <li>• NFT gallery</li>
                      </ul>
                      <a href="https://rainbow.me" target="_blank" className="inline-block mt-3 bg-purple-500 text-white px-4 py-2 rounded text-sm hover:bg-purple-600">
                        Download Rainbow
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">🔐 Step 2: Secure Your Wallet</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold">Write Down Your Seed Phrase</h4>
                        <p className="text-sm text-gray-600">Your 12-24 word recovery phrase is the key to your wallet. Write it down and store it safely offline.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-semibold">Never Share Your Private Keys</h4>
                        <p className="text-sm text-gray-600">BeatsChain will never ask for your seed phrase or private keys. Keep them secret!</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-semibold">Use Strong Passwords</h4>
                        <p className="text-sm text-gray-600">Set a strong password for your wallet and enable biometric locks if available.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">🔗 Step 3: Connect to BeatsChain</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold">Click "Connect Wallet"</h4>
                        <p className="text-sm text-gray-600">Look for the wallet button in the top right corner of BeatsChain</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-semibold">Select Your Wallet</h4>
                        <p className="text-sm text-gray-600">Choose your wallet from the list (MetaMask, Rainbow, etc.)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-semibold">Approve Connection</h4>
                        <p className="text-sm text-gray-600">Your wallet will ask for permission to connect - click "Connect" or "Approve"</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 You're Ready!</h3>
                  <p className="text-green-700">Once connected, you'll receive 10 free BeatNFT credits to start uploading beats immediately!</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'beatnfts' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">🎫 BeatNFT Credit System</h2>
                <p className="text-lg text-gray-600">Understanding our Web3-native upload system</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4">💰 Credit Packages</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🎁</div>
                      <div className="font-semibold">Free Starter</div>
                      <div className="text-lg font-bold text-green-600">10 Credits</div>
                      <div className="text-sm text-gray-600">New users only</div>
                      <div className="text-xs text-gray-500 mt-2">MP3 uploads only</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🎫</div>
                      <div className="font-semibold">Small Pack</div>
                      <div className="text-lg font-bold">10 Credits</div>
                      <div className="text-sm text-gray-600">0.010 ETH (~R180)</div>
                      <div className="text-xs text-gray-500 mt-2">All file types</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">🎪</div>
                      <div className="font-semibold">Medium Pack</div>
                      <div className="text-lg font-bold">25 Credits</div>
                      <div className="text-sm text-gray-600">0.020 ETH (~R360)</div>
                      <div className="text-xs text-gray-500 mt-2">Best value</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center border-purple-200 bg-purple-50">
                      <div className="text-2xl mb-2">♾️</div>
                      <div className="font-semibold">Pro NFT</div>
                      <div className="text-lg font-bold text-purple-600">Unlimited</div>
                      <div className="text-sm text-gray-600">0.100 ETH (~R1,800)</div>
                      <div className="text-xs text-gray-500 mt-2">One-time purchase</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">❓ Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">Do I need cryptocurrency to use BeatsChain?</h3>
              <p className="text-sm text-gray-600">Yes, BeatsChain is a Web3 platform that uses cryptocurrency for all transactions. We'll help you set up a wallet!</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens to my beats if I lose my wallet?</h3>
              <p className="text-sm text-gray-600">Your beats are NFTs on the blockchain. As long as you have your seed phrase, you can recover your wallet and access your beats.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I sell my BeatNFT credits to someone else?</h3>
              <p className="text-sm text-gray-600">Yes! BeatNFT credits are transferable NFTs. You can trade or gift them to other producers.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do royalties work?</h3>
              <p className="text-sm text-gray-600">Smart contracts automatically pay you royalties every time your beat is resold. No manual tracking needed!</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🚀 Ready to Get Started?</h2>
          <p className="mb-6">Join the future of music with BeatsChain's Web3 marketplace</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Connect Wallet
            </a>
            <a href="/beatnfts" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              Browse BeatNFTs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}