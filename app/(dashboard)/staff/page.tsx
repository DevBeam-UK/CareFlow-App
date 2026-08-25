'use client'

import { StaffHeader, StaffTable, StaffToolbar } from "sections";
import { StatCard } from "shared";
import { Separator, StaffTableSkeleton } from "ui-components";
import { mapToStaffMemberArray, useGetAllAgencyStaffApi } from "lib";
import type { StaffMember } from "types";
import { staffStatsData } from "utils";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

export default function StaffPage() {
  const [activeRole, setActiveRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const session = useSession();
  

  const isSessionLoading = session.status === "loading";
  

  const accessToken = session.data?.accessToken;
  const agencyId = session.data?.user.agencyId;


  const { data, error, isLoading } = useGetAllAgencyStaffApi(
    agencyId as string, 
    accessToken as string,
  );

  const staffMembers = data ? mapToStaffMemberArray(data) : [];

  const filteredData = useMemo(() => {
    return staffMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = activeRole === "all" || member.role === activeRole;

      return matchesSearch && matchesRole;
    });
  }, [staffMembers, searchQuery, activeRole]);


  if (isSessionLoading) {
    return (
      <div className="h-screen w-full p-6 border rounded-2xl shadow bg-cf-surface space-y-8 overflow-y-scroll no-scrollbar">
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
    <div className="h-screen w-full  space-y-8 overflow-y-scroll no-scrollbar">
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
    </div>
  );
}