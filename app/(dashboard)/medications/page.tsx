// app/(dashboard)/medications/page.tsx
// Medications page — header -> KPI row -> patient card grid + record panel
// -> chart row. Data below is static sample data; swap for real fetches
// when the API is ready.

import MedicationsHeader from "./_components/MedicationsHeader"
import MedicationsStats from "./_components/MedicationsStats"
import MedicationsBoard from "./_components/MedicationsBoard"
import type { PatientMedicationSummary } from "./_components/PatientMedicationCard"
import type { PatientRecord } from "./_components/PatientRecordPanel"
import AdherenceChart, { type AdherencePoint } from "./_components/AdherenceChart"
import DosesByTypeCard, { type DoseTypeShare } from "./_components/DosesByTypeCard"
import MissedDoseReasonsCard, {
  type MissedDoseReason,
} from "./_components/MissedDoseReasonsCard"

// ── Sample data ─────────────────────────────────────────────────────────
const patients: PatientMedicationSummary[] = [
  {
    id: "mj",
    name: "Margaret Johnson",
    initials: "MJ",
    age: 84,
    activeMedsCount: 3,
    nextDoseLabel: "Next: Paracetamol 14:00",
    status: "OnTrack",
  },
  {
    id: "ra",
    name: "Robert Ahmed",
    initials: "RA",
    age: 82,
    activeMedsCount: 4,
    nextDoseLabel: "Next: Morphine sulfate 12:00",
    status: "Controlled",
  },
  {
    id: "dc",
    name: "Dorothy Chen",
    initials: "DC",
    age: 91,
    activeMedsCount: 2,
    nextDoseLabel: "09:00 Warfarin",
    status: "Missed",
  },
]

const records: Record<string, PatientRecord> = {
  ra: {
    id: "ra",
    name: "Robert Ahmed",
    initials: "RA",
    age: 82,
    nhsNumber: "493 021 7735",
    gpName: "Dr. Fatima Rahman",
    avatarBg: "#F3EEFC",
    avatarText: "#6B3FB8",
    medications: [
      { id: "1", name: "Morphine sulfate", dosage: "10mg", route: "oral", timing: "12:00", tagLabel: "Controlled \u00b7 2nd sig required", tagColor: "#6B3FB8" },
      { id: "2", name: "Metformin", dosage: "500mg", route: "oral", timing: "08:00, 18:00", tagLabel: "Given today", tagColor: "#3B6D11" },
      { id: "3", name: "Ibuprofen (PRN)", dosage: "400mg", route: "oral", timing: "as needed", tagLabel: "Used twice this week", tagColor: "#378ADD" },
      { id: "4", name: "Ramipril", dosage: "5mg", route: "oral", timing: "08:00", tagLabel: "Review due in 5 days", tagColor: "#854F0B" },
    ],
  },
  mj: {
    id: "mj",
    name: "Margaret Johnson",
    initials: "MJ",
    age: 84,
    nhsNumber: "782 114 2290",
    gpName: "Dr. Neil Carter",
    avatarBg: "#EAF3DE",
    avatarText: "#3B6D11",
    medications: [
      { id: "1", name: "Paracetamol", dosage: "500mg", route: "oral", timing: "14:00", tagLabel: "Due next", tagColor: "#3B6D11" },
      { id: "2", name: "Atorvastatin", dosage: "20mg", route: "oral", timing: "20:00", tagLabel: "Given today", tagColor: "#3B6D11" },
      { id: "3", name: "Vitamin D", dosage: "1000IU", route: "oral", timing: "08:00", tagLabel: "Given today", tagColor: "#3B6D11" },
    ],
  },
  dc: {
    id: "dc",
    name: "Dorothy Chen",
    initials: "DC",
    age: 91,
    nhsNumber: "115 662 0091",
    gpName: "Dr. Sarah Lin",
    avatarBg: "#FCEBEB",
    avatarText: "#A32D2D",
    medications: [
      { id: "1", name: "Warfarin", dosage: "3mg", route: "oral", timing: "09:00", tagLabel: "Missed", tagColor: "#A32D2D" },
      { id: "2", name: "Furosemide", dosage: "40mg", route: "oral", timing: "08:00", tagLabel: "Given today", tagColor: "#3B6D11" },
    ],
  },
}

const adherenceData: AdherencePoint[] = [
  { label: "Wed", pct: 88 },
  { label: "Thu", pct: 92 },
  { label: "Fri", pct: 70, flagged: true },
  { label: "Sat", pct: 94 },
  { label: "Sun", pct: 90 },
  { label: "Mon", pct: 96 },
  { label: "Tue", pct: 97, isToday: true },
]

const doseTypes: DoseTypeShare[] = [
  { label: "Scheduled", pct: 78, color: "#378ADD" },
  { label: "PRN", pct: 18, color: "#F0997B" },
  { label: "Controlled", pct: 4, color: "#6B3FB8" },
]

const missedReasons: MissedDoseReason[] = [
  { label: "Patient refused", pct: 50 },
  { label: "Not available", pct: 33 },
  { label: "Carer error", pct: 17 },
]

// ── Main export ───────────────────────────────────────────────────────────
export default function MedicationsPage() {
  return (
    <div className="flex flex-col gap-7 p-6">
      <MedicationsHeader />

      <MedicationsStats
        data={{
          dosesToday: 312,
          dosesGiven: 284,
          dosesRemaining: 28,
          missedCount: 2,
          lateCount: 4,
          reviewsDue: 9,
          reviewsDueSoon: 3,
          adherencePct: 96.8,
        }}
      />

      <MedicationsBoard
        patients={patients}
        records={records}
        totalPatientCount={142}
        defaultSelectedId="ra"
      />

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
        <AdherenceChart data={adherenceData} />
        <DosesByTypeCard segments={doseTypes} />
        <MissedDoseReasonsCard reasons={missedReasons} />
      </div>
    </div>
  )
}