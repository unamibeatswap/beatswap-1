import { NextRequest, NextResponse } from 'next/server'
import { SiweMessage } from 'siwe'

export async function POST(request: NextRequest) {
  try {
    const { message, signature } = await request.json()
    
    const siweMessage = new SiweMessage(message)
    const result = await siweMessage.verify({ signature })
    
    if (result.success) {
      return NextResponse.json({ success: true, address: result.data.address })
    } else {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 })
  }
}