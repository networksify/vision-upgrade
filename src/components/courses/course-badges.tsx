import { Badge } from '@/components/ui/badge';
import { COURSE_CATEGORY_LABELS, COURSE_STATUS_LABELS } from '@/lib/labels';
import type { CourseCategory, CourseStatus } from '@/types/dashboard';

/** Draft / published chip. */
export function CourseStatusBadge({ status }: { status: CourseStatus }) {
  return (
    <Badge
      variant="secondary"
      className={
        status === 'published'
          ? 'bg-navy/8 text-navy hover:bg-navy/8'
          : 'bg-brand-tint text-brand-ink hover:bg-brand-tint'
      }
    >
      <span
        aria-hidden="true"
        className={
          status === 'published'
            ? 'size-1.5 rounded-full bg-navy'
            : 'size-1.5 rounded-full bg-brand-ink'
        }
      />
      {COURSE_STATUS_LABELS[status]}
    </Badge>
  );
}

/** Category chip. */
export function CourseCategoryBadge({ category }: { category: CourseCategory }) {
  return (
    <Badge variant="outline" className="border-line text-muted-foreground">
      {COURSE_CATEGORY_LABELS[category]}
    </Badge>
  );
}
