'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const BackButton = () => {
  return (
    <Button variant="outline" onClick={() => window.history.back()}>
      Go Back
    </Button>
  )
}

// Server Component
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="space-y-6 text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or never existed.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="default">
            <Link href="/">
              Go Home
            </Link>
          </Button>
          <BackButton />
        </div>
      </div>
    </div>
  )
}