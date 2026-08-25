"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui-components";
import { Checkbox } from "ui-components";
import { Avatar, AvatarFallback, AvatarImage } from "ui-components";
import { ArrowUpDown } from "lucide-react";
import { SortDirection, SortField, StaffTableProps } from "types";
import { formatUKPhone, getEmployeeStatusLabel, getEmployeeStatusVariant, getRoleBadgeColor, getStatusBadgeColor } from "utils";
import { TableActions } from "ui-components";
import { TableBulkActions } from "ui-components";
import { StaffViewDrawer } from "ui-components";
import { Badge, BadgeProps } from "@/components/ui";
import { formatRoleName } from "utils";

export function StaffTable({ data, onEdit, onDelete, onView }: StaffTableProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewingStaff, setViewingStaff] = useState(null);
  

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    return 0;
  });


  const handleView = (staff: any) => {
    setViewingStaff(staff);
    setDrawerOpen(true);
  };

  const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const SortableHeader = ({ field, label }: { field: SortField; label: string }) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-2 font-medium text-cf-ink-60 hover:text-cf-ink transition-colors">
      {label}
      <ArrowUpDown className={`h-4 w-4 ${sortField === field ? "text-cf-brand-500" : "opacity-40"}`} />
    </button>
  );

  return (
    <>
      <div className="w-full h-full rounded-lg border border-cf-border bg-cf-surface">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-cf-border-light hover:bg-transparent">
                <TableHead className="w-12 px-4">
                  <Checkbox
                    checked={selectedRows.size === data.length && data.length > 0}
                    indeterminate={selectedRows.size > 0 && selectedRows.size < data.length}
                    className="border-cf-border"
                  />
                </TableHead>
                <TableHead className="text-cf-ink-60"><SortableHeader field="name" label="Employee" /></TableHead>
                <TableHead className="text-cf-ink-60">Contact Info</TableHead>
                <TableHead className="text-cf-ink-60"><SortableHeader field="role" label="Role" /></TableHead>
                <TableHead className="text-cf-ink-60"><SortableHeader field="status" label="Status" /></TableHead>
                <TableHead className="text-cf-ink-60"><SortableHeader field="joinDate" label="Join Date" /></TableHead>
                <TableHead className="w-12 text-cf-ink-60">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((staff) => (
                  <TableRow key={staff.id} className={`border-b border-cf-border-light hover:bg-cf-surface-muted/50 transition-colors ${selectedRows.has(staff.id) ? "bg-cf-surface-muted/50" : ""}`}>
                    <TableCell className="px-4">
                      <Checkbox checked={selectedRows.has(staff.id)} className="border-cf-border" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-cf-border-light">
                          {staff.profilePicture && <AvatarImage src={staff.profilePicture} alt={staff.name} />}
                          <AvatarFallback className="bg-cf-surface-muted text-cf-ink-60 text-xs font-medium">{getInitials(staff.name)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-cf-ink whitespace-nowrap">{staff.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm text-cf-ink whitespace-nowrap">{staff.email}</span>
                        {staff.phone && <span className="text-xs text-cf-ink-60 mt-0.5">{formatUKPhone(staff.phone)}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                      variant={getRoleBadgeColor(staff.role) as BadgeProps['variant']}
                      shape={'pill'}
                      >
                        {formatRoleName(staff.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                      variant={getEmployeeStatusVariant(staff.status)}
                      shape={'pill'}
                      >
                      {getEmployeeStatusLabel(staff.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-cf-ink-60 whitespace-nowrap">{new Date(staff.joinDate).toLocaleDateString("en-GB")}</TableCell>
                    <TableCell>
                      <TableActions staff={staff} onView={handleView} onEdit={onEdit} onDelete={onDelete} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <p className="text-cf-ink-60">No staff members found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TableBulkActions 
          selectedCount={selectedRows.size} 
          onClear={() => setSelectedRows(new Set())} 
          onDelete={() => { selectedRows.forEach((id) => onDelete?.(id)); setSelectedRows(new Set()); }} 
        />
      </div>

      <StaffViewDrawer staff={viewingStaff} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}