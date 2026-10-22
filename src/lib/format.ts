/**
 * Small formatting helpers shared by the dashboard widgets.
 *
 * They are intentionally locale aware through `Intl`, and they never assume a
 * value is present: a missing timestamp renders as a dash rather than as
 * "Invalid Date".
 */

/** Renders an ISO timestamp as a short relative time, e.g. "3 hours ago". */
export function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return '—';

  const timestamp = Date.parse(iso);
  if (Number.isNaN(timestamp)) return '—';

  const deltaSeconds = Math.round((timestamp - Date.now()) / 1000);

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['second', 60],
    ['minute', 60],
    ['hour', 24],
    ['day', 7],
    ['week', 4.348],
    ['month', 12],
    ['year', Number.POSITIVE_INFINITY],
  ];

  let value = deltaSeconds;

  for (const [unit, limit] of units) {
    if (Math.abs(value) < limit) {
      return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
        Math.round(value),
        unit,
      );
    }

    value /= limit;
  }

  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.round(value),
    'year',
  );
}

/** Renders an ISO timestamp as a readable date and time. */
export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return '—';

  const timestamp = Date.parse(iso);
  if (Number.isNaN(timestamp)) return '—';

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);
}

/** Renders an ISO timestamp as a plain date. */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';

  const timestamp = Date.parse(iso);
  if (Number.isNaN(timestamp)) return '—';

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(timestamp);
}

/** Returns the initials for an avatar fallback. */
export function initialsOf(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
