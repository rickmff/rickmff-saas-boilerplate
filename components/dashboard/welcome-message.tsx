'use client';
import { useUser } from '@/app/context/user-context';

export function WelcomeMessage() {
  const { user } = useUser();

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">
        Welcome back{user?.name ? `, ${user.name}` : ''}!
      </h2>
      <p className="text-muted-foreground">
        Here&apos;s an overview of your subscription status.
      </p>
    </div>
  );
}