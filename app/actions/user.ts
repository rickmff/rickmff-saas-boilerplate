'use server'

import { currentUser } from "@clerk/nextjs/server";
import { db, users } from "@/lib/db";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";
import { AppError } from "@/lib/errors";

export async function getCurrentUser() {
  try {
    const user = await currentUser();
    if (!user) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const [dbUser] = await db.select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (!dbUser) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    let subscription = null;
    if (dbUser.stripeCustomerId) {
      const subscriptions = await stripe.subscriptions.list({
        customer: dbUser.stripeCustomerId,
        status: 'active',
      });
      subscription = subscriptions.data[0] || null;
    }

    return { ...dbUser, subscription, imageUrl: user.imageUrl };
  } catch (error) {
    console.error('[GET_CURRENT_USER]', error);
    throw error;
  }
}