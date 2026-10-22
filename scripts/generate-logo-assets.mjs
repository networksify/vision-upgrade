// One-off asset generator: derives web-ready logo assets from the source artwork.
// Run with: node scripts/generate-logo-assets.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'public/vision-upgrade-logo.jpg';
const OUT = 'public';

// Source artwork regions, measured from the original file (1536 x 1536).
const REGIONS = {
  mark: { left: 419, top: 324, width: 614, height: 464 },
  wordmark: { left: 106, top: 841, width: 1322, height: 170 },
  full: { left: 106, top: 324, width: 1322, height: 815 },
};

// Navy is the brand navy #171447; a pixel belongs to the navy glyph when blue
// clearly dominates the red and green channels.
const isNavy = (r, g, b) => b - Math.max(r, g) > 6;

const matte = (raw, width, height, channels, { recolorNavyToWhite = false } = {}) => {
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = raw[i * channels];
    const g = raw[i * channels + 1];
    const b = raw[i * channels + 2];
    const o = i * 4;

    if (recolorNavyToWhite && isNavy(r, g, b)) {
      // Coverage of the navy glyph over white, derived from the blue channel.
      const coverage = Math.max(0, Math.min(1, (255 - b) / 184));
      out[o] = 255;
      out[o + 1] = 255;
      out[o + 2] = 255;
      out[o + 3] = Math.round(coverage * 255);
      continue;
    }

    // Standard matte: the artwork sits on pure white, so alpha is the inverse
    // of the darkest channel, and the colour is un-premultiplied afterwards.
    const alpha = 255 - Math.min(r, g, b);

    if (alpha < 6) {
      out[o] = 0;
      out[o + 1] = 0;
      out[o + 2] = 0;
      out[o + 3] = 0;
      continue;
    }

    const k = 255 / alpha;
    out[o] = Math.min(255, Math.round(255 - (255 - r) * k));
    out[o + 1] = Math.min(255, Math.round(255 - (255 - g) * k));
    out[o + 2] = Math.min(255, Math.round(255 - (255 - b) * k));
    out[o + 3] = alpha;
  }

  return out;
};

const build = async (name, region, options) => {
  const { data, info } = await sharp(SRC)
    .extract(region)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const matted = matte(data, info.width, info.height, info.channels, options);

  const target = `${OUT}/${name}.png`;
  await sharp(matted, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(target);

  console.log(`${target}  ${info.width}x${info.height}`);
};

await mkdir(OUT, { recursive: true });

// Mark only - orange/red gradient, for light backgrounds.
await build('logo-mark', REGIONS.mark);
// Wordmark for light backgrounds: VISION in orange-red, UPGRADE in navy.
await build('logo-wordmark', REGIONS.wordmark);
// Wordmark for dark backgrounds: UPGRADE recoloured to white.
await build('logo-wordmark-light', REGIONS.wordmark, { recolorNavyToWhite: true });
// Full vertical lockup (mark + wordmark + tagline), for OG images / footer.
await build('logo-full', REGIONS.full);
