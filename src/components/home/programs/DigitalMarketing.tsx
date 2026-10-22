import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { ProgramCopy } from '@/components/home/programs/ProgramCopy';
import type { IconName, ProgramProps } from '@/types/types';

const barHeights = [42, 68, 52, 86, 100];

const channels: { id: number; icon: IconName; label: string }[] = [
  { id: 1, icon: 'instagram', label: 'Social' },
  { id: 2, icon: 'share', label: 'Content' },
  { id: 3, icon: 'cursor', label: 'Campaigns' },
];

export const DigitalMarketing = ({
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
    className="relative scroll-mt-24 overflow-hidden bg-surface py-20 sm:py-24 lg:py-32"
    aria-labelledby={`${id}-title`}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
    />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-16 left-0 h-56 w-56 rounded-full bg-brand-deep/10 blur-3xl"
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
          tone="light"
          headingId={`${id}-title`}
        />

        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-[1.75rem] border border-line bg-white p-7 shadow-[0_40px_70px_-50px_rgba(23,20,71,0.7)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ink">
                    {visual.label}
                  </p>
                  <p className="mt-2 text-2xl font-black leading-tight text-navy">
                    {visual.headline}
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand to-brand-warm text-navy">
                  <Icon name={icon} className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-8 flex h-36 items-end gap-3" aria-hidden="true">
                {barHeights.map((height, index) => (
                  <div key={index} className="flex-1">
                    <div
                      className={`w-full rounded-t-lg ${
                        index === barHeights.length - 1
                          ? 'bg-linear-to-t from-brand-deep to-brand'
                          : 'bg-linear-to-t from-brand/25 to-brand/60'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <div
                aria-hidden="true"
                className="mt-3 flex h-px w-full bg-line"
              />

              <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                {visual.items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-2xl border border-line bg-surface p-4 transition duration-300 hover:border-brand/40 hover:bg-brand-tint/40"
                  >
                    <Icon name={item.icon} className="h-5 w-5 text-brand-ink" />
                    <p className="mt-3 font-bold text-navy">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {item.caption}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute -bottom-7 -left-3 flex items-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 shadow-[0_24px_50px_-28px_rgba(23,20,71,0.7)] sm:-left-8">
              {channels.map((channel) => (
                <span
                  key={channel.id}
                  title={channel.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-navy transition hover:bg-brand-tint hover:text-brand-ink"
                >
                  <Icon name={channel.icon} className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
