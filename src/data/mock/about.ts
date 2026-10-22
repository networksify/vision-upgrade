import type { AboutProps } from '@/types/types';

export const AboutSection: AboutProps = {
  eyebrow: 'About Vision',
  title: 'A platform built around how teams actually work',
  description:
    'Vision Upgrade started as an internal tool for reading factory floors. Today it helps operations, safety and quality teams turn every camera into a source of truth.',
  card: {
    eyebrow: 'Our approach',
    quote:
      'Every model we ship has to survive a real production week, not a demo.',
    body: 'That principle shapes how we evaluate accuracy, how we design fallbacks, and why we publish the confidence behind every prediction.',
    stats: [
      { id: 1, label: 'Founded', value: '2019' },
      { id: 2, label: 'Team', value: '48' },
      { id: 3, label: 'Sites', value: '23' },
    ],
  },
  content: {
    title: 'What you get with Vision Upgrade',
    description:
      'We handle the heavy parts of shipping machine vision: dataset curation, training infrastructure, evaluation harnesses and low-latency inference. You keep focus on the decisions that move your business.',
    link: {
      label: 'Talk to our team',
      href: '/contact',
    },
  },
  values: [
    {
      id: 1,
      icon: 'shield',
      title: 'Accuracy you can audit',
      description:
        'Every prediction ships with a confidence score and a full audit trail, so teams can verify outcomes before they act on them.',
    },
    {
      id: 2,
      icon: 'zap',
      title: 'Built for production',
      description:
        'Edge and cloud runtimes are tuned for real-time throughput, with graceful degradation when the network drops.',
    },
    {
      id: 3,
      icon: 'cpu',
      title: 'Privacy by default',
      description:
        'Data stays inside your perimeter, and retention, residency and access policies are configurable per workspace.',
    },
    {
      id: 4,
      icon: 'layers',
      title: 'Grows with your use cases',
      description:
        'Start with a single camera feed and expand to multi-site deployments without rewriting a line of pipeline code.',
    },
  ],
};
