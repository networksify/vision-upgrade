import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/language-context';

export const metadata: Metadata = {
  title: {
    default: 'Vision Upgrade — Technology, Education & Digital Growth',
    template: '%s | Vision Upgrade',
  },
  description:
    'Vision Upgrade (VUSoft) works across three areas: VU Kids learning programs for young learners, our own software and technology solutions, and digital marketing that helps brands grow online.',
  keywords: [
    'Vision Upgrade',
    'VUSoft',
    'VU Kids',
    'software development',
    'technology solutions',
    'digital marketing',
    'education programs',
  ],
  openGraph: {
    title: 'Vision Upgrade — Technology, Education & Digital Growth',
    description:
      'Three connected practices: VU Kids learning programs, Vision Upgrade software and technology solutions, and digital marketing.',
    type: 'website',
    siteName: 'Vision Upgrade',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
