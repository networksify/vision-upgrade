import { z } from 'zod';

/**
 * Shared form schemas.
 *
 * The dashboard validates on the client for fast feedback, but client
 * validation is a convenience only. The backend must repeat every check
 * before it trusts a request.
 */

export const signInSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Enter your username.')
    .max(64, 'That username is too long.'),
  password: z
    .string()
    .min(8, 'Your password must be at least 8 characters.')
    .max(128, 'That password is too long.'),
});

export type SignInValues = z.infer<typeof signInSchema>;

/**
 * Administrator accounts.
 *
 * There is deliberately no password field: a credential must never be typed
 * into, or stored by, the browser. The backend provisions the initial
 * password or sends an invitation.
 */
export const administratorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter the administrator name.')
    .max(80, 'Keep the name under 80 characters.'),
  username: z
    .string()
    .trim()
    .min(3, 'Enter a username.')
    .max(40, 'Keep the username under 40 characters.')
    .regex(
      /^[a-z0-9._-]+$/i,
      'Use letters, numbers, dots, dashes or underscores only.',
    ),
  role: z.enum(['owner', 'administrator', 'content-editor']),
});

export type AdministratorValues = z.infer<typeof administratorSchema>;

export const courseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Enter a course title.')
    .max(120, 'Keep the title under 120 characters.'),
  description: z
    .string()
    .trim()
    .min(10, 'Add a short description of at least 10 characters.')
    .max(600, 'Keep the description under 600 characters.'),
  category: z.enum(['vu-kids', 'software', 'digital-marketing']),
  status: z.enum(['draft', 'published']),
  thumbnailUrl: z
    .string()
    .trim()
    .max(500, 'That URL is too long.')
    .refine((value) => value === '' || z.url().safeParse(value).success, {
      message: 'Enter a full URL, including https://',
    }),
});

export type CourseValues = z.infer<typeof courseSchema>;
