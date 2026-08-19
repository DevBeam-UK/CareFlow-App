'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockClinicalNotes = [
  {
    id: '1',
    date: '2024-03-15',
    author: 'Dr. James Wilson',
    title: 'Regular Check-up',
    content:
      'Patient is showing good progress with current medication regimen. Blood pressure levels are stable at 125/82. Continue current medications. Schedule next review in 3 months.',
  },
  {
    id: '2',
    date: '2024-02-28',
    author: 'Dr. James Wilson',
    title: 'Follow-up Assessment',
    content:
      'Patient reports improved mobility and reduced pain levels. Cognitive function remains stable. Recommend continuation of current physiotherapy plan.',
  },
  {
    id: '3',
    date: '2024-02-01',
    author: 'Dr. Sarah Ahmed',
    title: 'Medication Review',
    content:
      'Reviewed all current medications for potential interactions. No contraindications found. All medications are appropriate for current condition. Patient compliance is good.',
  },
];

export function PatientClinicalNotesTab() {
  return (
    <div className="space-y-3">
      {mockClinicalNotes.map((note) => (
        <Card key={note.id} className="border-cf-border">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-sm">{note.title}</CardTitle>
                <p className="text-xs text-cf-ink-60 mt-1">
                  {new Date(note.date).toLocaleDateString('en-GB')} • {note.author}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-cf-ink-60 leading-relaxed">{note.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}