'use client';

import { StaffMember } from '@/types/components';
import { formatTime } from '@/utils/date-utils';


interface StaffActivityTabProps {
  staff: StaffMember;
}

interface Activity {
  action: string;
  timestamp: Date | string | null | undefined;
  icon: string;
}

export function StaffActivityTab({ staff }: StaffActivityTabProps) {
  const activities: Activity[] = [
    {
      action: 'Account Created',
      timestamp: staff.createdAt,
      icon: '👤',
    },
  ];

  if (staff.invitedAt) {
    activities.push({
      action: 'Invitation Sent',
      timestamp: staff.invitedAt,
      icon: '📧',
    });
  }

  if (staff.acceptedAt) {
    activities.push({
      action: 'Invitation Accepted',
      timestamp: staff.acceptedAt,
      icon: '✓',
    });
  }

  activities.push({
    action: 'Last Updated',
    timestamp: staff.updatedAt,
    icon: '🔄',
  });

  return (
    <div className="space-y-4">
      {activities.map((activity, idx) => (
        <div
          key={idx}
          className="flex gap-4 p-3 bg-cf-surface-muted rounded-lg hover:bg-cf-surface-light transition-colors"
        >
          <div className="text-xl flex-shrink-0">{activity.icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-cf-ink">{activity.action}</p>
            <p className="text-xs text-cf-ink-60 mt-1">
              {formatTime(activity.timestamp)}
            </p>
          </div>
        </div>
      ))}

      {staff.deletedAt && (
        <div className="flex gap-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="text-xl flex-shrink-0">🗑️</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-900">Account Deleted</p>
            <p className="text-xs text-red-700 mt-1">
              {formatTime(staff.deletedAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}