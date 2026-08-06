"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useAddStaffApi } from "@/lib/hooks/use-staff-api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function AddStaffModal() {

  const [open , setOpen] = useState(false)

  const session = useSession()
  const accessToken = session.data?.accessToken
  const agencyId = session.data?.user.agencyId
  const {mutate: addStaff , isPending } = useAddStaffApi()


  const [staffInfo , setStaffInfo] = useState({
    fullName : '',
    email: '',
    phone: '',
    role : '',
    password : ''
  })

  const handleSubmitStaff = (e: React.FormEvent) => {
    e.preventDefault()
    if (!accessToken || !agencyId) {
      toast.error('Cannot add staff currently')
      return
    }
    addStaff({
      email: staffInfo.email,
      fullname: staffInfo.fullName,
      role: staffInfo.role,
      phone: staffInfo.phone,
      password: staffInfo.password,
      accessToken: accessToken,
      agencyId: agencyId,
    }, {
      onSuccess: () => {
        toast.success('Staff added successfully')
        setStaffInfo({
          email: '',
          fullName: '',
          password: '',
          phone: '',
          role: ''
        })
        setOpen(false)
      }
    });
  }

  



  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        <Button >
          <Plus className="h-4 w-4" />
          Add Staff Member
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg border-cf-border bg-cf-surface">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cf-ink">
            Add Staff Member
          </DialogTitle>
          <DialogDescription className="text-cf-ink-60">
            Fill in the details below to add a new staff member to your agency.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmitStaff}>
        <div className="space-y-6 py-4">

          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-cf-ink"
            >
              Full Name <span className="text-cf-error">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={staffInfo.fullName}
              onChange={(e) => setStaffInfo({ ...staffInfo, fullName: e.target.value })}
              placeholder="e.g., John Doe"
              className="border-cf-border bg-cf-surface-inset text-cf-ink placeholder:text-cf-ink-40"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-cf-ink"
            >
              Email Address <span className="text-cf-error">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={staffInfo.email}
              onChange={(e) => setStaffInfo({ ...staffInfo, email: e.target.value })}
              placeholder="john@careflow.app"
              className="border-cf-border bg-cf-surface-inset text-cf-ink placeholder:text-cf-ink-40"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-semibold text-cf-ink"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={staffInfo.phone}
              onChange={(e) => setStaffInfo({ ...staffInfo, phone: e.target.value })}
              placeholder="020 7123 4567"
              className="border-cf-border bg-cf-surface-inset text-cf-ink placeholder:text-cf-ink-40"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-semibold text-cf-ink"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={staffInfo.password}
              onChange={(e) => setStaffInfo({ ...staffInfo, password: e.target.value })}
              placeholder=""
              className="border-cf-border bg-cf-surface-inset text-cf-ink placeholder:text-cf-ink-40"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="role"
              className="text-sm font-semibold text-cf-ink"
            >
              Role <span className="text-cf-error">*</span>
            </Label>
            <Select
            value={staffInfo.role}
            onValueChange={(value) => setStaffInfo({ ...staffInfo, role: value! })}
            >
              <SelectTrigger
                id="role"
                className="border-cf-border bg-cf-surface-inset text-cf-ink"
              >
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-cf-surface border-cf-border">
                <SelectItem value="CARER">Carer</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>


        <div className="flex gap-3 border-t border-cf-border-light pt-6">
          <DialogTrigger >
            <Button
              variant="outline"
              className="border-cf-border bg-cf-surface text-cf-ink hover:bg-cf-surface-muted"
            >
              Cancel
            </Button>
          </DialogTrigger>
          <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Staff Member"
              )}
            </Button>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}