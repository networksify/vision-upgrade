import { ButtonLink } from '@/components/ui/ButtonLink';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ServicesProps } from '@/types/types';

export const ServicesSection = ({
  eyebrow,
  title,
  description,
  items,
  cta,
}: ServicesProps) => {
  return (
    <section id="services" className="scroll-mt-24 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                Learn more
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{cta.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {cta.description}
            </p>
          </div>
          <ButtonLink cta={cta.link} className="shrink-0" />
        </div>
      </div>
    </section>
  );
};
