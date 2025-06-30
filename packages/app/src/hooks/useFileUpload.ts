'use client'

import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import { useAuth } from './useAuth'

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const uploadBeatAudio = async (file: File, beatId: string): Promise<string> => {
    if (!user) throw new Error('Must be logged in to upload')
    
    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      const storageRef = ref(storage, `beats/${user.uid}/${beatId}/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress)
          },
          (error) => {
            setError(error.message)
            setUploading(false)
            reject(error)
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              setUploading(false)
              resolve(downloadURL)
            } catch (err: any) {
              setError(err.message)
              setUploading(false)
              reject(err)
            }
          }
        )
      })
    } catch (err: any) {
      setError(err.message)
      setUploading(false)
      throw err
    }
  }

  const uploadCoverImage = async (file: File, beatId: string): Promise<string> => {
    if (!user) throw new Error('Must be logged in to upload')
    
    setUploading(true)
    setError(null)

    try {
      const storageRef = ref(storage, `covers/${user.uid}/${beatId}/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress)
          },
          (error) => {
            setError(error.message)
            setUploading(false)
            reject(error)
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              setUploading(false)
              resolve(downloadURL)
            } catch (err: any) {
              setError(err.message)
              setUploading(false)
              reject(err)
            }
          }
        )
      })
    } catch (err: any) {
      setError(err.message)
      setUploading(false)
      throw err
    }
  }

  // Alias methods for compatibility
  const uploadAudio = uploadBeatAudio
  const uploadImage = uploadCoverImage

  return {
    uploading,
    progress,
    error,
    uploadBeatAudio,
    uploadCoverImage,
    uploadAudio,
    uploadImage
  }
}