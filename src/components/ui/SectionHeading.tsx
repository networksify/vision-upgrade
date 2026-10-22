import type { SectionHeadingProps } from '@/types/types';

const tones = {
  light: {
    eyebrow: 'text-brand-ink',
    title: 'text-navy',
    description: 'text-muted-foreground',
    rule: 'bg-brand',
  },
  dark: {
    eyebrow: 'text-brand',
    title: 'text-white',
    description: 'text-white/70',
    rule: 'bg-brand',
  },
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  id,
}: SectionHeadingProps) => {
  const palette = tones[tone];
  const centered = align === 'center';

  return (
    <div
      id={id}
      className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}
    >
      <p
        className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${palette.eyebrow} ${
          centered ? 'justify-center' : ''
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-px w-8 shrink-0 ${palette.rule}`}
        />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem] ${palette.title}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${palette.description}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
};
