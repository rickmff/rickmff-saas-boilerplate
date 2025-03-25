import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/sidebar';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { Button } from '@/components/ui/button';
import { stripe } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { users } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth()
  if (!userId) {
    return redirect('/sign-in')
  }

  const [dbUser] = await db.select().from(users).where(eq(users.id, userId))
  if (!dbUser?.stripeCustomerId) {
    return (
      <div className="min-h-screen">
        <DashboardNav />
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="relative space-y-8">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <Button
                  size="lg"
                  className="font-semibold"
                >
                  Subscribe to Access
                </Button>
              </div>
              <div className="filter blur-sm">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: dbUser.stripeCustomerId,
    status: 'active',
  });

  const hasActiveSubscription = subscriptions.data.length > 0;

  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen">
        <DashboardNav />
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="relative space-y-8">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <Button
                  size="lg"
                  className="font-semibold"
                >
                  Subscribe to Access
                </Button>
              </div>
              <div className="filter blur-sm">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardNav />
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}