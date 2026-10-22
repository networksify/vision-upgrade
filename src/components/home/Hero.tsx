import Image from 'next/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import type { HeroProps } from '@/types/types';

export const Hero = ({
  brand,
  eyebrow,
  title,
  titleAccent,
  description,
  primaryCta,
  secondaryCta,
  visual,
  pillars,
}: HeroProps) => (
  <section
    id="home"
    className="relative overflow-hidden bg-navy text-white"
    aria-labelledby="hero-title"
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        maskImage:
          'radial-gradient(ellipse 90% 70% at 50% 30%, black 35%, transparent 78%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 90% 70% at 50% 30%, black 35%, transparent 78%)',
      }}
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-brand/20 blur-[120px]"
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-deep/20 blur-[120px]"
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-navy-deep to-transparent"
    />

    <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-brand shadow-[0_0_12px_2px_rgba(255,121,0,0.8)]"
              />
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="mt-7 text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.75rem]"
            >
              {title}{' '}
              <span className="bg-linear-to-r from-brand to-brand-deep bg-clip-text text-transparent">
                {titleAccent}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href={primaryCta.href}
                variant="primary"
                size="lg"
                icon="arrowRight"
              >
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={secondaryCta.href}
                variant="onDark"
                size="lg"
                iconPosition="left"
                icon="arrowRight"
              >
                {secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-6">
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-brand/25 via-transparent to-brand-deep/20 blur-2xl"
            />

            <div className="relative rounded-[1.75rem] border border-white/12 bg-navy-soft/60 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <Image
                    src={brand.mark}
                    alt=""
                    width={614}
                    height={464}
                    sizes="42px"
                    className="h-8 w-auto"
                  />
                  <div>
                    <p className="text-sm font-bold text-white">{visual.title}</p>
                    <p className="text-xs text-white/70">{visual.status}</p>
                  </div>
                </div>
                <span className="hidden items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-brand sm:inline-flex">
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full bg-brand"
                  />
                  Live
                </span>
              </div>

              <ul className="mt-6 space-y-5">
                {visual.rows.map((row) => (
                  <li key={row.id}>
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand/25 to-brand-deep/20 text-brand">
                        <Icon name={row.icon} className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="truncate text-sm font-bold text-white sm:text-base">
                            {row.label}
                          </p>
                          <p className="hidden text-xs text-white/70 sm:block">
                            {row.caption}
                          </p>
                        </div>
                        <div
                          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
                          role="presentation"
                        >
                          <span
                            className="block h-full rounded-full bg-linear-to-r from-brand to-brand-deep"
                            style={{ width: `${row.fill}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute -bottom-7 -left-3 flex items-center gap-3 rounded-2xl border border-white/12 bg-navy-deep/90 px-4 py-3 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:-left-8 sm:px-5 sm:py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-brand to-brand-warm text-navy">
                <Icon name={visual.badge.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/70">
                  {visual.badge.label}
                </p>
                <p className="text-sm font-bold text-white">{visual.badge.value}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <ul className="mt-20 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3 lg:mt-24">
          {pillars.map((pillar) => (
            <li key={pillar.id} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-brand">
                <Icon name={pillar.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-bold text-white">{pillar.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  {pillar.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);
