'use client';

import { Card, CardHeader, CardTitle, CardContent, Badge } from 'ui-components';
import { ChevronRight } from 'lucide-react';

const auditTrailMockData = [
  {
    id: 1,
    time: '09:42',
    action: 'Care plan reviewed',
    details: 'Margaret Johnson - Personal care v4',
    user: 'Sarah W.',
    entity: 'Plan',
    entityColor: 'pastel-success',
  },
  {
    id: 2,
    time: '09:28',
    action: 'Visit completed',
    details: 'Lucy C. checked out · Arthur Wilson',
    user: 'Lucy C.',
    entity: 'Visit',
    entityColor: 'pastel-info',
  },
  {
    id: 3,
    time: '09:15',
    action: 'Medication administered',
    details: 'Paracetamol 500mg · Robert Ahmed',
    user: 'Priya P.',
    entity: 'MAR',
    entityColor: 'pastel-info',
  },
  {
    id: 4,
    time: '09:01',
    action: 'Incident reported',
    details: 'Safeguarding concern · Edna Morris',
    user: 'Sarah W.',
    entity: 'Incident',
    entityColor: 'pastel-danger',
  },
  {
    id: 5,
    time: '08:47',
    action: 'Risk assessment updated',
    details: 'Falls risk → High · Dorothy Chen',
    user: 'Emma C.',
    entity: 'Risk',
    entityColor: 'pastel-warning',
  },
];

export function RecentAuditTrailCard() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-bold">Recent Audit Trail</CardTitle>
          <a href="#" className="text-sm text-cf-ink-60 hover:text-cf-ink">
            Full Audit Log
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {auditTrailMockData.map((log) => (
            <div key={log.id} className="flex gap-4 pb-4 border-b border-cf-border last:border-b-0 last:pb-0">
              <div className="w-12 flex-shrink-0">
                <p className="text-sm font-semibold text-cf-ink-60">{log.time}</p>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-cf-ink">{log.action}</p>
                <p className="text-sm text-cf-ink-60 mt-0.5">{log.details}</p>
              </div>

              <div className="text-right flex-shrink-0 space-y-2">
                <p className="text-sm text-cf-ink-60">{log.user}</p>
                <Badge variant={log.entityColor as any} className="text-xs">
                  {log.entity}
                </Badge>
              </div>

              <ChevronRight className="h-5 w-5 text-cf-ink-40 flex-shrink-0" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}