// app/(dashboard)/medications/_components/PatientRecordPanel.tsx
// Full medication record for whichever patient is selected in the grid above.
// Animates open/closed with Framer Motion's AnimatePresence + height auto.

"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────
export interface MedicationRecordItem {
  id: string
  name: string
  dosage: string // e.g. "10mg"
  route: string // e.g. "oral"
  timing: string // e.g. "12:00" or "as needed"
  tagLabel: string // e.g. "Controlled · 2nd sig required"
  tagColor: string
}

export interface PatientRecord {
  id: string
  name: string
  initials: string
  age: number
  nhsNumber: string
  gpName: string
  avatarBg: string
  avatarText: string
  medications: MedicationRecordItem[]
}

interface PatientRecordPanelProps {
  record: PatientRecord | null
  onClose?: () => void
}

// ── Main export ───────────────────────────────────────────────────────────
export default function PatientRecordPanel({ record, onClose }: PatientRecordPanelProps) {
  return (
    <AnimatePresence initial={false}>
      {record && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="rounded-xl border border-[#ececec] bg-[#FAFAF8] p-[22px]">
            <div className="mb-4.5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
                  style={{ backgroundColor: record.avatarBg, color: record.avatarText }}
                >
                  {record.initials}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-[#111318]">
                    {record.name} &middot; full medication record
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#8B8FA8]">
                    {record.age} years &middot; NHS {record.nhsNumber} &middot; GP: {record.gpName}
                  </p>
                </div>
              </div>
              {onClose && (
                <button onClick={onClose} aria-label="Close record">
                  <X size={14} className="text-[#8B8FA8]" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {record.medications.map((med) => (
                <div key={med.id} className="rounded-lg border border-[#ececec] bg-white p-3.5">
                  <p className="text-[10px] font-semibold text-[#111318]">{med.name}</p>
                  <p className="mt-1 text-[9px] text-[#8B8FA8]">
                    {med.dosage} &middot; {med.route} &middot; {med.timing}
                  </p>
                  <p className="mt-2 text-[9px] font-semibold" style={{ color: med.tagColor }}>
                    &#9679; {med.tagLabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}