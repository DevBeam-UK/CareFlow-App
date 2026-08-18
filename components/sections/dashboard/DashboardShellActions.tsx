'use client'

import { Avatar, AvatarFallback, AvatarImage, Button, Popover, PopoverContent, PopoverTrigger, toast } from '@/components/ui';
import { useAuthTokens } from '@/hooks';
import { useLogoutMutation } from '@/lib';
import { Bell, LogOut, Settings, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface DashboardShellActionsProps {
    name : string;
    role: string;
    initials: string;
    avatarUrl: string;
    onProfile?: () => void;
    onSettings?: () => void;
}


function DashboardShellActions({avatarUrl,initials,name,role,onProfile,onSettings}: DashboardShellActionsProps) {
    const router = useRouter()
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
    <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger >
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Bell className="h-[18px] w-[18px]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                    <p className="text-xs text-muted-foreground mt-1">You have no new notifications.</p>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger >
                  <Button variant="ghost" className="h-auto w-auto p-0 rounded-full hover:bg-transparent">
                    <Avatar className="h-8 w-8">
                      {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="end">
                  <div className="pb-2 mb-2 border-b">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{role}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start h-8 px-2 text-sm"
                      onClick={() => router.push('/settings')}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start h-8 px-2 text-sm"
                      onClick={() => router.push('/profile')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start h-8 px-2 text-sm text-red-600 hover:text-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
  )
}

export default DashboardShellActions