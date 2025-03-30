'use client';

import Link from 'next/link';
import { Sparkles, User, LogOut, CreditCard, Menu, X } from 'lucide-react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { CustomSignOutButton } from './CustomSignOutButton';

export function NavbarSkeleton() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-8">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-32 hidden md:inline" />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </nav>
  );
}

export function Navbar() {
  const { user, isLoading } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: '/dashboard/profile', icon: User, label: 'Profile' },
    { href: '/dashboard/billing', icon: CreditCard, label: 'Billing', disabled: !user?.subscription },
  ];

  if (isLoading) {
    return <NavbarSkeleton />;
  }

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

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop Menu */}
        <div className="ml-auto hidden md:flex items-center space-x-4">
          {user?.name || user?.email ? (
            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
              {user.name || user.email}
            </span>
          ) : null}

          {!user ? (
            <SignInButton>
              <Button variant="outline" size="sm" className="gap-2" aria-label="Sign in">
                <User className="h-4 w-4" />
                <span>Sign in</span>
              </Button>
            </SignInButton>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 rounded-full ring-offset-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Open user menu"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user?.imageUrl ?? ""}
                      alt={user?.name || 'User avatar'}
                      referrerPolicy="no-referrer"
                    />
                    <AvatarFallback delayMs={600}>
                      {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {user.email || ''}
                  </p>
                </div>
                <div className="h-px bg-border my-1" />
                {menuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    disabled={item.disabled}
                    className={item.disabled ? "cursor-not-allowed opacity-60" : ""}
                  >
                    <Link href={item.href} className="flex items-center w-full cursor-default">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <div className="h-px bg-border my-1" />
                <DropdownMenuItem asChild className="text-destructive focus:bg-destructive/10">
                  <CustomSignOutButton forceRedirectUrl='/sign-in'>
                    <div className="flex items-center w-full cursor-default">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </div>
                  </CustomSignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden shadow-md">
            <div className="flex flex-col space-y-3">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 p-2 border-b border-border pb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.imageUrl ?? ""} alt={user?.name || 'User avatar'} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium truncate">
                      {user.name || user.email}
                    </span>
                  </div>
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-2 p-2 hover:bg-accent rounded-md ${item.disabled ? 'opacity-50 pointer-events-none' : ''
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <CustomSignOutButton forceRedirectUrl='/sign-in'>
                    <button className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md text-destructive w-full">
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </CustomSignOutButton>
                </>
              ) : (
                <SignInButton>
                  <Button variant="outline" className="w-full" aria-label="Sign in">
                    <User className="h-4 w-4 mr-2" />
                    Sign in
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
