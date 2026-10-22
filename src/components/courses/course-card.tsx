'use client';

import Image from 'next/image';
import { BookOpenIcon, EyeIcon, PencilIcon } from 'lucide-react';

import { CourseCategoryBadge, CourseStatusBadge } from '@/components/courses/course-badges';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/format';
import type { Course } from '@/types/dashboard';

type CourseCardProps = {
  course: Course;
  onView: (course: Course) => void;
  onEdit: (course: Course) => void;
};

/**
 * Presentational course card.
 *
 * It receives a `Course` and two callbacks. It knows nothing about the service
 * layer, which keeps the data flow in the page component.
 */
export function CourseCard({ course, onView, onEdit }: CourseCardProps) {
  return (
    <Card className="gap-0 overflow-hidden border-line bg-white">
      <div className="relative aspect-16/9 w-full bg-surface">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
            <BookOpenIcon className="size-8" aria-hidden="true" />
            <span className="sr-only">No thumbnail provided</span>
          </div>
        )}
      </div>

      <CardHeader className="gap-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <CourseStatusBadge status={course.status} />
          <CourseCategoryBadge category={course.category} />
        </div>

        <h3 className="text-base leading-snug font-semibold text-navy">{course.title}</h3>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 border-t border-line pt-4">
        <p className="text-xs text-muted-foreground">
          Updated {formatRelativeTime(course.updatedAt)}
        </p>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => onView(course)}>
            <EyeIcon />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEdit(course)}>
            <PencilIcon />
            Edit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
