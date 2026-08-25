'use client'

import type { ReactElement, ReactNode } from "react";
import { useSession } from "next-auth/react";
import {
  DashboardShellActions,
  SidebarLogoSection,
  SidebarNavigationSection,
  SidebarProfileSection,
} from "sections";
import { PageBreadcrumb } from "shared";
import { usePageInfo } from "hooks";
import {
  filterNavItemsByRole,
  formatRoleName,
  isNavItemActive,
  navGroups,
} from "utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "ui-components";

export function DashboardShell({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  const session = useSession();

  const userInitials = session.data?.user.name.split(' ').map((n) => n[0]).join('') || '';
  const userFullName = session.data?.user.name || '';
  const userAvatarUrl = session.data?.user.image || '';

  const role = session?.data?.user.role;

  const { currentPage, icon, previousPage, pathname } = usePageInfo();

  const filteredNavGroups = navGroups.map((group) => ({
    ...group,
    items: filterNavItemsByRole(group.items, role!).map((item) => ({
      ...item,
      isActive: isNavItemActive(item.href, pathname),
    })),
  }));

  return (
    <SidebarProvider className="bg-cf-surface-muted">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarLogoSection />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNavigationSection groups={filteredNavGroups} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarProfileSection
            avatarUrl={userAvatarUrl}
            initials={userInitials}
            name={userFullName}
            role={formatRoleName(role!)}
          />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="overflow-hidden">
        <main className="flex h-svh flex-col bg-cf-surface">
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-cf-border bg-cf-surface px-4 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <SidebarTrigger className="size-8 shrink-0 rounded-lg border border-cf-border bg-cf-surface text-cf-ink-60 shadow-none hover:bg-cf-surface-muted hover:text-cf-ink" />
              <div
                aria-hidden
                className="hidden h-4 w-px shrink-0 bg-cf-border sm:block"
              />
              <PageBreadcrumb
                icon={icon}
                previousPage={previousPage ? `/${previousPage}` : "dashboard"}
                currentPage={currentPage}
              />
            </div>

            <DashboardShellActions />
          </header>

          <div className="min-h-0 flex-1 overflow-auto bg-cf-surface p-4 md:p-6">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
