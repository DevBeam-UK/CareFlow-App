'use client';

import { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  MessageSquare,
  FileText,
  Lock,
  Clock,
  UserX,
} from 'lucide-react';
import { StaffMember } from '@/types/components';
import { EditStaffModal } from '@/components/sections/staff/EditStaffModal';
import { StaffDetailsTab } from '@/components/sections/staff/StaffDetailedTab';
import { StaffActivityTab } from '@/components/sections/staff/StaffActivityTab';
import {
  getRoleBadgeColor,
  getRoleDisplayName,
  getStatusBadgeColor,
} from '@/utils/staff-table-utils';
import { StaffViewTabs } from './staff-view-tabs';
import { useSession } from 'next-auth/react';
import { useGrantUserPermissionsApi } from '@/lib/hooks/use-permissions-api';
import StaffPermissionTab from '@/components/sections/staff/StaffPermissionTab';
import { formatTime } from '@/utils/date-utils';

type TabType = 'details' | 'permissions' | 'activity';

interface StaffViewDrawerProps {
  staff: StaffMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Role-tinted ring color for the avatar — echoes the status-pill language
// used across the rest of the dashboard (active/pending/suspended pulses).
function getAvatarRingClass(status: string) {
  switch (status?.toUpperCase()) {
    case 'ACTIVE':
      return 'ring-2 ring-cf-primary/40 ring-offset-2 ring-offset-cf-surface';
    case 'PENDING':
    case 'INVITED':
      return 'ring-2 ring-amber-400/50 ring-offset-2 ring-offset-cf-surface';
    case 'SUSPENDED':
    case 'INACTIVE':
      return 'ring-2 ring-cf-ink-20 ring-offset-2 ring-offset-cf-surface';
    default:
      return 'ring-2 ring-cf-border ring-offset-2 ring-offset-cf-surface';
  }
}

function getStatusDotClass(status: string) {
  switch (status?.toUpperCase()) {
    case 'ACTIVE':
      return 'bg-cf-primary';
    case 'PENDING':
    case 'INVITED':
      return 'bg-amber-400';
    case 'SUSPENDED':
    case 'INACTIVE':
      return 'bg-cf-ink-40';
    default:
      return 'bg-cf-ink-20';
  }
}

export function StaffViewDrawer({ staff, open, onOpenChange }: StaffViewDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { data: userData } = useSession();

  const agencyId = userData?.user.agencyId;
  const accessToken = userData?.accessToken;

  const { mutate: grantPermissions, isPending, isSuccess } =
    useGrantUserPermissionsApi(staff?.userId!);

  const handleSavePermissions = async (data: { permissions: Record<string, string[]> }) => {
    grantPermissions({
      accessToken: accessToken!,
      agencyId: agencyId!,
      permissions: data.permissions,
    });
  };

  if (!staff) return null;

  const tabs = [
    { id: 'details' as const, label: 'Details', icon: FileText },
    { id: 'permissions' as const, label: 'Permissions', icon: Lock },
    { id: 'activity' as const, label: 'Activity', icon: Clock },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <StaffDetailsTab staff={staff} />;
      case 'permissions':
        return (
          <StaffPermissionTab
            staff={staff}
            accessToken={accessToken!}
            agencyId={agencyId!}
            onSavePermissions={handleSavePermissions}
            isSavingPermissions={isPending}
            isSuccess={isSuccess}
          />
        );
      case 'activity':
        return <StaffActivityTab staff={staff} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
        <DrawerContent className="h-screen max-w-2xl flex flex-col">
          {/* Header */}
          <DrawerHeader className="border-b border-cf-border px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 min-w-0">
                <div className="relative flex-shrink-0">
                  {staff.profilePicture ? (
                    <img
                      src={staff.profilePicture}
                      alt={staff.name}
                      className={`w-14 h-14 rounded-full object-cover ${getAvatarRingClass(
                        staff.status,
                      )}`}
                    />
                  ) : (
                    <div
                      className={`w-14 h-14 rounded-full bg-cf-surface-muted flex items-center justify-center text-lg font-semibold text-cf-ink ${getAvatarRingClass(
                        staff.status,
                      )}`}
                    >
                      {staff.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-cf-surface ${getStatusDotClass(
                      staff.status,
                    )}`}
                  />
                </div>

                <div className="min-w-0">
                  <DrawerTitle className="text-xl font-bold text-cf-ink leading-tight truncate">
                    {staff.name}
                  </DrawerTitle>
                  <p className="text-sm text-cf-ink-60 truncate">{staff.email}</p>

                  <div className="flex items-center gap-2 flex-wrap mt-2.5">
                    <Badge
                      variant="outline"
                      className={`capitalize ${getRoleBadgeColor(staff.role)}`}
                    >
                      {getRoleDisplayName(staff.role)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`capitalize ${getStatusBadgeColor(staff.status)}`}
                    >
                      {staff.status}
                    </Badge>
                    {!staff.emailVerified && (
                      <Badge
                        variant="outline"
                        className="bg-orange-50 text-orange-700 border-orange-200"
                      >
                        Email not verified
                      </Badge>
                    )}
                  </div>

                  {staff.updatedAt && (
                    <p className="text-xs text-cf-ink-40 mt-2">
                      Last active {formatTime(staff.updatedAt)}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick actions — surfaced instead of buried in a dropdown */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => staff.email && (window.location.href = `mailto:${staff.email}`)}
                  className="p-2 hover:bg-cf-surface-muted rounded-lg transition-colors group"
                  title="Send email"
                >
                  <Mail className="w-4 h-4 text-cf-ink-60 group-hover:text-cf-ink" />
                </button>
                <button
                  className="p-2 hover:bg-cf-surface-muted rounded-lg transition-colors group"
                  title="Send SMS"
                >
                  <MessageSquare className="w-4 h-4 text-cf-ink-60 group-hover:text-cf-ink" />
                </button>
              </div>
            </div>
          </DrawerHeader>

          <StaffViewTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab as any} />

          <div className="flex-1 overflow-y-auto px-6 py-6">{renderTabContent()}</div>

          <DrawerFooter className="border-t border-cf-border px-6 py-4 flex items-center gap-3">
            <Button onClick={() => setEditModalOpen(true)} className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              Edit details
            </Button>
            <Button
              variant="outline"
              className="border-cf-border text-cf-error hover:bg-red-50 hover:border-red-200"
            >
              <UserX className="w-4 h-4 mr-2" />
              Deactivate
            </Button>
            <DrawerClose>
              <Button variant="outline" className="border-cf-border hover:bg-cf-surface-muted">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <EditStaffModal staff={staff} open={editModalOpen} onOpenChange={setEditModalOpen} />
    </>
  );
}