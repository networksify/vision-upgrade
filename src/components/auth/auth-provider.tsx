"use client";

import * as React from 'react';

import { useServices } from '@/lib/providers/service-context';
import type { SessionUser } from '@/types/dashboard';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export type SignInOutcome = { ok: true } | { ok: false; message: string };

type AuthContextValue = {
  status: AuthStatus;
  user: SessionUser | null;
  signIn: (credentials: { username: string; password: string }) => Promise<SignInOutcome>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

/**
 * Holds the dashboard session.
 *
 * The session lives in React state only. It is deliberately NOT written to
 * `localStorage`, `sessionStorage` or a readable cookie, because a client side
 * flag is not an authorisation boundary — anyone can edit it. The prototype
 * therefore signs the visitor out on reload, which is the honest behaviour
 * for a session that a browser holds in memory.
 *
 * A production build replaces this provider with a server backed session: the
 * browser only ever holds an `HttpOnly; Secure; SameSite` cookie that the
 * server validates on every request.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { auth } = useServices();
  const [status, setStatus] = React.useState<AuthStatus>('loading');
  const [user, setUser] = React.useState<SessionUser | null>(null);

  React.useEffect(() => {
    let active = true;

    void auth.getSession().then((session) => {
      if (!active) return;
      setUser(session);
      setStatus(session ? 'authenticated' : 'unauthenticated');
    });

    return () => {
      active = false;
    };
  }, [auth]);

  const signIn = React.useCallback<AuthContextValue['signIn']>(
    async (credentials) => {
      const result = await auth.signIn(credentials);

      if (!result.ok) {
        return { ok: false, message: result.error.message };
      }

      setUser(result.data);
      setStatus('authenticated');
      return { ok: true };
    },
    [auth],
  );

  const signOut = React.useCallback(async () => {
    await auth.signOut();
    setUser(null);
    setStatus('unauthenticated');
  }, [auth]);

  const value = React.useMemo<AuthContextValue>(
    () => ({ status, user, signIn, signOut }),
    [status, user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>.');
  }

  return context;
}
