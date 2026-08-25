"use client";
// features/compliance/CQCReadinessCard.tsx
// Top-left summary card: CQC readiness score with circular gauge + trend

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  score: number;       // e.g. 87
  maxScore: number;    // e.g. 100
  trend: string;       // e.g. "+4 pts this month"
  agency: string;      // e.g. "Sunrise Care Agency"
}

export default function CQCReadinessCard({ score, maxScore, trend, agency }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw animated arc on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 6;
    const startAngle = Math.PI * 0.75;
    const fullArc = Math.PI * 1.5;

    let progress = 0;
    const target = score / maxScore;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Track
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, startAngle + fullArc);
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.stroke();

      // Fill
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, startAngle + fullArc * progress);
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.stroke();

      if (progress < target) {
        progress = Math.min(progress + 0.015, target);
        raf = requestAnimationFrame(draw);
      }
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [score, maxScore]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          CQC Readiness
        </p>
        <span className="text-[10px] text-gray-400">{agency}</span>
      </div>

      {/* Body: gauge + score */}
      <div className="flex items-center gap-5">
        <div className="relative w-[72px] h-[72px] shrink-0">
          <canvas ref={canvasRef} width={72} height={72} />
          {/* Score label */}
          <span className="absolute inset-0 flex items-center justify-center text-[18px] font-bold text-gray-800">
            {score}
          </span>
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900 leading-none">
            {score}
            <span className="text-sm font-normal text-gray-400">/{maxScore}</span>
          </p>
          <p className="mt-1 text-xs text-green-600 font-medium">{trend}</p>
        </div>
      </div>
    </motion.div>
  );
}
