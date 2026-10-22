import type { Metadata } from 'next';

import { AccountsPage } from '@/components/admin/accounts-page';

export const metadata: Metadata = {
  title: 'Admin accounts',
  description: 'Manage Vision Upgrade administrator accounts and their access levels.',
};

// Rendered behind the client-side auth guard, which replaces this segment while
// the session resolves; opt out of Next.js instant-navigation validation.
export const instant = false;

export default function AdminAccountsPage() {
  return <AccountsPage />;
}
