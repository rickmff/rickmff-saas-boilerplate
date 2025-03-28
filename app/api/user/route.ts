import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { stripe } from '@/lib/stripe';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const [user] = await db.select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    let subscription = null;
    if (user.stripeCustomerId) {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'active',
      });
      subscription = subscriptions.data[0] || null;
    }

    return NextResponse.json({ ...user, subscription });
  } catch (error) {
    console.error('[USER_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}