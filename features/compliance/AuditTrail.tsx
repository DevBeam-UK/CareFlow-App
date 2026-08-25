"use client";
// features/compliance/AuditTrail.tsx
// Recent Audit Trail table with entity-type badges and row hover animations

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { auditEntries, type AuditEntityType } from "./data";

/** Entity badge colour map */
const entityColors: Record<AuditEntityType, string> = {
  Plan:     "bg-indigo-50 text-indigo-700",
  Visit:    "bg-green-50 text-green-700",
  MAR:      "bg-orange-50 text-orange-700",
  Incident: "bg-red-50 text-red-700",
  Risk:     "bg-yellow-50 text-yellow-700",
};

export default function AuditTrail() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">Recent Audit Trail</h2>
        <button className="text-[11px] text-indigo-600 font-medium hover:underline flex items-center gap-1">
          Full Audit Log <ChevronRight size={12} />
        </button>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[52px_1fr_90px_56px] text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2 px-1">
        <span>Time</span>
        <span>Action</span>
        <span>User</span>
        <span>Entity</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {auditEntries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.055 }}
            className="grid grid-cols-[52px_1fr_90px_56px] items-start py-2.5 px-1 rounded-lg
              hover:bg-gray-50 cursor-pointer transition-colors group"
          >
            {/* Time */}
            <span className="text-[11px] text-gray-400 font-mono">{entry.time}</span>

            {/* Action + detail */}
            <div>
              <p className="text-xs font-semibold text-gray-800">{entry.action}</p>
              <p className="text-[11px] text-gray-400 truncate">{entry.detail}</p>
            </div>

            {/* User */}
            <span className="text-[11px] text-gray-600">{entry.user}</span>

            {/* Entity badge */}
            <div className="flex items-start">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${entityColors[entry.entity]}`}>
                {entry.entity}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
