"use client";
// features/compliance/CQCFiveKey.tsx
// CQC Five Key Questions horizontal bar chart with animated fills

import { motion } from "framer-motion";
import { cqcScores, type CQCScore } from "./data";

/** Label badge */
function ScoreLabel({ label }: { label: CQCScore["label"] }) {
  const map: Record<string, string> = {
    Good:       "text-green-600 bg-green-50",
    "Needs Work":"text-yellow-600 bg-yellow-50",
    Outstanding:"text-indigo-600 bg-indigo-50",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${map[label]}`}>
      {label}
    </span>
  );
}

/** Single row */
function DomainRow({ item, index }: { item: CQCScore; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.38, delay: 0.1 + index * 0.06 }}
      className="flex items-center gap-3"
    >
      {/* Circle icon */}
      <span
        className="w-4 h-4 rounded-full shrink-0 border-2"
        style={{ borderColor: item.color, backgroundColor: item.color + "22" }}
      />
      {/* Domain name */}
      <span className="w-24 text-xs font-medium text-gray-700 shrink-0">{item.domain}</span>

      {/* Bar track */}
      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: item.color }}
          initial={{ width: 0 }}
          animate={{ width: `${item.score}%` }}
          transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: "easeOut" }}
        />
      </div>

      {/* Score */}
      <span className="w-6 text-xs font-bold text-gray-700 text-right shrink-0">{item.score}</span>
      {/* Label */}
      <div className="w-20 flex justify-end">
        <ScoreLabel label={item.label} />
      </div>
    </motion.div>
  );
}

/** Improve callout */
function ImprovementCallout() {
  const items = [
    "Care plan reviews not completed on schedule (7 overdue)",
    "Compliance response time averaging 5 days (target: 2)",
    "Hospital discharge follow-up visits delayed for 3 patients",
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3"
    >
      <p className="text-[11px] font-semibold text-yellow-700 mb-1.5">
        Responsive — Areas to Improve
      </p>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-[11px] text-yellow-800 flex items-start gap-1.5">
            <span className="mt-0.5 w-1 h-1 rounded-full bg-yellow-500 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function CQCFiveKey() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">CQC Five Key Questions</h2>
        <div className="flex gap-3">
          <button className="text-[11px] text-indigo-600 font-medium hover:underline">
            Drill Down
          </button>
          <button className="text-[11px] text-indigo-600 font-medium hover:underline">
            Export Evidence
          </button>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-3.5">
        {cqcScores.map((item, i) => (
          <DomainRow key={item.domain} item={item} index={i} />
        ))}
      </div>

      <ImprovementCallout />
    </div>
  );
}
