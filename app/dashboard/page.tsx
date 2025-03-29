import { WelcomeMessage } from '@/components/dashboard/welcome-message';

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeMessage />
    </div>
  );
}