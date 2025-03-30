'use client'

import { useClerk } from '@clerk/nextjs'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface CustomSignOutButtonProps {
  children: ReactNode;
  forceRedirectUrl?: string;
  className?: string;
}

export const CustomSignOutButton = ({
  children,
  forceRedirectUrl = '/sign-in',
  className = ''
}: CustomSignOutButtonProps) => {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    console.log('Signing out user...')

    try {
      // Perform sign out
      await signOut()

      // Clear any local state or cookies if needed
      localStorage.removeItem('__clerk_environment')

      // Clear any additional user-related data from localStorage
      // This helps ensure the navbar state is completely refreshed
      localStorage.removeItem('user_data')
      sessionStorage.clear()

      console.log('User signed out successfully')

      // Redirect after sign out
      router.push(forceRedirectUrl)

      // Force refresh to update UI components
      router.refresh()

      // Add a small delay before refreshing to ensure state is updated
      setTimeout(() => {
        window.location.reload()
      }, 100)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div
      onClick={handleSignOut}
      className={`${className} cursor-pointer`}
      role="button"
      tabIndex={0}
      aria-label="Sign out"
    >
      {children}
    </div>
  )
}