'use server'

import { currentUser } from '@clerk/nextjs/server'
import { createCustomerPortal } from './subscription'

export async function handleManageSubscription() {
  const user = await currentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return createCustomerPortal(user.id)
}