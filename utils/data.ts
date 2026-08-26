import { CarePlan, CarePlanModule, StaffMember, StatCardProps } from "types";
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
        href: "/care-plans",
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

<<<<<<< HEAD
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
=======
export const mockPatients = [
  {
    id: "1",
    name: "Dorothy Chen",
    preferredName: "Dot",
    dateOfBirth: "1946-03-15",
    nhsNumber: "123 456 7890",
    address: "123 Oak Street, Manchester, M1 2AB",
    initials: "DC",
    age: 78,
    risk: "high" as const,
    status: "active" as const,
    carer: "Sarah Johnson",
    nextVisit: "Today, 2:00 PM",
    email: "dorothy.chen@email.com",
    phone: "0161 123 4567",
    gpName: "Dr. Sarah Ahmed",
    gpPhone: "0161 123 4567",
    gpAddress: "Oak Lane Surgery, Manchester",
    nextOfKinName: "Margaret Chen",
    nextOfKinPhone: "07700 900123",
    nextOfKinRelationship: "Daughter",
    emergencyContact: "Margaret Chen",
    emergencyPhone: "07700 900123",
    emergencyRelationship: "Daughter",
  },
  {
    id: "2",
    name: "James Okafor",
    preferredName: "Jim",
    dateOfBirth: "1962-08-22",
    nhsNumber: "234 567 8901",
    address: "456 Elm Avenue, Birmingham, B1 2AB",
    initials: "JO",
    age: 62,
    risk: "medium" as const,
    status: "active" as const,
    carer: "Michael Chen",
    nextVisit: "Tomorrow, 10:30 AM",
    email: "james.okafor@email.com",
    phone: "0121 456 7890",
    gpName: "Dr. David Patel",
    gpPhone: "0121 456 7890",
    gpAddress: "Elm Grove Surgery, Birmingham",
    nextOfKinName: "Grace Okafor",
    nextOfKinPhone: "07700 900456",
    nextOfKinRelationship: "Wife",
    emergencyContact: "Grace Okafor",
    emergencyPhone: "07700 900456",
    emergencyRelationship: "Wife",
  },
  {
    id: "3",
    name: "Edna Morris",
    preferredName: "",
    dateOfBirth: "1939-11-03",
    nhsNumber: "345 678 9012",
    address: "789 Pine Road, Leeds, LS1 2AB",
    initials: "EM",
    age: 85,
    risk: "high" as const,
    status: "on-hold" as const,
    carer: "Emma Williams",
    nextVisit: "March 22, 3:00 PM",
    email: "edna.morris@email.com",
    phone: "0113 789 0123",
    gpName: "Dr. Sarah Ahmed",
    gpPhone: "0113 789 0123",
    gpAddress: "Pine View Surgery, Leeds",
    nextOfKinName: "Thomas Morris",
    nextOfKinPhone: "07700 900789",
    nextOfKinRelationship: "Son",
    emergencyContact: "Thomas Morris",
    emergencyPhone: "07700 900789",
    emergencyRelationship: "Son",
  },
  {
    id: "4",
    name: "Robert Hayes",
    preferredName: "Bob",
    dateOfBirth: "1952-06-30",
    nhsNumber: "456 789 0123",
    address: "321 Birch Lane, Liverpool, L1 2AB",
    initials: "RH",
    age: 72,
    risk: "low" as const,
    status: "active" as const,
    carer: "David Smith",
    nextVisit: "March 21, 11:00 AM",
    email: "robert.hayes@email.com",
    phone: "0151 234 5678",
    gpName: "Dr. Emily Wilson",
    gpPhone: "0151 234 5678",
    gpAddress: "Birch Lane Surgery, Liverpool",
    nextOfKinName: "Susan Hayes",
    nextOfKinPhone: "07700 901234",
    nextOfKinRelationship: "Daughter",
    emergencyContact: "Susan Hayes",
    emergencyPhone: "07700 901234",
    emergencyRelationship: "Daughter",
  },
  {
    id: "5",
    name: "Sophie Martinez",
    preferredName: "Sophie",
    dateOfBirth: "1966-12-15",
    nhsNumber: "567 890 1234",
    address: "654 Cedar Court, Bristol, BS1 2AB",
    initials: "SM",
    age: 58,
    risk: "low" as const,
    status: "new" as const,
    carer: "Lisa Garcia",
    nextVisit: "March 25, 9:00 AM",
    email: "sophie.martinez@email.com",
    phone: "0117 567 8901",
    gpName: "Dr. James Brown",
    gpPhone: "0117 567 8901",
    gpAddress: "Cedar Court Surgery, Bristol",
    nextOfKinName: "Carlos Martinez",
    nextOfKinPhone: "07700 902345",
    nextOfKinRelationship: "Husband",
    emergencyContact: "Carlos Martinez",
    emergencyPhone: "07700 902345",
    emergencyRelationship: "Husband",
  },
];
>>>>>>> feat/patients-page
