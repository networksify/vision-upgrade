import type {
  AccountStatus,
  AdministratorAccount,
  AdminRole,
  ChatMessage,
  Conversation,
  Course,
  CourseCategory,
  CourseStatus,
  SessionUser,
} from '@/types/dashboard';

/**
 * Service layer contracts.
 *
 * Every dashboard feature talks to one of these interfaces and never to a
 * concrete provider. The prototype ships mock implementations
 * (`src/lib/providers/mock`); a future backend ships HTTP implementations with
 * the same signatures, so no component has to change.
 */

export type ServiceErrorCode =
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'validation'
  | 'conflict'
  | 'network'
  | 'unknown';

export type ServiceError = {
  code: ServiceErrorCode;
  /** Safe to render directly: never contains credentials or server internals. */
  message: string;
  /** Per-field messages keyed by form field name. */
  fieldErrors?: Record<string, string[]>;
};

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ServiceError };

export const serviceOk = <T,>(data: T): ServiceResult<T> => ({ ok: true, data });

export const serviceFail = <T,>(
  code: ServiceErrorCode,
  message: string,
  fieldErrors?: Record<string, string[]>,
): ServiceResult<T> => ({ ok: false, error: { code, message, fieldErrors } });

/* -------------------------------------------------------------------------- */
/* Authentication                                                              */
/* -------------------------------------------------------------------------- */

export type SignInRequest = {
  username: string;
  password: string;
};

export interface AuthService {
  /** Resolves the active session, or `null` when nobody is signed in. */
  getSession(): Promise<SessionUser | null>;
  /**
   * Exchanges credentials for a session.
   *
   * The prototype adapter performs no credential verification. A real provider
   * must post the credentials over HTTPS to a trusted server that hashes and
   * compares them, and must return only an opaque session reference.
   */
  signIn(request: SignInRequest): Promise<ServiceResult<SessionUser>>;
  /** Ends the session. A real provider clears the HttpOnly session cookie. */
  signOut(): Promise<void>;
}

/* -------------------------------------------------------------------------- */
/* Administrator accounts                                                      */
/* -------------------------------------------------------------------------- */

export type AdministratorSortField =
  | 'name'
  | 'username'
  | 'role'
  | 'status'
  | 'createdAt'
  | 'lastActiveAt';

export type SortDirection = 'asc' | 'desc';

export type AdministratorListQuery = {
  search?: string;
  role?: AdminRole | 'all';
  status?: AccountStatus | 'all';
  page?: number;
  pageSize?: number;
  sortBy?: AdministratorSortField;
  sortDirection?: SortDirection;
};

export type AdministratorListResponse = {
  items: AdministratorAccount[];
  total: number;
  page: number;
  pageSize: number;
};

/**
 * Creating an account never carries a password.
 *
 * A real backend provisions the initial credential (invitation email or
 * server-generated one-time secret) so that no plaintext secret ever reaches
 * the browser.
 */
export type CreateAdministratorRequest = {
  name: string;
  username: string;
  role: AdminRole;
};

export type UpdateAdministratorRequest = {
  name: string;
  username: string;
  role: AdminRole;
};

export interface AdministratorService {
  list(query?: AdministratorListQuery): Promise<ServiceResult<AdministratorListResponse>>;
  create(request: CreateAdministratorRequest): Promise<ServiceResult<AdministratorAccount>>;
  update(id: string, request: UpdateAdministratorRequest): Promise<ServiceResult<AdministratorAccount>>;
  /** Enables or disables an account. */
  setStatus(id: string, status: AccountStatus): Promise<ServiceResult<AdministratorAccount>>;
}

/* -------------------------------------------------------------------------- */
/* Courses                                                                     */
/* -------------------------------------------------------------------------- */

export type CourseListQuery = {
  search?: string;
  category?: CourseCategory | 'all';
  status?: CourseStatus | 'all';
};

export type CourseListResponse = {
  items: Course[];
  total: number;
};

export type CreateCourseRequest = {
  title: string;
  description: string;
  category: CourseCategory;
  status: CourseStatus;
  thumbnailUrl: string | null;
};

export type UpdateCourseRequest = CreateCourseRequest;

export interface CourseService {
  list(query?: CourseListQuery): Promise<ServiceResult<CourseListResponse>>;
  get(id: string): Promise<ServiceResult<Course>>;
  create(request: CreateCourseRequest): Promise<ServiceResult<Course>>;
  update(id: string, request: UpdateCourseRequest): Promise<ServiceResult<Course>>;
}

/* -------------------------------------------------------------------------- */
/* Company chat                                                                */
/* -------------------------------------------------------------------------- */

export type ConversationListQuery = {
  search?: string;
};

export type ConversationListResponse = {
  items: Conversation[];
  total: number;
};

export interface ChatService {
  listConversations(query?: ConversationListQuery): Promise<ServiceResult<ConversationListResponse>>;
  listMessages(conversationId: string): Promise<ServiceResult<ChatMessage[]>>;
  /**
   * Sends a message.
   *
   * The prototype stores the message in an in-memory array; a real provider
   * persists it server-side and pushes it to the other participants.
   */
  sendMessage(conversationId: string, body: string): Promise<ServiceResult<ChatMessage>>;
}
