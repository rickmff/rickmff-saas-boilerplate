import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Stripe from "stripe"
import { db, users } from "@/lib/db"
import { eq } from "drizzle-orm"
import { getUserSubscriptionStatus } from "@/app/actions/subscription"
import PricingClient from "./pricing-client"

export default async function PricingPage() {
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in');
    }
    const [dbUser] = await db.select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

    const rawSubscriptionStatus = await getUserSubscriptionStatus();
    const subscriptionStatus = {
        status: rawSubscriptionStatus.status,
        subscription: rawSubscriptionStatus.subscription ? {
            id: rawSubscriptionStatus.subscription.id,
            price_id: rawSubscriptionStatus.subscription.items.data[0].price.id
        } : undefined
    };
    const isSubscribed = subscriptionStatus?.status === 'active';

    if (isSubscribed) {
        redirect('/dashboard');
    }
    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-02-24.acacia',
    });

    // Fetch all products and prices from Stripe
    const { data: products } = await stripe.products.list({
        active: true,
        expand: ['data.default_price', 'data.prices'],
    });

    return (
        <PricingClient
            products={products}
            subscriptionStatus={subscriptionStatus}
            isSubscribed={isSubscribed}
            dbUser={dbUser}
        />
    );
}