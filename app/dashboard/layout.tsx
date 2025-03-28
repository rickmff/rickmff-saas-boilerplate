import { Sidebar } from '@/components/dashboard/sidebar';
import { Navbar } from '@/components/navbar';
import { getUserSubscriptionStatus } from '../actions/subscription';
import { redirect } from 'next/navigation';
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const subscriptionStatus = await getUserSubscriptionStatus();

  if (subscriptionStatus.status === 'no_user') {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 bg-background-secondary border border-border rounded-xl mr-2 mb-2">
          {children}
        </main>
      </div>
    </div>
  );
}