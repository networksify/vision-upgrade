import { BookOpenIcon, UserRoundIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';
import { formatRelativeTime } from '@/lib/format';
import type { ActivityEntry } from '@/types/dashboard';

type ActivityFeedProps = {
  title: string;
  description: string;
  entries: ActivityEntry[];
  emptyTitle: string;
  emptyDescription: string;
  loading?: boolean;
};

/**
 * Reusable activity list.
 *
 * The entries are derived from the records the service layer returns, so the
 * feed always reflects what is actually in the catalogue rather than a
 * hardcoded story.
 */
export function ActivityFeed({
  title,
  description,
  entries,
  emptyTitle,
  emptyDescription,
  loading = false,
}: ActivityFeedProps) {
  return (
    <Card className="gap-0 border-line bg-white">
      <CardHeader>
        <CardTitle className="text-base text-navy">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <ul className="flex flex-col gap-4">
            {[0, 1, 2, 3].map((row) => (
              <li key={row} className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </li>
            ))}
          </ul>
        ) : entries.length === 0 ? (
          <Empty className="m-0 border-0 p-0 py-6">
            <EmptyHeader>
              <EmptyTitle>{emptyTitle}</EmptyTitle>
              <EmptyDescription>{emptyDescription}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="flex flex-col divide-y divide-line">
            {entries.map((entry) => {
              const Icon = entry.kind === 'course' ? BookOpenIcon : UserRoundIcon;

              return (
                <li key={entry.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface text-navy"
                  >
                    <Icon className="size-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{entry.title}</p>
                    <p className="truncate text-sm text-muted-foreground">{entry.detail}</p>
                  </div>

                  <p className="shrink-0 text-xs whitespace-nowrap text-muted-foreground">
                    {formatRelativeTime(entry.occurredAt)}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
