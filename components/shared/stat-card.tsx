import React from "react";
import { MagicCard } from "../ui/magic-card";
import { LucideIcon, ArrowUp, ArrowDown } from "lucide-react";
import { StatCardProps } from "@/types/components";
import { Badge } from "../ui";
import { showStatTrend } from "@/utils/show-trend";
import { getScoreRingColor } from "@/utils/stat-score-ring-check";

function StatCard({
  description,
  Icon,
  label,
  value,
  score,
  showScore,
  showTrend,
  trend,
  cqcScore,
  hasCqcScore,
  hasValueBadge,
  valueBadgeValue,
  children
}: StatCardProps) {
  return (
    <MagicCard
      mode="gradient"
      gradientColor="#1a7f56"
      gradientOpacity={0.12}
      gradientSize={200}
      gradientFrom="#1a7f56"
      gradientTo="#49b375"
      className="w-full rounded-xl" 
    >
      <div className="flex flex-col gap-4 py-4 px-4">
        <div className="flex items-center justify-between">
          <Badge variant="pastel-success" badgeSize={'lg'}>
            <Icon className="size-4" />
          </Badge>

          <div className="flex items-center gap-2">
            {showTrend && trend && showStatTrend(trend)}
            
            {showScore && score !== undefined && (
              <div
                className={`
                  w-6 h-6
                  flex items-center justify-center
                  text-xs font-bold
                  rounded-full ring-[6px] ${getScoreRingColor(score)}
                  bg-white
                `}
              >
                {score}
              </div>
            )}
          </div>
        </div>


        <h1 className="text-xs text-cf-ink-40 font-semibold tracking-wider">
          {label.toUpperCase()}
        </h1>
        <div className="flex items-end gap-2">
          <h1 className="text-4xl font-bold text-cf-ink leading-none">{value}</h1>

          <div className="flex items-end gap-2">
            {hasValueBadge && (
              <Badge 
                variant="pastel-success" 
                shape="pill"
                className="flex items-center gap-1 px-2.5 py-1 text-sm font-semibold"
              >
                <ArrowUp className="size-3.5" />
                {valueBadgeValue}
              </Badge>
            )}

            {hasCqcScore && (
                <span className="text-md font-bold text-cf-ink-40">/100</span>   
            )}
          </div>
        </div>

        <div>
          {children}
        </div>

      </div>
    </MagicCard>
  );
}

export default StatCard;