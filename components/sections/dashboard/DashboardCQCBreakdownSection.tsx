// components/sections/dashboard/DashboardCQCBreakdown.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface CQCAttribute {
  name: string;
  score: number;
}

// Mock data - replace with real API
const cqcAttributes: CQCAttribute[] = [
  { name: 'Safe', score: 92 },
  { name: 'Effective', score: 85 },
  { name: 'Caring', score: 88 },
  { name: 'Responsive', score: 79 },
  { name: 'Well-led', score: 91 },
];

// Determine color based on score
const getProgressColor = (score: number): string => {
  if (score >= 90) return 'bg-green-500'; // Excellent
  if (score >= 80) return 'bg-emerald-500'; // Good
  if (score >= 70) return 'bg-yellow-500'; // Acceptable
  if (score >= 60) return 'bg-orange-500'; // Needs improvement
  return 'bg-red-500'; // Poor
};

const getScoreLabel = (score: number): string => {
  if (score >= 90) return 'Outstanding';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Acceptable';
  if (score >= 60) return 'Needs Improvement';
  return 'Poor';
};

export function DashboardCQCBreakdown() {
  const overallScore =
    Math.round(
      cqcAttributes.reduce((acc, attr) => acc + attr.score, 0) /
        cqcAttributes.length
    ) || 0;

  return (
    <Card className="border-cf-border w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-4 px-4">
        <CardTitle className="text-sm font-semibold text-cf-ink">
          CQC Breakdown
        </CardTitle>
        <div className="flex items-center gap-1.5 cursor-help" title="Care Quality Commission rating">
          <Info className="h-4 w-4 text-cf-ink-40" />
          <span className="text-xs text-cf-ink-60">Details</span>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-4">

       
        <div className="space-y-3">
          {cqcAttributes.map((attr) => (
            <div key={attr.name} className="space-y-1.5">
          
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-cf-ink">
                  {attr.name}
                </span>
                <span className="text-sm font-semibold text-cf-ink">
                  {attr.score}
                </span>
              </div>

           
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getProgressColor(
                    attr.score
                  )}`}
                  style={{ width: `${attr.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Last Updated Info */}
        <div className="pt-2 border-t border-cf-border">
          <p className="text-[10px] text-cf-ink-40">
            Last updated: March 15, 2024
          </p>
        </div>
      </CardContent>
    </Card>
  );
}