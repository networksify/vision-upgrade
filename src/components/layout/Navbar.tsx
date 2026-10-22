'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Icon } from '@/components/ui/Icon';
import type { NavbarProps } from '@/types/types';

const anchorId = (href: string) => {
  const hash = href.includes('#') ? href.split('#')[1] : '';
  return hash;
};

export const Navbar = ({ brand, links, cta }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  const sectionIds = useMemo(
    () => links.map((link) => anchorId(link.href)).filter(Boolean),
    [links],
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const offset = 140;
      let current = '';
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      });
      setActiveId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'border-line shadow-[0_10px_30px_-24px_rgba(23,20,71,0.6)]' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-12">
        <Logo brand={brand} priority />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {links.map((link) => {
              const id = anchorId(link.href);
              const isActive = id !== '' && id === activeId;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block py-1 text-[0.9375rem] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 ${
                      isActive ? 'text-navy' : 'text-muted-foreground hover:text-navy'
                    }`}
                  >
                    {link.title}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-linear-to-r from-brand to-brand-deep transition-all duration-300 ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={cta.href}
            className="hidden rounded-full bg-linear-to-r from-brand to-brand-warm px-5 py-2.5 text-sm font-bold text-navy shadow-[0_12px_26px_-14px_rgba(240,43,22,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-14px_rgba(240,43,22,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:inline-flex"
          >
            {cta.label}
          </Link>

          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-navy transition hover:border-brand hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 lg:hidden"
          >
            {isOpen ? (
              <Icon name="plus" className="h-5 w-5 rotate-45" />
            ) : (
              <Icon name="menu" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile"
        className={`overflow-hidden border-t border-line bg-white transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                onClick={close}
                tabIndex={isOpen ? 0 : -1}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-navy transition hover:bg-brand-tint hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {link.title}
                <Icon name="arrowRight" className="h-4 w-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href={cta.href}
              onClick={close}
              tabIndex={isOpen ? 0 : -1}
              className="flex items-center justify-center rounded-xl bg-linear-to-r from-brand to-brand-warm px-5 py-3 text-base font-bold text-navy transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              {cta.label}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
