import { Skeleton } from "ui-components";

export function SidebarAgencySectionSkeleton() {
  return (
    <div className="border-t border-cf-border-light px-4 py-3.5">
      <div className="flex items-center gap-2.5 rounded-lg px-1 py-1">
        <Skeleton className="h-[34px] w-[34px] rounded-lg bg-cf-surface-muted shrink-0" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-3.5 w-3/4 bg-cf-surface-muted" />
        </div>
        <Skeleton className="h-4 w-4 rounded-sm bg-cf-surface-muted shrink-0" />
      </div>
    </div>
  );
}