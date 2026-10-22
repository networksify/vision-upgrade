import Link from 'next/link';
import type { CallToAction } from '@/types/types';

type ArrowLinkProps = {
  cta: CallToAction;
  className?: string;
};

export const ArrowLink = ({ cta, className = '' }: ArrowLinkProps) => (
  <Link
    href={cta.href}
    className={`inline-flex items-center gap-2 font-semibold text-blue-700 transition hover:gap-3 hover:text-blue-800 ${className}`}
  >
    {cta.label}
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  </Link>
);
