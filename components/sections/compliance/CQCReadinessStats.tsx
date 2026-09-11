
'use client';


import { StatCard } from '@/components/shared';
import { 
  Shield, 
  FileText, 
  GraduationCap, 
  AlertCircle,
  Clock,
  AlertTriangle 
} from 'lucide-react';

interface CQCReadinessStatsProps {
  score?: number;
  documentationGaps?: {
    unsignedPlans: number;
    missingMAR: number;
    lateNotes: number;
  };
  trainingCompliance?: {
    expired: number;
    expiringSoon: number;
  };
  incidentResponse?: {
    avgResponseTime: number;
    openInvestigations: number;
    target: string;
  };
}

export function CQCReadinessStats({
  score = 87,
  documentationGaps = {
    unsignedPlans: 3,
    missingMAR: 4,
    lateNotes: 5,
  },
  trainingCompliance = {
    expired: 3,
    expiringSoon: 5,
  },
  incidentResponse = {
    avgResponseTime: 4.2,
    openInvestigations: 2,
    target: "<6h",
  },
}: CQCReadinessStatsProps) {
  const totalIssues = documentationGaps.unsignedPlans + documentationGaps.missingMAR + documentationGaps.lateNotes;
  const trainingIssues = trainingCompliance.expired + trainingCompliance.expiringSoon;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="CQC Readiness"
        value={score.toLocaleString()}
        Icon={Shield}
        description="Overall compliance score"
        
        
        showTrend={true}
        trend="up"
        hasCqcScore={true}
        
        valueBadgeValue={`+${score - 83} pts`}
      >
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-cf-ink-60">
            {score >= 85 ? 'On track' : 'Needs attention'}
          </span>
          <div className="h-1.5 flex-1 bg-cf-surface-muted rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${score >= 85 ? 'bg-green-500' : 'bg-amber-500'}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </StatCard>

      <StatCard
        label="Documentation Gaps"
        value={totalIssues.toLocaleString()}
        Icon={FileText}
        description="Issues requiring attention"
        showScore={false}
        showTrend={false}
        hasCqcScore={false}
        hasValueBadge={true}
        valueBadgeValue={`${totalIssues} issues`}
      >
        <div className="space-y-1 mt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-cf-ink-60">Unsigned plans</span>
            <span className="font-medium text-cf-ink">{documentationGaps.unsignedPlans}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-cf-ink-60">Missing MAR</span>
            <span className="font-medium text-cf-ink">{documentationGaps.missingMAR}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-cf-ink-60">Late notes</span>
            <span className="font-medium text-cf-ink">{documentationGaps.lateNotes}</span>
          </div>
        </div>
      </StatCard>

      <StatCard
        label="Training Compliance"
        value={trainingIssues.toLocaleString()}
        Icon={GraduationCap}
        description="Staff training status"
        showScore={false}
        showTrend={false}
        hasCqcScore={false}
        hasValueBadge={true}
        valueBadgeValue={`${trainingIssues} issues`}
      >
        <div className="space-y-1 mt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-cf-ink-60">Expired</span>
            <span className="font-medium text-red-600">{trainingCompliance.expired}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-cf-ink-60">Expiring in 14 days</span>
            <span className="font-medium text-amber-600">{trainingCompliance.expiringSoon}</span>
          </div>
        </div>
      </StatCard>

      <StatCard
        label="Incident Response"
        value={`${incidentResponse.avgResponseTime}`}
        Icon={AlertCircle}
        description="Average response time"
        showScore={false}
        showTrend={false}
        hasCqcScore={false}
        hasValueBadge={true}
        valueBadgeValue={`${incidentResponse.openInvestigations} open`}
      >
        <div className="space-y-1 mt-1">
          <div className="flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3 text-cf-ink-40" />
            <span className="text-cf-ink-60">Target: {incidentResponse.target}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <AlertTriangle className="h-3 w-3 text-amber-500" />
            <span className="text-cf-ink-60">{incidentResponse.openInvestigations} open investigations</span>
          </div>
        </div>
      </StatCard>
    </div>
  );
}