import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { env } from "./config/env";

const BACKEND_URL = env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

class customAuthError extends CredentialsSignin {
  code!: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            credentials: "include",
          });

          let data;
          try {
            data = await response.json();
          } catch {
            throw new Error("invalid response from the server");
          }

          console.log("This is the raw data from backend : ", data);

          if (!response.ok) {
            const error = new customAuthError();
            error.code = data.message || data.error || "Login failed";
            throw error;
          }

          if (!data || !data.id || !data.email) {
            throw new Error("Invalid user data recieved from the server");
          }

          console.log("This is the data from backend:", data);

          return {
            id: data.id,
            email: data.email,
            name: data.fullName,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            emailVerified: data.emailVerified,
            hasActiveSubscription: data.hasActiveSubscription,
            hasAgency: data.hasAgency,
            isAgencyOwner: data.isAgencyOwner,
            role: data.role,
            userType: data.userType,
            agencyId: data.agencyId
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.emailVerified = user.emailVerified;
        token.hasActiveSubscription = user.hasActiveSubscription;
        token.role = user.role;
        token.userType = user.userType;
        token.isAgencyOwner = user.isAgencyOwner;
        token.hasAgency = user.hasAgency;
        token.agencyId = user.agencyId
        return token;
      }

      if (token.id && token.accessToken) {
        try {
          const response = await fetch(`${BACKEND_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            const actualUser = userData.user || userData;

            token.emailVerified = actualUser.emailVerified;
            token.status = actualUser.status;
            token.email = actualUser.email;
            token.fullName = actualUser.fullName;
            token.hasActiveSubscription = actualUser.hasActiveSubscription;
            token.role = actualUser.role;
            token.userType = actualUser.userType;
            token.isAgencyOwner = actualUser.isAgencyOwner;
            token.hasAgency = actualUser.hasAgency;
            token.agencyId = actualUser.agencyId
          }
        } catch {
          return null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.emailVerified = token.emailVerified as Date & boolean;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.emailVerified = token.emailVerified as boolean;
        session.user.hasActiveSubscription =
          token.hasActiveSubscription as boolean;
        session.user.hasAgency = token.hasAgency as boolean;
        session.user.role = token.role as string;
        session.user.isAgencyOwner = token.isAgencyOwner as boolean;
        session.user.userType = token.userType as
          | "ADMIN_OWNER"
          | "ADMIN_MEMBER"
          | "STAFF";
          session.user.agencyId = token.agencyId as string
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 15 * 60, // 15 minutes
  },
} satisfies NextAuthConfig);
