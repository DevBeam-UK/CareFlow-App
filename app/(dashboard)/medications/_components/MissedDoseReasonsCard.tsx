// app/(dashboard)/medications/_components/MissedDoseReasonsCard.tsx
// Breakdown of why doses were missed — useful for spotting patterns
// (e.g. one carer or one patient accounting for most misses).

"use client"

import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"

// ── Types ─────────────────────────────────────────────────────────────────
export interface MissedDoseReason {
  label: string
  pct: number
}

interface MissedDoseReasonsCardProps {
  reasons: MissedDoseReason[]
}

// ── Main export ───────────────────────────────────────────────────────────
export default function MissedDoseReasonsCard({ reasons }: MissedDoseReasonsCardProps) {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <h2 className="text-sm font-bold text-[#111318]">Missed dose reasons</h2>
      <div className="flex flex-col gap-2.5">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
            className="flex items-center justify-between text-xs text-[#5C5F6A]"
          >
            <span>&#9679; {reason.label}</span>
            <span className="font-semibold text-[#111318]">{reason.pct}%</span>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}