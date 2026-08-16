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
import { MoreVertical, FileText, Lock, Clock } from 'lucide-react';
import { Permission, StaffMember } from '@/types/components';
import { PermissionsModal } from '@/components/sections/staff/PermissionsModal';
import { EditStaffModal } from '@/components/sections/staff/EditStaffModal';
import { StaffDetailsTab } from '@/components/sections/staff/StaffDetailedTab';
import { StaffActivityTab } from '@/components/sections/staff/StaffActivityTab';
import { getRoleBadgeColor, getRoleDisplayName, getStatusBadgeColor } from '@/utils/staff-table-utils';
import { StaffViewTabs } from './staff-view-tabs';
import { useSession } from 'next-auth/react';
import { useGetUserPermissionsApi, useGrantUserPermissionsApi } from '@/lib/hooks/use-permissions-api';
import StaffPermissionTab from '@/components/sections/staff/StaffPermissionTab';


type TabType = 'details' | 'permissions' | 'activity';

interface StaffViewDrawerProps {
  staff: StaffMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StaffViewDrawer({ staff, open, onOpenChange }: StaffViewDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const {data: userData} = useSession()

  const agencyId = userData?.user.agencyId
  const accessToken = userData?.accessToken

   const { mutate: grantPermissions, isPending, isSuccess } = useGrantUserPermissionsApi(staff?.userId!);

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
        return <StaffPermissionTab staff={staff} accessToken={accessToken!} agencyId={agencyId!} onSavePermissions={handleSavePermissions} isSavingPermissions={isPending} isSuccess={isSuccess}/>;
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
          <DrawerHeader className="border-b border-cf-border px-6 py-4 flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {staff.profilePicture ? (
                  <img
                    src={staff.profilePicture}
                    alt={staff.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-cf-surface-muted flex items-center justify-center text-lg font-semibold text-cf-ink">
                    {staff.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <DrawerTitle className="text-2xl font-bold text-cf-ink">
                    {staff.name}
                  </DrawerTitle>
                  <p className="text-sm text-cf-ink-60">{staff.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={`capitalize ${getRoleBadgeColor(staff.role)}`}>
                  {getRoleDisplayName(staff.role)}
                </Badge>
                <Badge variant="outline" className={`capitalize ${getStatusBadgeColor(staff.status)}`}>
                  {staff.status}
                </Badge>
                {!staff.emailVerified && (
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    Email Not Verified
                  </Badge>
                )}
              </div>
            </div>
            <button className="p-2 hover:bg-cf-surface-muted rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-cf-ink-60" />
            </button>
          </DrawerHeader>

          
          <StaffViewTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab as any} />

          
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {renderTabContent()}
          </div>

        
          <DrawerFooter className="border-t border-cf-border px-6 py-4 flex gap-3">
            
            <Button
              onClick={() => setEditModalOpen(true)}
              
            >
              <FileText className="w-4 h-4 mr-2" />
              Edit Details
            </Button>
            <DrawerClose>
              <Button variant="outline" className="flex-1 border-cf-border hover:bg-cf-surface-muted">
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