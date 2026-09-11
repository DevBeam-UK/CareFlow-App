import { ComplianceAlerts, CQCInspectionPack, KeyRegulationsCard, CQCReadinessCard, CQCReadinessStats, RecentAuditTrailCard, CQCScoreTrendCard } from 'sections';
import { SectionPlaceholder } from "shared";

export default function CompliancePage() {
  return (
    <div className="h-screen w-full  space-y-8 overflow-y-scroll no-scrollbar">
      <CQCReadinessStats />
      <div className="w-full flex gap-x-4">
        <div className="flex flex-col w-full h-full gap-y-4">

      <CQCReadinessCard />
      <RecentAuditTrailCard />
        </div>
      <div className="h-full w-full max-w-sm flex flex-col gap-y-2">
      <ComplianceAlerts />
      <CQCInspectionPack />
      </div>
      </div>
      <div className="flex gap-x-2 w-full">
      <CQCScoreTrendCard />
      <KeyRegulationsCard />
      </div>
    </div>
  )
}
