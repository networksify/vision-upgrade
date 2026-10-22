import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/types/types';

type Variant = 'primary' | 'outline' | 'navy' | 'onDark' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2';

const variants: Record<Variant, string> = {
  // Deep navy label on the orange gradient: white on #ff7900 is only 2.6:1,
  // while navy on the same gradient clears 4.8:1 across the whole ramp.
  primary:
    'bg-linear-to-r from-brand to-brand-warm text-navy shadow-[0_14px_30px_-14px_rgba(240,43,22,0.9)] hover:-translate-y-0.5 hover:shadow-[0_20px_38px_-14px_rgba(240,43,22,0.95)] focus-visible:ring-offset-white',
  outline:
    'border border-navy/15 bg-white text-navy hover:border-brand hover:text-brand-ink focus-visible:ring-offset-white',
  navy: 'bg-navy text-white hover:bg-navy-soft focus-visible:ring-offset-white',
  onDark:
    'border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/10 focus-visible:ring-brand focus-visible:ring-offset-navy',
  ghost:
    'text-navy hover:text-brand-ink focus-visible:ring-offset-white',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  className?: string;
  external?: boolean;
};

export const ButtonLink = ({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  external = false,
}: ButtonLinkProps) => {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const inner = (
    <>
      {icon && iconPosition === 'left' ? (
        <Icon name={icon} className="h-4 w-4" />
      ) : null}
      {children}
      {icon && iconPosition === 'right' ? (
        <Icon
          name={icon}
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
};
