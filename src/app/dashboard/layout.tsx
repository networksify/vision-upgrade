import type { ReactNode } from 'react';

import { AppProviders } from '@/components/auth/app-providers';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

/**
 * Layout for every dashboard route.
 *
 * The shell owns the sidebar, the header and the client side session guard.
 * The pages below it stay free of layout concerns.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AppProviders>
      <DashboardShell>{children}</DashboardShell>
    </AppProviders>
  );
}
