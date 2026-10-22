import type { HeroProps } from '@/types/types';
import { Brand } from '@/data/mock/navbar';

export const HeroSection: HeroProps = {
  brand: Brand,
  eyebrow: 'Technology · Education · Digital growth',
  title: 'Technology that teaches, builds and',
  titleAccent: 'grows businesses',
  description:
    'Vision Upgrade runs three connected practices: hands-on learning programs for young learners through VU Kids, our own software and technology solutions, and digital marketing that turns attention into measurable growth.',
  primaryCta: { label: 'Explore Our Programs', href: '/#programs' },
  secondaryCta: { label: 'Contact Us', href: '/#contact' },
  visual: {
    title: 'Vision Upgrade',
    status: 'Three practices, one standard',
    rows: [
      {
        id: 1,
        icon: 'cap',
        label: 'VU Kids',
        caption: 'Learning programs for young minds',
        fill: 92,
      },
      {
        id: 2,
        icon: 'code',
        label: 'Vision Upgrade',
        caption: 'Software and technology solutions',
        fill: 78,
      },
      {
        id: 3,
        icon: 'megaphone',
        label: 'Digital Marketing',
        caption: 'Content, campaigns and growth',
        fill: 84,
      },
    ],
    badge: {
      id: 1,
      icon: 'trending',
      label: 'Digital growth',
      value: 'Built to scale',
    },
  },
  pillars: [
    {
      id: 1,
      icon: 'cap',
      title: 'Education',
      description: 'Structured, practical learning programs for kids.',
    },
    {
      id: 2,
      icon: 'code',
      title: 'Technology',
      description: 'Software products and solutions we build ourselves.',
    },
    {
      id: 3,
      icon: 'megaphone',
      title: 'Marketing',
      description: 'Digital strategies that move brands forward.',
    },
  ],
};
