import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NavSkeleton } from "@/components/skeletons/nav-skeleton";
import { SidebarSkeleton } from "@/components/skeletons/sidebar-skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen">
      <NavSkeleton />
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <SidebarSkeleton />
        <main className="flex-1 overflow-y-auto p-8 rounded-lg bg-background">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="gap-2">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-4 w-2/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}