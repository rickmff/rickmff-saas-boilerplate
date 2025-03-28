'use client';

import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
  isSubscribed: boolean;
  stripeCustomerId: string | null;
  onManageSubscription: (stripeCustomerId: string) => Promise<void>;
  onSubscribe: (stripeCustomerId: string) => Promise<void>;
}

export function SubscriptionButton({
  isSubscribed,
  stripeCustomerId,
  onManageSubscription,
  onSubscribe,
}: SubscriptionButtonProps) {
  if (!stripeCustomerId) {
    return null;
  }

  if (isSubscribed) {
    return (
      <form action={async () => {
        await onManageSubscription(stripeCustomerId);
      }}>
        <Button type="submit">
          Manage Subscription
        </Button>
      </form>
    );
  }

  return (
    <form action={async () => {
      await onSubscribe(stripeCustomerId);
    }}>
      <Button type="submit">
        Subscribe
      </Button>
    </form>
  );
}