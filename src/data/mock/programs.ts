import type { ProgramProps, ProgramsIntroProps } from '@/types/types';

/**
 * The three business areas of Vision Upgrade.
 *
 * Copy is deliberately general: no specific courses, product names, client
 * names or metrics are claimed. Each `cta.href` points at the existing
 * `/contact` route and can be swapped for a dedicated program page later.
 */
export const ProgramsIntroSection: ProgramsIntroProps = {
  eyebrow: 'Our Programs',
  title: 'Three practices. One standard of quality.',
  description:
    'Each area of Vision Upgrade has its own team, its own craft and its own visual identity — but they share the same commitment to practical, measurable work.',
  items: [
    {
      id: 1,
      index: '01',
      icon: 'cap',
      title: 'VU Kids',
      description: 'Educational courses and learning programs for kids.',
      href: '#vu-kids',
    },
    {
      id: 2,
      index: '02',
      icon: 'code',
      title: 'Vision Upgrade',
      description: 'Our own software products, technology solutions and innovation.',
      href: '#vision-upgrade',
    },
    {
      id: 3,
      index: '03',
      icon: 'megaphone',
      title: 'Digital Marketing',
      description: 'Social media, content, branding and online growth.',
      href: '#digital-marketing',
    },
  ],
};

export const VuKidsSection: ProgramProps = {
  id: 'vu-kids',
  eyebrow: 'Program 01 · Education',
  title: 'VU Kids',
  description:
    'VU Kids is our education arm: learning programs built for children who are curious about how things work. Young learners meet technology through guided, hands-on activities rather than passive theory, so confidence grows alongside understanding.',
  icon: 'cap',
  features: [
    {
      id: 1,
      title: 'Age-aware curriculum',
      description:
        'Content is grouped by age band so every session stays challenging without ever losing the fun.',
    },
    {
      id: 2,
      title: 'Learning by doing',
      description:
        'Children build, test and improve real things instead of memorising instructions on a screen.',
    },
    {
      id: 3,
      title: 'Creative and friendly',
      description:
        'Colourful, encouraging sessions designed to keep young participants curious and engaged.',
    },
  ],
  cta: { label: 'Explore VU Kids', href: '/contact' },
  visual: {
    label: 'Learning path',
    headline: 'Curiosity first, skills second',
    items: [
      { id: 1, icon: 'blocks', title: 'Explore', caption: 'Play and discovery' },
      { id: 2, icon: 'spark', title: 'Create', caption: 'Building with tools' },
      { id: 3, icon: 'target', title: 'Share', caption: 'Presenting the result' },
    ],
  },
};

export const SoftwareSection: ProgramProps = {
  id: 'vision-upgrade',
  eyebrow: 'Program 02 · Software & Technology',
  title: 'Vision Upgrade',
  description:
    'Vision Upgrade is our own technology practice: the software we build, the solutions we engineer and the digital innovation we keep shipping. Everything is designed to be usable, maintainable and ready for real-world load.',
  icon: 'code',
  features: [
    {
      id: 1,
      title: 'Products we own',
      description:
        'Software we design, build and maintain ourselves — shaped by real requirements, not assumptions.',
    },
    {
      id: 2,
      title: 'Technology solutions',
      description:
        'Web platforms, integrations and internal tools built to fit the way an organisation actually works.',
    },
    {
      id: 3,
      title: 'Continuous improvement',
      description:
        'Regular releases, performance work and security hygiene keep every product dependable over time.',
    },
  ],
  cta: { label: 'Explore Our Solutions', href: '/contact' },
  visual: {
    label: 'Build stack',
    headline: 'Engineering that ships',
    items: [
      { id: 1, icon: 'cpu', title: 'Products', caption: 'Our own software' },
      { id: 2, icon: 'layers', title: 'Platforms', caption: 'Web and integrations' },
      { id: 3, icon: 'cloud', title: 'Delivery', caption: 'Hosting and operations' },
    ],
  },
};

export const DigitalMarketingSection: ProgramProps = {
  id: 'digital-marketing',
  eyebrow: 'Program 03 · Digital Marketing',
  title: 'Digital Marketing',
  description:
    'Our marketing practice helps brands show up, look credible and grow online. We combine social media management, content creation, branding and campaign thinking into one coherent digital presence.',
  icon: 'megaphone',
  features: [
    {
      id: 1,
      title: 'Social media management',
      description:
        'A steady, on-brand presence across the channels your audience actually uses.',
    },
    {
      id: 2,
      title: 'Content and branding',
      description:
        'Visual identity and content that stay recognisable across every channel and format.',
    },
    {
      id: 3,
      title: 'Online growth',
      description:
        'Campaigns planned around outcomes, reviewed and adjusted rather than left to run blind.',
    },
  ],
  cta: { label: 'Grow Your Business', href: '/contact' },
  visual: {
    label: 'Campaign flow',
    headline: 'Attention that converts',
    items: [
      { id: 1, icon: 'cursor', title: 'Target', caption: 'Right audience' },
      { id: 2, icon: 'share', title: 'Distribute', caption: 'Channels and content' },
      { id: 3, icon: 'chart', title: 'Measure', caption: 'Results and learning' },
    ],
  },
};
