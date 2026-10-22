import type { Metadata } from 'next';

import { ChatPage } from '@/components/chat/chat-page';

export const metadata: Metadata = {
  title: 'Company chat',
  description: 'Internal conversations for the Vision Upgrade team.',
};

// Rendered behind the client-side auth guard, which replaces this segment while
// the session resolves; opt out of Next.js instant-navigation validation.
export const instant = false;

export default function CompanyChatPage() {
  return <ChatPage />;
}
