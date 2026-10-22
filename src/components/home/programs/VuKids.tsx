import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { ProgramCopy } from '@/components/home/programs/ProgramCopy';
import type { ProgramProps } from '@/types/types';

export const VuKids = ({
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
    className="relative scroll-mt-24 overflow-hidden bg-brand-tint/50 py-20 sm:py-24 lg:py-32"
    aria-labelledby={`${id}-title`}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-brand/10"
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 bottom-10 h-52 w-52 rounded-full bg-brand-deep/10"
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-[22%] top-12 hidden h-16 w-16 rotate-[18deg] rounded-2xl bg-brand/10 lg:block"
    />

    <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <ProgramCopy
            eyebrow={eyebrow}
            title={title}
            description={description}
            icon={icon}
            features={features}
            cta={cta}
            tone="light"
            headingId={`${id}-title`}
          />
        </div>

        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-[2rem] border border-brand/15 bg-white p-7 shadow-[0_40px_70px_-45px_rgba(240,43,22,0.65)] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ink">
                {visual.label}
              </p>
              <p className="mt-2 text-2xl font-black leading-tight text-navy">
                {visual.headline}
              </p>

              <ol className="mt-8 space-y-4">
                {visual.items.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl bg-brand-tint/70 p-4 transition duration-300 hover:bg-brand-tint"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-brand-warm text-navy">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-navy">{item.title}</p>
                      <p className="truncate text-sm text-muted-foreground">{item.caption}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="ml-auto text-sm font-black text-brand-ink"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="absolute -right-3 -top-6 flex h-16 w-16 rotate-6 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-brand-warm text-navy shadow-[0_20px_40px_-18px_rgba(240,43,22,0.9)] sm:-right-8">
              <Icon name="cap" className="h-7 w-7" />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
