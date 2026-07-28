"use client";

import { startTransition, useEffect, useState, type ReactElement } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "ui-components";
import { Button } from "ui-components";
import { LogOut, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";

import { LogoutResponse, useLogoutMutation } from "lib";
import { useRouter } from "next/navigation";
import { useAuthTokens } from "hooks";
import { toast } from "sonner";

export interface SidebarUserSectionProps {
  initials: string;
  name: string;
  role: string;
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

export function SidebarUserSection({
  initials,
  name,
  role,
  onProfile,
  onSettings,
  onLogout,
}: SidebarUserSectionProps): ReactElement {
  const [open, setOpen] = useState(false);
  const { refreshToken, accessToken } = useAuthTokens();
  const { mutateAsync } = useLogoutMutation();

  const handleLogout = async () => {
    try {
      if (!refreshToken || !accessToken) return;
      const data = await mutateAsync({ refreshToken, accessToken });
      if (data.success) {
        toast.success("Logged out successfully");
        signOut({ redirectTo: "/login" });
      }
    } catch (error) {
      signOut({ redirectTo: "/login" });
    }
  };

  return (
    <div className="border-t border-[rgba(255,255,255,0.06)] px-4 py-3.5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <div className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1 transition-colors hover:bg-[rgba(255,255,255,0.05)]">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-gradient-to-br from-[#3574D4] to-[#5B8FDF] font-heading text-xs font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold text-[rgba(255,255,255,0.9)]">
                {name}
              </div>
              <div className="text-[11px] text-[rgba(255,255,255,0.3)]">
                {role}
              </div>
            </div>
            {/* Three dots icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="end">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
              onClick={() => {
                setOpen(false);
                if (onProfile) onProfile();
                // else navigate to profile (you can add router.push here)
              }}
            >
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-normal"
              onClick={() => {
                setOpen(false);
                if (onSettings) onSettings();
              }}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <div className="my-1 border-t" />
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-normal text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
