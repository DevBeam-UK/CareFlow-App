"use client";
// features/compliance/ComplianceAlerts.tsx
// Right-side alerts panel with severity badges and staggered animation

import { motion, AnimatePresence } from "framer-motion";
import { Bell, AlertTriangle, Info, Zap } from "lucide-react";
import { complianceAlerts, type ComplianceAlert } from "./data";

/** Severity config */
const severityConfig: Record<
  ComplianceAlert["severity"],
  { label: string; textColor: string; bgColor: string; borderColor: string; icon: React.ReactNode }
> = {
  Urgent: {
    label: "Urgent",
    textColor: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: <Zap size={11} className="text-red-500" />,
  },
  Today: {
    label: "Today",
    textColor: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: <AlertTriangle size={11} className="text-amber-500" />,
  },
  Finfo: {
    label: "",
    textColor: "text-gray-500",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    icon: <Info size={11} className="text-gray-400" />,
  },
};

function AlertRow({ alert, index }: { alert: ComplianceAlert; index: number }) {
  const cfg = severityConfig[alert.severity];
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.055 }}
      className={`flex items-start gap-2.5 p-2.5 rounded-lg border ${cfg.bgColor} ${cfg.borderColor} cursor-pointer
        hover:shadow-sm transition-all group`}
    >
      <span className="mt-0.5 shrink-0">{cfg.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold text-gray-800 truncate">{alert.title}</p>
        <p className="text-[11px] text-gray-500 truncate">{alert.subtitle}</p>
      </div>
      <div className="shrink-0 flex flex-col items-end gap-0.5">
        {cfg.label && (
          <span className={`text-[9px] font-bold uppercase tracking-wide ${cfg.textColor}`}>
            {cfg.label}
          </span>
        )}
        <span className="text-[10px] text-gray-400">{alert.timestamp}</span>
      </div>
    </motion.div>
  );
}

export default function ComplianceAlerts() {
  const urgentCount = complianceAlerts.filter((a) => a.severity === "Urgent").length;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-gray-600" />
          <span className="text-sm font-semibold text-gray-800">Compliance Alerts</span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
            className="bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {complianceAlerts.length}
          </motion.span>
        </div>
        <button className="text-[11px] text-indigo-600 font-medium hover:underline">
          View all
        </button>
      </div>

      {/* Alert list */}
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {complianceAlerts.map((alert, i) => (
            <AlertRow key={alert.id} alert={alert} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
