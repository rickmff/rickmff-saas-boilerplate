import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { db, users } from "@/lib/db"
import { headers } from "next/headers"
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get("Stripe-Signature") as string
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string)
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error('Webhook signature verification failed:', errorMessage);
        return new Response(`Webhook Error: ${errorMessage}`, { status: 400 })
    }

    console.log('Webhook event type:', event.type);
    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === "checkout.session.completed") {
        console.log('Processing checkout.session.completed');
        console.log('Session customer ID:', session.customer);
        console.log('Session subscription ID:', session.subscription);

        try {
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
            console.log('Retrieved subscription:', subscription.id);

            const [user] = await db.select()
                .from(users)
                .where(eq(users.stripeCustomerId, session.customer as string))
                .limit(1)

            if (!user) {
                console.error('User not found for customer ID:', session.customer);
                return new Response("User not found", { status: 404 })
            }

            console.log('Found user:', user.id);
            console.log('Successfully processed subscription');
        } catch (error) {
            console.error('Error processing checkout.session.completed:', error);
            return new Response("Error processing webhook", { status: 500 })
        }
    }

    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        console.log('Successfully processed invoice payment for subscription:', subscription.id);
    }

    if (event.type === "customer.subscription.updated") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        console.log('Successfully processed subscription update:', subscription.id);
    }

    if (event.type === "customer.subscription.deleted") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        console.log('Successfully processed subscription deletion:', subscription.id);
    }

    return new Response(null, { status: 200 })
}