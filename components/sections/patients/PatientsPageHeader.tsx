'use client';

import { Button } from 'ui-components';
import { Plus } from 'lucide-react';

interface PatientsPageHeaderProps {
  onCreateClick: () => void;
}

export function PatientsPageHeader({ onCreateClick }: PatientsPageHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-cf-ink">Patients</h1>
        <p className="text-sm text-cf-ink-60">
          Manage and monitor your patients' care and health records
        </p>
      </div>
      <Button
        onClick={onCreateClick}
            
      >
        <Plus className="h-4 w-4" />
        <span className="text-sm">New Patient</span>
      </Button>
    </div>
  );
}