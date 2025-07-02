import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminStorage } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const idToken = authHeader.split('Bearer ')[1]
    const decodedToken = await adminAuth.verifyIdToken(idToken)
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const fileType = formData.get('type') as string // 'audio' or 'image'
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3']
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']
    
    if (fileType === 'audio' && !allowedAudioTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid audio file type' }, { status: 400 })
    }
    
    if (fileType === 'image' && !allowedImageTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid image file type' }, { status: 400 })
    }

    // Check file size (max 50MB for audio, 5MB for images)
    const maxSize = fileType === 'audio' ? 50 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `File too large. Max size: ${fileType === 'audio' ? '50MB' : '5MB'}` 
      }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const filename = `${decodedToken.uid}/${fileType}s/${timestamp}.${extension}`

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Firebase Storage
    const bucket = adminStorage.bucket()
    const fileRef = bucket.file(filename)
    
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          uploadedBy: decodedToken.uid,
          originalName: file.name,
          uploadedAt: new Date().toISOString()
        }
      }
    })

    // Make file publicly accessible
    await fileRef.makePublic()

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      type: file.type
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    )
  }
}