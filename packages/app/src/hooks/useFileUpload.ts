'use client'

import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'

interface UploadOptions {
  folder: string
  maxSize?: number // in MB
  allowedTypes?: string[]
}

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (file: File, options: UploadOptions) => {
    const { folder, maxSize = 10, allowedTypes = [] } = options
    
    setUploading(true)
    setError(null)
    setProgress(0)

    try {
      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        throw new Error(`File size must be less than ${maxSize}MB`)
      }

      // Validate file type
      if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
        throw new Error(`File type ${file.type} not allowed`)
      }

      // Create unique filename
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name}`
      const storageRef = ref(storage, `${folder}/${filename}`)

      // Upload file
      const snapshot = await uploadBytes(storageRef, file)
      setProgress(100)

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      return {
        url: downloadURL,
        filename,
        size: file.size,
        type: file.type
      }
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setUploading(false)
    }
  }

  const uploadAudio = (file: File) => {
    return uploadFile(file, {
      folder: 'beats/audio',
      maxSize: 50, // 50MB for audio files
      allowedTypes: ['audio/mpeg', 'audio/wav', 'audio/mp3']
    })
  }

  const uploadImage = (file: File) => {
    return uploadFile(file, {
      folder: 'beats/covers',
      maxSize: 5, // 5MB for images
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
    })
  }

  return {
    uploadFile,
    uploadAudio,
    uploadImage,
    uploading,
    progress,
    error
  }
}