"use client";

import Link from "next/link";
import { BookOpenIcon, MessagesSquareIcon, UsersIcon } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/ui/Logo";
import { Brand } from "@/data/brand";
import { useLanguage } from "@/lib/i18n/language-context";
import { authTranslations } from "@/lib/i18n/translations";

export default function LoginPage() {
  const { language } = useLanguage();
  const t = authTranslations[language];
  const year = new Date().getFullYear();
  const icons = [UsersIcon, BookOpenIcon, MessagesSquareIcon];
  
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
            {t.loginPage.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            {t.loginPage.subtitle}
          </p>

          <ul className="mt-10 flex flex-col gap-5">
            {t.loginPage.sections.map((section, idx) => {
              const IconComp = icons[idx];
              return (
                <li key={section.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand">
                    <IconComp className="size-4.5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {section.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-white/60">
                      {section.description}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="relative text-xs text-white/45">
          {t.loginPage.copyright}
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
            {t.loginPage.backToWebsite}
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
            {t.loginPage.backToWebsiteLong}
          </Link>
        </div>
      </section>
    </main>
  );
}
