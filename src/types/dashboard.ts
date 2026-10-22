/**
 * Shared domain models for the internal admin dashboard.
 *
 * These types describe the data the dashboard works with. They are transport
 * agnostic on purpose: the mock providers used by the prototype and the future
 * HTTP providers speak the same shapes, so swapping the provider layer never
 * touches a component.
 */

/** Role assigned to a dashboard account. */
export type AdminRole = 'owner' | 'administrator' | 'content-editor';

/** Whether an administrator account may sign in. */
export type AccountStatus = 'active' | 'disabled';

export type AdministratorAccount = {
  id: string;
  name: string;
  username: string;
  role: AdminRole;
  status: AccountStatus;
  /** ISO 8601 timestamp. */
  createdAt: string;
  /** ISO 8601 timestamp, or `null` when the account has never signed in. */
  lastActiveAt: string | null;
};

export type CourseStatus = 'draft' | 'published';

export type CourseCategory = 'vu-kids' | 'software' | 'digital-marketing';

export type Course = {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  status: CourseStatus;
  /** Absolute URL or app-relative path of an optional thumbnail image. */
  thumbnailUrl: string | null;
  /** ISO 8601 timestamp. */
  createdAt: string;
  /** ISO 8601 timestamp. */
  updatedAt: string;
  /** ISO 8601 timestamp, or `null` while the course is a draft. */
  publishedAt: string | null;
};

export type Conversation = {
  id: string;
  title: string;
  /** Display names of the people taking part in the conversation. */
  participants: string[];
  /** ISO 8601 timestamp of the most recent message. */
  lastMessageAt: string;
  unreadCount: number;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  body: string;
  /** ISO 8601 timestamp. */
  sentAt: string;
};

/** The signed-in administrator as exposed to the dashboard UI. */
export type SessionUser = {
  id: string;
  name: string;
  username: string;
  role: AdminRole;
};

export type ActivityKind = 'course' | 'account';

export type ActivityEntry = {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  /** Display name of whoever performed the action. */
  actor: string;
  /** ISO 8601 timestamp. */
  occurredAt: string;
};
