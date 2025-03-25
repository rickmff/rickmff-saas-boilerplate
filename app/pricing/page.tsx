import { Button } from "@/components/ui/button"
import React from "react"
import { db, users } from "@/lib/db"
import { getStripeSession, stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { auth, currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { eq } from "drizzle-orm"

export default async function Pricing() {
    const { userId } = auth();
    if (!userId) {
        return redirect('/sign-in');
    }

    const [user] = await db.select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

    if (!user) {
        return redirect('/sign-in');
    }

    let isSubscribed = false;
    if (user.stripeCustomerId) {
        const subscriptions = await stripe.subscriptions.list({
            customer: user.stripeCustomerId,
            status: 'active',
        });
        isSubscribed = subscriptions.data.length > 0;
    }

    async function createSubscription() {
        "use server"

        const user = await currentUser();
        if (!user) {
            return redirect('/sign-in');
        }

        const [dbUser] = await db.select()
            .from(users)
            .where(eq(users.id, user.id))
            .limit(1);

        if (!dbUser?.stripeCustomerId) {
            return redirect('/sign-in');
        }

        const session = await getStripeSession({
            priceId: process.env.STRIPE_PRICE_ID!,
            domainUrl: process.env.NEXT_PUBLIC_APP_URL!,
            customerId: dbUser.stripeCustomerId,
        });

        return redirect(session);
    }

    async function createCustomerPortal() {
        "use server"

        const user = await currentUser();
        if (!user) {
            return redirect('/sign-in');
        }

        const [dbUser] = await db.select()
            .from(users)
            .where(eq(users.id, user.id))
            .limit(1);

        if (!dbUser?.stripeCustomerId) {
            return redirect('/sign-in');
        }

        const customerPortalUrl = await stripe.billingPortal.sessions.create({
            customer: dbUser.stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        });

        return redirect(customerPortalUrl.url);
    }

    const backLink = userId ? '/dashboard' : '/';

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Subscription Plan</h1>
            <div className="space-y-4 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <Link href={backLink} className="text-sm font-medium text-primary underline-offset-4 hover:underline">&larr; Back</Link>
                <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">Full Access</h2>
                <p className="leading-7">Access all features</p>
                <p className="text-2xl font-bold">$9.99/month</p>
                {isSubscribed ? (
                    <form action={createCustomerPortal}>
                        <Button type="submit">
                            Manage Subscription
                        </Button>
                    </form>
                ) : (
                    <form action={createSubscription}>
                        <Button type="submit">
                            Subscribe
                        </Button>
                    </form>
                )}
            </div>
        </div>
    )
}