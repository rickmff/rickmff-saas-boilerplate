'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Subscription } from '@/types/stripe';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser as useClerkUser } from '@clerk/nextjs';

interface User {
  id: string;
  email: string;
  name: string | null;
  imageUrl?: string | null;
  stripeCustomerId: string | null;
  subscription: Subscription | null;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

export function UserLoadingSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user: clerkUser } = useClerkUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!clerkUser) {
          setIsLoading(false);
          return;
        }
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.statusText}`);
        }
        const userData = await response.json();

        // Add the Clerk user's profile image URL to the user data
        setUser({
          ...userData,
          imageUrl: clerkUser.imageUrl || null
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [clerkUser]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};