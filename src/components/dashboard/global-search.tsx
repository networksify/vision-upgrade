"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { BookOpenIcon, SearchIcon, UserRoundIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { useServices } from '@/lib/providers/service-context';

const SEARCH_DEBOUNCE_MS = 250;

type SearchHit = {
  id: string;
  kind: 'course' | 'account';
  title: string;
  meta: string;
  href: string;
};

/**
 * Header search across the two lists the dashboard owns.
 *
 * The component only talks to the service layer, so the same UI works against
 * the mock providers today and against a search endpoint later.
 */
export function GlobalSearch() {
  const { courses, administrators } = useServices();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [term, setTerm] = React.useState('');
  const [hits, setHits] = React.useState<SearchHit[]>([]);
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  React.useEffect(() => {
    const query = term.trim();

    if (query.length < 2) {
      setHits([]);
      setStatus('idle');
      return;
    }

    let active = true;
    setStatus('loading');

    const timer = setTimeout(() => {
      void Promise.all([
        courses.list({ search: query }),
        administrators.list({ search: query, pageSize: 5 }),
      ])
        .then(([courseResult, administratorResult]) => {
          if (!active) return;

          if (!courseResult.ok || !administratorResult.ok) {
            setStatus('error');
            return;
          }

          const courseHits: SearchHit[] = courseResult.data.items.slice(0, 5).map((course) => ({
            id: course.id,
            kind: 'course',
            title: course.title,
            meta: course.status === 'published' ? 'Published course' : 'Draft course',
            href: `/dashboard/courses?q=${encodeURIComponent(course.title)}`,
          }));

          const accountHits: SearchHit[] = administratorResult.data.items.map((account) => ({
            id: account.id,
            kind: 'account',
            title: account.name,
            meta: `@${account.username}`,
            href: `/dashboard/accounts?q=${encodeURIComponent(account.username)}`,
          }));

          setHits([...courseHits, ...accountHits]);
          setStatus('ready');
        })
        .catch(() => {
          if (active) setStatus('error');
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [term, courses, administrators]);

  const goTo = (href: string) => {
    setOpen(false);
    setTerm('');
    router.push(href);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hidden h-8 w-56 justify-start gap-2 text-muted-foreground lg:inline-flex"
        >
          <SearchIcon className="size-4" aria-hidden="true" />
          <span className="font-normal">Search…</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b p-3">
          <label htmlFor="dashboard-global-search" className="sr-only">
            Search courses and admin accounts
          </label>
          <div className="relative">
            <SearchIcon
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="dashboard-global-search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search courses and accounts…"
              className="pl-8"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {status === 'loading' ? (
            <div className="flex items-center gap-2 px-2 py-6 text-sm text-muted-foreground">
              <Spinner className="size-4" />
              Searching…
            </div>
          ) : null}

          {status === 'error' ? (
            <p className="px-2 py-6 text-center text-sm text-destructive">
              Search is unavailable right now. Try again in a moment.
            </p>
          ) : null}

          {status === 'idle' ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              Type at least two characters to search.
            </p>
          ) : null}

          {status === 'ready' && hits.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              No courses or accounts match “{term.trim()}”.
            </p>
          ) : null}

          {status === 'ready' && hits.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {hits.map((hit) => (
                <li key={`${hit.kind}-${hit.id}`}>
                  <button
                    type="button"
                    onClick={() => goTo(hit.href)}
                    className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-accent focus-visible:bg-accent"
                  >
                    {hit.kind === 'course' ? (
                      <BookOpenIcon className="size-4 text-muted-foreground" aria-hidden="true" />
                    ) : (
                      <UserRoundIcon className="size-4 text-muted-foreground" aria-hidden="true" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {hit.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">{hit.meta}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}
