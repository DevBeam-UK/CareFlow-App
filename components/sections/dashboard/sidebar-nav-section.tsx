import Link from "next/link";
import type { ReactElement } from "react";

import type { NavGroup, NavItem } from "utils";

export function SidebarNavigationSection({
  groups,
}: Readonly<{ groups: NavGroup[] }>): ReactElement {
  return (
    <nav className="flex-1 overflow-y-auto px-0 pb-2 pt-1.5">
      {groups.map((group) => (
        <SidebarGroup key={group.label} group={group} />
      ))}
    </nav>
  );
}

function SidebarGroup({ group }: { group: NavGroup }): ReactElement {
  return (
    <div>
      <div className="px-5 pb-1.5 pt-5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#9AA0A6]">
        {group.label}
      </div>
      {group.items.map((item) => (
        <SidebarNavItem key={item.label} item={item} />
      ))}
    </div>
  );
}

function SidebarNavItem({ item }: { item: NavItem }): ReactElement {
  return (
    <Link
      href={item.href}
      className={[
        "group/item mx-2.5 my-px flex items-center gap-[11px] rounded-lg px-4 py-[9px] text-[13.5px] font-medium transition-all duration-100",
        item.isActive
          ? "bg-[rgba(99,182,140,0.12)] font-semibold text-[#43474F]"
          : "text-[#5B6069] hover:bg-black/[0.035] hover:text-[#0F1117]",
      ].join(" ")}
    >
      {renderIcon(item.icon)}
      <span>{item.label}</span>
      {item.badge ? (
        <span className="ml-auto min-w-4.5 rounded-full bg-[#D44040] px-1.5 text-center text-[10px] font-bold leading-4 text-white">
          {item.badge}
        </span>
      ) : null}
      {item.count ? (
        <span className="ml-auto text-[11px] text-[#8A8F98]">
          {item.count}
        </span>
      ) : null}
    </Link>
  );
}

function renderIcon(iconName: string): ReactElement {
  const commonClassName = "h-[18px] w-[18px] shrink-0 opacity-60 group-hover/item:opacity-100";

  const icons: Record<string, ReactElement> = {
    dashboard: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    monitoring: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
    patients: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    scheduling: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    "care-plans": (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    medications: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
    staff: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    incidents: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    compliance: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    finance: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    reports: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    messages: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    notifications: (
      <svg className={commonClassName} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  };

  return icons[iconName] ?? icons.dashboard;
}