'use client';

import * as React from 'react';
import { TriangleAlertIcon } from 'lucide-react';

import { AccountRoleBadge } from '@/components/admin/account-badges';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { ROLE_OPTIONS } from '@/lib/labels';
import { useServices } from '@/lib/providers/service-context';
import { administratorSchema } from '@/lib/validation/schemas';
import type { AdministratorAccount, AdminRole } from '@/types/dashboard';

type AccountDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** `null` creates a new account, an account edits that one. */
  account: AdministratorAccount | null;
  onSaved: () => void;
};

type FormErrors = Partial<
  Record<'name' | 'username' | 'role' | 'form', string>
>;

type AccountFormProps = {
  account: AdministratorAccount | null;
  onCancel: () => void;
  onSaved: () => void;
};

/**
 * Create or edit an administrator account.
 *
 * There is no password field, on purpose. A credential must never be typed
 * into or stored by the browser: the backend provisions the first password
 * (an invitation link or a server-generated one-time secret) so that nothing
 * sensitive reaches the client.
 *
 * The form lives in its own component because Radix unmounts the dialog
 * contents while it is closed. Every time the dialog opens the form is created
 * fresh, initialised from `account`, which removes the need to reset it from an
 * effect.
 */
export function AccountDialog({ open, onOpenChange, account, onSaved }: AccountDialogProps) {
  const editing = account !== null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit administrator' : 'Add administrator'}</DialogTitle>
          <DialogDescription>
            {editing
              ? 'Update the details and the access level of this account.'
              : 'Create an account for a colleague who needs access to the dashboard.'}
          </DialogDescription>
        </DialogHeader>

        <AccountForm
          account={account}
          onCancel={() => onOpenChange(false)}
          onSaved={() => {
            onSaved();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function AccountForm({ account, onCancel, onSaved }: AccountFormProps) {
  const { administrators } = useServices();

  const [name, setName] = React.useState(account?.name ?? '');
  const [username, setUsername] = React.useState(account?.username ?? '');
  const [role, setRole] = React.useState<AdminRole>(account?.role ?? 'administrator');
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  const editing = account !== null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = administratorSchema.safeParse({ name, username, role });
    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if ((key === 'name' || key === 'username' || key === 'role') && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const result = editing
      ? await administrators.update(account.id, parsed.data)
      : await administrators.create(parsed.data);

    setSubmitting(false);

    if (!result.ok) {
      const serverErrors: FormErrors = { form: result.error.message };
      for (const [field, messages] of Object.entries(result.error.fieldErrors ?? {})) {
        const key = field as keyof FormErrors;
        if (key === 'name' || key === 'username' || key === 'role') {
          serverErrors[key] = messages[0];
        }
      }
      setErrors(serverErrors);
      return;
    }

    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {errors.form ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <TriangleAlertIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>{errors.form}</p>
        </div>
      ) : null}

      <Field data-invalid={Boolean(errors.name)}>
        <FieldLabel htmlFor="account-name">Full name</FieldLabel>
        <Input
          id="account-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'account-name-error' : undefined}
          placeholder="Demo Content Editor"
          className="h-10"
        />
        <FieldError
          id="account-name-error"
          errors={errors.name ? [{ message: errors.name }] : undefined}
        />
      </Field>

      <Field data-invalid={Boolean(errors.username)}>
        <FieldLabel htmlFor="account-username">Username</FieldLabel>
        <Input
          id="account-username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          aria-invalid={Boolean(errors.username)}
          aria-describedby={errors.username ? 'account-username-error' : undefined}
          placeholder="demo.editor"
          autoComplete="off"
          className="h-10"
        />
        <FieldError
          id="account-username-error"
          errors={errors.username ? [{ message: errors.username }] : undefined}
        />
      </Field>

      <Field data-invalid={Boolean(errors.role)}>
        <FieldLabel htmlFor="account-role">Role</FieldLabel>
        <Select value={role} onValueChange={(value) => setRole(value as AdminRole)}>
          <SelectTrigger id="account-role" className="h-10 w-full">
            <SelectValue placeholder="Choose a role" />
          </SelectTrigger>
          <SelectContent>
            {ROLE_OPTIONS.map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldDescription>
          <span className="inline-flex items-center gap-2">
            Current role: <AccountRoleBadge role={role} />
          </span>
        </FieldDescription>
        <FieldError
          id="account-role-error"
          errors={errors.role ? [{ message: errors.role }] : undefined}
        />
      </Field>

      {!editing ? (
        <div className="rounded-lg border border-line bg-surface p-3.5 text-sm text-muted-foreground">
          No password is set here. A production backend would email the new administrator an
          invitation and let them choose their own password.
        </div>
      ) : null}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner />
              Saving…
            </>
          ) : editing ? (
            'Save changes'
          ) : (
            'Add administrator'
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
