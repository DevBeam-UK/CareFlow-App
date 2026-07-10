// app/(dashboard)/medications/_components/DosesByTypeCard.tsx
// Donut chart showing the split between scheduled, PRN, and controlled doses.
// Pure SVG (stroke-dasharray segments) — no charting library needed for 3 slices.

"use client"

import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"

// ── Types ─────────────────────────────────────────────────────────────────
export interface DoseTypeShare {
  label: string
  pct: number // 0–100, should sum to 100 across all entries
  color: string
}

interface DosesByTypeCardProps {
  segments: DoseTypeShare[]
}

const CIRCUMFERENCE = 100 // using percentage-based dasharray directly

// ── Main export ───────────────────────────────────────────────────────────
export default function DosesByTypeCard({ segments }: DosesByTypeCardProps) {
  let cumulative = 0

  return (
    <Card className="flex flex-col gap-4 p-5">
      <h2 className="text-sm font-bold text-[#111318]">Doses by type</h2>
      <div className="flex items-center gap-4">
        <svg width="72" height="72" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E5E5E5" strokeWidth="4" />
          {segments.map((segment, i) => {
            const offset = -cumulative
            cumulative += segment.pct
            return (
              <motion.circle
                key={segment.label}
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke={segment.color}
                strokeWidth="4"
                strokeDasharray={`${segment.pct} ${CIRCUMFERENCE - segment.pct}`}
                strokeDashoffset={offset + 25}
                transform="rotate(-90 18 18)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              />
            )
          })}
        </svg>
        <div className="flex flex-col gap-2 text-[10px] text-[#5C5F6A]">
          {segments.map((segment) => (
            <span key={segment.label} className="flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-[2px]"
                style={{ backgroundColor: segment.color }}
              />
              {segment.label} {segment.pct}%
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}
