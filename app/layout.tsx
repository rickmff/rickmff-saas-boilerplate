import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { UserProvider } from '@/app/context/user-context';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Toaster } from 'sonner'
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Boilerplate - Store and Manage Your AI Prompts',
  description: 'A powerful tool to store, organize, and access your AI prompts.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <UserProvider>
            <Navbar />
            {children}
            <Toaster />
          </UserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}