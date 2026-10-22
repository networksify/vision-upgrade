import type { AboutProps } from '@/types/types';

export const AboutSection: AboutProps = {
  eyebrow: 'About Vision Upgrade',
  title: 'Where education, technology and marketing meet.',
  description:
    'Vision Upgrade was built on a simple idea: the same curiosity that drives a child to take something apart is what drives a good engineer or a sharp campaign.',
  body:
    'The three parts of the company feed each other. What our learning programs teach young people about how technology works shows up in how we build software. What we learn about attention and storytelling in marketing shapes how that software is presented to the people who use it. Keeping all three in one company means the feedback loop is short and the quality bar is shared.',
  pillars: [
    {
      id: 1,
      icon: 'cap',
      label: 'Education',
      caption: 'Learning that starts with doing',
    },
    {
      id: 2,
      icon: 'code',
      label: 'Technology',
      caption: 'Software we build and maintain',
    },
    {
      id: 3,
      icon: 'megaphone',
      label: 'Marketing',
      caption: 'Clear, creative, measurable',
    },
  ],
  points: [
    {
      id: 1,
      title: 'One company, three perspectives',
      description:
        'Educators, engineers and marketers sit in the same organisation and plan together.',
    },
    {
      id: 2,
      title: 'Built for real use',
      description:
        'Everything we teach, build or campaign is designed to work beyond a demo.',
    },
    {
      id: 3,
      title: 'Open about what is next',
      description:
        'Programmes and products are shaped with the people who use them.',
    },
  ],
  cta: { label: 'Talk to Vision Upgrade', href: '/#contact' },
};
