import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createCustomerPortal, createSubscription, getUserSubscriptionStatus } from "../actions/subscription"
import { db, users } from "@/lib/db"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Pricing() {
    const { userId } = auth();
    if (!userId) {
        redirect('/sign-in');
    }

    const [dbUser] = await db.select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

    if (!dbUser) {
        redirect('/sign-in');
    }

    const subscriptionStatus = await getUserSubscriptionStatus();
    const isSubscribed = subscriptionStatus?.status === 'active';

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Subscription Plan</h1>
            <div className="space-y-4 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <Link href="/dashboard" className="text-sm font-medium text-primary underline-offset-4 hover:underline">&larr; Back</Link>
                <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">Full Access</h2>
                <p className="leading-7">Access all features</p>
                <p className="text-2xl font-bold">$9.99/month</p>
                {isSubscribed ? (
                    <form action={async () => {
                        'use server';
                        if (dbUser.stripeCustomerId) {
                            await createCustomerPortal(dbUser.stripeCustomerId);
                        }
                    }}>
                        <Button type="submit">
                            Manage Subscription
                        </Button>
                    </form>
                ) : (
                    <form action={async () => {
                        'use server';
                        if (dbUser.stripeCustomerId) {
                            await createSubscription(dbUser.stripeCustomerId);
                        }
                    }}>
                        <Button type="submit">
                            Subscribe
                        </Button>
                    </form>
                )}
            </div>
        </div>
    )
}