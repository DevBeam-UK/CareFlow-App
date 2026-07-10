// app/(dashboard)/medications/_components/MedicationsStats.tsx
// Four top-level KPI cards: Doses today, Missed/late, Reviews due, Adherence rate.
// Uses tinted background cards (green/coral/amber/purple) rather than the plain
// white StatCard used on Finance — this was the look you approved in the mockup.
// If you'd rather these match Finance's StatCard exactly for consistency,
// swap the local Stat component below for the shared one — flagging this
// as a deliberate visual choice, not an oversight.

"use client"

import { motion } from "framer-motion"

import { CountUp } from "@/components/ui/count-up"
import { ProgressRing } from "@/components/ui/progress-ring"

// ── Types ─────────────────────────────────────────────────────────────────
export interface MedicationsStatsData {
  dosesToday: number
  dosesGiven: number
  dosesRemaining: number
  missedCount: number
  lateCount: number
  reviewsDue: number
  reviewsDueSoon: number // within 7 days
  adherencePct: number // 0–100
}

interface MedicationsStatsProps {
  data: MedicationsStatsData
}

interface TintedStatProps {
  label: string
  value: React.ReactNode
  sub: string
  bg: string
  labelColor: string
  valueColor: string
  subColor: string
  delay: number
}

function TintedStat({ label, value, sub, bg, labelColor, valueColor, subColor, delay }: TintedStatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="rounded-xl px-5 py-4"
      style={{ backgroundColor: bg }}
    >
      <p className="mb-2.5 text-[10px] font-semibold tracking-wide uppercase" style={{ color: labelColor }}>
        {label}
      </p>
      <p className="text-[22px] leading-none font-semibold" style={{ color: valueColor }}>
        {value}
      </p>
      <p className="mt-1.5 text-[10px]" style={{ color: subColor }}>
        {sub}
      </p>
    </motion.div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────
export default function MedicationsStats({ data }: MedicationsStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-7 xl:grid-cols-4">
      <TintedStat
        label="Doses today"
        value={<CountUp value={data.dosesToday} />}
        sub={`${data.dosesGiven} given \u00b7 ${data.dosesRemaining} remaining`}
        bg="#EAF3DE"
        labelColor="#3B6D11"
        valueColor="#173404"
        subColor="#3B6D11"
        delay={0}
      />
      <TintedStat
        label="Missed / late"
        value={<CountUp value={data.missedCount + data.lateCount} />}
        sub={`${data.missedCount} missed \u00b7 ${data.lateCount} late`}
        bg="#FAECE7"
        labelColor="#993C1D"
        valueColor="#4A1B0C"
        subColor="#993C1D"
        delay={0.05}
      />
      <TintedStat
        label="Reviews due"
        value={<CountUp value={data.reviewsDue} />}
        sub={`${data.reviewsDueSoon} within 7 days`}
        bg="#FAEEDA"
        labelColor="#854F0B"
        valueColor="#412402"
        subColor="#854F0B"
        delay={0.1}
      />

      {/* Adherence — ring instead of a sub line */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="flex items-center justify-between rounded-xl px-5 py-4"
        style={{ backgroundColor: "#EEEDFE" }}
      >
        <div>
          <p className="mb-2.5 text-[10px] font-semibold tracking-wide text-[#534AB7] uppercase">
            Adherence
          </p>
          <p className="text-[22px] leading-none font-semibold text-[#26215C]">
            <CountUp value={data.adherencePct} format={(v) => `${Math.round(v)}%`} />
          </p>
        </div>
        <ProgressRing value={data.adherencePct} size={36} strokeWidth={3} color="#7F77DD" />
      </motion.div>
    </div>
  )
}
