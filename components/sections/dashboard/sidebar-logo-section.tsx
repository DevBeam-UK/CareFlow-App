import type { ReactElement } from "react";

export function SidebarLogoSection(): ReactElement {
  return (
    <div className="flex items-center gap-[11px] border-b border-[rgba(255,255,255,0.06)] px-5 pb-[18px] pt-[22px]">
      <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-gradient-to-br from-[#63B68C] to-[#1A7F56] shadow-[0_2px_8px_rgba(99,182,140,0.3)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
      <div>
        <div className="font-heading text-[17px] font-extrabold tracking-[-0.02em] text-white">
          CareFlow
        </div>
        <div className="text-[10.5px] font-medium tracking-[0.02em] text-[rgba(255,255,255,0.3)]">
          HOME CARE PLATFORM
        </div>
      </div>
    </div>
  );
}
