import type {
  AdministratorService,
  AuthService,
  ChatService,
  CourseService,
} from './contracts';

export * from './contracts';

/**
 * The set of services the dashboard UI depends on.
 *
 * Feature components receive this object through `useServices()` and never
 * import a concrete provider. Swapping the mock provider for an HTTP provider
 * is a one-line change in `src/lib/providers/service-context.tsx`.
 */
export type DashboardServices = {
  auth: AuthService;
  administrators: AdministratorService;
  courses: CourseService;
  chat: ChatService;
};
