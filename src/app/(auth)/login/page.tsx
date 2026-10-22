import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpenIcon, MessagesSquareIcon, UsersIcon } from 'lucide-react';

import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/ui/Logo';
import { Brand } from '@/data/brand';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to the Vision Upgrade internal dashboard.',
};

/** What the dashboard holds. Deliberately plain: no invented metrics. */
const DASHBOARD_SECTIONS = [
  {
    icon: UsersIcon,
    title: 'Administrator accounts',
    description: 'Invite colleagues, adjust roles and switch access on and off.',
  },
  {
    icon: BookOpenIcon,
    title: 'Course catalogue',
    description: 'Prepare drafts and publish the courses VU Kids and clients rely on.',
  },
  {
    icon: MessagesSquareIcon,
    title: 'Company chat',
    description: 'Keep day to day conversations in one place with the rest of the team.',
  },
];

// Solve render problem - Value can be change and make some issues in application
const year = new Date().getFullYear();

export default function LoginPage() {
  return (
    <main
      data-slot="vu-auth-shell"
      className="grid min-h-svh lg:grid-cols-[1.05fr_1fr]"
    >
      {/* Brand panel — hidden on small screens, where the compact bar below takes over. */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-navy px-12 py-14 lg:flex">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-brand/15 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-brand-deep/15 blur-2xl"
        />

        <div className="relative">
          <Logo
            brand={Brand}
            variant="light"
            asLink={false}
            priority
            markClassName="h-10 w-auto"
            wordmarkClassName="h-5 w-auto"
          />
        </div>

        <div className="relative max-w-lg">
          <h1 className="text-4xl leading-tight font-bold text-white">
            The internal workspace for Vision Upgrade.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Manage administrator accounts, publish courses and talk to the team — all from one
            place.
          </p>

          <ul className="mt-10 flex flex-col gap-5">
            {DASHBOARD_SECTIONS.map((section) => (
              <li key={section.title} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <section.icon className="size-4.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{section.title}</span>
                  <span className="mt-0.5 block text-sm text-white/60">{section.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/45">
          © {year} Vision Upgrade. Internal use only.
        </p>
      </section>

      {/* Form column */}
      <section className="flex flex-col bg-white">
        <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:hidden">
          <Logo
            brand={Brand}
            asLink={false}
            markClassName="h-8 w-auto"
            wordmarkClassName="h-4 w-auto"
          />
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-navy hover:underline"
          >
            Back to the website
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-sm">
            <div className="mb-8 hidden lg:block">
              <Logo
                brand={Brand}
                asLink={false}
                markClassName="h-8 w-auto"
                wordmarkClassName="h-4 w-auto"
              />
            </div>

            <LoginForm />
          </div>
        </div>

        <div className="px-5 pb-8 text-center sm:px-8 lg:px-12">
          <Link
            href="/"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-navy hover:underline"
          >
            Back to the Vision Upgrade website
          </Link>
        </div>
      </section>
    </main>
  );
}
