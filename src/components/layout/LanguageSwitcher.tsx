'use client';

import { useLanguage } from '@/lib/i18n/language-context';
import { getTranslation } from '@/lib/i18n/translations';

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();
  const t = getTranslation(language);

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center justify-center rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-brand hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      {t.language.switch}
    </button>
  );
}
