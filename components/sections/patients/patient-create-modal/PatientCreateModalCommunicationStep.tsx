// components/sections/patients/CreatePatientModal/steps/CommunicationStep.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { PatientFormData } from './PatientCreateModal';


interface CommunicationStepProps {
  formData: PatientFormData;
  setFormData: (data: PatientFormData) => void;
}

export function CommunicationStep({ formData, setFormData }: CommunicationStepProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  return (
    <div className="space-y-6 pb-4">
      <div>
        <h3 className="text-lg font-semibold text-cf-ink">Communication Needs</h3>
        <p className="text-sm text-cf-ink-60">How the patient communicates and their preferences</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="preferredLanguage" className="text-sm font-medium">
            Preferred Language
          </Label>
          <Input
            id="preferredLanguage"
            name="preferredLanguage"
            placeholder="English, Urdu, Polish..."
            value={formData.preferredLanguage || ''}
            onChange={handleInputChange}
            className="border-cf-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hearingImpairment" className="text-sm font-medium">
            Hearing Impairment
          </Label>
          <Select
            value={formData.hearingImpairment || 'none'}
            onValueChange={(val) => handleSelectChange('hearingImpairment', val!)}
          >
            <SelectTrigger className="border-cf-border">
              <SelectValue placeholder="Select hearing status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="mild">Mild</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="severe">Severe</SelectItem>
              <SelectItem value="deaf">Deaf</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="visionImpairment" className="text-sm font-medium">
            Vision Impairment
          </Label>
          <Select
            value={formData.visionImpairment || 'none'}
            onValueChange={(val) => handleSelectChange('visionImpairment', val!)}
          >
            <SelectTrigger className="border-cf-border">
              <SelectValue placeholder="Select vision status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="mild">Mild</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="severe">Severe</SelectItem>
              <SelectItem value="blind">Blind</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mentalCapacity" className="text-sm font-medium">
            Mental Capacity
          </Label>
          <Select
            value={formData.mentalCapacity || 'full'}
            onValueChange={(val) => handleSelectChange('mentalCapacity', val!)}
          >
            <SelectTrigger className="border-cf-border">
              <SelectValue placeholder="Select capacity status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Capacity</SelectItem>
              <SelectItem value="partial">Partial Capacity</SelectItem>
              <SelectItem value="lacks">Lacks Capacity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Communication Aids</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="hearingAids"
              checked={formData.hearingAids || false}
              onCheckedChange={(checked) => handleCheckboxChange('hearingAids', checked as boolean)}
            />
            <Label htmlFor="hearingAids" className="text-sm font-normal cursor-pointer">
              Hearing Aids
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="glasses"
              checked={formData.glasses || false}
              onCheckedChange={(checked) => handleCheckboxChange('glasses', checked as boolean)}
            />
            <Label htmlFor="glasses" className="text-sm font-normal cursor-pointer">
              Glasses
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="pictureBoard"
              checked={formData.pictureBoard || false}
              onCheckedChange={(checked) => handleCheckboxChange('pictureBoard', checked as boolean)}
            />
            <Label htmlFor="pictureBoard" className="text-sm font-normal cursor-pointer">
              Picture Board
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="interpreter"
              checked={formData.interpreter || false}
              onCheckedChange={(checked) => handleCheckboxChange('interpreter', checked as boolean)}
            />
            <Label htmlFor="interpreter" className="text-sm font-normal cursor-pointer">
              Interpreter Needed
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="communicationNotes" className="text-sm font-medium">
          Communication Notes
        </Label>
        <Textarea
          id="communicationNotes"
          name="communicationNotes"
          placeholder="Speak slowly and clearly, face the patient, use simple language..."
          value={formData.communicationNotes || ''}
          onChange={handleInputChange}
          className="border-cf-border min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-cf-ink">Power of Attorney</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <Label htmlFor="poaName" className="text-xs font-medium">
              Name
            </Label>
            <Input
              id="poaName"
              name="poaName"
              placeholder="Margaret Chen"
              value={formData.poaName || ''}
              onChange={handleInputChange}
              className="border-cf-border h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="poaRelationship" className="text-xs font-medium">
              Relationship
            </Label>
            <Input
              id="poaRelationship"
              name="poaRelationship"
              placeholder="Daughter"
              value={formData.poaRelationship || ''}
              onChange={handleInputChange}
              className="border-cf-border h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="poaPhone" className="text-xs font-medium">
              Phone Number
            </Label>
            <Input
              id="poaPhone"
              name="poaPhone"
              placeholder="07700 900123"
              value={formData.poaPhone || ''}
              onChange={handleInputChange}
              className="border-cf-border h-8 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}