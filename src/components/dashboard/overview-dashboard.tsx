"use client";

import * as React from 'react';
import { BookOpenIcon, TriangleAlertIcon, UsersIcon } from 'lucide-react';

import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { DemoNotice } from '@/components/dashboard/demo-notice';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ACCOUNT_STATUS_LABELS, COURSE_STATUS_LABELS, ROLE_LABELS } from '@/lib/labels';
import { useServices } from '@/lib/providers/service-context';
import type { ActivityEntry, AdministratorAccount, Course } from '@/types/dashboard';

type OverviewState = {
  status: 'loading' | 'ready' | 'error';
  accounts: AdministratorAccount[];
  courses: Course[];
  message: string | null;
};

const INITIAL_STATE: OverviewState = {
  status: 'loading',
  accounts: [],
  courses: [],
  message: null,
};

/**
 * Dashboard overview.
 *
 * Every figure on this screen is counted from the records the service layer
 * returns — there are no invented metrics and no decorative charts.
 */
export function OverviewDashboard() {
  const { administrators, courses } = useServices();
  const [state, setState] = React.useState<OverviewState>(INITIAL_STATE);
  const [reloadToken, setReloadToken] = React.useState(0);

  React.useEffect(() => {
    let active = true;
    setState((current) => ({ ...current, status: 'loading' }));

    void Promise.all([administrators.list({ pageSize: 100 }), courses.list()])
      .then(([accountResult, courseResult]) => {
        if (!active) return;

        if (!accountResult.ok) {
          setState({
            status: 'error',
            accounts: [],
            courses: [],
            message: accountResult.error.message,
          });
          return;
        }

        if (!courseResult.ok) {
          setState({
            status: 'error',
            accounts: [],
            courses: [],
            message: courseResult.error.message,
          });
          return;
        }

        setState({
          status: 'ready',
          accounts: accountResult.data.items,
          courses: courseResult.data.items,
          message: null,
        });
      })
      .catch(() => {
        if (!active) return;
        setState({
          status: 'error',
          accounts: [],
          courses: [],
          message: 'The dashboard could not load its data.',
        });
      });

    return () => {
      active = false;
    };
  }, [administrators, courses, reloadToken]);

  const activeAccounts = state.accounts.filter((account) => account.status === 'active').length;
  const publishedCourses = state.courses.filter((course) => course.status === 'published').length;

  const courseActivity: ActivityEntry[] = React.useMemo(
    () =>
      [...state.courses]
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, 5)
        .map((course) => ({
          id: course.id,
          kind: 'course',
          title: course.title,
          detail: `${COURSE_STATUS_LABELS[course.status]} · ${
            course.publishedAt ? 'in the catalogue' : 'not published yet'
          }`,
          actor: '',
          occurredAt: course.updatedAt,
        })),
    [state.courses],
  );

  const accountActivity: ActivityEntry[] = React.useMemo(
    () =>
      [...state.accounts]
        .sort((a, b) =>
          (b.lastActiveAt ?? b.createdAt).localeCompare(a.lastActiveAt ?? a.createdAt),
        )
        .slice(0, 5)
        .map((account) => ({
          id: account.id,
          kind: 'account',
          title: account.name,
          detail: `${ROLE_LABELS[account.role]} · ${ACCOUNT_STATUS_LABELS[account.status]}`,
          actor: '',
          occurredAt: account.lastActiveAt ?? account.createdAt,
        })),
    [state.accounts],
  );

  if (state.status === 'error') {
    return (
      <div className="flex flex-col gap-6">
        <Card className="gap-0 border-destructive/30 bg-white py-6">
          <CardContent className="flex flex-col items-start gap-3">
            <span className="flex items-center gap-2 text-destructive">
              <TriangleAlertIcon className="size-5" aria-hidden="true" />
              <p className="font-semibold">The dashboard could not load its data</p>
            </span>
            <p className="text-sm text-muted-foreground">
              {state.message ?? 'Something went wrong while fetching the records.'}
            </p>
            <Button variant="outline" size="sm" onClick={() => setReloadToken((token) => token + 1)}>
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <DemoNotice />

      {state.status === 'loading' ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((card) => (
            <Skeleton key={card} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Admin accounts"
            value={state.accounts.length}
            hint={`${activeAccounts} active, ${state.accounts.length - activeAccounts} disabled`}
            icon={UsersIcon}
          />
          <StatCard
            label="Courses"
            value={state.courses.length}
            hint={`${publishedCourses} published, ${state.courses.length - publishedCourses} in draft`}
            icon={BookOpenIcon}
            tone="navy"
          />
        </div>
      )}

      <div className="grid gap-4 xl:grid-cols-2">
        <ActivityFeed
          title="Recent course activity"
          description="The courses that changed most recently."
          entries={courseActivity}
          emptyTitle="No courses yet"
          emptyDescription="Create your first course to see its activity here."
          loading={state.status === 'loading'}
        />

        <ActivityFeed
          title="Recent admin activity"
          description="The accounts that were active most recently."
          entries={accountActivity}
          emptyTitle="No admin accounts yet"
          emptyDescription="Add your first administrator to see activity here."
          loading={state.status === 'loading'}
        />
      </div>

      <QuickActions />
    </div>
  );
}
