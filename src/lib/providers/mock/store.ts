/**
 * In-memory store backing the demo providers.
 *
 * This is the closest thing the prototype has to a database. It lives in
 * JavaScript memory only: it is not persisted, it is not shared between
 * browsers, and it resets whenever the page is reloaded. Replacing this file
 * with HTTP providers is the whole point of the service interfaces.
 */

import type {
  AdministratorAccount,
  ChatMessage,
  Conversation,
  Course,
  SessionUser,
} from '@/types/dashboard';

import {
  demoAdministrators,
  demoConversations,
  demoCourses,
  demoMessages,
} from './demo-data';

type MockStore = {
  administrators: AdministratorAccount[];
  courses: Course[];
  conversations: Conversation[];
  messages: ChatMessage[];
  session: SessionUser | null;
  /** Monotonic counter used to mint stable-ish ids for new records. */
  sequence: number;
};

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export const mockStore: MockStore = {
  administrators: clone(demoAdministrators),
  courses: clone(demoCourses),
  conversations: clone(demoConversations),
  messages: clone(demoMessages),
  session: null,
  sequence: 100,
};

export const nextMockId = (prefix: string): string => {
  mockStore.sequence += 1;
  return `${prefix}-${mockStore.sequence}`;
};
