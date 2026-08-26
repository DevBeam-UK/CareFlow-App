'use client'

import { StaffHeader, StaffTable, StaffToolbar, TrainingMatrixTab, AvailabilityTab, PerformanceTab } from "sections";
import { StatCard } from "shared";
import { Separator, StaffTableSkeleton, Tabs, TabsList, TabsTrigger, TabsContent } from "ui-components";
import { mapToStaffMemberArray, mockStaffMembers, useGetAllAgencyStaffApi } from "lib";
import type { StaffMember } from "types";
import { staffStatsData } from "utils";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// TEMP: using mock data while backend auth is being fixed
// const { data, error, isLoading } = useGetAllAgencyStaffApi(
//   agencyId as string,
//   accessToken as string,
// );
// const staffMembers = data ? mapToStaffMemberArray(data) : [];

const ROLE_COLORS: Record<string, string> = {
  manager: "#00C48C",
  coordinator: "#3574D4",
  carer: "#F0A825",
  admin: "#8B5CF6",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const} },
};

export default function StaffPage() {
  const [activeRole, setActiveRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("directory");

  const session = useSession();
  const isSessionLoading = session.status === "loading";
  const accessToken = session.data?.accessToken;
  const agencyId = session.data?.user.agencyId;

  const staffMembers = mockStaffMembers;
  const isLoading = false;

  const filteredData = useMemo(() => {
    return staffMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = activeRole === "all" || member.role === activeRole;
      return matchesSearch && matchesRole;
    });
  }, [staffMembers, searchQuery, activeRole]);

  const roleDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    staffMembers.forEach((m) => {
      counts[m.role] = (counts[m.role] || 0) + 1;
    });
    return Object.entries(counts).map(([role, value]) => ({
      name: role.charAt(0).toUpperCase() + role.slice(1),
      value,
      color: ROLE_COLORS[role] || "#8A8F98",
    }));
  }, [staffMembers]);

  const hiringTrend = useMemo(() => {
    const months: { label: string; count: number }[] = [];
    const now = new Date(2026, 7, 1);
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleDateString("en-GB", { month: "short" });
      const count = staffMembers.filter((m) => {
        const created = new Date(m.createdAt);
        return created.getMonth() === d.getMonth() && created.getFullYear() === d.getFullYear();
      }).length;
      months.push({ label, count });
    }
    let running = 0;
    return months.map((m) => {
      running += m.count;
      return { label: m.label, total: running || m.count };
    });
  }, [staffMembers]);

  if (isSessionLoading) {
    return (
      <div className="h-screen w-full  space-y-8 overflow-y-auto">
        <StaffHeader />
        
        <div className="w-full bg-cf-surface p-4 flex flex-col gap-y-2 rounded-xl border">
          <StaffToolbar
            activeRole={activeRole}
            onRoleChange={setActiveRole}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
          />
          <StaffTableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full space-y-8 overflow-y-scroll no-scrollbar">
      <StaffHeader />
      <Separator />
      <div className="w-full gap-x-4 flex items-center">
        {staffStatsData.map((stat, index) => (
          <StatCard
            Icon={stat.Icon}
            description={stat.description}
            label={stat.label}
            value={stat.value}
            key={index}
            showTrend
            trend="neutral"
            hasCqcScore
            cqcScore={23}
          />
        ))}
      </div>

    
      <motion.div variants={item} className="w-full grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 bg-cf-surface p-5 rounded-xl border border-cf-border">
          <p className="text-sm font-semibold text-cf-ink mb-1">Staff by role</p>
          <p className="text-xs text-cf-ink-60 mb-4">Current distribution across your agency</p>
          <div className="h-56 flex items-center">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={roleDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  animationDuration={800}
                  animationBegin={200}
                >
                  {roleDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E4E5EA", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
              {roleDistribution.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-cf-ink-60">{entry.name}</span>
                  <span className="text-cf-ink font-medium ml-auto">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-cf-surface p-5 rounded-xl border border-cf-border">
          <p className="text-sm font-semibold text-cf-ink mb-1">Team growth</p>
          <p className="text-xs text-cf-ink-60 mb-4">Cumulative staff count over the last 6 months</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hiringTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="staffGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C48C" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00C48C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E5EA" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#8B8FA8" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#8B8FA8" }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E4E5EA", fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#00C48C"
                  strokeWidth={2}
                  fill="url(#staffGrowth)"
                  animationDuration={900}
                  animationBegin={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>


      <motion.div variants={item} className="w-full">
        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList className="bg-cf-surface-muted mb-4">
            <TabsTrigger value="directory" className="data-[state=active]:bg-cf-surface data-[state=active]:text-cf-ink">
              Directory
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-cf-surface data-[state=active]:text-cf-ink">
              Training Matrix
            </TabsTrigger>
            <TabsTrigger value="availability" className="data-[state=active]:bg-cf-surface data-[state=active]:text-cf-ink">
              Availability
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-cf-surface data-[state=active]:text-cf-ink">
              Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="directory">
            <div className="w-full bg-cf-surface p-4 flex flex-col gap-y-2 rounded-xl border">
              <StaffToolbar
                activeRole={activeRole}
                onRoleChange={setActiveRole}
                onSearchChange={setSearchQuery}
                searchQuery={searchQuery}
              />
              {isLoading ? (
                <StaffTableSkeleton />
              ) : (
                <StaffTable data={filteredData as StaffMember[]} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="training">
            <TrainingMatrixTab staffMembers={staffMembers} />
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityTab staffMembers={staffMembers} />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceTab staffMembers={staffMembers} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div> 
  );
}