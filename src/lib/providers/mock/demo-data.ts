/**
 * Demo seed data for the dashboard prototype.
 *
 * Everything in this file is fabricated sample data for the UI only. It
 * describes no real Vision Upgrade employee, course or conversation, and it is
 * never treated as a source of truth — the mock provider below is the only
 * thing that reads it.
 */

import type {
  AdministratorAccount,
  ChatMessage,
  Conversation,
  Course,
} from '@/types/dashboard';

/**
 * Demo clock. Timestamps are generated relative to the moment the module is
 * first evaluated so the activity feeds always look recent.
 */
const DEMO_NOW = Date.now();

const hoursAgo = (hours: number): string =>
  new Date(DEMO_NOW - hours * 60 * 60 * 1000).toISOString();

const daysAgo = (days: number): string => hoursAgo(days * 24);

/**
 * Usernames the demo sign-in screen suggests.
 *
 * These are not secrets: they are identifiers of the fabricated demo accounts
 * below, and they are shown in the UI so a reviewer can get into the
 * prototype. No password is listed anywhere, because none is ever checked —
 * the demo adapter accepts any non-empty password.
 *
 * Remove this export (and the notice that renders it) when the demo adapter is
 * replaced by a real identity provider.
 */
export const DEMO_SIGN_IN_USERNAMES = [
  'demo.owner',
  'demo.admin',
  'demo.editor',
] as const;

export const demoAdministrators: AdministratorAccount[] = [
  {
    id: 'adm-001',
    name: 'Demo Owner',
    username: 'demo.owner',
    role: 'owner',
    status: 'active',
    createdAt: daysAgo(120),
    lastActiveAt: hoursAgo(1),
  },
  {
    id: 'adm-002',
    name: 'Demo Administrator',
    username: 'demo.admin',
    role: 'administrator',
    status: 'active',
    createdAt: daysAgo(96),
    lastActiveAt: hoursAgo(5),
  },
  {
    id: 'adm-003',
    name: 'Demo Content Editor',
    username: 'demo.editor',
    role: 'content-editor',
    status: 'active',
    createdAt: daysAgo(74),
    lastActiveAt: hoursAgo(26),
  },
  {
    id: 'adm-004',
    name: 'Demo Course Reviewer',
    username: 'demo.reviewer',
    role: 'content-editor',
    status: 'active',
    createdAt: daysAgo(61),
    lastActiveAt: hoursAgo(9),
  },
  {
    id: 'adm-005',
    name: 'Demo Support Lead',
    username: 'demo.support',
    role: 'administrator',
    status: 'active',
    createdAt: daysAgo(48),
    lastActiveAt: hoursAgo(52),
  },
  {
    id: 'adm-006',
    name: 'Demo Marketing Editor',
    username: 'demo.marketing',
    role: 'content-editor',
    status: 'active',
    createdAt: daysAgo(33),
    lastActiveAt: hoursAgo(3),
  },
  {
    id: 'adm-007',
    name: 'Demo Platform Admin',
    username: 'demo.platform',
    role: 'administrator',
    status: 'disabled',
    createdAt: daysAgo(21),
    lastActiveAt: daysAgo(14),
  },
  {
    id: 'adm-008',
    name: 'Demo Guest Reviewer',
    username: 'demo.guest',
    role: 'content-editor',
    status: 'disabled',
    createdAt: daysAgo(9),
    lastActiveAt: null,
  },
];

export const demoCourses: Course[] = [
  {
    id: 'crs-001',
    title: 'Robotics fundamentals for young learners',
    description:
      'An introduction to building and programming simple robots, designed for the VU Kids programme.',
    category: 'vu-kids',
    status: 'published',
    thumbnailUrl: null,
    createdAt: daysAgo(52),
    updatedAt: daysAgo(2),
    publishedAt: daysAgo(49),
  },
  {
    id: 'crs-002',
    title: 'Creative coding with Scratch',
    description:
      'A block based programming course that introduces young learners to game design and logic.',
    category: 'vu-kids',
    status: 'published',
    thumbnailUrl: null,
    createdAt: daysAgo(41),
    updatedAt: daysAgo(6),
    publishedAt: daysAgo(38),
  },
  {
    id: 'crs-003',
    title: 'Python foundations',
    description:
      'Core Python syntax, data structures and problem solving for junior software engineers.',
    category: 'software',
    status: 'published',
    thumbnailUrl: null,
    createdAt: daysAgo(37),
    updatedAt: daysAgo(1),
    publishedAt: daysAgo(34),
  },
  {
    id: 'crs-004',
    title: 'Accessible interface design',
    description:
      'A practical workshop on building interfaces that meet modern accessibility guidance.',
    category: 'software',
    status: 'draft',
    thumbnailUrl: null,
    createdAt: daysAgo(18),
    updatedAt: hoursAgo(20),
    publishedAt: null,
  },
  {
    id: 'crs-005',
    title: 'Technical SEO foundations',
    description:
      'How search engines read a site, and how to structure content that ranks for the right queries.',
    category: 'digital-marketing',
    status: 'published',
    thumbnailUrl: null,
    createdAt: daysAgo(29),
    updatedAt: daysAgo(4),
    publishedAt: daysAgo(26),
  },
  {
    id: 'crs-006',
    title: 'Campaign measurement that matters',
    description:
      'Setting up reporting for digital campaigns so the numbers lead to decisions.',
    category: 'digital-marketing',
    status: 'draft',
    thumbnailUrl: null,
    createdAt: daysAgo(12),
    updatedAt: hoursAgo(40),
    publishedAt: null,
  },
  {
    id: 'crs-007',
    title: 'Digital product analytics',
    description:
      'Reading product analytics to understand which features actually matter to users.',
    category: 'software',
    status: 'published',
    thumbnailUrl: null,
    createdAt: daysAgo(24),
    updatedAt: daysAgo(11),
    publishedAt: daysAgo(22),
  },
  {
    id: 'crs-008',
    title: 'Brand storytelling for small teams',
    description:
      'A short course on building a brand narrative that works without a large marketing team.',
    category: 'digital-marketing',
    status: 'draft',
    thumbnailUrl: null,
    createdAt: daysAgo(4),
    updatedAt: hoursAgo(3),
    publishedAt: null,
  },
];

export const demoConversations: Conversation[] = [
  {
    id: 'cnv-001',
    title: 'Curriculum planning',
    participants: ['Demo Owner', 'Demo Content Editor', 'Demo Course Reviewer'],
    lastMessageAt: hoursAgo(2),
    unreadCount: 2,
  },
  {
    id: 'cnv-002',
    title: 'Course review',
    participants: ['Demo Content Editor', 'Demo Course Reviewer'],
    lastMessageAt: hoursAgo(7),
    unreadCount: 0,
  },
  {
    id: 'cnv-003',
    title: 'Software team',
    participants: ['Demo Owner', 'Demo Support Lead', 'Demo Platform Admin'],
    lastMessageAt: daysAgo(1),
    unreadCount: 0,
  },
  {
    id: 'cnv-004',
    title: 'Marketing content',
    participants: ['Demo Marketing Editor', 'Demo Administrator'],
    lastMessageAt: daysAgo(3),
    unreadCount: 1,
  },
];

export const demoMessages: ChatMessage[] = [
  {
    id: 'msg-001',
    conversationId: 'cnv-001',
    senderId: 'adm-003',
    senderName: 'Demo Content Editor',
    body: 'Drafted the outline for the robotics course. Two modules still need examples.',
    sentAt: hoursAgo(26),
  },
  {
    id: 'msg-002',
    conversationId: 'cnv-001',
    senderId: 'adm-004',
    senderName: 'Demo Course Reviewer',
    body: 'Reviewed the outline. The pacing looks right for the age group.',
    sentAt: hoursAgo(20),
  },
  {
    id: 'msg-003',
    conversationId: 'cnv-001',
    senderId: 'adm-001',
    senderName: 'Demo Owner',
    body: 'Great. Let us keep the assessment short so it fits a single session.',
    sentAt: hoursAgo(2),
  },
  {
    id: 'msg-004',
    conversationId: 'cnv-002',
    senderId: 'adm-004',
    senderName: 'Demo Course Reviewer',
    body: 'The accessibility workshop draft is ready for a second pair of eyes.',
    sentAt: hoursAgo(30),
  },
  {
    id: 'msg-005',
    conversationId: 'cnv-002',
    senderId: 'adm-003',
    senderName: 'Demo Content Editor',
    body: 'Reading it this afternoon, I will leave notes inline.',
    sentAt: hoursAgo(7),
  },
  {
    id: 'msg-006',
    conversationId: 'cnv-003',
    senderId: 'adm-005',
    senderName: 'Demo Support Lead',
    body: 'The support inbox is clear for now, so let us use the slot for the release checklist.',
    sentAt: daysAgo(1),
  },
  {
    id: 'msg-007',
    conversationId: 'cnv-004',
    senderId: 'adm-006',
    senderName: 'Demo Marketing Editor',
    body: 'Campaign notes are in the shared drive. Nothing else is blocked.',
    sentAt: daysAgo(3),
  },
];

