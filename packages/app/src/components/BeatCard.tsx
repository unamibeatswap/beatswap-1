'use client'

import { useState, useRef, useEffect } from 'react'
import { Beat } from '@/types'
import PurchaseModal from './purchase/PurchaseModal'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'react-toastify'

interface BeatCardProps {
  beat: Beat
}

export default function BeatCard({ beat }: BeatCardProps) {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Audio player functionality
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Audio play error:', error)
      toast.error('Unable to play audio')
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    const progressBar = progressRef.current
    if (!audio || !progressBar || !duration) return

    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    audio.currentTime = newTime
  }

  const handlePurchase = () => {
    if (!user) {
      toast.error('Please sign in to purchase beats')
      return
    }
    setShowPurchaseModal(true)
  }

  const handlePurchaseComplete = (beatId: string, licenseType: string) => {
    console.log(`Purchase completed: ${beatId} with ${licenseType} license`)
    setShowPurchaseModal(false)
    toast.success('Purchase successful!')
  }

  const handleLike = () => {
    if (!user) {
      toast.error('Please sign in to like beats')
      return
    }
    setIsLiked(!isLiked)
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites')
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price)
  }

  return (
    <>
      <div style={{
        background: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb', overflow: 'hidden'
      }}>
        <div style={{
          height: '200px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: '1.125rem', fontWeight: '600'
        }}>
          {beat.coverImageUrl ? (
            <img src={beat.coverImageUrl} alt={beat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span>🎵 {beat.title}</span>
          )}
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                {beat.title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                {beat.bpm} BPM • {beat.key}
              </p>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Producer
              </p>
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>{formatPrice(beat.price)}</p>
          </div>
          
          {/* Enhanced Audio Player */}
          <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <button onClick={togglePlay} disabled={isLoading} style={{
                background: '#3b82f6', color: 'white', border: 'none', borderRadius: '50%',
                width: '2.5rem', height: '2.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {isLoading ? (
                  <div style={{ width: '16px', height: '16px', border: '2px solid white', borderTop: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                ) : isPlaying ? '⏸' : '▶'}
              </button>
              <div style={{ flex: 1, height: '6px', background: '#d1d5db', borderRadius: '3px', cursor: 'pointer' }} onClick={handleProgressClick} ref={progressRef}>
                <div style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`, height: '100%', background: '#3b82f6', borderRadius: '3px' }}></div>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🔄</button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🔀</button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🔊</button>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>1.2K plays</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handlePurchase} style={{
              flex: 1, background: '#3b82f6', color: 'white', padding: '0.75rem',
              border: 'none', borderRadius: '0.375rem', fontWeight: '500', cursor: 'pointer'
            }}>Purchase Beat</button>
            <button onClick={handleLike} style={{
              padding: '0.75rem', background: isLiked ? '#fef2f2' : 'white', 
              border: `1px solid ${isLiked ? '#fca5a5' : '#d1d5db'}`,
              borderRadius: '0.375rem', cursor: 'pointer',
              color: isLiked ? '#dc2626' : '#6b7280'
            }}>{isLiked ? '♥' : '♡'}</button>
          </div>
        </div>
        
        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={beat.audioUrl || 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'}
          preload="metadata"
          onError={() => {
            console.warn('Audio failed to load:', beat.audioUrl)
            setIsLoading(false)
          }}
        />
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        beat={beat}
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </>
  )
}