'use client';

interface CreatePatientModalProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function CreatePatientModalProgress({
  currentStep,
  totalSteps,
}: CreatePatientModalProgressProps) {
  return (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-cf-primary transition-all duration-300"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );
}