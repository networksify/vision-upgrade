import Link from 'next/link';
import type { CallToAction } from '@/types/types';

const variants = {
  primary:
    'bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700',
  secondary:
    'border border-slate-300 bg-white text-slate-700 transition hover:border-slate-400 hover:bg-slate-50',
  plain: 'text-blue-700 transition hover:text-blue-800',
};

const sizes = {
  md: 'rounded-xl px-6 py-3 text-sm',
  lg: 'rounded-xl px-6 py-3',
};

type ButtonLinkProps = {
  cta: CallToAction;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export const ButtonLink = ({
  cta,
  variant = 'primary',
  size = 'lg',
  className = '',
}: ButtonLinkProps) => (
  <Link
    href={cta.href}
    className={`inline-flex items-center justify-center font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${variants[variant]} ${sizes[size]} ${className}`}
  >
    {cta.label}
  </Link>
);
