'use client'

import type { ReactElement, ReactNode } from "react";
import { SidebarLogoSection, SidebarNavigationSection } from "sections";
import { navGroups } from "utils";
import PageBreadcrumb from "@/components/shared/page-breadcrumb";

import { usePageInfo } from "@/hooks/use-page-info";
import { useSession} from "next-auth/react";



import DashboardShellActions from "@/components/sections/dashboard/DashboardShellActions";
import { SidebarAgencySection } from "@/components/sections/dashboard/SideBarAgencySection";
import { useGetAgencyByUserIdApi } from "@/lib/hooks/use-agency-api";
import { SidebarAgencySectionSkeleton } from "@/components/ui/staff/sidebar-agency-skeleton";
import { useGetAgency } from "@/hooks/use-get-agency";

export function DashboardShell({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  const session = useSession();
  const {avatarUrl,
    error,
    initials,
    isLoading,
    name
  } = useGetAgency()

  const userInitials = session.data?.user.name.split(' ').map((n) => n[0]).join('') || '';
  const userFullName = session.data?.user.name || '';
  const userAvatarUrl = session.data?.user.image || '';
  
  if (error) {
    console.log('error getting agency : ', error

    );
    
  }

  const role = session?.data?.user.role
  
  const { currentPage, icon, previousPage } = usePageInfo();
    
  return (
    <div className="flex h-screen overflow-hidden bg-[#EFEFF2]">
      <aside className="sticky top-0 hidden h-screen w-63 shrink-0 flex-col overflow-y-auto overflow-x-hidden bg-[#EFEFF2] text-black md:flex">
        <SidebarLogoSection />
        <SidebarNavigationSection groups={navGroups} />
        {isLoading ? (
          <SidebarAgencySectionSkeleton />
        ): (<SidebarAgencySection 
          initials={initials}
          name={name}
        />)}
      </aside>
      
      <div className="w-full h-screen flex-1 overflow-y-auto">
        <main className="h-screen p-6 flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <PageBreadcrumb 
              icon={icon}
              previousPage={previousPage ? `/${previousPage}` : 'dashboard'}
              currentPage={currentPage}
            />

            <DashboardShellActions 
            avatarUrl={userAvatarUrl}
            initials={userInitials}
            name={userFullName}
            role={role!}
            
            />
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}