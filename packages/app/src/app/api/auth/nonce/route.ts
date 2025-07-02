import { NextRequest, NextResponse } from 'next/server'
import { generateNonce } from 'siwe'

export async function GET(request: NextRequest) {
  const nonce = generateNonce()
  return NextResponse.json({ nonce })
}