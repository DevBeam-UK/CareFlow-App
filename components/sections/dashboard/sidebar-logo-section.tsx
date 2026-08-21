import Image from "next/image";
import type { ReactElement } from "react";

export function SidebarLogoSection(): ReactElement {
  return (
    <div className="flex items-center gap-[11px] border-b border-black/[0.06] px-5 pb-[18px] pt-[22px]">
      <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] shadow-[0_2px_8px_rgba(99,182,140,0.3)]">
        <Image
          src="https://i.postimg.cc/NMTWLY5Z/Chat-GPT-Image-Aug-4-2026-12-56-19-PM-removebg-preview.png"
          alt="careflow logo"
          height={20}
          width={20}
        />
      </div>
      <div>
        <div className="font-heading text-[17px] font-extrabold tracking-[-0.02em] text-black">
          CareFlow
        </div>
        <div className="text-[10.5px] font-medium tracking-[0.02em] text-[#717680]">
          HOME CARE PLATFORM
        </div>
      </div>
    </div>
  );
}