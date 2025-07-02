'use client'

import { useState } from 'react'
import { useIPFS } from './useIPFS'
import { useSIWE } from '@/context/SIWEContext'

export function useFileUpload() {
  const [progress, setProgress] = useState(0)
  const { uploadFile, uploading, error } = useIPFS()
  const { user } = useSIWE()

  const uploadBeatAudio = async (file: File, beatId: string): Promise<string> => {
    if (!user) throw new Error('Must be logged in to upload')
    
    setProgress(25)
    const result = await uploadFile(file, 'audio')
    setProgress(100)
    
    if (!result) throw new Error('Upload failed')
    return result.url
  }

  const uploadCoverImage = async (file: File, beatId: string): Promise<string> => {
    if (!user) throw new Error('Must be logged in to upload')
    
    setProgress(25)
    const result = await uploadFile(file, 'image')
    setProgress(100)
    
    if (!result) throw new Error('Upload failed')
    return result.url
  }

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