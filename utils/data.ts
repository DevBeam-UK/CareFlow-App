export type NavItem = {
  href: string;
  label: string;
  icon: string;
  badge?: string;
  count?: string;
  isActive?: boolean;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Main",
    items: [
      {
        href: "/",
        label: "Dashboard",
        isActive: true,
        icon: "dashboard",
      },
      {
        href: "/live-monitoring",
        label: "Live Monitoring",
        badge: "3",
        icon: "monitoring",
      },
    ],
  },
  {
    label: "Care",
    items: [
      {
        href: "/patients",
        label: "Patients",
        count: "142",
        icon: "patients",
      },
      {
        href: "/scheduling",
        label: "Scheduling",
        icon: "scheduling",
      },
      {
        href: "#",
        label: "Care Plans",
        icon: "care-plans",
      },
      {
        href: "/medications",
        label: "Medications",
        icon: "medications",
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        href: "/staff",
        label: "Staff",
        count: "31",
        icon: "staff",
      },
      {
        href: "/incidents",
        label: "Incidents",
        badge: "2",
        icon: "incidents",
      },
      {
        href: "/compliance",
        label: "Compliance",
        icon: "compliance",
      },
      {
        href: "/finance",
        label: "Finance",
        icon: "finance",
      },
      {
        href: "/reports",
        label: "Reports",
        icon: "reports",
      },
    ],
  },
  {
    label: "Communication",
    items: [
      {
        href: "#",
        label: "Messages",
        icon: "messages",
      },
      {
        href: "#",
        label: "Notifications",
        icon: "notifications",
      },
    ],
  },
];
