import type { HeroProps } from '@/types/types';

export const HeroSection: HeroProps = {
  badge: 'AI Vision Platform',
  badgeActive: true,
  title: 'Give your cameras the power to',
  titleAccent: 'understand',
  description:
    'Vision Upgrade turns raw video into decisions. Deploy production-ready models that detect, classify and act on what happens on the floor, in the warehouse and around the site.',
  primaryCta: {
    label: 'Get in Touch',
    href: '/contact',
  },
  secondaryCta: {
    label: 'Explore Services',
    href: '/#services',
  },
  stats: [
    { id: 1, label: 'Models deployed', value: '240+' },
    { id: 2, label: 'Frames analysed daily', value: '18M' },
    { id: 3, label: 'Average accuracy', value: '99.2%' },
    { id: 4, label: 'Enterprise clients', value: '120+' },
  ],
  visual: {
    status: 'Live feed',
    caption: 'Feed 01 - Line A - 1080p',
    detections: [
      {
        id: 1,
        label: 'Person 0.98',
        confidence: 0.98,
        box: { left: '16%', top: '22%', width: '30%', height: '44%' },
        borderClass: 'border-blue-400',
        labelClass: 'bg-blue-700',
      },
      {
        id: 2,
        label: 'Helmet 0.94',
        confidence: 0.94,
        box: { left: '58%', top: '50%', width: '24%', height: '30%' },
        borderClass: 'border-emerald-400',
        labelClass: 'bg-emerald-700',
      },
    ],
    metrics: [
      {
        id: 1,
        label: 'Detection accuracy',
        value: 98,
        barClass: 'bg-blue-600',
      },
      {
        id: 2,
        label: 'Pipeline latency',
        value: 24,
        barClass: 'bg-emerald-500',
      },
    ],
  },
};
