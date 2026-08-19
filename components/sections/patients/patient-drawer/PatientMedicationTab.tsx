'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockMedications = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    timing: 'Morning',
    indication: 'Hypertension',
    prescribedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    timing: 'With meals',
    indication: 'Type 2 Diabetes',
    prescribedDate: '2023-11-20',
  },
  {
    id: '3',
    name: 'Amlodipine',
    dosage: '5mg',
    frequency: 'Once daily',
    timing: 'Evening',
    indication: 'Hypertension',
    prescribedDate: '2024-02-01',
  },
  {
    id: '4',
    name: 'Aspirin',
    dosage: '75mg',
    frequency: 'Once daily',
    timing: 'Morning',
    indication: 'Cardiovascular protection',
    prescribedDate: '2023-12-10',
  },
];

export function PatientMedicationsTab() {
  return (
    <div className="space-y-3">
      {mockMedications.map((med) => (
        <Card key={med.id} className="border-cf-border">
          <CardContent className="pt-4">
            <div className="space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm text-cf-ink">{med.name}</p>
                  <p className="text-xs text-cf-ink-60 mt-0.5">{med.indication}</p>
                </div>
                <Badge variant="pastel-info" className="text-xs shrink-0" shape="pill">
                  {med.dosage}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-cf-ink-60">
                <span>{med.frequency}</span>
                <span>•</span>
                <span>{med.timing}</span>
              </div>
              <div className="text-[10px] text-cf-ink-40">
                Prescribed: {new Date(med.prescribedDate).toLocaleDateString('en-GB')}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}