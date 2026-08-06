import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface StatCardProps {
    label : string;
    Icon : LucideIcon;
    value : string;
    description : string;
    trend? : StatCardTrend;
    showTrend? : boolean;
    showScore? : boolean;
    score?: number;
    hasCqcScore? : boolean;
    cqcScore?: number;
    hasValueBadge?: boolean;
    valueBadgeValue?: string;
    children?: React.ReactNode     
}

export type StatCardTrend = 'up' | 'down' | 'neutral'

export interface PageBreadcrumbProps {
    previousPage : string;
    currentPage : string;
    icon: LucideIcon
}

export type StaffMember = {
  id: string;                    // agency_memberships.id
  userId: string;                // agency_memberships.userId
  name: string;                  // users.fullName
  email: string;                 // users.email
  phone?: string | null;         // users.phone
  profilePicture?: string | null; // users.picture
  role: "CARER" | "ADMIN" | "PATIENT" | "MANAGER";
  status: EmployeeStatus;        // agency_memberships.status
  joinDate: Date | string;       // agency_memberships.acceptedAt or createdAt
  invitedBy: string | null;      // agency_memberships.invitedBy
  invitedAt: Date | null;        // agency_memberships.invitedAt
  acceptedAt: Date | null;       // agency_memberships.acceptedAt
  createdAt: Date;               // agency_memberships.createdAt
  updatedAt: Date;               // agency_memberships.updatedAt
  deletedAt: Date | null;        // agency_memberships.deletedAt
  userStatus: string;            // users.status
  emailVerified: boolean;        // users.emailVerified
};

export interface StaffTableProps {
  data: StaffMember[];
  onEdit?: (staff: StaffMember) => void;
  onDelete?: (id: string) => void;
  onView?: (staff: StaffMember) => void;
}

export type SortField = keyof StaffMember;
export type SortDirection = "asc" | "desc";
export type EmployeeStatus = 'ACTIVE' | 'SUSPENDED' | 'ON_LEAVE' | 'TERMINATED' 