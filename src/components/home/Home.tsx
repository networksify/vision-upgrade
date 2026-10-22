import { ButtonLink } from '@/components/ui/ButtonLink';
import { HeroPreview } from '@/components/ui/HeroPreview';
import type { HeroProps } from '@/types/types';

export const Home = ({
  badge,
  badgeActive,
  title,
  titleAccent,
  description,
  primaryCta,
  secondaryCta,
  stats,
  visual,
}: HeroProps) => {
  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute top-24 right-0 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-12 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 shadow-sm">
            {badgeActive ? (
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            ) : null}
            {badge}
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title} <span className="text-blue-700">{titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink cta={primaryCta} />
            <ButtonLink cta={secondaryCta} variant="secondary" />
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id}>
                <dt className="order-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {stat.label}
                </dt>
                <dd className="order-1 text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroPreview visual={visual} />
      </div>
    </section>
  );
};
