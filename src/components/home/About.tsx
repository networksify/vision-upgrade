import { ArrowLink } from '@/components/ui/ArrowLink';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { AboutProps } from '@/types/types';

export const About = ({
  eyebrow,
  title,
  description,
  card,
  content,
  values,
}: AboutProps) => {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-blue-100 to-indigo-100 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 p-8 text-white shadow-2xl shadow-blue-900/20 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
                {card.eyebrow}
              </p>
              <blockquote className="mt-4 text-xl font-bold leading-snug sm:text-2xl">
                {card.quote}
              </blockquote>
              <p className="mt-4 text-sm leading-relaxed text-blue-50/90">
                {card.body}
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
                {card.stats.map((stat) => (
                  <div key={stat.id}>
                    <dd className="text-2xl font-bold">{stat.value}</dd>
                    <dt className="text-xs font-medium uppercase tracking-wide text-blue-50/80">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {content.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {content.description}
            </p>

            <ul className="mt-8 space-y-5">
              {values.map((value) => (
                <li key={value.id} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon name={value.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900">{value.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {value.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <ArrowLink cta={content.link} className="mt-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
