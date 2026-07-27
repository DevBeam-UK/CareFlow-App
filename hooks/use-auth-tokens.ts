// src/lib/hooks/use-auth-tokens.ts
'use client';

import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

export function useAuthTokens() {
  const { data: session, status } = useSession();

  return {
    accessToken: session?.accessToken as string,
    refreshToken: session?.refreshToken as string,
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
}