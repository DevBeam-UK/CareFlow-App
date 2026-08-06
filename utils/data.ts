import { StaffMember, StatCardProps } from "@/types/components";
import { UserCheck, UserPlus, Users, UserX2 } from "lucide-react";

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




export const staffStatsData: StatCardProps[] = [
  {
    label: "Total Staff",
    Icon: Users, // ✅ Component reference, not JSX
    value: "42",
    description: "All staff members in your agency",
  },
  {
    label: "Active Staff",
    Icon: UserCheck,
    value: "34",
    description: "Currently active and working",
  },
  {
    label: "Pending Invites",
    Icon: UserPlus,
    value: "5",
    description: "Invitations waiting to be accepted",
  },
  {
    label: "Suspended",
    Icon: UserX2,
    value: "3",
    description: "Temporarily suspended accounts",
  },
];


export const MOCK_STAFF_DATA: StaffMember[] = [
  {
    id: "mem-001",
    name: "Alice Johnson",
    email: "alice.johnson@careflow.app",
    phone: "020 7123 4567",
    profilePicture: null,
    role: "carer",
    status: "ACTIVE",
    joinDate: "2024-01-15",
  },
  {
    id: "mem-002",
    name: "Bob Smith",
    email: "bob.smith@careflow.app",
    phone: "020 7123 4568",
    profilePicture: null,
    role: "manager",
    status: "ACTIVE",
    joinDate: "2023-11-20",
  },
  {
    id: "mem-003",
    name: "Carol White",
    email: "carol.white@careflow.app",
    phone: "020 7123 4569",
    profilePicture: null,
    role: "admin",
    status: "ACTIVE",
    joinDate: "2023-08-10",
  },
  {
    id: "mem-004",
    name: "David Brown",
    email: "david.brown@careflow.app",
    phone: "020 7123 4570",
    profilePicture: null,
    role: "carer",
    status: "SUSPENDED",
    joinDate: "2024-02-05",
  },
  {
    id: "mem-005",
    name: "Emma Davis",
    email: "emma.davis@careflow.app",
    phone: "020 7123 4571",
    profilePicture: null,
    role: "manager",
    status: "ACTIVE",
    joinDate: "2024-01-10",
  },
 
];