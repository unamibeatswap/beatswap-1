import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase-admin'
import { Beat } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')
    const producerId = searchParams.get('producerId')
    const limit = parseInt(searchParams.get('limit') || '20')

    let query = adminDb.collection('beats').orderBy('createdAt', 'desc')

    if (genre) {
      query = query.where('genre', '==', genre)
    }
    if (producerId) {
      query = query.where('producerId', '==', producerId)
    }

    const snapshot = await query.limit(limit).get()
    
    const beats: Beat[] = []
    snapshot.forEach(doc => {
      beats.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      } as Beat)
    })

    return NextResponse.json({ beats, total: snapshot.size })

  } catch (error: any) {
    console.error('Error fetching beats:', error)
    

    
    // Return empty array for new platform
    return NextResponse.json({ beats: [], total: 0 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const idToken = authHeader.split('Bearer ')[1]
    const decodedToken = await adminAuth.verifyIdToken(idToken)
    
    const beatData = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'genre', 'bpm', 'price', 'audioUrl']
    for (const field of requiredFields) {
      if (!beatData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const newBeat = {
      ...beatData,
      producerId: decodedToken.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    }

    const docRef = await adminDb.collection('beats').add(newBeat)
    
    return NextResponse.json({
      success: true,
      beatId: docRef.id,
      beat: { id: docRef.id, ...newBeat }
    })

  } catch (error: any) {
    console.error('Error creating beat:', error)
    return NextResponse.json(
      { error: 'Failed to create beat', details: error.message },
      { status: 500 }
    )
  }
}