'use client';

import * as React from 'react';
import { TriangleAlertIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { COURSE_CATEGORY_OPTIONS, COURSE_STATUS_OPTIONS } from '@/lib/labels';
import { useServices } from '@/lib/providers/service-context';
import { courseSchema } from '@/lib/validation/schemas';
import type { Course, CourseCategory, CourseStatus } from '@/types/dashboard';

type CourseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** `null` creates a new course, a course edits that one. */
  course: Course | null;
  onSaved: (course: Course, created: boolean) => void;
};

type FieldName = 'title' | 'description' | 'category' | 'status' | 'thumbnailUrl';

type FormErrors = Partial<Record<FieldName | 'form', string>>;

const FIELD_NAMES: FieldName[] = [
  'title',
  'description',
  'category',
  'status',
  'thumbnailUrl',
];

const isFieldName = (value: string): value is FieldName =>
  (FIELD_NAMES as string[]).includes(value);

type CourseFormProps = {
  course: Course | null;
  onCancel: () => void;
  onSaved: (course: Course, created: boolean) => void;
};

/**
 * Create or edit a course.
 *
 * The form validates against the shared zod schema first, then hands the
 * request to `CourseService`. The service result is the source of truth: a
 * server side validation failure is rendered next to the field it belongs to.
 *
 * Like the account form, it lives in its own component so that closing the
 * dialog discards the draft and opening it again starts from the record.
 */
export function CourseDialog({ open, onOpenChange, course, onSaved }: CourseDialogProps) {
  const editing = course !== null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit course' : 'Create course'}</DialogTitle>
          <DialogDescription>
            {editing
              ? 'Update the course details, or move it between draft and published.'
              : 'Give the course its public details. You can save it as a draft first.'}
          </DialogDescription>
        </DialogHeader>

        <CourseForm
          course={course}
          onCancel={() => onOpenChange(false)}
          onSaved={(saved, created) => {
            onSaved(saved, created);
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function CourseForm({ course, onCancel, onSaved }: CourseFormProps) {
  const { courses } = useServices();

  const [title, setTitle] = React.useState(course?.title ?? '');
  const [description, setDescription] = React.useState(course?.description ?? '');
  const [category, setCategory] = React.useState<CourseCategory>(course?.category ?? 'software');
  const [status, setStatus] = React.useState<CourseStatus>(course?.status ?? 'draft');
  const [thumbnailUrl, setThumbnailUrl] = React.useState(course?.thumbnailUrl ?? '');
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  const editing = course !== null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = courseSchema.safeParse({
      title,
      description,
      category,
      status,
      thumbnailUrl,
    });

    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === 'string' && isFieldName(key) && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const result = editing
      ? await courses.update(course.id, parsed.data)
      : await courses.create(parsed.data);

    setSubmitting(false);

    if (!result.ok) {
      const serverErrors: FormErrors = { form: result.error.message };
      for (const [field, messages] of Object.entries(result.error.fieldErrors ?? {})) {
        if (isFieldName(field)) {
          serverErrors[field] = messages[0];
        }
      }
      setErrors(serverErrors);
      return;
    }

    onSaved(result.data, !editing);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex max-h-[70svh] flex-col gap-5 overflow-y-auto pr-1"
    >
      {errors.form ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <TriangleAlertIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>{errors.form}</p>
        </div>
      ) : null}

      <Field data-invalid={Boolean(errors.title)}>
        <FieldLabel htmlFor="course-title">Title</FieldLabel>
        <Input
          id="course-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'course-title-error' : undefined}
          placeholder="Python foundations"
          className="h-10"
        />
        <FieldError
          id="course-title-error"
          errors={errors.title ? [{ message: errors.title }] : undefined}
        />
      </Field>

      <Field data-invalid={Boolean(errors.description)}>
        <FieldLabel htmlFor="course-description">Description</FieldLabel>
        <Textarea
          id="course-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'course-description-error' : undefined}
          placeholder="What the course covers, who it is for, and what a learner walks away with."
          rows={5}
        />
        <FieldError
          id="course-description-error"
          errors={errors.description ? [{ message: errors.description }] : undefined}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field data-invalid={Boolean(errors.category)}>
          <FieldLabel htmlFor="course-category">Category</FieldLabel>
          <Select value={category} onValueChange={(value) => setCategory(value as CourseCategory)}>
            <SelectTrigger id="course-category" className="h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COURSE_CATEGORY_OPTIONS.map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError
            id="course-category-error"
            errors={errors.category ? [{ message: errors.category }] : undefined}
          />
        </Field>

        <Field data-invalid={Boolean(errors.status)}>
          <FieldLabel htmlFor="course-status">Status</FieldLabel>
          <Select value={status} onValueChange={(value) => setStatus(value as CourseStatus)}>
            <SelectTrigger id="course-status" className="h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COURSE_STATUS_OPTIONS.map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription>Drafts are hidden from the public site.</FieldDescription>
          <FieldError
            id="course-status-error"
            errors={errors.status ? [{ message: errors.status }] : undefined}
          />
        </Field>
      </div>

      <Field data-invalid={Boolean(errors.thumbnailUrl)}>
        <FieldLabel htmlFor="course-thumbnail">Thumbnail URL (optional)</FieldLabel>
        <Input
          id="course-thumbnail"
          type="url"
          value={thumbnailUrl}
          onChange={(event) => setThumbnailUrl(event.target.value)}
          aria-invalid={Boolean(errors.thumbnailUrl)}
          aria-describedby="course-thumbnail-help"
          placeholder="https://example.com/course.jpg"
          className="h-10"
        />
        <FieldDescription id="course-thumbnail-help">
          A full https:// address. Leave empty to show a plain placeholder.
        </FieldDescription>
        <FieldError
          id="course-thumbnail-error"
          errors={errors.thumbnailUrl ? [{ message: errors.thumbnailUrl }] : undefined}
        />
      </Field>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner />
              Saving…
            </>
          ) : editing ? (
            'Save changes'
          ) : (
            'Create course'
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
