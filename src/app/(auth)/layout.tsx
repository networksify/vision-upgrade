import type { ReactNode } from 'react';

import { AppProviders } from '@/components/auth/app-providers';

/**
 * Layout for the signed-out area.
 *
 * It mounts the same provider stack the dashboard uses, so the sign-in screen
 * talks to the very same auth service as the rest of the application.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
