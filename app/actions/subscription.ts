'use server';

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStripeSession, stripe } from "@/lib/stripe";
import { db, users } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getUserSubscriptionStatus() {
  const user = await currentUser();
  if (!user) {
    return { status: 'no_user' };
  }

  const [dbUser] = await db.select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (!dbUser?.stripeCustomerId) {
    return { status: 'no_customer' };
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: dbUser.stripeCustomerId,
    status: 'active',
  });

  if (!subscriptions.data.length) {
    return { status: 'no_subscription' };
  }

  return {
    status: 'active',
    subscription: subscriptions.data[0],
  };
}

export async function createSubscription(stripeCustomerId: string) {
  const user = await currentUser();
  if (!user || !stripeCustomerId) {
    return redirect('/sign-in');
  }

  const session = await getStripeSession({
    priceId: process.env.STRIPE_PRICE_ID!,
    domainUrl: process.env.NEXT_PUBLIC_APP_URL!,
    customerId: stripeCustomerId,
  });

  return redirect(session);
}

export async function createCustomerPortal(stripeCustomerId: string) {
  const user = await currentUser();
  if (!user) {
    return redirect('/sign-in');
  }

  if (!stripeCustomerId) {
    return redirect('/sign-in');
  }

  const customerPortalUrl = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  });

  return redirect(customerPortalUrl.url);
}