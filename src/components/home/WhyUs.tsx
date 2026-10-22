import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { WhyUsProps } from '@/types/types';

export const WhyUs = ({ eyebrow, title, description, items }: WhyUsProps) => (
  <section
    id="why-us"
    className="scroll-mt-24 border-y border-line bg-surface py-20 sm:py-24 lg:py-28"
    aria-labelledby="why-us-title"
  >
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
      <Reveal>
        <div id="why-us-title">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
          />
        </div>
      </Reveal>

      <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="lg:border-l lg:border-line lg:px-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <Reveal delay={index * 80}>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-ink shadow-[0_8px_20px_-14px_rgba(23,20,71,0.6)] ring-1 ring-line">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <p className="mt-6 text-lg font-black text-navy">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
