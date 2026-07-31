"use client";

import { usePathname } from "next/navigation";
import { AuthBrandPanel } from "@/components/auth/auth-brand-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen w-full">{children}</div>
}

