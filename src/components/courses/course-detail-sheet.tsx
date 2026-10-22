'use client';

import Image from 'next/image';
import { BookOpenIcon, EyeOffIcon, PencilIcon, SendIcon } from 'lucide-react';

import { CourseCategoryBadge, CourseStatusBadge } from '@/components/courses/course-badges';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { formatDateTime, formatRelativeTime } from '@/lib/format';
import { COURSE_CATEGORY_LABELS } from '@/lib/labels';
import type { Course, CourseStatus } from '@/types/dashboard';

type CourseDetailSheetProps = {
  course: Course | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (course: Course) => void;
  onStatusChange: (course: Course, status: CourseStatus) => void;
  statusWorking: boolean;
};

type DetailRowProps = {
  label: string;
  children: React.ReactNode;
};

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

/**
 * Read-only course drawer.
 *
 * It also offers the one destructive-ish action a course has — changing its
 * publication state — which the page performs through `CourseService.update`.
 */
export function CourseDetailSheet({
  course,
  open,
  onOpenChange,
  onEdit,
  onStatusChange,
  statusWorking,
}: CourseDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 sm:max-w-md">
        {course ? (
          <>
            <SheetHeader className="gap-1 border-b border-line p-5 pr-12">
              <div className="mb-1 flex flex-wrap items-center gap-1.5">
                <CourseStatusBadge status={course.status} />
                <CourseCategoryBadge category={course.category} />
              </div>
              <SheetTitle className="text-lg font-semibold text-navy">{course.title}</SheetTitle>
              <SheetDescription>
                Last updated {formatRelativeTime(course.updatedAt)}
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="relative aspect-16/9 w-full overflow-hidden rounded-lg bg-surface">
                {course.thumbnailUrl ? (
                  <Image
                    src={course.thumbnailUrl}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 448px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
                    <BookOpenIcon className="size-8" aria-hidden="true" />
                    <span className="sr-only">No thumbnail provided</span>
                  </div>
                )}
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-navy">Description</h3>
                <p className="mt-1.5 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                  {course.description}
                </p>
              </div>

              <Separator className="my-5" />

              <dl className="flex flex-col gap-4">
                <DetailRow label="Category">{COURSE_CATEGORY_LABELS[course.category]}</DetailRow>
                <DetailRow label="Created">{formatDateTime(course.createdAt)}</DetailRow>
                <DetailRow label="Last updated">{formatDateTime(course.updatedAt)}</DetailRow>
                <DetailRow label="Published">
                  {course.publishedAt ? formatDateTime(course.publishedAt) : 'Not published'}
                </DetailRow>
                <DetailRow label="Course ID">
                  <span className="font-mono text-xs">{course.id}</span>
                </DetailRow>
              </dl>
            </div>

            <SheetFooter className="flex-row justify-end gap-2 border-t border-line p-5">
              <Button variant="outline" onClick={() => onEdit(course)}>
                <PencilIcon />
                Edit course
              </Button>

              {course.status === 'draft' ? (
                <Button
                  onClick={() => onStatusChange(course, 'published')}
                  disabled={statusWorking}
                >
                  {statusWorking ? <Spinner /> : <SendIcon />}
                  Publish
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => onStatusChange(course, 'draft')}
                  disabled={statusWorking}
                >
                  {statusWorking ? <Spinner /> : <EyeOffIcon />}
                  Move to draft
                </Button>
              )}
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
