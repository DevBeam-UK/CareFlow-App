"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import PatientMedicationCard, {
  type PatientMedicationSummary,
} from "../../ui/medications/PatientMedicationCard"
import PatientRecordPanel, { type PatientRecord } from "./PatientRecordPanel"

interface MedicationsBoardProps {
  patients: PatientMedicationSummary[]
  records: Record<string, PatientRecord>
  totalPatientCount: number
  defaultSelectedId?: string
}

export default function MedicationsBoard({
  patients,
  records,
  totalPatientCount,
  defaultSelectedId,
}: MedicationsBoardProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(defaultSelectedId)

  const selectedRecord = selectedId ? (records[selectedId] ?? null) : null

  function handleSelect(id: string) {
    setSelectedId((current) => (current === id ? undefined : id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-[#111318]">Patients on medication</h2>
        <span className="text-[10px] text-[#8B8FA8]">
          {totalPatientCount} total &middot; click a patient to view their full record
        </span>
      </div>

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {patients.map((patient) => (
          <PatientMedicationCard
            key={patient.id}
            patient={patient}
            selected={selectedId === patient.id}
            onSelect={handleSelect}
          />
        ))}
      </motion.div>

      <PatientRecordPanel record={selectedRecord} onClose={() => setSelectedId(undefined)} />
    </div>
  )
}
