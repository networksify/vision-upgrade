/**
 * Human readable labels for the dashboard domain vocabulary.
 *
 * Keeping them in one place means a table header, a badge and a form select
 * never drift apart.
 */

import type {
  AccountStatus,
  AdminRole,
  CourseCategory,
  CourseStatus,
} from '@/types/dashboard';

export const ROLE_LABELS: Record<AdminRole, string> = {
  owner: 'Owner',
  administrator: 'Administrator',
  'content-editor': 'Content editor',
};

export const ACCOUNT_STATUS_LABELS: Record<AccountStatus, string> = {
  active: 'Active',
  disabled: 'Disabled',
};

export const COURSE_STATUS_LABELS: Record<CourseStatus, string> = {
  draft: 'Draft',
  published: 'Published',
};

export const COURSE_CATEGORY_LABELS: Record<CourseCategory, string> = {
  'vu-kids': 'VU Kids',
  software: 'Software',
  'digital-marketing': 'Digital marketing',
};

export const ROLE_OPTIONS = Object.entries(ROLE_LABELS) as [AdminRole, string][];

export const ACCOUNT_STATUS_OPTIONS = Object.entries(
  ACCOUNT_STATUS_LABELS,
) as [AccountStatus, string][];

export const COURSE_STATUS_OPTIONS = Object.entries(
  COURSE_STATUS_LABELS,
) as [CourseStatus, string][];

export const COURSE_CATEGORY_OPTIONS = Object.entries(
  COURSE_CATEGORY_LABELS,
) as [CourseCategory, string][];
