'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs';

export function Navbar() {

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Prompt Manager</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/pricing" className="text-muted-foreground hover:text-primary">
              Pricing
            </Link>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <SignOutButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}