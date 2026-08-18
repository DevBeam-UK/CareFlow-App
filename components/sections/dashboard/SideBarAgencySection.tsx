"use client";

import { useState, type ReactElement } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "ui-components";
import { Button } from "ui-components";
import { Building2, MoreVertical } from "lucide-react";

export interface SidebarAgencySectionProps {
  initials: string;
  name: string;
  onProfile?: () => void;
}

export function SidebarAgencySection({
  initials,
  name,
  onProfile,
}: SidebarAgencySectionProps): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-cf-border-light px-4 py-3.5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger >
          <div className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1 transition-colors hover:bg-cf-surface-muted">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-cf-border-light bg-cf-surface text-xs font-semibold text-cf-ink">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-cf-ink">
                {name}
              </div>
            </div>
            <MoreVertical className="h-4 w-4 text-cf-ink-40 shrink-0" />
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="w-56 p-1 bg-cf-surface border-cf-border-light" 
          align="end"
        >
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 font-normal text-cf-ink hover:bg-cf-surface-muted hover:text-cf-ink"
            onClick={() => {
              setOpen(false);
              if (onProfile) onProfile();
            }}
          >
            <Building2 className="h-4 w-4 text-cf-ink-60" />
            Agency Profile
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}