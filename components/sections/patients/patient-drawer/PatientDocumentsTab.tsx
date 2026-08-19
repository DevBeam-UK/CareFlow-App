'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ChevronRight } from 'lucide-react';

const mockDocuments = [
  {
    id: '1',
    name: 'Care Plan - March 2024',
    type: 'pdf',
    uploadedDate: '2024-03-01',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'Medical History Summary',
    type: 'pdf',
    uploadedDate: '2024-01-15',
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Medication List - Current',
    type: 'pdf',
    uploadedDate: '2024-03-10',
    size: '456 KB',
  },
  {
    id: '4',
    name: 'Allergy Report',
    type: 'pdf',
    uploadedDate: '2024-02-15',
    size: '892 KB',
  },
];

export function PatientDocumentsTab() {
  return (
    <div className="space-y-3">
      {mockDocuments.map((doc) => (
        <Link key={doc.id} href="#">
          <Card className="border-cf-border hover:bg-cf-surface-muted/50 transition-colors cursor-pointer">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-cf-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-cf-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-cf-ink truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 text-xs text-cf-ink-60 mt-0.5">
                      <span>{new Date(doc.uploadedDate).toLocaleDateString('en-GB')}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-cf-ink-40 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}