'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { VisitForm } from './ScheduleAddVisitModalForm';
import { visitDurations, visitTypes } from './constant';
import { VisitSummary } from './ScheduleAddVisitModalSummary';


interface Patient {
  id: string;
  name: string;
}

interface Carer {
  id: string;
  name: string;
}

interface AddVisitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => Promise<void>;
  patients: Patient[];
  carers: Carer[];
  defaultDate?: Date;
}

export function AddVisitModal({
  open,
  onOpenChange,
  onSave,
  patients,
  carers,
  defaultDate,
}: AddVisitModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    carerId: '',
    title: '',
    type: 'care-visit',
    date: defaultDate || new Date(),
    startTime: '09:00',
    duration: '60',
    location: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (defaultDate) {
      setFormData((prev) => ({ ...prev, date: defaultDate }));
    }
  }, [defaultDate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.patientId) newErrors.patientId = 'Patient is required';
    if (!formData.carerId) newErrors.carerId = 'Carer is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      await onSave(formData);
      onOpenChange(false);
      setFormData({
        patientId: '',
        carerId: '',
        title: '',
        type: 'care-visit',
        date: new Date(),
        startTime: '09:00',
        duration: '60',
        location: '',
        notes: '',
      });
    } catch (error) {
      console.error('Failed to create visit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPatient = patients.find((p) => p.id === formData.patientId);
  const selectedCarer = carers.find((c) => c.id === formData.carerId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Visit</DialogTitle>
          <DialogDescription>
            Create a new visit or appointment for a patient
          </DialogDescription>
        </DialogHeader>

        <VisitForm
          formData={formData}
          errors={errors}
          patients={patients}
          carers={carers}
          visitTypes={visitTypes}
          visitDurations={visitDurations}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onDateSelect={handleDateSelect}
        />

        <VisitSummary
          patient={selectedPatient}
          carer={selectedCarer}
          title={formData.title}
          date={formData.date}
          startTime={formData.startTime}
        />

        <DialogFooter className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Scheduling...
              </>
            ) : (
              'Schedule Visit'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}