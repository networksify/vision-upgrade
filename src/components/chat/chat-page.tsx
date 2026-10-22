'use client';

import * as React from 'react';
import { MessagesSquareIcon, TriangleAlertIcon } from 'lucide-react';
import { toast } from 'sonner';

import { ConversationList } from '@/components/chat/conversation-list';
import { MessageComposer } from '@/components/chat/message-composer';
import { MessageThread } from '@/components/chat/message-thread';
import { DemoNotice } from '@/components/dashboard/demo-notice';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from 'cn';
import { useServices } from '@/lib/providers/service-context';
import type { ChatMessage, Conversation } from '@/types/dashboard';

type LoadStatus = 'loading' | 'ready' | 'error';

/**
 * Company chat screen.
 *
 * The layout is a two pane inbox on desktop and a single pane flow on small
 * screens. Conversations, history and delivery all go through `ChatService`,
 * so pointing the service at a websocket-backed provider is the only change a
 * real chat integration needs.
 */
export function ChatPage() {
  const { chat } = useServices();
  const { user } = useAuth();

  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');

  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [conversationsStatus, setConversationsStatus] = React.useState<LoadStatus>('loading');
  const [conversationsError, setConversationsError] = React.useState<string | null>(null);

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [messagesStatus, setMessagesStatus] = React.useState<LoadStatus>('ready');
  const [messagesError, setMessagesError] = React.useState<string | null>(null);
  const [sendError, setSendError] = React.useState<string | null>(null);

  const [reloadToken, setReloadToken] = React.useState(0);
  const [mobileView, setMobileView] = React.useState<'list' | 'thread'>('list');

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 250);
    return () => clearTimeout(timer);
  }, [search]);

  React.useEffect(() => {
    let active = true;
    setConversationsStatus('loading');

    void chat
      .listConversations({ search: debouncedSearch })
      .then((result) => {
        if (!active) return;

        if (!result.ok) {
          setConversations([]);
          setConversationsStatus('error');
          setConversationsError(result.error.message);
          return;
        }

        setConversations(result.data.items);
        setConversationsStatus('ready');
        setConversationsError(null);

        // Keep a valid selection as the list changes.
        setSelectedId((current) => {
          if (current && result.data.items.some((item) => item.id === current)) return current;
          return result.data.items[0]?.id ?? null;
        });
      })
      .catch(() => {
        if (!active) return;
        setConversations([]);
        setConversationsStatus('error');
        setConversationsError('The conversation list could not be loaded.');
      });

    return () => {
      active = false;
    };
  }, [chat, debouncedSearch, reloadToken]);

  React.useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      setMessagesStatus('ready');
      setMessagesError(null);
      return;
    }

    let active = true;
    setMessagesStatus('loading');
    setMessagesError(null);

    void chat
      .listMessages(selectedId)
      .then((result) => {
        if (!active) return;

        if (!result.ok) {
          setMessages([]);
          setMessagesStatus('error');
          setMessagesError(result.error.message);
          return;
        }

        setMessages(result.data);
        setMessagesStatus('ready');
      })
      .catch(() => {
        if (!active) return;
        setMessages([]);
        setMessagesStatus('error');
        setMessagesError('The message history could not be loaded.');
      });

    return () => {
      active = false;
    };
  }, [chat, selectedId]);

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ?? null;

  const handleSend = async (body: string): Promise<boolean> => {
    if (!selectedId) return false;

    setSendError(null);
    const result = await chat.sendMessage(selectedId, body);

    if (!result.ok) {
      setSendError(result.error.message);
      return false;
    }

    setSendError(null);
    setMessages((current) => [...current, result.data]);

    // Reflect the new timestamp in the list without a second round trip.
    setConversations((current) =>
      current
        .map((conversation) =>
          conversation.id === selectedId
            ? { ...conversation, lastMessageAt: result.data.sentAt, unreadCount: 0 }
            : conversation,
        )
        .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt)),
    );

    toast.success('Message added to this demo conversation.');
    return true;
  };

  return (
    <div className="flex flex-col gap-6">
      <DemoNotice>
        This is a mock inbox. The people and conversations are fabricated, and sending a message
        stores it in this browser session only — it is never delivered to anyone.
      </DemoNotice>

      <Card className="gap-0 overflow-hidden border-line bg-white py-0">
        <CardContent className="p-0">
          {conversationsStatus === 'error' ? (
            <div className="flex flex-col items-start gap-3 p-6">
              <span className="flex items-center gap-2 text-destructive">
                <TriangleAlertIcon className="size-5" aria-hidden="true" />
                <p className="font-semibold">The conversation list could not be loaded</p>
              </span>
              <p className="text-sm text-muted-foreground">{conversationsError}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReloadToken((token) => token + 1)}
              >
                Try again
              </Button>
            </div>
          ) : (
            <div className="grid h-[calc(100svh-17rem)] min-h-[30rem] lg:grid-cols-[20rem_1fr]">
              <div
                className={cn(
                  'min-h-0 border-line lg:block lg:border-r',
                  mobileView === 'thread' ? 'hidden' : 'block',
                )}
              >
                <ConversationList
                  conversations={conversations}
                  selectedId={selectedId}
                  onSelect={(conversation) => {
                    setSelectedId(conversation.id);
                    setMobileView('thread');
                  }}
                  search={search}
                  onSearchChange={setSearch}
                  loading={conversationsStatus === 'loading'}
                />
              </div>

              <div
                className={cn(
                  'flex min-h-0 flex-col lg:flex',
                  mobileView === 'list' ? 'hidden' : 'flex',
                )}
              >
                {selectedConversation ? (
                  <>
                    <div className="min-h-0 flex-1">
                      <MessageThread
                        conversation={selectedConversation}
                        messages={messages}
                        loading={messagesStatus === 'loading'}
                        error={messagesError}
                        currentUserId={user?.id ?? ''}
                        onBack={() => setMobileView('list')}
                      />
                    </div>

                    <MessageComposer onSend={handleSend} error={sendError} />
                  </>
                ) : conversationsStatus === 'loading' ? (
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-24 w-2/3" />
                    <Skeleton className="ml-auto h-24 w-2/3" />
                  </div>
                ) : (
                  <Empty className="flex-1 border-0">
                    <EmptyHeader>
                      <EmptyTitle>No conversation selected</EmptyTitle>
                      <EmptyDescription>
                        Pick a conversation on the left to read its history.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <MessagesSquareIcon className="size-3.5" aria-hidden="true" />
        Messages are held in this browser session only and are cleared on reload.
      </p>
    </div>
  );
}
