import { ButtonLink } from '@/components/ui/ButtonLink';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import type { CallToAction, IconName, ProgramFeature } from '@/types/types';

type ProgramCopyProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: IconName;
  features: ProgramFeature[];
  cta: CallToAction;
  tone: 'light' | 'dark';
  headingId?: string;
};

const tones = {
  light: {
    eyebrow: 'text-brand-ink',
    title: 'text-navy',
    body: 'text-muted-foreground',
    featureTitle: 'text-navy',
    featureBody: 'text-muted-foreground',
    iconBox: 'border-brand/25 bg-brand-tint text-brand-ink',
    checkBox: 'bg-brand-tint text-brand-ink',
    cta: 'primary' as const,
  },
  dark: {
    eyebrow: 'text-brand',
    title: 'text-white',
    body: 'text-white/65',
    featureTitle: 'text-white',
    featureBody: 'text-white/70',
    iconBox: 'border-white/15 bg-white/5 text-brand',
    checkBox: 'bg-white/10 text-brand',
    cta: 'primary' as const,
  },
};

export const ProgramCopy = ({
  eyebrow,
  title,
  description,
  icon,
  features,
  cta,
  tone,
  headingId,
}: ProgramCopyProps) => {
  const palette = tones[tone];

  return (
    <div>
      <Reveal>
        <p
          className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${palette.eyebrow}`}
        >
          <span
            aria-hidden="true"
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${palette.iconBox}`}
          >
            <Icon name={icon} className="h-4 w-4" />
          </span>
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={60}>
        <h2
          id={headingId}
          className={`mt-6 text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem] ${palette.title}`}
        >
          {title}
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${palette.body}`}>
          {description}
        </p>
      </Reveal>

      <ul className="mt-9 space-y-5">
        {features.map((feature, index) => (
          <li key={feature.id}>
            <Reveal delay={140 + index * 70}>
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${palette.checkBox}`}
                >
                  <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <div>
                  <p className={`font-bold ${palette.featureTitle}`}>{feature.title}</p>
                  <p className={`mt-1 text-sm leading-relaxed ${palette.featureBody}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={200}>
        <div className="mt-10">
          <ButtonLink href={cta.href} variant={palette.cta} size="lg" icon="arrowRight">
            {cta.label}
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
};
