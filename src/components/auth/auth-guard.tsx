"use client";

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Spinner } from '@/components/ui/spinner';

import { useAuth } from './auth-provider';

type AuthGuardProps = {
  children: React.ReactNode;
};

/**
 * Client side route guard for the dashboard.
 *
 * While the session is being resolved it renders a loading state; once it is
 * known to be missing it redirects to the sign-in screen.
 *
 * This guard is a UX convenience, not a security control. A browser can be
 * tricked into rendering these pages regardless, so every protected route and
 * every privileged operation must be re-checked by the backend before the
 * dashboard is used with real data.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      const next = encodeURIComponent(pathname ?? '/dashboard');
      router.replace(`/login?next=${next}`);
    }
  }, [status, pathname, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-svh items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-3 text-center">
          <Spinner className="size-6 text-brand" />
          <p className="text-sm text-muted-foreground">Checking your session…</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex min-h-svh items-center justify-center bg-surface px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Spinner className="size-6 text-brand" />
          <p className="text-sm text-muted-foreground">Redirecting to the sign-in screen…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
