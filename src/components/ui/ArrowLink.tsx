import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/types/types';

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  icon?: IconName;
  tone?: 'brand' | 'navy' | 'light';
  className?: string;
};

const tones = {
  brand: 'text-brand-ink hover:text-brand',
  navy: 'text-navy hover:text-brand-ink',
  light: 'text-white/80 hover:text-white',
};

export const ArrowLink = ({
  href,
  children,
  icon = 'arrowRight',
  tone = 'brand',
  className = '',
}: ArrowLinkProps) => (
  <Link
    href={href}
    className={`group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${tones[tone]} ${className}`}
  >
    {children}
    <Icon
      name={icon}
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
    />
  </Link>
);
