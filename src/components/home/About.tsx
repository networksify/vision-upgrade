import { ArrowLink } from '@/components/ui/ArrowLink';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { AboutProps } from '@/types/types';

export const About = ({
  eyebrow,
  title,
  description,
  body,
  pillars,
  points,
  cta,
}: AboutProps) => (
  <section
    id="about"
    className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-32"
    aria-labelledby="about-title"
  >
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <div id="about-title">
              <SectionHeading
                eyebrow={eyebrow}
                title={title}
                description={description}
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {body}
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {points.map((point, index) => (
              <li key={point.id}>
                <Reveal delay={120 + index * 70}>
                  <span
                    aria-hidden="true"
                    className="block h-0.5 w-10 bg-linear-to-r from-brand to-brand-deep"
                  />
                  <p className="mt-4 font-bold text-navy">{point.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={200}>
            <div className="mt-10">
              <ArrowLink href={cta.href} tone="navy">
                {cta.label}
              </ArrowLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[2.25rem] bg-linear-to-br from-brand/12 to-brand-deep/10 blur-2xl"
            />
            <div className="relative rounded-[1.75rem] border border-line bg-surface p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 rounded-full bg-brand"
                />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  One organisation
                </p>
              </div>
              <p className="mt-3 text-2xl font-black leading-tight text-navy">
                Vision Upgrade
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Three practices, one shared standard.
              </p>

              <ul className="mt-8">
                {pillars.map((pillar, index) => (
                  <li key={pillar.id} className="relative flex gap-5 pb-8 last:pb-0">
                    {index < pillars.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute left-5 top-11 h-[calc(100%-2.5rem)] w-px bg-line"
                      />
                    ) : null}
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-ink">
                      <Icon name={pillar.icon} className="h-5 w-5" />
                    </span>
                    <div className="pt-0.5">
                      <p className="font-bold text-navy">{pillar.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {pillar.caption}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
