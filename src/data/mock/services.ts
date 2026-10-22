import type { ServicesProps } from '@/types/types';

export const ServicesSection: ServicesProps = {
  eyebrow: 'Services',
  title: 'Everything you need to put vision into production',
  description:
    'Pick a starting point or combine the modules. Each one ships with the tooling, documentation and support to go live on your own infrastructure.',
  items: [
    {
      id: 1,
      icon: 'scan',
      title: 'Vision Analytics',
      description:
        'Turn live camera feeds into structured insights with object detection, tracking and automatic event tagging.',
    },
    {
      id: 2,
      icon: 'cpu',
      title: 'Custom Model Training',
      description:
        'Fine-tune pre-trained models on your own imagery and ship them to production in days, not quarters.',
    },
    {
      id: 3,
      icon: 'shield',
      title: 'Quality Inspection',
      description:
        'Catch defects on the line with sub-second inference, calibrated thresholds and instant operator feedback.',
    },
    {
      id: 4,
      icon: 'zap',
      title: 'Workflow Automation',
      description:
        'Connect detections to the tools you already use and automate the repetitive steps in between.',
    },
    {
      id: 5,
      icon: 'chart',
      title: 'Operational Dashboards',
      description:
        'Monitor uptime, throughput and accuracy across sites from a single real-time control surface.',
    },
    {
      id: 6,
      icon: 'layers',
      title: 'Platform Integration',
      description:
        'Expose a clean REST and event API, plus SDKs, so the platform drops straight into your architecture.',
    },
  ],
  cta: {
    title: 'Not sure which module fits?',
    description:
      'Describe your use case and we will map it to a deployment plan, timeline and budget.',
    link: {
      label: 'Request a demo',
      href: '/contact',
    },
  },
};
