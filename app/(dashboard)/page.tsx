import DashboardAttentionBoard from "@/components/sections/dashboard/DashboardAttentionBoard";
import { DashboardComplianceDue } from "@/components/sections/dashboard/DashboardComplianceDueSection";
import { DashboardCQCBreakdown } from "@/components/sections/dashboard/DashboardCQCBreakdownSection";
import DashboardOnShiftSection from "@/components/sections/dashboard/DashboardOnShiftSection";
import DashboardStatSection from "@/components/sections/dashboard/DashboardStatSection";
import DashboardVisitSection from "@/components/sections/dashboard/DashboardVisitSection";
import { DashboardWeeklyActivity } from "@/components/sections/dashboard/DashboardWeeklyActivitySection";

export default function DashboardHomePage() {
  return (
    <div className="h-screen w-full p-6 border rounded-2xl shadow bg-cf-surface space-y-4 overflow-scroll no-scrollbar">
      <DashboardStatSection />
      <div className="flex justify-between gap-x-4">
        <DashboardVisitSection />
        <div className="flex flex-col w-full max-w-sm gap-y-4">
        <DashboardAttentionBoard />
        <DashboardOnShiftSection />
        </div>
      </div>
      <div className="flex w-full gap-x-4">
      <DashboardWeeklyActivity />
      <DashboardCQCBreakdown />
      <DashboardComplianceDue />
      </div>
    </div>
  );
}
