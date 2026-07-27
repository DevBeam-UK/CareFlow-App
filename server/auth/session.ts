import "server-only";

import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";
import { auth } from "@/auth";



import type { Session } from "next-auth";

export async function requireSession(): Promise<Session> {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}
