import { FlaskConicalIcon } from 'lucide-react';

/**
 * Banner that labels the demo data.
 *
 * The prototype runs against fabricated records. This notice keeps that
 * obvious on every screen that shows them, so nobody mistakes a demo account
 * or a demo course for a real one.
 */
export function DemoNotice({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-brand/25 bg-brand-tint px-4 py-3">
      <FlaskConicalIcon className="mt-0.5 size-4 shrink-0 text-brand-ink" aria-hidden="true" />
      <p className="text-sm text-navy">
        <span className="font-semibold">Demo data.</span>{' '}
        {children ??
          'Everything below is sample data for the prototype. It does not describe real Vision Upgrade people, courses or conversations.'}
      </p>
    </div>
  );
}
