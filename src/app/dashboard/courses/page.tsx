import type { Metadata } from 'next';

import { CoursesPage } from '@/components/courses/courses-page';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Create, edit and publish Vision Upgrade courses.',
};

// Rendered behind the client-side auth guard, which replaces this segment while
// the session resolves; opt out of Next.js instant-navigation validation.
export const instant = false;

export default function CoursesRoute() {
  return <CoursesPage />;
}
