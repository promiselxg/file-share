import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-8 w-8 rounded-full bg-[--folder-bg] boxShadow" />
      <div className="space-y-2">
        <Skeleton className="h-2 w-[250px] bg-[--folder-bg] boxShadow" />
        <Skeleton className="h-2 w-[150px] bg-[--folder-bg] boxShadow" />
      </div>
    </div>
  );
}

export function SkeletonDocument() {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-[150px] w-[300px] bg-[--folder-bg] boxShadow" />
        <Skeleton className="h-3 w-[250px] bg-[--folder-bg] boxShadow" />
        <Skeleton className="h-2 w-[150px] bg-[--folder-bg] boxShadow" />
      </div>
    </div>
  );
}
