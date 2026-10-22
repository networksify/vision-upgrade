import type {
  CourseListQuery,
  CourseListResponse,
  CourseService,
  CreateCourseRequest,
  ServiceResult,
  UpdateCourseRequest,
} from '@/lib/services/contracts';
import { serviceFail, serviceOk } from '@/lib/services/contracts';
import type { Course } from '@/types/dashboard';

import { mockStore, nextMockId } from './store';

const DEMO_LATENCY_MS = 220;
const DEMO_MUTATION_LATENCY_MS = 320;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const sortByUpdatedAt = (a: Course, b: Course): number =>
  b.updatedAt.localeCompare(a.updatedAt);

export const mockCourseService: CourseService = {
  async list(query: CourseListQuery = {}): Promise<ServiceResult<CourseListResponse>> {
    await delay(DEMO_LATENCY_MS);

    const search = query.search?.trim().toLowerCase() ?? '';
    const category = query.category ?? 'all';
    const status = query.status ?? 'all';

    const filtered = mockStore.courses
      .filter((course) => {
        if (category !== 'all' && course.category !== category) return false;
        if (status !== 'all' && course.status !== status) return false;
        if (!search) return true;
        return (
          course.title.toLowerCase().includes(search) ||
          course.description.toLowerCase().includes(search)
        );
      })
      .sort(sortByUpdatedAt);

    return serviceOk({
      items: filtered.map((course) => ({ ...course })),
      total: filtered.length,
    });
  },

  async get(id: string): Promise<ServiceResult<Course>> {
    await delay(DEMO_LATENCY_MS);

    const course = mockStore.courses.find((candidate) => candidate.id === id);
    if (!course) {
      return serviceFail('not_found', 'That course no longer exists.');
    }

    return serviceOk({ ...course });
  },

  async create(request: CreateCourseRequest): Promise<ServiceResult<Course>> {
    await delay(DEMO_MUTATION_LATENCY_MS);

    const now = new Date().toISOString();
    const course: Course = {
      id: nextMockId('crs'),
      title: request.title.trim(),
      description: request.description.trim(),
      category: request.category,
      status: request.status,
      thumbnailUrl: request.thumbnailUrl?.trim() ? request.thumbnailUrl.trim() : null,
      createdAt: now,
      updatedAt: now,
      publishedAt: request.status === 'published' ? now : null,
    };

    mockStore.courses.unshift(course);

    return serviceOk({ ...course });
  },

  async update(id: string, request: UpdateCourseRequest): Promise<ServiceResult<Course>> {
    await delay(DEMO_MUTATION_LATENCY_MS);

    const course = mockStore.courses.find((candidate) => candidate.id === id);
    if (!course) {
      return serviceFail('not_found', 'That course no longer exists.');
    }

    const now = new Date().toISOString();

    course.title = request.title.trim();
    course.description = request.description.trim();
    course.category = request.category;
    course.status = request.status;
    course.thumbnailUrl = request.thumbnailUrl?.trim() ? request.thumbnailUrl.trim() : null;
    course.updatedAt = now;
    course.publishedAt = request.status === 'published' ? (course.publishedAt ?? now) : null;

    return serviceOk({ ...course });
  },
};
