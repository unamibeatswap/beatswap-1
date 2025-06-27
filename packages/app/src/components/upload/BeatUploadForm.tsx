'use client'

import { useState } from 'react'
import { useMockAuth as useAuth } from '@/context/MockAuthContext'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useDropzone } from 'react-dropzone'
import { Beat } from '@/types'

interface BeatUploadFormProps {
  onSuccess?: (beat: Beat) => void
  onCancel?: () => void
}

export default function BeatUploadForm({ onSuccess, onCancel }: BeatUploadFormProps) {
  const { user } = useAuth()
  const { uploadAudio, uploadImage, uploading, progress, error } = useFileUpload()
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    bpm: '',
    key: '',
    tags: '',
    price: ''
  })
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const audioDropzone = useDropzone({
    accept: { 'audio/*': ['.mp3', '.wav'] },
    maxFiles: 1,
    onDrop: (files) => setAudioFile(files[0])
  })

  const imageDropzone = useDropzone({
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
    maxFiles: 1,
    onDrop: (files) => setCoverFile(files[0])
  })

  const handleSubmit = async () => {
    if (!audioFile || !user) return

    try {
      // Upload files
      const audioUpload = await uploadAudio(audioFile)
      const coverUpload = coverFile ? await uploadImage(coverFile) : null

      // Create beat object
      const beat: Partial<Beat> = {
        title: formData.title,
        description: formData.description,
        producerId: user.uid,
        audioUrl: audioUpload.url,
        coverImageUrl: coverUpload?.url,
        price: parseFloat(formData.price),
        genre: formData.genre,
        bpm: parseInt(formData.bpm),
        key: formData.key,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        isNFT: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      // TODO: Save to Firestore
      console.log('Beat created:', beat)
      
      if (onSuccess) {
        onSuccess(beat as Beat)
      }
    } catch (err) {
      console.error('Upload failed:', err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Upload Beat</h2>
          <div className="text-sm text-gray-500">Step {step} of 3</div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Audio File</h3>
          
          <div 
            {...audioDropzone.getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              audioDropzone.isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input {...audioDropzone.getInputProps()} />
            {audioFile ? (
              <div>
                <p className="text-green-600 font-medium">✓ {audioFile.name}</p>
                <p className="text-sm text-gray-500">{(audioFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">Drop your audio file here or click to browse</p>
                <p className="text-sm text-gray-500 mt-2">Supports MP3, WAV (max 50MB)</p>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!audioFile}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Beat Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Genre</label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({...formData, genre: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Genre</option>
                <option value="hip-hop">Hip Hop</option>
                <option value="trap">Trap</option>
                <option value="r&b">R&B</option>
                <option value="pop">Pop</option>
                <option value="electronic">Electronic</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">BPM</label>
              <input
                type="number"
                value={formData.bpm}
                onChange={(e) => setFormData({...formData, bpm: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                min="60" max="200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Key</label>
              <select
                value={formData.key}
                onChange={(e) => setFormData({...formData, key: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Key</option>
                <option value="C">C</option>
                <option value="C#">C#</option>
                <option value="D">D</option>
                <option value="D#">D#</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="F#">F#</option>
                <option value="G">G</option>
                <option value="G#">G#</option>
                <option value="A">A</option>
                <option value="A#">A#</option>
                <option value="B">B</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="dark, melodic, trap"
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!formData.title}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Cover Art & Pricing</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Cover Image (Optional)</label>
            <div 
              {...imageDropzone.getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                imageDropzone.isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <input {...imageDropzone.getInputProps()} />
              {coverFile ? (
                <div>
                  <p className="text-green-600 font-medium">✓ {coverFile.name}</p>
                </div>
              ) : (
                <p className="text-gray-600">Drop cover image or click to browse</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price (USD) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              min="0" step="0.01"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {uploading && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-700">Uploading...</span>
                <span className="text-blue-700">{progress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
            <div className="flex gap-2">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={uploading || !formData.price}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Beat'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}