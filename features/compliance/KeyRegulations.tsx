"use client";
// features/compliance/KeyRegulations.tsx
// Key CQC Regulations panel with compliance progress bars

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { regulations, type RegulationStatus } from "./data";

/** Status config */
const statusConfig: Record<
  RegulationStatus,
  { label: string; barColor: string; textColor: string; bgColor: string; progress: number }
> = {
  Compliant: {
    label: "Compliant",
    barColor: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    progress: 92,
  },
  Attention: {
    label: "Attention",
    barColor: "bg-amber-400",
    textColor: "text-amber-700",
    bgColor: "bg-amber-50",
    progress: 62,
  },
  Risk: {
    label: "Risk",
    barColor: "bg-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
    progress: 38,
  },
};

export default function KeyRegulations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
      className="bg-white rounded-xl border border-gray-100 p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">Key Regulations</h2>
        <button className="text-[11px] text-indigo-600 font-medium hover:underline flex items-center gap-1">
          View All 21 <ChevronRight size={12} />
        </button>
      </div>

      {/* Regulation rows */}
      <div className="space-y-3">
        {regulations.map((reg, i) => {
          const cfg = statusConfig[reg.status];
          return (
            <motion.div
              key={reg.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.32, delay: 0.1 + i * 0.06 }}
              className="group cursor-pointer hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    {reg.code} —{" "}
                  </span>
                  <span className="text-xs font-semibold text-gray-800">{reg.name}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.bgColor} ${cfg.textColor}`}>
                  {cfg.label}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                <motion.div
                  className={`h-full rounded-full ${cfg.barColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${cfg.progress}%` }}
                  transition={{ duration: 0.65, delay: 0.2 + i * 0.07, ease: "easeOut" }}
                />
              </div>

              {/* Description */}
              <p className="text-[11px] text-gray-400 truncate">{reg.description}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
