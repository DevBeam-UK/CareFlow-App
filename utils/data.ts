import { StaffMember, StatCardProps, Visit } from "@/types/components";
import { UserCheck, UserPlus, Users, UserX2 } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: string;
  badge?: string;
  count?: string;
  isActive?: boolean;
  requiredModule : string;
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
        requiredModule: "dashboard",
      },
      {
        href: "/live-monitoring",
        label: "Live Monitoring",
        badge: "3",
        icon: "monitoring",
        requiredModule: "visits",
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
        requiredModule: "patients",
      },
      {
        href: "/scheduling",
        label: "Scheduling",
        icon: "scheduling",
        requiredModule: "schedule",
      },
      {
        href: "#",
        label: "Care Plans",
        icon: "care-plans",
        requiredModule: "patients",
      },
      {
        href: "/medications",
        label: "Medications",
        icon: "medications",
        requiredModule: "patients",
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
        requiredModule: "staff",
      },
      {
        href: "/incidents",
        label: "Incidents",
        badge: "2",
        icon: "incidents",
        requiredModule: "visits",
      },
      {
        href: "/compliance",
        label: "Compliance",
        icon: "compliance",
        requiredModule: "reports",
      },
      {
        href: "/finance",
        label: "Finance",
        icon: "finance",
        requiredModule: "finance",
      },
      {
        href: "/reports",
        label: "Reports",
        icon: "reports",
        requiredModule: "reports",
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
        requiredModule: "users",
      },
      {
        href: "#",
        label: "Notifications",
        icon: "notifications",
        requiredModule: "dashboard",
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



export const PERMISSION_MODULES = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    actions: ['read'],
  },
  {
    id: 'patients',
    label: 'Patients',
    actions: ['create', 'read', 'update', 'delete', 'all'],
  },
  {
    id: 'schedule',
    label: 'Schedule',
    actions: ['create', 'read', 'update', 'delete', 'all'],
  },
  {
    id: 'visits',
    label: 'Visits',
    actions: ['create', 'read', 'update', 'delete', 'all'],
  },
  {
    id: 'staff',
    label: 'Staff',
    actions: ['create', 'read', 'update', 'delete', 'all'],
  },
  {
    id: 'finance',
    label: 'Finance',
    actions: ['create', 'read', 'update', 'delete', 'all'],
  },
  {
    id: 'reports',
    label: 'Reports',
    actions: ['create', 'read', 'export'],
  },
  {
    id: 'settings',
    label: 'Settings',
    actions: ['read', 'update', 'manage'],
  },
  {
    id: 'permissions',
    label: 'Permissions',
    actions: ['create', 'read', 'update', 'delete', 'all'],
  },
  {
    id: 'users',
    label: 'Users',
    actions: ['create', 'read', 'update', 'delete', 'all'],
  },
  {
    id: 'agencies',
    label: 'Agencies',
    actions: ['create', 'read', 'update', 'delete', 'all'],
  },
];

export const ACTION_TO_COLUMN: Record<string, string> = {
  create: 'Create',
  read: 'Read',
  update: 'Update',
  delete: 'Delete',
  export: 'Export',
  manage: 'Manage',
  all: 'All',
};

export const PERMISSIONS_TABLE_HEADER_COLUMNS = [
  { label: 'Module' },
  { label: 'Create' },  
  { label: 'Read' },
  { label: 'Update' },
  { label: 'Delete' },
];

export const mockVisits: Visit[] = [
  {
    id: '1',
    patientName: 'Dorothy Chen',
    patientId: '1',
    carerName: 'Sarah Johnson',
    carerId: '1',
    startTime: '08:30',
    endTime: '09:30',
    date: '2024-03-18',
    type: 'care',
    status: 'scheduled',
    address: '123 Oak Street, Manchester',
  },
  {
    id: '2',
    patientName: 'James Okafor',
    patientId: '2',
    carerName: 'Michael Chen',
    carerId: '2',
    startTime: '09:00',
    endTime: '10:00',
    date: '2024-03-18',
    type: 'medication',
    status: 'scheduled',
    address: '456 Elm Avenue, Birmingham',
  },
  {
    id: '3',
    patientName: 'Edna Morris',
    patientId: '3',
    carerName: 'Emma Williams',
    carerId: '3',
    startTime: '10:00',
    endTime: '11:30',
    date: '2024-03-18',
    type: 'care',
    status: 'scheduled',
    address: '789 Pine Road, Leeds',
  },
  {
    id: '4',
    patientName: 'Robert Hayes',
    patientId: '4',
    carerName: 'David Smith',
    carerId: '4',
    startTime: '14:00',
    endTime: '15:00',
    date: '2024-03-19',
    type: 'check-up',
    status: 'scheduled',
    address: '321 Birch Lane, Liverpool',
  },
  {
    id: '5',
    patientName: 'Sophie Martinez',
    patientId: '5',
    carerName: 'Lisa Garcia',
    carerId: '5',
    startTime: '13:30',
    endTime: '14:30',
    date: '2024-03-20',
    type: 'therapy',
    status: 'scheduled',
    address: '654 Cedar Court, Bristol',
  },
];