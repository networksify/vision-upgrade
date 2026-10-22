import { Brand } from '@/data/mock/navbar';
import type { FooterProps } from '@/types/types';

export const FooterSection: FooterProps = {
  brand: Brand,
  name: 'Vision Upgrade',
  description:
    'Vision Upgrade (VUSoft) is a technology company working across education, software and digital marketing — building practical learning programs, our own software solutions and campaigns that help brands grow.',
  columns: [
    {
      id: 1,
      title: 'Company',
      links: [
        { id: 1, title: 'Home', href: '/#home' },
        { id: 2, title: 'About', href: '/#about' },
        { id: 3, title: 'Why Choose Us', href: '/#why-us' },
        { id: 4, title: 'Contact', href: '/#contact' },
      ],
    },
    {
      id: 2,
      title: 'Programs',
      links: [
        { id: 1, title: 'VU Kids', href: '/#vu-kids' },
        { id: 2, title: 'Vision Upgrade', href: '/#vision-upgrade' },
        { id: 3, title: 'Digital Marketing', href: '/#digital-marketing' },
        { id: 4, title: 'Explore Our Programs', href: '/#programs' },
      ],
    },
  ],
  // The repository has no verified social profiles, so the row is rendered
  // only once real profile URLs are added here.
  socials: [],
  // The year is written literally so the page can stay fully static.
  // Update it once a year.
  copyright: '© 2026 Vision Upgrade (VUSoft). All rights reserved.',
  // Privacy and terms pages do not exist yet — add them here when they do.
  legal: [],
};
