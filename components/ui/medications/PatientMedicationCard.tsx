"use client"

import { motion } from "framer-motion"

// ── Types ─────────────────────────────────────────────────────────────────
export type PatientMedStatus = "OnTrack" | "Controlled" | "Missed" | "PRN" | "ReviewDue"

export interface PatientMedicationSummary {
  id: string
  name: string
  initials: string
  age: number
  activeMedsCount: number
  nextDoseLabel: string // e.g. "Next: Paracetamol 14:00" or "09:00 Warfarin"
  status: PatientMedStatus
}

const STATUS_CONFIG: Record<PatientMedStatus, { label: string; textColor: string; avatarBg: string; avatarText: string; accent: string }> = {
  OnTrack: { label: "On track", textColor: "#3B6D11", avatarBg: "#EAF3DE", avatarText: "#3B6D11", accent: "#1D9E75" },
  Controlled: { label: "Controlled", textColor: "#6B3FB8", avatarBg: "#F3EEFC", avatarText: "#6B3FB8", accent: "#6B3FB8" },
  Missed: { label: "Missed", textColor: "#A32D2D", avatarBg: "#FCEBEB", avatarText: "#A32D2D", accent: "#A32D2D" },
  PRN: { label: "PRN", textColor: "#185FA5", avatarBg: "#E6F1FB", avatarText: "#185FA5", accent: "#378ADD" },
  ReviewDue: { label: "Review due", textColor: "#854F0B", avatarBg: "#FAEEDA", avatarText: "#854F0B", accent: "#F59E0B" },
}

interface PatientMedicationCardProps {
  patient: PatientMedicationSummary
  selected: boolean
  onSelect: (id: string) => void
}

// ── Main export ───────────────────────────────────────────────────────────
export default function PatientMedicationCard({ patient, selected, onSelect }: PatientMedicationCardProps) {
  const config = STATUS_CONFIG[patient.status]

  return (
    <motion.button
      layout
      onClick={() => onSelect(patient.id)}
      whileHover={{ y: -2 }}
      className="relative rounded-xl bg-white p-[18px] text-left transition-shadow"
      style={{
        border: selected ? "2px solid #6B3FB8" : "0.5px solid #ececec",
        borderLeft: selected ? "2px solid #6B3FB8" : `3px solid ${config.accent}`,
      }}
    >
      {selected && (
        <span className="absolute -top-2.5 right-3.5 rounded-lg bg-[#6B3FB8] px-2 py-0.5 text-[9px] font-semibold text-white">
          Selected
        </span>
      )}

      <div className="mb-3.5 flex items-center gap-2.5">
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
          style={{ backgroundColor: config.avatarBg, color: config.avatarText }}
        >
          {patient.initials}
        </span>
        <div>
          <p className="text-xs font-semibold text-[#111318]">{patient.name}</p>
          <p className="text-[10px] text-[#8B8FA8]">
            {patient.age} &middot; {patient.activeMedsCount} active meds
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-[#5C5F6A]">
        <span>{patient.nextDoseLabel}</span>
        <span className="font-semibold" style={{ color: config.textColor }}>
          &#9679; {config.label}
        </span>
      </div>
    </motion.button>
  )
}