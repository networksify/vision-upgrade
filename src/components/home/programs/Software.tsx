import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { ProgramCopy } from '@/components/home/programs/ProgramCopy';
import type { ProgramProps } from '@/types/types';

export const Software = ({
  id,
  eyebrow,
  title,
  description,
  icon,
  features,
  cta,
  visual,
}: ProgramProps) => (
  <section
    id={id}
    className="relative scroll-mt-24 overflow-hidden bg-navy py-20 text-white sm:py-24 lg:py-32"
    aria-labelledby={`${id}-title`}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '68px 68px',
        maskImage:
          'radial-gradient(ellipse 80% 80% at 70% 40%, black 20%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 80% at 70% 40%, black 20%, transparent 75%)',
      }}
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-deep/25 blur-[120px]"
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-brand/20 blur-[120px]"
    />

    <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <ProgramCopy
          eyebrow={eyebrow}
          title={title}
          description={description}
          icon={icon}
          features={features}
          cta={cta}
          tone="dark"
          headingId={`${id}-title`}
        />

        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-[1.75rem] border border-white/12 bg-navy-soft/70 p-6 shadow-[0_50px_90px_-50px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-8">
              <div className="flex items-center gap-2 border-b border-white/10 pb-5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand" />
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-white/25"
                />
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-white/25"
                />
                <p className="ml-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  {visual.label}
                </p>
              </div>

              <p className="mt-6 text-2xl font-black leading-tight text-white">
                {visual.headline}
              </p>

              <ul className="mt-7 space-y-3">
                {visual.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-brand/40 hover:bg-white/10"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="truncate text-sm text-white/70">
                        {item.caption}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-navy-deep/80 p-5 font-mono text-[11px] leading-relaxed text-white/70 sm:text-xs">
                <p>
                  <span className="text-brand">const</span> vision ={' '}
                  <span className="text-white/75">upgrade</span>({'{'}
                </p>
                <p className="pl-4">
                  learn: <span className="text-white/75">&apos;practice&apos;</span>,
                </p>
                <p className="pl-4">
                  build: <span className="text-white/75">&apos;production&apos;</span>,
                </p>
                <p className="pl-4">
                  grow: <span className="text-white/75">&apos;measurable&apos;</span>,
                </p>
                <p>{'}'});</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 flex items-center gap-2.5 rounded-full border border-white/12 bg-navy-deep/90 px-4 py-2.5 backdrop-blur-xl sm:-left-8">
              <Icon name="code" className="h-4 w-4 text-brand" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                Engineered in-house
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
