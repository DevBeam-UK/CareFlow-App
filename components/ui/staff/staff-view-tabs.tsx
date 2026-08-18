'use client';

import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface StaffViewTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function StaffViewTabs({ tabs, activeTab, onTabChange }: StaffViewTabsProps) {
  return (
    <div className="flex gap-0 border-b border-cf-border px-6 overflow-x-auto">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === id
              ? 'border-cf-primary text-cf-ink'
              : 'border-transparent text-cf-ink-60 hover:text-cf-ink'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}