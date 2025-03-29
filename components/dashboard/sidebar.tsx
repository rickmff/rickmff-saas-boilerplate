'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Layout, File } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const routes = [
  {
    label: 'Overview',
    icon: Layout,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Examples',
    icon: File,
    href: '/dashboard/examples',
    color: 'text-purple-500',
  },

];

export function SidebarSkeleton() {
  return (
    <div className="w-64 border-r bg-card px-4 py-6">
      <div className="space-y-4">
        <div className="px-2">
          <Skeleton className="h-8 w-[120px]" />
        </div>
        <div className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background w-64">
      <div className="px-5 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition hover:bg-background-secondary duration-500',
                pathname === route.href
                  ? 'bg-background-secondary'
                  : ''
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}