// components/sections/patients/CreatePatientModal/steps/MedicationsStep.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { PatientFormData } from './PatientCreateModal';


interface MedicationsStepProps {
  formData: PatientFormData;
  setFormData: (data: PatientFormData) => void;
}

export function MedicationsStep({
  formData,
  setFormData,
}: MedicationsStepProps) {
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    timing: '',
    indication: '',
  });

  const handleAddMedication = () => {
    if (
      newMedication.name &&
      newMedication.dosage &&
      newMedication.frequency &&
      newMedication.timing
    ) {
      setFormData({
        ...formData,
        medications: [
          ...formData.medications,
          {
            id: Date.now().toString(),
            ...newMedication,
          },
        ],
      });
      setNewMedication({
        name: '',
        dosage: '',
        frequency: '',
        timing: '',
        indication: '',
      });
    }
  };

  const handleRemoveMedication = (id: string) => {
    setFormData({
      ...formData,
      medications: formData.medications.filter((med: any) => med.id !== id),
    });
  };

  return (
    <div className="space-y-4 pb-4">
      <h3 className="text-lg font-semibold text-cf-ink">Medications</h3>
      <p className="text-sm text-cf-ink-60">
        Add medications for this patient (optional)
      </p>

      <Card className="border-cf-border p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="med-name" className="text-xs font-medium">
              Medication Name
            </Label>
            <Input
              id="med-name"
              placeholder="Lisinopril"
              value={newMedication.name}
              onChange={(e) =>
                setNewMedication((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="border-cf-border h-8 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="med-dosage" className="text-xs font-medium">
              Dosage
            </Label>
            <Input
              id="med-dosage"
              placeholder="10mg"
              value={newMedication.dosage}
              onChange={(e) =>
                setNewMedication((prev) => ({
                  ...prev,
                  dosage: e.target.value,
                }))
              }
              className="border-cf-border h-8 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="med-frequency" className="text-xs font-medium">
              Frequency
            </Label>
            <Input
              id="med-frequency"
              placeholder="Once daily"
              value={newMedication.frequency}
              onChange={(e) =>
                setNewMedication((prev) => ({
                  ...prev,
                  frequency: e.target.value,
                }))
              }
              className="border-cf-border h-8 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="med-timing" className="text-xs font-medium">
              Timing
            </Label>
            <Input
              id="med-timing"
              placeholder="Morning"
              value={newMedication.timing}
              onChange={(e) =>
                setNewMedication((prev) => ({
                  ...prev,
                  timing: e.target.value,
                }))
              }
              className="border-cf-border h-8 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="med-indication" className="text-xs font-medium">
            Indication (optional)
          </Label>
          <Input
            id="med-indication"
            placeholder="Hypertension"
            value={newMedication.indication}
            onChange={(e) =>
              setNewMedication((prev) => ({
                ...prev,
                indication: e.target.value,
              }))
            }
            className="border-cf-border h-8 text-sm"
          />
        </div>

        <Button
          onClick={handleAddMedication}
          variant="outline"
          size="sm"
          className="w-full border-cf-border hover:bg-cf-surface-muted text-xs"
        >
          Add Medication
        </Button>
      </Card>

      {formData.medications.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-cf-ink-60">
            Added Medications:
          </p>
          {formData.medications.map((med: any) => (
            <Card key={med.id} className="border-cf-border p-3">
              <CardContent className="p-0 flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-cf-ink">
                    {med.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-cf-ink-60 mt-1">
                    <span>{med.dosage}</span>
                    <span>•</span>
                    <span>{med.frequency}</span>
                    <span>•</span>
                    <span>{med.timing}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveMedication(med.id)}
                  className="text-cf-ink-40 hover:text-cf-ink transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}