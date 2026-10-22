'use client';

import * as React from 'react';
import { MessagesSquareIcon, SearchIcon } from 'lucide-react';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from 'cn';
import { formatRelativeTime, initialsOf } from '@/lib/format';
import type { Conversation } from '@/types/dashboard';

type ConversationListProps = {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (conversation: Conversation) => void;
  search: string;
  onSearchChange: (value: string) => void;
  loading: boolean;
};

/** Scrollable conversation picker with its own search box. */
export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  search,
  onSearchChange,
  loading,
}: ConversationListProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-line p-3">
        <label htmlFor="conversation-search" className="sr-only">
          Search conversations
        </label>
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="conversation-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search conversations"
            className="h-9 pl-9"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading ? (
          <ul className="flex flex-col gap-0.5 p-2">
            {[0, 1, 2, 3, 4].map((row) => (
              <li key={row} className="flex items-center gap-3 p-3">
                <Skeleton className="size-9 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </li>
            ))}
          </ul>
        ) : conversations.length === 0 ? (
          <Empty className="border-0 py-10">
            <EmptyHeader>
              <EmptyTitle>No conversations found</EmptyTitle>
              <EmptyDescription>
                {search
                  ? 'Try a different name or topic.'
                  : 'Conversations will appear here once the team starts talking.'}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="flex flex-col gap-0.5 p-2">
            {conversations.map((conversation) => {
              const active = conversation.id === selectedId;

              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(conversation)}
                    aria-current={active ? 'true' : undefined}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors',
                      active ? 'bg-brand-tint' : 'hover:bg-surface',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                        active ? 'bg-brand text-navy' : 'bg-navy/8 text-navy',
                      )}
                    >
                      {initialsOf(conversation.title)}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span
                          className={cn(
                            'truncate text-sm font-semibold',
                            active ? 'text-navy' : 'text-foreground',
                          )}
                        >
                          {conversation.title}
                        </span>
                        <span className="shrink-0 text-xs whitespace-nowrap text-muted-foreground">
                          {formatRelativeTime(conversation.lastMessageAt)}
                        </span>
                      </span>

                      <span className="mt-0.5 flex items-center justify-between gap-2">
                        <span className="truncate text-xs text-muted-foreground">
                          {conversation.participants.join(', ')}
                        </span>
                        {conversation.unreadCount > 0 ? (
                          <span className="shrink-0 rounded-full bg-navy px-1.5 py-0.5 text-[10px] leading-none font-semibold text-white">
                            {conversation.unreadCount}
                            <span className="sr-only"> unread</span>
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-line px-3 py-2">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MessagesSquareIcon className="size-3.5" aria-hidden="true" />
          Mock conversations — not connected to anyone.
        </p>
      </div>
    </div>
  );
}
