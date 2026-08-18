'use client';

import { FileText, Mail, Phone, Calendar, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { StaffMember } from '@/types/components';
import { formatDate, formatTime } from '@/utils/date-utils';


interface StaffDetailsTabProps {
  staff: StaffMember;
}

export function StaffDetailsTab({ staff }: StaffDetailsTabProps) {
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div>
        <h3 className="text-sm font-semibold text-cf-ink mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Contact Information
        </h3>
        <div className="grid gap-4">
          <div className="flex items-center gap-3 p-3 bg-cf-surface-muted rounded-lg">
            <Mail className="w-4 h-4 text-cf-ink-60 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-cf-ink-60 font-medium">Email</p>
              <p className="text-sm text-cf-ink truncate font-medium">{staff.email}</p>
            </div>
            {staff.emailVerified ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
            )}
          </div>

          {staff.phone && (
            <div className="flex items-center gap-3 p-3 bg-cf-surface-muted rounded-lg">
              <Phone className="w-4 h-4 text-cf-ink-60 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-cf-ink-60 font-medium">Phone</p>
                <p className="text-sm text-cf-ink font-medium">{staff.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Employment Information */}
      <div>
        <h3 className="text-sm font-semibold text-cf-ink mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Employment Information
        </h3>
        <div className="grid gap-4">
          <div className="p-3 bg-cf-surface-muted rounded-lg">
            <p className="text-xs text-cf-ink-60 font-medium mb-1">Employment Status</p>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  staff.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'
                }`}
              />
              <p className="text-sm text-cf-ink font-medium capitalize">{staff.status}</p>
            </div>
          </div>

          <div className="p-3 bg-cf-surface-muted rounded-lg">
            <p className="text-xs text-cf-ink-60 font-medium mb-1">Join Date</p>
            <p className="text-sm text-cf-ink font-medium">{formatDate(staff.joinDate)}</p>
          </div>

          {staff.invitedAt && (
            <div className="p-3 bg-cf-surface-muted rounded-lg">
              <p className="text-xs text-cf-ink-60 font-medium mb-1">Invited On</p>
              <p className="text-sm text-cf-ink font-medium">{formatDate(staff.invitedAt)}</p>
            </div>
          )}

          {staff.acceptedAt && (
            <div className="p-3 bg-cf-surface-muted rounded-lg">
              <p className="text-xs text-cf-ink-60 font-medium mb-1">Accepted On</p>
              <p className="text-sm text-cf-ink font-medium">{formatDate(staff.acceptedAt)}</p>
            </div>
          )}

          {staff.invitedBy && (
            <div className="p-3 bg-cf-surface-muted rounded-lg">
              <p className="text-xs text-cf-ink-60 font-medium mb-1">Invited By</p>
              <p className="text-sm text-cf-ink font-medium">{staff.invitedBy}</p>
            </div>
          )}
        </div>
      </div>

      {/* Account Status */}
      <div>
        <h3 className="text-sm font-semibold text-cf-ink mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Account Status
        </h3>
        <div className="grid gap-4">
          <div className="p-3 bg-cf-surface-muted rounded-lg">
            <p className="text-xs text-cf-ink-60 font-medium mb-1">User Status</p>
            <p className="text-sm text-cf-ink font-medium capitalize">{staff.userStatus}</p>
          </div>

          <div className="p-3 bg-cf-surface-muted rounded-lg">
            <p className="text-xs text-cf-ink-60 font-medium mb-1">Email Verification</p>
            <div className="flex items-center gap-2">
              {staff.emailVerified ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-cf-ink font-medium">Email Verified</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-cf-ink font-medium">Pending Verification</span>
                </>
              )}
            </div>
          </div>

          <div className="p-3 bg-cf-surface-muted rounded-lg">
            <p className="text-xs text-cf-ink-60 font-medium mb-1">Last Updated</p>
            <p className="text-sm text-cf-ink font-medium">{formatTime(staff.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}