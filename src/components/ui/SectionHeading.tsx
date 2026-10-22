import type { SectionHeadingProps } from '@/types/types';

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) => {
  const isCentered = align === 'center';

  return (
    <div className={isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
};
