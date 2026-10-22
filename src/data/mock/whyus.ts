import type { WhyUsProps } from '@/types/types';

export const WhyUsSection: WhyUsProps = {
  eyebrow: 'Why Choose Us',
  title: 'How we work',
  description:
    'Four principles that shape every program, product and campaign we deliver.',
  items: [
    {
      id: 1,
      icon: 'book',
      title: 'Practical learning',
      description:
        'Concepts are taught by building something real, so knowledge transfers straight into practice.',
    },
    {
      id: 2,
      icon: 'cpu',
      title: 'Technology-driven',
      description:
        'Modern tooling and clean engineering keep the solutions we ship fast, stable and scalable.',
    },
    {
      id: 3,
      icon: 'spark',
      title: 'Creative digital',
      description:
        'Original creative thinking for the content, brands and campaigns we put into the world.',
    },
    {
      id: 4,
      icon: 'trending',
      title: 'Continuous improvement',
      description:
        'Every release, lesson and campaign is reviewed and refined instead of being left to drift.',
    },
  ],
};
