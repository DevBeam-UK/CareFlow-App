'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "ui-components";
import { Button } from "ui-components";
import { Input } from "ui-components";
import { StaffMember } from "types";
import { Loader2, AlertCircle } from 'lucide-react';

interface EditStaffModalProps {
  staff: StaffMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: Partial<StaffMember>) => Promise<void>;
}

export function EditStaffModal({
  staff,
  open,
  onOpenChange,
  onSave,
}: EditStaffModalProps) {
  const [formData, setFormData] = useState({
    name: staff.name,
    email: staff.email,
    phone: staff.phone || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }
      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }

      // Call onSave callback or API
      if (onSave) {
        await onSave({
          id: staff.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
        });
      } else {
        // Default API call
        const response = await fetch(`/api/staff/${staff.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update staff member');
        }
      }

      setSuccess(true);
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Staff Member</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5">✓</div>
            <p className="text-sm text-green-700">Changes saved successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-cf-ink">Full Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              disabled={isLoading}
              className="border-cf-border"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-cf-ink">Email</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              disabled={isLoading}
              className="border-cf-border"
            />
            <p className="text-xs text-cf-ink-60">
              Email verification status: {staff.emailVerified ? '✓ Verified' : '⚠ Not verified'}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-cf-ink">Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number (optional)"
              disabled={isLoading}
              className="border-cf-border"
            />
          </div>

          <div className="p-3 bg-cf-surface-muted rounded-lg">
            <p className="text-xs text-cf-ink-60">
              <strong>Role:</strong> {staff.role}
            </p>
            <p className="text-xs text-cf-ink-60 mt-1">
              <strong>Status:</strong> {staff.status}
            </p>
          </div>

          <DialogFooter className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1 border-cf-border hover:bg-cf-surface-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-cf-primary hover:bg-cf-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}