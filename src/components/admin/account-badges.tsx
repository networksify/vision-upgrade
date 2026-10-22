import { Badge } from '@/components/ui/badge';
import { ACCOUNT_STATUS_LABELS, ROLE_LABELS } from '@/lib/labels';
import type { AccountStatus, AdminRole } from '@/types/dashboard';

/** Role chip for a table cell or a form summary. */
export function AccountRoleBadge({ role }: { role: AdminRole }) {
  return (
    <Badge variant="outline" className="border-line text-navy">
      {ROLE_LABELS[role]}
    </Badge>
  );
}

/** Status chip. Disabled accounts are muted rather than alarming. */
export function AccountStatusBadge({ status }: { status: AccountStatus }) {
  return (
    <Badge
      variant="secondary"
      className={
        status === 'active'
          ? 'bg-navy/8 text-navy hover:bg-navy/8'
          : 'bg-surface text-muted-foreground hover:bg-surface'
      }
    >
      <span
        aria-hidden="true"
        className={
          status === 'active'
            ? 'size-1.5 rounded-full bg-navy'
            : 'size-1.5 rounded-full bg-muted-foreground'
        }
      />
      {ACCOUNT_STATUS_LABELS[status]}
    </Badge>
  );
}
