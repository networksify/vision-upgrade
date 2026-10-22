import type { BrandAssets } from '@/types/types';

/**
 * Brand assets are derived from the supplied logo artwork by
 * `scripts/generate-logo-assets.mjs` — they are never recreated in CSS.
 *
 * Shared by the public website and the internal dashboard so both point at the
 * same files.
 */
export const Brand: BrandAssets = {
  name: 'Vision Upgrade',
  mark: '/logo-mark.png',
  wordmark: '/logo-wordmark.png',
  wordmarkLight: '/logo-wordmark-light.png',
  full: '/logo-full.png',
};
