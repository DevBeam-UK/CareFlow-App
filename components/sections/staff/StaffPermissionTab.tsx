'use client';

import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { useGetUserPermissionsApi } from "lib";
import { StaffMember } from "types";
import { PERMISSION_MODULES } from '@/utils';
import { PermissionsModal } from './PermissionsModal';
import { Button } from "ui-components";
import { Shield, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { PermissionTableSkeleton } from "ui-components";

export const PERMISSIONS_TABLE_HEADER_COLUMNS = [
  { label: 'Module' },
  { label: 'Read' },
  { label: 'Create' },
  { label: 'Update' },
  { label: 'Delete' },
  { label: 'All' },
];

export interface StaffPermissionTabProps {
  staff: StaffMember;
  agencyId: string;
  accessToken: string;
  onSavePermissions: (data: { permissions: Record<string, string[]> }) => Promise<void>;
  isSavingPermissions: boolean;
  isSuccess: boolean;

}

const StaffPermissionTab = ({
  accessToken,
  agencyId,
  staff,
  onSavePermissions,
  isSavingPermissions,
  isSuccess,
}: StaffPermissionTabProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: permissionData, isLoading, error } = useGetUserPermissionsApi(
    agencyId!,
    staff?.userId!,
    accessToken!
  );



  const permissionMap = new Map<string, string>();
  permissionData?.forEach((perm) => {
    permissionMap.set(`${perm.module}:${perm.action}`, perm.source);
  });



  const hasPermission = (module: string, action: string) => {
    const source = permissionMap.get(`${module.toLowerCase()}:${action}`);
    return source !== undefined && source !== 'block';
  };

  const isAllGranted = (module: string): boolean => {
    const moduleData = PERMISSION_MODULES.find((m) => m.id === module);
    if (!moduleData) return false;
    return moduleData.actions.every((action) => hasPermission(module, action));
  };

  if (isLoading) {
    return (<PermissionTableSkeleton />);
  }


  if (error) {
    return <div className="text-cf-ink-60 py-4">Permissions not found for this user</div>;
  }

  return (
    <div className="space-y-4">

      <div className="flex justify-end">
        <Button
          onClick={() => setIsModalOpen(true)}
        >
          <Shield className="w-4 h-4 mr-2" />
          Manage Permissions
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {PERMISSIONS_TABLE_HEADER_COLUMNS.map((header) => (
                <TableHead key={header.label}>{header.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {PERMISSION_MODULES.map((module) => {
              const hasRead = hasPermission(module.id, 'read');
              const hasCreate = hasPermission(module.id, 'create');
              const hasUpdate = hasPermission(module.id, 'update');
              const hasDelete = hasPermission(module.id, 'delete');
              const hasAll = hasPermission(module.id, 'all');

              return (
                <TableRow key={module.id}>
                  <TableCell>{module.label}</TableCell>
                  <TableCell>
                    {module.actions.includes('read') ? (
                      <Checkbox checked={hasRead} />
                    ) : (
                      <Checkbox className="bg-muted-foreground" disabled />
                    )}
                  </TableCell>
                  <TableCell>
                    {module.actions.includes('create') ? (
                      <Checkbox checked={hasCreate} />
                    ) : (
                      <Checkbox disabled />
                    )}
                  </TableCell>
                  <TableCell>
                    {module.actions.includes('update') ? (
                      <Checkbox checked={hasUpdate} />
                    ) : (
                      <Checkbox disabled />
                    )}
                  </TableCell>
                  <TableCell>
                    {module.actions.includes('delete') ? (
                      <Checkbox checked={hasDelete} />
                    ) : (
                      <Checkbox disabled />
                    )}
                  </TableCell>
                  <TableCell>
                    {module.actions.includes('all') ? (
                      <Checkbox checked={hasAll} />
                    ) : (
                      <Checkbox disabled />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <PermissionsModal
        staff={staff}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        defaultPermissions={permissionData}
        onSave={onSavePermissions}
        isLoading={isSavingPermissions}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default StaffPermissionTab;