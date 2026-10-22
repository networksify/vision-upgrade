import type { DashboardServices } from '@/lib/services';

import { mockAdministratorService } from './mock-administrators.service';
import { mockAuthService } from './mock-auth.service';
import { mockChatService } from './mock-chat.service';
import { mockCourseService } from './mock-courses.service';

/**
 * Builds the demo provider set.
 *
 * Replace this function with an HTTP provider set when the backend exists; the
 * shape returned here is exactly what `DashboardServices` describes, so no
 * component needs to change.
 */
export const createMockServices = (): DashboardServices => ({
  auth: mockAuthService,
  administrators: mockAdministratorService,
  courses: mockCourseService,
  chat: mockChatService,
});
