'use client';

import * as React from 'react';
import { BookPlusIcon, FilterXIcon, SearchIcon, TriangleAlertIcon } from 'lucide-react';
import { toast } from 'sonner';

import { CourseCard } from '@/components/courses/course-card';
import { CourseDetailSheet } from '@/components/courses/course-detail-sheet';
import { CourseDialog } from '@/components/courses/course-dialog';
import { DemoNotice } from '@/components/dashboard/demo-notice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { COURSE_CATEGORY_OPTIONS, COURSE_STATUS_OPTIONS } from '@/lib/labels';
import { useServices } from '@/lib/providers/service-context';
import type { Course, CourseCategory, CourseStatus } from '@/types/dashboard';

type CoursesState = {
  status: 'loading' | 'ready' | 'error';
  items: Course[];
  total: number;
  message: string | null;
};

const INITIAL_STATE: CoursesState = {
  status: 'loading',
  items: [],
  total: 0,
  message: null,
};

/**
 * Course catalogue screen.
 *
 * The page asks `CourseService` for the list it needs and renders presentational
 * cards. Draft and published courses are both visible here — only the public
 * website filters drafts out.
 */
export function CoursesPage() {
  const { courses } = useServices();

  const [searchInput, setSearchInput] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState<CourseCategory | 'all'>('all');
  const [status, setStatus] = React.useState<CourseStatus | 'all'>('all');

  const [state, setState] = React.useState<CoursesState>(INITIAL_STATE);
  const [reloadToken, setReloadToken] = React.useState(0);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Course | null>(null);
  const [detail, setDetail] = React.useState<Course | null>(null);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [statusWorking, setStatusWorking] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 250);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // `?create=1` is the quick-action deep link from the overview page.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('q')) {
      setSearchInput(params.get('q') ?? '');
    }

    if (params.get('create') === '1') {
      setEditing(null);
      setDialogOpen(true);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    setState((current) => ({ ...current, status: 'loading' }));

    void courses
      .list({ search, category, status })
      .then((result) => {
        if (!active) return;

        if (!result.ok) {
          setState({
            status: 'error',
            items: [],
            total: 0,
            message: result.error.message,
          });
          return;
        }

        setState({
          status: 'ready',
          items: result.data.items,
          total: result.data.total,
          message: null,
        });
      })
      .catch(() => {
        if (!active) return;
        setState({
          status: 'error',
          items: [],
          total: 0,
          message: 'The course catalogue could not be loaded.',
        });
      });

    return () => {
      active = false;
    };
  }, [courses, search, category, status, reloadToken]);

  const hasFilters = search !== '' || category !== 'all' || status !== 'all';

  const clearFilters = () => {
    setSearchInput('');
    setSearch('');
    setCategory('all');
    setStatus('all');
  };

  const handleSaved = (course: Course, created: boolean) => {
    toast.success(created ? 'Course created.' : 'Course updated.');

    // Keep an open detail drawer in sync with the record that was just saved.
    if (detail?.id === course.id) {
      setDetail(course);
    }

    setReloadToken((token) => token + 1);
  };

  const handleStatusChange = async (course: Course, nextStatus: CourseStatus) => {
    setStatusWorking(true);

    const result = await courses.update(course.id, {
      title: course.title,
      description: course.description,
      category: course.category,
      status: nextStatus,
      thumbnailUrl: course.thumbnailUrl,
    });

    setStatusWorking(false);

    if (!result.ok) {
      toast.error(result.error.message);
      return;
    }

    toast.success(
      nextStatus === 'published'
        ? `“${course.title}” is now published.`
        : `“${course.title}” moved back to draft.`,
    );

    setDetail(result.data);
    setReloadToken((token) => token + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <DemoNotice>
        These courses are fabricated examples for the prototype. Editing or publishing them changes
        this browser session only — nothing reaches the public website.
      </DemoNotice>

      <Card className="gap-0 border-line bg-white">
        <CardContent className="flex flex-col gap-3 p-5 lg:flex-row lg:items-end">
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="course-search">Search courses</Label>
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="course-search"
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Title or description"
                className="h-10 pl-9"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 sm:w-48">
            <Label htmlFor="course-category-filter">Category</Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as CourseCategory | 'all')}
            >
              <SelectTrigger id="course-category-filter" className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {COURSE_CATEGORY_OPTIONS.map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5 sm:w-44">
            <Label htmlFor="course-status-filter">Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as CourseStatus | 'all')}
            >
              <SelectTrigger id="course-status-filter" className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {COURSE_STATUS_OPTIONS.map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            className="h-10 lg:ml-auto"
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
          >
            <BookPlusIcon />
            Create course
          </Button>
        </CardContent>
      </Card>

      {hasFilters ? (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {state.status === 'ready'
              ? `${state.total} ${state.total === 1 ? 'course matches' : 'courses match'} your filters.`
              : 'Filtering courses…'}
          </p>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <FilterXIcon />
            Clear filters
          </Button>
        </div>
      ) : null}

      {state.status === 'error' ? (
        <Card className="gap-0 border-destructive/30 bg-white">
          <CardContent className="flex flex-col items-start gap-3 p-5">
            <span className="flex items-center gap-2 text-destructive">
              <TriangleAlertIcon className="size-5" aria-hidden="true" />
              <p className="font-semibold">The course catalogue could not be loaded</p>
            </span>
            <p className="text-sm text-muted-foreground">{state.message}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReloadToken((token) => token + 1)}
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : state.status === 'loading' ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((card) => (
            <Skeleton key={card} className="h-80 rounded-xl" />
          ))}
        </div>
      ) : state.items.length === 0 ? (
        <Card className="gap-0 border-line bg-white">
          <CardContent className="p-0">
            <Empty className="m-0 border-0 py-16">
              <EmptyHeader>
                <EmptyTitle>
                  {hasFilters ? 'No courses match your filters' : 'No courses yet'}
                </EmptyTitle>
                <EmptyDescription>
                  {hasFilters
                    ? 'Try a different search term, category or status.'
                    : 'Create the first course and save it as a draft until it is ready.'}
                </EmptyDescription>
              </EmptyHeader>
              {hasFilters ? (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear filters
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => {
                    setEditing(null);
                    setDialogOpen(true);
                  }}
                >
                  <BookPlusIcon />
                  Create course
                </Button>
              )}
            </Empty>
          </CardContent>
        </Card>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {state.items.map((course) => (
            <li key={course.id} className="flex">
              <div className="flex w-full flex-col">
                <CourseCard
                  course={course}
                  onView={(item) => {
                    setDetail(item);
                    setDetailOpen(true);
                  }}
                  onEdit={(item) => {
                    setEditing(item);
                    setDialogOpen(true);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <CourseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        course={editing}
        onSaved={handleSaved}
      />

      <CourseDetailSheet
        course={detail}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={(course) => {
          setDetailOpen(false);
          setEditing(course);
          // Let the sheet finish closing before the dialog opens.
          window.setTimeout(() => setDialogOpen(true), 150);
        }}
        onStatusChange={handleStatusChange}
        statusWorking={statusWorking}
      />
    </div>
  );
}
