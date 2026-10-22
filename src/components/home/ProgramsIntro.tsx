import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ProgramsIntroProps } from '@/types/types';

export const ProgramsIntro = ({
  eyebrow,
  title,
  description,
  items,
}: ProgramsIntroProps) => (
  <section
    id="programs"
    className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28"
    aria-labelledby="programs-title"
  >
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div id="programs-title">
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-6">
          <ol className="divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`/${item.href}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 transition-colors duration-300 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6 sm:px-3"
                >
                  <span className="text-sm font-black text-brand-ink sm:text-base">
                    {item.index}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2.5">
                      <Icon
                        name={item.icon}
                        className="h-4 w-4 shrink-0 text-brand-ink"
                      />
                      <span className="text-lg font-black text-navy transition-colors duration-300 group-hover:text-brand-ink sm:text-xl">
                        {item.title}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                  <Icon
                    name="arrowRight"
                    className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-ink"
                  />
                </a>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </div>
  </section>
);
