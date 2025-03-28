'use client';

import Link from 'next/link';
import { Sparkles, User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavSkeleton } from './skeletons/nav-skeleton';
import { SignOutButton } from '@clerk/nextjs';
import { useUser } from '@/app/context/user-context';

export function Navbar() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <NavSkeleton />;
  }

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-background h-16">
      <div className="flex h-16 items-center px-8">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Boilerplate</span>
          <span className="text-sm text-muted-foreground font-light bg-background-secondary rounded-full px-2 py-1">Pro</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.imageUrl || ''} alt={user.name || ''} />
                  <AvatarFallback>{user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <SignOutButton>
                  <div className="flex items-center bg-destructive text-destructive-foreground rounded-md px-2 py-1">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </div>
                </SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}