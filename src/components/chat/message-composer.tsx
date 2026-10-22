'use client';

import * as React from 'react';
import { SendHorizontalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';

type MessageComposerProps = {
  onSend: (body: string) => Promise<boolean>;
  disabled?: boolean;
  /** Shown under the input when the last send attempt failed. */
  error: string | null;
};

const MAX_LENGTH = 2000;

/**
 * Message input.
 *
 * Enter sends, Shift+Enter inserts a newline. The composer clears only after
 * the service confirms the message was accepted, so a failure never loses what
 * the operator typed.
 */
export function MessageComposer({ onSend, disabled = false, error }: MessageComposerProps) {
  const [body, setBody] = React.useState('');
  const [sending, setSending] = React.useState(false);

  const trimmed = body.trim();
  const canSend = trimmed.length > 0 && trimmed.length <= MAX_LENGTH && !sending && !disabled;

  const submit = async () => {
    if (!canSend) return;

    setSending(true);
    const sent = await onSend(trimmed);
    setSending(false);

    if (sent) setBody('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void submit();
    }
  };

  return (
    <form
      className="flex flex-col gap-2 border-t border-line p-3"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      <label htmlFor="message-body" className="sr-only">
        Message
      </label>

      <Textarea
        id="message-body"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? 'Choose a conversation to write a message' : 'Write a message…'}
        rows={2}
        disabled={disabled || sending}
        maxLength={MAX_LENGTH}
        aria-describedby="message-help"
        className="min-h-16 resize-none"
      />

      <div className="flex items-center justify-between gap-3">
        <p id="message-help" className="text-xs text-muted-foreground">
          Enter sends · Shift + Enter adds a line
        </p>

        <Button type="submit" size="sm" disabled={!canSend}>
          {sending ? <Spinner /> : <SendHorizontalIcon />}
          Send
        </Button>
      </div>

      <FieldError errors={error ? [{ message: error }] : undefined} />
    </form>
  );
}
