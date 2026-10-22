'use client';

import * as React from 'react';
import { ArrowLeftIcon, TriangleAlertIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from 'cn';
import { formatDateTime, formatRelativeTime, initialsOf } from '@/lib/format';
import type { ChatMessage, Conversation } from '@/types/dashboard';

type MessageThreadProps = {
  conversation: Conversation;
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  currentUserId: string;
  onBack: () => void;
};

/**
 * Read-only message history.
 *
 * Messages are compared against the signed-in id to decide which side of the
 * thread they belong on. The prototype stores the session in memory, so after a
 * reload every message renders as a received one — the demo adapter never
 * pretends a message was delivered to a real person.
 */
export function MessageThread({
  conversation,
  messages,
  loading,
  error,
  currentUserId,
  onBack,
}: MessageThreadProps) {
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (loading || error) return;
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [loading, error, messages.length]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-start gap-3 border-b border-line p-4">
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          onClick={onBack}
          aria-label="Back to conversations"
        >
          <ArrowLeftIcon />
        </Button>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-navy">{conversation.title}</h2>
          <p className="truncate text-xs text-muted-foreground">
            {conversation.participants.join(' · ')}
          </p>
        </div>

        <p className="hidden shrink-0 text-xs text-muted-foreground sm:block">
          Last message {formatRelativeTime(conversation.lastMessageAt)}
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-surface/60 p-4">
        {error ? (
          <div
            role="alert"
            className="mx-auto flex max-w-md items-start gap-2.5 rounded-lg border border-destructive/30 bg-white p-3 text-sm text-destructive"
          >
            <TriangleAlertIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <p>{error}</p>
          </div>
        ) : loading ? (
          <ul className="flex flex-col gap-4">
            {[0, 1, 2, 3].map((row) => (
              <li
                key={row}
                className={cn('flex items-end gap-2', row % 2 === 0 ? '' : 'flex-row-reverse')}
              >
                <Skeleton className="size-8 shrink-0 rounded-full" />
                <Skeleton className="h-16 w-2/5 rounded-xl" />
              </li>
            ))}
          </ul>
        ) : messages.length === 0 ? (
          <Empty className="border-0">
            <EmptyHeader>
              <EmptyTitle>No messages yet</EmptyTitle>
              <EmptyDescription>
                This conversation is empty. Send the first message to start it.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="flex flex-col gap-4">
            {messages.map((message) => {
              const own = message.senderId === currentUserId;

              return (
                <li
                  key={message.id}
                  className={cn('flex items-end gap-2', own ? 'flex-row-reverse' : '')}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold',
                      own ? 'bg-brand text-navy' : 'bg-navy/8 text-navy',
                    )}
                  >
                    {initialsOf(message.senderName)}
                  </span>

                  <div className={cn('flex max-w-[75%] flex-col gap-1', own ? 'items-end' : '')}>
                    <p className="px-1 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {own ? 'You' : message.senderName}
                      </span>{' '}
                      <time dateTime={message.sentAt} title={formatDateTime(message.sentAt)}>
                        {formatRelativeTime(message.sentAt)}
                      </time>
                    </p>

                    <div
                      className={cn(
                        'rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line',
                        own
                          ? 'rounded-br-sm bg-navy text-white'
                          : 'rounded-bl-sm border border-line bg-white text-foreground',
                      )}
                    >
                      {message.body}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div ref={endRef} />
      </div>
    </div>
  );
}
