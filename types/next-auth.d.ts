// src/types/next-auth.d.ts

import { DefaultSession, DefaultJWT, DefaultUser } from "next-auth";

// ✅ Extend the User type (returned by authorize)
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    accessToken?: string;
    refreshToken?: string;
    emailVerified?: boolean;
    hasActiveSubscription?: boolean;
  }

  // ✅ Extend the Session type
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      emailVerified: boolean;
      hasActiveSubscription?: boolean;
    } & DefaultSession["user"];
    accessToken?: string;
    refreshToken?: string;
    emailVerified?: boolean;
  }
}

// ✅ Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    emailVerified?: boolean;
  }
}