import Image from 'next/image';
import Link from 'next/link';
import type { BrandAssets } from '@/types/types';

type LogoProps = {
  brand: BrandAssets;
  /** `light` uses the white wordmark variant for dark backgrounds. */
  variant?: 'dark' | 'light';
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  /** `sizes` hints keep Next.js from emitting oversized logo variants. */
  markSizes?: string;
  wordmarkSizes?: string;
  priority?: boolean;
  asLink?: boolean;
};

/**
 * Renders the supplied Vision Upgrade artwork. Both files are crops of the
 * original logo (see `scripts/generate-logo-assets.mjs`) — the mark and the
 * wordmark are sized independently so they stay optically balanced.
 */
export const Logo = ({
  brand,
  variant = 'dark',
  className = '',
  markClassName = 'h-9 w-auto sm:h-10',
  wordmarkClassName = 'h-[18px] w-auto sm:h-5',
  markSizes = '(max-width: 640px) 48px, 53px',
  wordmarkSizes = '(max-width: 640px) 140px, 156px',
  priority = false,
  asLink = true,
}: LogoProps) => {
  const content = (
    <>
      <Image
        src={brand.mark}
        alt={`${brand.name} symbol`}
        width={614}
        height={464}
        sizes={markSizes}
        className={markClassName}
        priority={priority}
      />
      <Image
        src={variant === 'light' ? brand.wordmarkLight : brand.wordmark}
        alt={brand.name}
        width={1322}
        height={170}
        sizes={wordmarkSizes}
        className={wordmarkClassName}
        priority={priority}
      />
    </>
  );

  if (!asLink) {
    return <span className={`flex items-center gap-2.5 ${className}`}>{content}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${brand.name} — home`}
      className={`flex shrink-0 items-center gap-2.5 rounded-sm ${className}`}
    >
      {content}
    </Link>
  );
};
