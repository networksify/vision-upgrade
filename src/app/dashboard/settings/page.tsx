import type { Metadata } from 'next';

import { SettingsPage } from '@/components/settings/settings-page';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Account details and workspace information for the Vision Upgrade dashboard.',
};

// Rendered behind the client-side auth guard, which replaces this segment while
// the session resolves; opt out of Next.js instant-navigation validation.
export const instant = false;

export default function SettingsRoute() {
  return <SettingsPage />;
}
