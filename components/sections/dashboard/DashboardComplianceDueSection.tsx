// components/sections/dashboard/DashboardComplianceDue.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertCircle } from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  dueDate: string;
  daysRemaining: number;
  priority: 'high' | 'medium' | 'low';
  count?: number;
}


const complianceDueItems: ComplianceItem[] = [
  {
    id: '1',
    title: 'DBS Checks',
    dueDate: 'March 20, 2024',
    daysRemaining: 3,
    priority: 'high',
    count: 5,
  },
  {
    id: '2',
    title: 'Fire Safety Training',
    dueDate: 'March 22, 2024',
    daysRemaining: 5,
    priority: 'high',
    count: 8,
  },
  {
    id: '3',
    title: 'Manual Handling Certification',
    dueDate: 'March 28, 2024',
    daysRemaining: 11,
    priority: 'medium',
    count: 3,
  },
  {
    id: '4',
    title: 'CQC Documentation Review',
    dueDate: 'April 1, 2024',
    daysRemaining: 15,
    priority: 'low',
    count: 1,
  },
];

const priorityColors: Record<'high' | 'medium' | 'low', string> = {
  high: 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20',
  medium: 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20',
  low: 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20',
};

const priorityTextColors: Record<'high' | 'medium' | 'low', string> = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-blue-600',
};

const priorityDotColors: Record<'high' | 'medium' | 'low', string> = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-blue-500',
};

const getPriorityLabel = (priority: 'high' | 'medium' | 'low'): string => {
  const labels = {
    high: 'Urgent',
    medium: 'Due Soon',
    low: 'Upcoming',
  };
  return labels[priority];
};

export function DashboardComplianceDue() {
 
  const sortedItems = [...complianceDueItems].sort(
    (a, b) => a.daysRemaining - b.daysRemaining
  );

  const urgentCount = complianceDueItems.filter(
    (item) => item.priority === 'high'
  ).length;

  return (
    <Card className="border-cf-border w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4">
        <CardTitle className="text-sm font-semibold text-cf-ink">
          Compliance Due
        </CardTitle>
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-cf-ink-60" />
          <span className="text-xs text-cf-ink-60">Next 14 days</span>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {/* Urgent Alert */}
        {urgentCount > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700">
              <span className="font-medium">{urgentCount}</span> urgent compliance items due
            </p>
          </div>
        )}

        {/* Compliance Items Stack */}
        <div className="space-y-2">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border transition-colors ${priorityColors[item.priority]}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  {/* Priority Dot */}
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${priorityDotColors[item.priority]}`}
                  />

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-cf-ink">
                      {item.title}
                    </p>
                  </div>
                </div>

                {/* Count Badge */}
                {item.count && (
                  <Badge
                    variant="outline"
                    className={`text-xs flex-shrink-0 ${priorityTextColors[item.priority]}`}
                  >
                    {item.count}
                  </Badge>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-cf-ink-60">{item.dueDate}</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-xs font-medium ${priorityTextColors[item.priority]}`}
                  >
                    {item.daysRemaining} days
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${priorityTextColors[item.priority]}`}
                  >
                    {getPriorityLabel(item.priority)}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedItems.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-sm text-cf-ink-60">No compliance items due</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}