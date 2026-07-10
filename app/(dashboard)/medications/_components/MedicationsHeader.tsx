// app/(dashboard)/medications/_components/MedicationsHeader.tsx
// Top header bar for the Medications page — same structure as FinanceHeader
// and DashboardHeader (title/subtitle, search, notifications, primary CTA).

"use client"

import { motion } from "framer-motion"
import { Bell, Search, Plus } from "lucide-react"

interface MedicationsHeaderProps {
  onAddMedication?: () => void
}

export default function MedicationsHeader({ onAddMedication }: MedicationsHeaderProps) {
  const dateStr = "Wednesday, 2 April 2026"
  const agency = "Sunrise Care Agency"

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-center justify-between gap-4"
    >
      <div>
        <h1 className="text-[22px] font-bold leading-tight text-[#111318]">Medications</h1>
        <p className="mt-0.5 text-xs text-[#8B8FA8]">
          {dateStr}
          {"\u00a0"}&bull;{"\u00a0"}
          {agency}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-[#A0A3B1]" />
          <input
            type="text"
            placeholder="Search patients or drugs..."
            className="w-56 rounded-lg border border-[#E4E5EA] bg-white py-2 pr-4 pl-9 text-sm text-[#111318] placeholder:text-[#A0A3B1] focus:ring-2 focus:ring-[#00C48C]/30 focus:outline-none"
          />
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E5EA] bg-white transition-colors hover:bg-[#F5F6FA]">
          <Bell size={16} className="text-[#5C5F6A]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#F97316]" />
        </button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAddMedication}
          className="flex items-center gap-1.5 rounded-lg bg-[#00C48C] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#00B07E]"
        >
          <Plus size={15} strokeWidth={2.5} />
          Add medication
        </motion.button>
      </div>
    </motion.div>
  )
}