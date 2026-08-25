"use client";
// features/compliance/MetricCards.tsx
// Four summary metric tiles at top of Compliance Centre

import { motion } from "framer-motion";
import { AlertTriangle, BookOpen, GraduationCap, Siren } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  subLabel?: string;
  detail?: string;
  accentColor: string;  // tailwind text colour
  bgColor: string;      // tailwind bg colour for icon circle
  icon: React.ReactNode;
  index: number;
}

/** Single metric tile */
function MetricCard({
  label, value, subValue, subLabel, detail, accentColor, bgColor, icon, index
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{label}</p>
        <span className={`w-7 h-7 rounded-full flex items-center justify-center ${bgColor}`}>
          {icon}
        </span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-3xl font-bold ${accentColor}`}>{value}</span>
        {subValue && (
          <span className={`text-sm font-semibold ${accentColor}`}>{subValue}</span>
        )}
        {subLabel && (
          <span className="text-xs text-gray-400 ml-1">{subLabel}</span>
        )}
      </div>
      {detail && <p className="text-[11px] text-gray-500 leading-snug">{detail}</p>}
    </motion.div>
  );
}

/** All four metric cards grouped */
export default function MetricCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* CQC Readiness */}
      <MetricCard
        label="CQC Readiness"
        value={87}
        subLabel="/100"
        detail="+4 pts this month"
        accentColor="text-green-600"
        bgColor="bg-green-50"
        icon={<BookOpen size={14} className="text-green-600" />}
        index={0}
      />
      {/* Documentation Gaps */}
      <MetricCard
        label="Documentation Gaps"
        value={12}
        subValue=""
        subLabel="5 critical"
        detail="3 unapproved plans · 4 missing MAR · 5 late notes"
        accentColor="text-red-500"
        bgColor="bg-red-50"
        icon={<AlertTriangle size={14} className="text-red-500" />}
        index={1}
      />
      {/* Training Compliance */}
      <MetricCard
        label="Training Compliance"
        value="91%"
        subValue="+2%"
        detail="3 expired · 10 expiring in 30 days"
        accentColor="text-blue-600"
        bgColor="bg-blue-50"
        icon={<GraduationCap size={14} className="text-blue-600" />}
        index={2}
      />
      {/* Incident Response */}
      <MetricCard
        label="Incident Response"
        value="4.2"
        subLabel="hrs avg response"
        detail="Target: <6h · 3 open investigations"
        accentColor="text-orange-500"
        bgColor="bg-orange-50"
        icon={<Siren size={14} className="text-orange-500" />}
        index={3}
      />
    </div>
  );
}
