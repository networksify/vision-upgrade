"use client";

import * as React from 'react';
import { BellIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

/**
 * Notification bell.
 *
 * The prototype has no notification source, so the panel renders an explicit
 * empty state rather than inventing activity. A real implementation would read
 * from a notifications service and keep the same empty state for the case
 * where there is genuinely nothing to show.
 */
export function NotificationsMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="relative" aria-label="Notifications">
          <BellIcon aria-hidden="true" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Notifications</p>
        </div>
        <Empty className="m-0 border-0 py-8">
          <EmptyHeader>
            <EmptyMedia variant="default">
              <BellIcon className="size-5" aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>Nothing needs your attention</EmptyTitle>
            <EmptyDescription>
              You are all caught up. New notifications about courses and accounts will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </PopoverContent>
    </Popover>
  );
}
