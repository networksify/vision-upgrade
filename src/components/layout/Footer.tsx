import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Icon } from '@/components/ui/Icon';
import type { FooterProps } from '@/types/types';

export const Footer = ({
  brand,
  name,
  description,
  columns,
  socials,
  copyright,
  legal,
}: FooterProps) => {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand via-brand to-brand-deep"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo brand={brand} variant="light" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              {description}
            </p>

            {socials.length > 0 ? (
              <ul className="mt-7 flex items-center gap-3">
                {socials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition duration-300 hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                    >
                      <Icon name={social.icon} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {columns.map((column) => (
              <div key={column.id}>
                <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
                  {column.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.id}-${link.id}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:text-base"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>{copyright}</p>

          {legal.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-5">
              {legal.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-brand"
            />
            {name}
          </p>
        </div>
      </div>
    </footer>
  );
};
