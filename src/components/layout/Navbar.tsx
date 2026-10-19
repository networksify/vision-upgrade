'use client';

import { useState } from 'react';
import { NavbarLinks } from '@/data/mock/navbar';
import Link from 'next/link';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-12">
      <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-2xl font-bold text-white sm:h-12 sm:w-12 sm:text-3xl">
          V
        </span>
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl lg:text-2xl">
          Vision Upgrade
        </h1>
      </Link>

      <nav className="hidden md:block">
        <ul className="flex items-center gap-5 lg:gap-7">
          {NavbarLinks.map((link) => (
            <li
              key={link.id}
              className="text-sm font-bold text-slate-600 transition hover:text-blue-700 lg:text-base"
            >
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/contact"
          className="hidden rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 sm:inline-flex"
        >
          Get in Touch
        </Link>

        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <nav
        aria-hidden={!isOpen}
        className={`absolute left-0 top-full z-50 w-full border-t border-slate-200 bg-white p-4 shadow-lg transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-2">
          {NavbarLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                tabIndex={isOpen ? 0 : -1}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 font-medium text-slate-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {link.title}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/contact"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Get in Touch
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
