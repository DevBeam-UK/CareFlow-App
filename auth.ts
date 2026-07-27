import NextAuth, { CredentialsSignin, NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { env } from './config/env';

const BACKEND_URL = env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class customAuthError extends CredentialsSignin {
  code! : string
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            credentials: 'include',
          });

          let data;
          try {
            data = await response.json()
          } catch {
            throw new Error('invalid response from the server')
          }


          if (!response.ok) {
            const error = new customAuthError()
            error.code = data.message || data.error || 'Login failed'
            throw error
          }

          

          if (!data.user || !data.user.id || !data.user.email) {
            throw new Error('Invalid user data recieved from the server')
          }

          
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.fullName,
            accessToken: data.accessToken,
            refreshToken : data.refreshToken
          };
        } catch (error) {
          return null
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken
      }
      return token;
    },
    async session({ session, token }) {
  
      if (session.user) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 15 * 60, // 15 minutes
  },
}satisfies NextAuthConfig);