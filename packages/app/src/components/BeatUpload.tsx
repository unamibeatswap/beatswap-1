'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useBeats } from '@/hooks/useBeats'
import { useAuth } from '@/context/AuthContext'

export default function BeatUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: 'hip-hop',
    bpm: 120,
    key: 'C',
    price: 29.99,
    tags: ''
  })
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const { user } = useAuth()
  const { uploadBeatAudio, uploadCoverImage, uploading, progress, error } = useFileUpload()
  const { addBeat } = useBeats()

  const { getRootProps: getAudioProps, getInputProps: getAudioInputProps } = useDropzone({
    accept: { 'audio/*': ['.mp3', '.wav', '.m4a'] },
    maxFiles: 1,
    onDrop: (files) => setAudioFile(files[0])
  })

  const { getRootProps: getCoverProps, getInputProps: getCoverInputProps } = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
    maxFiles: 1,
    onDrop: (files) => setCoverFile(files[0])
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !audioFile) return

    setSubmitting(true)

    try {
      const beatId = Date.now().toString()
      
      // Upload audio file
      const audioUrl = await uploadBeatAudio(audioFile, beatId)
      
      // Upload cover image if provided
      let coverImageUrl = 'https://via.placeholder.com/300x300/1a1a1a/ffffff?text=' + encodeURIComponent(formData.title)
      if (coverFile) {
        coverImageUrl = await uploadCoverImage(coverFile, beatId)
      }

      // Create beat record
      await addBeat({
        title: formData.title,
        description: formData.description,
        producerId: user.uid,
        audioUrl,
        coverImageUrl,
        price: formData.price,
        genre: formData.genre,
        bpm: formData.bpm,
        key: formData.key,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        isNFT: false
      })

      // Reset form
      setFormData({
        title: '',
        description: '',
        genre: 'hip-hop',
        bpm: 120,
        key: 'C',
        price: 29.99,
        tags: ''
      })
      setAudioFile(null)
      setCoverFile(null)

      alert('Beat uploaded successfully!')
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Please sign in to upload beats</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#1f2937' }}>
        Upload New Beat
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
        {/* Audio Upload */}
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
            Audio File *
          </label>
          <div
            {...getAudioProps()}
            style={{
              border: '2px dashed #d1d5db',
              borderRadius: '0.5rem',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: audioFile ? '#f0fdf4' : '#f9fafb'
            }}
          >
            <input {...getAudioInputProps()} />
            {audioFile ? (
              <p style={{ color: '#059669', margin: 0 }}>✓ {audioFile.name}</p>
            ) : (
              <p style={{ color: '#6b7280', margin: 0 }}>Drop audio file here or click to browse</p>
            )}
          </div>
        </div>

        {/* Cover Image Upload */}
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
            Cover Image
          </label>
          <div
            {...getCoverProps()}
            style={{
              border: '2px dashed #d1d5db',
              borderRadius: '0.5rem',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: coverFile ? '#f0fdf4' : '#f9fafb'
            }}
          >
            <input {...getCoverInputProps()} />
            {coverFile ? (
              <p style={{ color: '#059669', margin: 0 }}>✓ {coverFile.name}</p>
            ) : (
              <p style={{ color: '#6b7280', margin: 0 }}>Drop cover image here or click to browse</p>
            )}
          </div>
        </div>

        {/* Beat Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Price ($)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              step="0.01"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Genre
            </label>
            <select
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            >
              <option value="hip-hop">Hip Hop</option>
              <option value="trap">Trap</option>
              <option value="electronic">Electronic</option>
              <option value="r&b">R&B</option>
              <option value="pop">Pop</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              BPM
            </label>
            <input
              type="number"
              value={formData.bpm}
              onChange={(e) => setFormData({ ...formData, bpm: parseInt(e.target.value) })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
              Key
            </label>
            <input
              type="text"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              placeholder="C, Am, F#"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="dark, trap, hard, melodic"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem'
            }}
          />
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '0.375rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#1e40af' }}>Uploading...</span>
              <span style={{ fontSize: '0.875rem', color: '#1e40af' }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ background: '#e0e7ff', height: '0.5rem', borderRadius: '0.25rem' }}>
              <div
                style={{
                  background: '#3b82f6',
                  height: '100%',
                  borderRadius: '0.25rem',
                  width: `${progress}%`,
                  transition: 'width 0.3s'
                }}
              />
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '1rem', borderRadius: '0.375rem' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!audioFile || submitting || uploading}
          style={{
            background: (!audioFile || submitting || uploading) ? '#9ca3af' : '#3b82f6',
            color: 'white',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: '600',
            cursor: (!audioFile || submitting || uploading) ? 'not-allowed' : 'pointer'
          }}
        >
          {submitting ? 'Uploading Beat...' : 'Upload Beat'}
        </button>
      </form>
    </div>
  )
}