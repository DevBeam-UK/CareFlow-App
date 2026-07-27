import type { ReactElement, ReactNode } from "react";

import { auth } from "@/auth";
import { SidebarLogoSection, SidebarNavigationSection, SidebarUserSection } from "sections";
import { navGroups } from "utils";


export async function DashboardShell({
  children,
}: Readonly<{ children: ReactNode }>): Promise<ReactElement> {
    const session = await auth()
    const initials = session?.user?.name?.split(' ').map((n) => n[0]).join('') || ''
    const name = session?.user?.name || ''
    
    
  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F9]">
      <aside className="sticky top-0 hidden h-screen w-[252px] shrink-0 flex-col overflow-y-auto overflow-x-hidden bg-[#0C1222] text-[rgba(255,255,255,0.55)] md:flex">
        <SidebarLogoSection />
        <SidebarNavigationSection groups={navGroups} />
        <SidebarUserSection 
        initials={initials}
        name = {name}
        role = "Admin"
        
        />
      </aside>
      <div className="min-w-0 flex-1 overflow-y-auto">
        <main className="min-h-full p-6">{children}</main>
      </div>
    </div>
  );
}
