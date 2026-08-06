"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "../drawer";
import { Button } from "@/components/ui/button";
import { StaffMember } from "@/types/components";

interface StaffViewDrawerProps {
  staff: StaffMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StaffViewDrawer({ staff, open, onOpenChange }: StaffViewDrawerProps) {
  if (!staff) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{staff.name}</DrawerTitle>
          </DrawerHeader>
          
          <div className="p-4 space-y-4">
            <p className="text-sm text-cf-ink-60">Role: <span className="text-cf-ink font-medium capitalize">{staff.role}</span></p>
            <p className="text-sm text-cf-ink-60">Email: <span className="text-cf-ink font-medium">{staff.email}</span></p>
            <p className="text-sm text-cf-ink-60">Status: <span className="text-cf-ink font-medium capitalize">{staff.status}</span></p>
          </div>

          <DrawerFooter>
            <DrawerClose >
              <Button variant="outline" className="w-full border-cf-border hover:bg-cf-surface-muted">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}