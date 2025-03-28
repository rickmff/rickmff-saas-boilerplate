import { WelcomeMessage } from '@/components/dashboard/welcome-message';

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeMessage />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-lg font-semibold">Welcome to Your Dashboard</h3>
          <p className="text-muted-foreground mt-2">
            This is where you'll manage your subscription and access premium features.
          </p>
        </div>
      </div>
    </div>
  );
}