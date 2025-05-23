import { Skeleton } from '@/components/ui/skeleton';
import { UserProfile } from '@clerk/nextjs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-2/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <UserProfile routing="hash" fallback={<ProfileSkeleton />} />
    </div>
  );
}