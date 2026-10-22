import type { ReactNode } from 'react';
import type { IconName } from '@/types/types';

/**
 * Single stroke-based icon set (24 x 24) so every glyph shares the same
 * weight, joins and optical size across the site.
 */
const paths: Record<IconName, ReactNode> = {
  arrowRight: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5 13.7 8.3 18.5 10l-4.8 1.7L12 16.5l-1.7-4.8L5.5 10l4.8-1.7L12 3.5Z" />
      <path d="m18 15 .7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7L18 15Z" />
    </>
  ),
  cap: (
    <>
      <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5 2.5 9Z" />
      <path d="M6.5 11.2v4c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-4" />
      <path d="M21.5 9v5.5" />
    </>
  ),
  blocks: (
    <>
      <path d="M4 4h6.5v6.5H4z" />
      <path d="M13.5 4H20v6.5h-6.5z" />
      <path d="M4 13.5h6.5V20H4z" />
      <path d="M13.5 13.5H20V20h-6.5z" />
    </>
  ),
  code: (
    <>
      <path d="m8.5 8-4 4 4 4" />
      <path d="m15.5 8 4 4-4 4" />
      <path d="m13.5 4.5-3 15" />
    </>
  ),
  cpu: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 1.5v2.5M15 1.5v2.5M9 20v2.5M15 20v2.5M1.5 9H4M1.5 15H4M20 9h2.5M20 15h2.5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 19a4.5 4.5 0 0 1-.4-8.98 5.75 5.75 0 0 1 11.02 1.2A3.9 3.9 0 0 1 17.5 19H7Z" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h3l7 4V5L8 9H5a1 1 0 0 0-1 1Z" />
      <path d="M17.5 8.5a4.5 4.5 0 0 1 0 7" />
      <path d="M8 15v3.5" />
    </>
  ),
  chart: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M6.5 20.5V13" />
      <path d="M12 20.5V4.5" />
      <path d="M17.5 20.5V9.5" />
    </>
  ),
  trending: (
    <>
      <path d="m3.5 16.5 5.5-5.5 3.5 3.5 7-7.5" />
      <path d="M15 7h5v5" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="2.75" />
      <circle cx="6" cy="12" r="2.75" />
      <circle cx="18" cy="19" r="2.75" />
      <path d="m8.4 10.6 7.2-4.2M8.4 13.4l7.2 4.2" />
    </>
  ),
  cursor: (
    <>
      <path d="m5 3 6.6 16.2 2.2-6.4 6.4-2.2L5 3Z" />
      <path d="m14.5 14.5 4.5 4.5" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.2A2.2 2.2 0 0 1 6.2 3H19v16.5H6.2A2.2 2.2 0 0 0 4 21.7V5.2Z" />
      <path d="M4 19.5A2.2 2.2 0 0 1 6.2 17.3H19" />
      <path d="M8 7.5h7" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M12 2.5a6.5 6.5 0 0 0-3.8 11.8c.5.4.8 1 .8 1.7v.5h6v-.5c0-.7.3-1.3.8-1.7A6.5 6.5 0 0 0 12 2.5Z" />
      <path d="M9.5 19h5" />
      <path d="M10.5 21.5h3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  ),
  mapPin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="9" width="3.5" height="11" rx="1" />
      <circle cx="4.75" cy="5.25" r="1.75" />
      <path d="M10 9.5h3.4v1.4a3.8 3.8 0 0 1 6.6 2.6V20h-3.5v-5.6a1.9 1.9 0 0 0-3.8 0V20H10V9.5Z" />
    </>
  ),
  twitter: (
    <>
      <path d="M3.5 3.5 20.5 20.5" />
      <path d="M20.5 3.5 3.5 20.5" />
    </>
  ),
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6a22 22 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1v2.3H7.6V13h2.7v8h3.2Z" />
    </>
  ),
  youtube: (
    <>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8Z" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
  check: <path d="m5 13 4.5 4.5L19 7" />,
  plus: (
    <>
      <path d="M12 5.5v13" />
      <path d="M5.5 12h13" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
};

type IconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

export const Icon = ({
  name,
  className = 'h-6 w-6',
  strokeWidth = 1.75,
}: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {paths[name]}
  </svg>
);
