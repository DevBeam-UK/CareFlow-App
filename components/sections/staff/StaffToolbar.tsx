// src/app/components/StaffToolbar.tsx

"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const STAFF_ROLES = [
  { id: "all", label: "All Staff" },
  { id: "carer", label: "Carer" },
  { id: "manager", label: "Manager" },
  { id: "admin", label: "Admin" },
];

interface StaffToolbarProps {
  activeRole: string;
  onRoleChange: (role: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function StaffToolbar({
  activeRole,
  onRoleChange,
  searchQuery,
  onSearchChange,
}: StaffToolbarProps) {
  return (
    <div className="border-b border-cf-border-light ">
      <div className="flex items-center justify-between gap-6">

        <Tabs value={activeRole} onValueChange={onRoleChange} className="flex-1">
          <TabsList className="bg-cf-surface-muted">
            {STAFF_ROLES.map((role) => (
              <TabsTrigger
                key={role.id}
                value={role.id}
                className="data-[state=active]:bg-cf-surface data-[state=active]:text-cf-ink data-[state=active]:shadow-none"
              >
                {role.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cf-ink-40" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-cf-border bg-cf-surface-muted pl-10 text-cf-ink placeholder:text-cf-ink-40 focus:border-cf-brand-300 focus:ring-cf-brand-200/50 h-8"
          />
        </div>
      </div>
    </div>
  );
}