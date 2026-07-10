// app/(dashboard)/medications/_components/AdherenceChart.tsx
// Bar chart — adherence rate over the last 7 days. One low day is flagged
// in coral so it stands out against the otherwise-teal bars.
//
// Layout note: the outer row uses default (stretch) alignment so each
// column actually fills the fixed chart height — using `items-end` here
// would let columns shrink to content size, making percentage-height bars
// resolve against a 0px parent (i.e. invisible bars).

"use client"

import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"

// ── Types ─────────────────────────────────────────────────────────────────
export interface AdherencePoint {
  label: string // e.g. "Mon"
  pct: number // 0–100
  flagged?: boolean // true for a notably low day
  isToday?: boolean
}

interface AdherenceChartProps {
  data: AdherencePoint[]
}

// ── Main export ───────────────────────────────────────────────────────────
export default function AdherenceChart({ data }: AdherenceChartProps) {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <h2 className="text-sm font-bold text-[#111318]">Adherence &middot; 7 days</h2>
      <div className="flex h-[110px] gap-2">
        {data.map((point, i) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${point.pct}%` }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                className="w-full rounded-t-sm"
                style={{
                  backgroundColor: point.flagged ? "#F0997B" : point.isToday ? "#1D9E75" : "#9FE1CB",
                }}
              />
            </div>
            <span className="text-[10px] text-[#A0A3B1]">{point.label}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}