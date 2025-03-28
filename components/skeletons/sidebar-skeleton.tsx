import { Skeleton } from "@/components/ui/skeleton";

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