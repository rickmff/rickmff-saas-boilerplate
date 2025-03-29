'use client';

import { useUser } from '@/app/context/user-context';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function WelcomeMessage() {
  const { user } = useUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back{user?.name ? `, ${user.name}` : ''}!</CardTitle>
        <CardDescription>
          Here will be a welcome message
        </CardDescription>
      </CardHeader>
    </Card>
  );
}