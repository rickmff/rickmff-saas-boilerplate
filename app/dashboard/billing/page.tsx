'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { useUser } from '@/app/context/user-context'
import { cn } from '@/lib/utils'

export default function BillingPage() {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/billing/manage', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to manage subscription')
      }

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error managing subscription:', error)
      toast({
        title: 'Error',
        description: 'Failed to manage subscription. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Billing & Subscription</h1>

      <div className="grid gap-6">
        {/* Current Plan */}
        {user.subscription ? (
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {user.subscription?.status === 'active' ? 'Active Subscription' : 'No Active Subscription'}
                </p>
                <>
                  <p className="text-sm text-muted-foreground inline-block font-bold">
                    Status:
                  </p>
                  <pre className={cn('px-3 py-1 rounded-full inline-block ml-2 text-xs', user.subscription.status === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600')} >
                    {user.subscription.status}
                  </pre>
                  <p className="text-sm text-muted-foreground">
                    <b>Next billing date:</b> {new Date(user.subscription.current_period_end * 1000).toLocaleDateString()}
                  </p>
                </>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleManageSubscription}
                disabled={isLoading}
                variant="outline"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Manage Subscription
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You don't have an active subscription.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}