import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const paymentData = Object.fromEntries(formData.entries())

    const {
      payment_status,
      pf_payment_id,
      amount_gross
    } = paymentData

    if (payment_status === 'COMPLETE') {
      // Payment successful - update database
      console.log('Payment completed:', pf_payment_id, amount_gross)
      return NextResponse.json({ status: 'success' })
    }

    return NextResponse.json({ status: 'pending' })
  } catch (error) {
    console.error('PayFast notification error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}