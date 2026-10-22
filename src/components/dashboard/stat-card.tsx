import type { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

type StatCardProps = {
  label: string;
  value: number | string;
  hint: string;
  icon: LucideIcon;
  /** Optional accent for the icon tile. */
  tone?: 'brand' | 'navy';
};

/**
 * Reusable headline figure.
 *
 * The dashboard deliberately shows only counts that come straight from the
 * service layer — no invented trends, no decorative charts.
 */
export function StatCard({ label, value, hint, icon: Icon, tone = 'brand' }: StatCardProps) {
  return (
    <Card className="gap-0 border-line bg-white py-5">
      <CardContent className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-navy">{value}</p>
          <p className="mt-1.5 text-sm text-muted-foreground">{hint}</p>
        </div>

        <span
          aria-hidden="true"
          className={
            tone === 'brand'
              ? 'flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand'
              : 'flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy/8 text-navy'
          }
        >
          <Icon className="size-5" />
        </span>
      </CardContent>
    </Card>
  );
}
