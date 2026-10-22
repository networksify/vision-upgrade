import type { FooterProps } from '@/types/types';

export const FooterSection: FooterProps = {
  initial: 'V',
  name: 'Vision Upgrade',
  description:
    'Machine vision infrastructure that turns live feeds into decisions you can act on, with the accuracy and auditability production demands.',
  columns: [
    {
      id: 1,
      title: 'Product',
      links: [
        { id: 1, title: 'Vision Analytics', href: '/#services' },
        { id: 2, title: 'Model Training', href: '/#services' },
        { id: 3, title: 'Quality Inspection', href: '/#services' },
        { id: 4, title: 'Dashboards', href: '/#services' },
      ],
    },
    {
      id: 2,
      title: 'Company',
      links: [
        { id: 1, title: 'About Vision', href: '/#about' },
        { id: 2, title: 'Services', href: '/#services' },
        { id: 3, title: 'Contact Us', href: '/#contact' },
        { id: 4, title: 'Log in', href: '/login' },
      ],
    },
    {
      id: 3,
      title: 'Legal',
      links: [
        { id: 1, title: 'Privacy policy', href: '/#home' },
        { id: 2, title: 'Terms of service', href: '/#home' },
        { id: 3, title: 'Security', href: '/#home' },
      ],
    },
  ],
  copyright: '2026 Vision Upgrade. All rights reserved.',
  tagline: 'Built for teams that ship machine vision to production.',
};
