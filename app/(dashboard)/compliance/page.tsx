"use client";
// app/(dashboard)/compliance/page.tsx
// Compliance Centre — full CQC readiness dashboard

import { motion } from "framer-motion";
import { ClipboardCheck, History, Download } from "lucide-react";

import MetricCards from "@/features/compliance/MetricCards";
import CQCFiveKey from "@/features/compliance/CQCFiveKey";
import ComplianceAlerts from "@/features/compliance/ComplianceAlerts";
import InspectionPack from "@/features/compliance/InspectionPack";
import AuditTrail from "@/features/compliance/AuditTrail";
import ScoreTrend from "@/features/compliance/ScoreTrend";
import KeyRegulations from "@/features/compliance/KeyRegulations";

/** Page header with action buttons */
function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
      className="flex items-center justify-between mb-6"
    >
      {/* Left: title + breadcrumb */}
      <div>
        <p className="text-[11px] text-gray-400 uppercase tracking-widest font-medium mb-0.5">
          CQC readiness · Sunrise Care Agency
        </p>
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <ClipboardCheck size={20} className="text-green-600" />
          Compliance Centre
        </h1>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 border border-gray-200 text-sm font-medium
          text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <History size={14} />
          Audit Trail
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm
            font-semibold px-4 py-1.5 rounded-lg transition-colors shadow-sm"
        >
          <Download size={14} />
          Generate CQC Pack
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function CompliancePage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page header */}
      <PageHeader />

      {/* Row 1: Four metric summary cards */}
      <MetricCards />

      {/* Row 2: CQC Five Questions (left 2/3) + Compliance Alerts (right 1/3) */}
      <div className="mt-5 grid grid-cols-3 gap-5">
        {/* CQC Five Key Questions — spans 2 cols */}
        <div className="col-span-2">
          <CQCFiveKey />
        </div>
        {/* Alerts + Inspection Pack */}
        <div className="flex flex-col gap-4">
          <ComplianceAlerts />
          <InspectionPack />
        </div>
      </div>

      {/* Row 3: Audit Trail (full width) */}
      <div className="mt-5">
        <AuditTrail />
      </div>

      {/* Row 4: Score Trend (left) + Key Regulations (right) */}
      <div className="mt-5 grid grid-cols-2 gap-5">
        <ScoreTrend />
        <KeyRegulations />
      </div>
    </div>
  );
}
