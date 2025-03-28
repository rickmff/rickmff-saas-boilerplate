import { Skeleton } from "@/components/ui/skeleton";

export function NavSkeleton() {
  return (
    <nav className="bg-background h-16">
      <div className="flex h-16 items-center px-8">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-[150px]" />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  );
}