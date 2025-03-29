'use client';

import Link from 'next/link';
import { Sparkles, User, LogOut, CreditCard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { useUser } from '@/app/context/user-context';
import { useState } from 'react';

export function Navbar() {
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: '/dashboard/profile', icon: User, label: 'Profile' },
    { href: '/dashboard/billing', icon: CreditCard, label: 'Billing', disabled: !user?.subscription },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-8">
        <Link
          href="/"
          className="flex items-center space-x-2 transition-colors"
          aria-label="Go to dashboard"
        >
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl hidden md:inline">Boilerplate</span>
        </Link>

        {/* Desktop Menu */}
        <div className="ml-auto flex items-center space-x-4">
          <span className="text-sm text-muted-foreground truncate max-w-[200px]">
            {user?.name || user?.email}
          </span>
          {!user ? (
            <SignInButton>
              <Button variant="outline" aria-label="Sign in">
                <User className="h-4 w-4" />
                Sign in
              </Button>
            </SignInButton>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full ring-offset-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Open user menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.imageUrl ?? ""} alt={user?.name || 'User avatar'} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild disabled={item.disabled}>
                    <Link href={item.href} className="flex items-center w-full p-2 hover:bg-accent">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild className="text-destructive">
                  <SignOutButton>
                    <div className="flex items-center w-full p-2">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </div>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <SignOutButton>
                <button className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md text-destructive w-full">
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </SignOutButton>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
