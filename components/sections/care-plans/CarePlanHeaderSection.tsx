'use client';

import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

interface CarePlanHeaderProps {
  onCreateNew: () => void;
  onExport?: () => void;
}

export function CarePlanHeader({ onCreateNew, onExport }: CarePlanHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-cf-ink">Care Plans</h1>
        <p className="text-sm text-cf-ink-60 mt-1">
          Create and manage patient care plans
        </p>
      </div>
      <div className="flex items-center gap-3">
        {onExport && (
          <Button variant="outline" onClick={onExport} className="gap-1.5">
            <FileText className="h-4 w-4" />
            Export
          </Button>
        )}
        <Button onClick={onCreateNew} className="gap-1.5">
          <Plus className="h-4 w-4" />
          New Care Plan
        </Button>
      </div>
    </div>
  );
}