// components/sections/dashboard/DashboardStatSection.tsx
import React from "react";
import { StatCard } from "shared";
import { Users, Calendar, ClipboardList, DollarSign } from "lucide-react";

function DashboardStatSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      <StatCard
        label="Total Patients"
        value="142"
        Icon={Users}
        description="Active patients under care"
        showScore={false}
        showTrend={true}
        trend="up"
        hasCqcScore={false}
        hasValueBadge={true}
        valueBadgeValue="12%"
      />


      <StatCard
        label="Active Staff"
        value="31"
        Icon={Users}
        description="Staff currently active"
        showScore={false}
        showTrend={true}
        trend="up"
        hasCqcScore={false}
        hasValueBadge={true}
        valueBadgeValue="8%"
      />


      <StatCard
        label="Today's Visits"
        value="48"
        Icon={Calendar}
        description="Visits scheduled today"
        showScore={true}
        score={92}
        showTrend={false}
        hasCqcScore={false}
        hasValueBadge={false}
      />

  
      <StatCard
        label="Revenue"
        value="$42,500"
        Icon={DollarSign}
        description="This month's revenue"
        showScore={true}
        score={78}
        showTrend={false}
        hasCqcScore={false}
        hasValueBadge={false}
      />
    </div>
  );
}

export default DashboardStatSection;