import { NextRequest, NextResponse } from 'next/server'
import { SiweMessage } from 'siwe'

export async function POST(request: NextRequest) {
  try {
    const { message, signature } = await request.json()
    
    const siweMessage = new SiweMessage(message)
    const result = await siweMessage.verify({ signature })
    
    if (result.success) {
      return NextResponse.json({ 
        success: true,
        address: siweMessage.address 
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('SIWE verification failed:', error)
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 401 }
    )
  }
}