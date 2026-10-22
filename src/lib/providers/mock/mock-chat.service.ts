import type {
  ChatService,
  ConversationListQuery,
  ConversationListResponse,
  ServiceResult,
} from '@/lib/services/contracts';
import { serviceFail, serviceOk } from '@/lib/services/contracts';
import type { ChatMessage } from '@/types/dashboard';

import { mockStore, nextMockId } from './store';

const DEMO_LATENCY_MS = 220;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const mockChatService: ChatService = {
  async listConversations(
    query: ConversationListQuery = {},
  ): Promise<ServiceResult<ConversationListResponse>> {
    await delay(DEMO_LATENCY_MS);

    const search = query.search?.trim().toLowerCase() ?? '';

    const items = mockStore.conversations
      .filter((conversation) => {
        if (!search) return true;
        return (
          conversation.title.toLowerCase().includes(search) ||
          conversation.participants.some((participant) =>
            participant.toLowerCase().includes(search),
          )
        );
      })
      .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt))
      .map((conversation) => ({
        ...conversation,
        participants: [...conversation.participants],
      }));

    return serviceOk({ items, total: items.length });
  },

  async listMessages(conversationId: string): Promise<ServiceResult<ChatMessage[]>> {
    await delay(DEMO_LATENCY_MS);

    const conversation = mockStore.conversations.find(
      (candidate) => candidate.id === conversationId,
    );

    if (!conversation) {
      return serviceFail('not_found', 'That conversation no longer exists.');
    }

    const messages = mockStore.messages
      .filter((message) => message.conversationId === conversationId)
      .sort((a, b) => a.sentAt.localeCompare(b.sentAt))
      .map((message) => ({ ...message }));

    return serviceOk(messages);
  },

  async sendMessage(conversationId: string, body: string): Promise<ServiceResult<ChatMessage>> {
    await delay(DEMO_LATENCY_MS);

    const conversation = mockStore.conversations.find(
      (candidate) => candidate.id === conversationId,
    );

    if (!conversation) {
      return serviceFail('not_found', 'That conversation no longer exists.');
    }

    const trimmed = body.trim();
    if (!trimmed) {
      return serviceFail('validation', 'Write a message before sending.');
    }

    const sender = mockStore.session;

    const message: ChatMessage = {
      id: nextMockId('msg'),
      conversationId,
      senderId: sender?.id ?? 'demo',
      senderName: sender?.name ?? 'Demo Owner',
      body: trimmed,
      sentAt: new Date().toISOString(),
    };

    mockStore.messages.push(message);
    conversation.lastMessageAt = message.sentAt;

    return serviceOk(message);
  },
};
