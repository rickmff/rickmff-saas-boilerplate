import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createCustomerPortal } from '@/app/actions/subscription'

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const url = await createCustomerPortal(userId)
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Error in billing management:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}