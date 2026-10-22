import Link from 'next/link';
import type { FooterProps } from '@/types/types';

export const Footer = ({
  initial,
  name,
  description,
  columns,
  copyright,
  tagline,
}: FooterProps) => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-xl font-bold text-white">
                {initial}
              </span>
              <span className="text-lg font-bold text-white">{name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {description}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.id}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {copyright}</p>
          <p>{tagline}</p>
        </div>
      </div>
    </footer>
  );
};
