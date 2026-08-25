"use client";
// features/compliance/InspectionPack.tsx
// CQC Inspection Pack card with Generate Pack button and preview link

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Eye, Sparkles, CheckCircle } from "lucide-react";

export default function InspectionPack() {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1800));
    setGenerating(false);
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="bg-gradient-to-br from-indigo-50 via-white to-green-50 rounded-xl border border-indigo-100 p-4"
    >
      {/* Icon + title */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <FileText size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">CQC Inspection Pack</p>
          <p className="text-[11px] text-gray-500">One-click CQC-readiness handout</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-[11px] text-gray-600 leading-relaxed mb-4">
        Auto-compiles staff files, patient records, compliance scores, incident reports,
        and policy docs into a single PDF.
      </p>

      {/* Buttons */}
      <div className="flex gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleGenerate}
          disabled={generating}
          className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700
            disabled:bg-green-400 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
        >
          <AnimatePresence mode="wait">
            {generating ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5"
              >
                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                </svg>
                Generating…
              </motion.span>
            ) : done ? (
              <motion.span
                key="done"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5"
              >
                <CheckCircle size={13} /> Generated!
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5"
              >
                <Sparkles size={13} /> Generate Pack
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <button className="flex items-center gap-1 px-3 py-2 border border-gray-200 text-xs font-medium
          text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
          <Eye size={12} /> Preview
        </button>
      </div>

      {/* Last generated */}
      <p className="text-[10px] text-gray-400 mt-2.5">
        Last generated: 16 Mar 2025 · 34 pages
      </p>
    </motion.div>
  );
}
