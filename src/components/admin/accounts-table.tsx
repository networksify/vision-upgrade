'use client';

import * as React from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  MoreHorizontalIcon,
  PencilIcon,
  UserCheckIcon,
  UserXIcon,
} from 'lucide-react';

import { AccountRoleBadge, AccountStatusBadge } from '@/components/admin/account-badges';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatRelativeTime } from '@/lib/format';
import type { AdministratorSortField, SortDirection } from '@/lib/services';
import type { AdministratorAccount } from '@/types/dashboard';

type AccountsTableProps = {
  accounts: AdministratorAccount[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  sortBy: AdministratorSortField;
  sortDirection: SortDirection;
  onSortChange: (field: AdministratorSortField) => void;
  onEdit: (account: AdministratorAccount) => void;
  onToggleStatus: (account: AdministratorAccount) => void;
  /** Whether a search term or a filter is currently narrowing the list. */
  filtered: boolean;
  onClearFilters: () => void;
};

type SortableHeaderProps = {
  field: AdministratorSortField;
  label: string;
  activeField: AdministratorSortField;
  direction: SortDirection;
  onSortChange: (field: AdministratorSortField) => void;
  className?: string;
};

/** Column header that toggles the sort field of the service query. */
function SortableHeader({
  field,
  label,
  activeField,
  direction,
  onSortChange,
  className,
}: SortableHeaderProps) {
  const active = activeField === field;

  return (
    <TableHead className={className} aria-sort={active ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <button
        type="button"
        onClick={() => onSortChange(field)}
        className="group -mx-1 inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase transition-colors hover:text-navy"
      >
        {label}
        {active ? (
          direction === 'asc' ? (
            <ArrowUpIcon className="size-3.5 text-navy" aria-hidden="true" />
          ) : (
            <ArrowDownIcon className="size-3.5 text-navy" aria-hidden="true" />
          )
        ) : (
          <ChevronsUpDownIcon
            className="size-3.5 opacity-40 group-hover:opacity-70"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">
          {active
            ? `sorted ${direction === 'asc' ? 'ascending' : 'descending'}`
            : 'not sorted'}
        </span>
      </button>
    </TableHead>
  );
}

/**
 * Administrator accounts table.
 *
 * The table is deliberately hand rolled rather than driven by a headless grid
 * library: the service layer already owns paging, filtering and sorting, so a
 * client-side row model would fight the data source instead of helping it.
 */
export function AccountsTable({
  accounts,
  total,
  page,
  pageSize,
  loading,
  sortBy,
  sortDirection,
  onSortChange,
  onEdit,
  onToggleStatus,
  filtered,
  onClearFilters,
}: AccountsTableProps) {
  const firstRow = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastRow = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-line bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader
                field="name"
                label="Name"
                activeField={sortBy}
                direction={sortDirection}
                onSortChange={onSortChange}
              />
              <SortableHeader
                field="username"
                label="Username"
                activeField={sortBy}
                direction={sortDirection}
                onSortChange={onSortChange}
              />
              <SortableHeader
                field="role"
                label="Role"
                activeField={sortBy}
                direction={sortDirection}
                onSortChange={onSortChange}
              />
              <SortableHeader
                field="status"
                label="Status"
                activeField={sortBy}
                direction={sortDirection}
                onSortChange={onSortChange}
              />
              <SortableHeader
                field="lastActiveAt"
                label="Last active"
                activeField={sortBy}
                direction={sortDirection}
                onSortChange={onSortChange}
                className="hidden lg:table-cell"
              />
              <TableHead className="w-12 text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: 5 }, (_, row) => (
                <TableRow key={row}>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="ml-auto h-6 w-6" />
                  </TableCell>
                </TableRow>
              ))
            ) : accounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="p-0">
                  <Empty className="m-0 border-0 py-12">
                    <EmptyHeader>
                      <EmptyTitle>
                        {filtered ? 'No accounts match your search' : 'No administrator accounts yet'}
                      </EmptyTitle>
                      <EmptyDescription>
                        {filtered
                          ? 'Try a different name, username or filter.'
                          : 'Add the first administrator to give a colleague access to the dashboard.'}
                      </EmptyDescription>
                    </EmptyHeader>
                    {filtered ? (
                      <Button variant="outline" size="sm" onClick={onClearFilters}>
                        Clear search and filters
                      </Button>
                    ) : null}
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium text-navy">{account.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {account.username}
                  </TableCell>
                  <TableCell>
                    <AccountRoleBadge role={account.role} />
                  </TableCell>
                  <TableCell>
                    <AccountStatusBadge status={account.status} />
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                    {formatRelativeTime(account.lastActiveAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${account.name}`}>
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => onEdit(account)}>
                          <PencilIcon />
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onToggleStatus(account)}>
                          {account.status === 'active' ? (
                            <>
                              <UserXIcon />
                              Disable account
                            </>
                          ) : (
                            <>
                              <UserCheckIcon />
                              Enable account
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {loading
          ? 'Loading accounts…'
          : total === 0
            ? 'No accounts to show.'
            : `Showing ${firstRow}–${lastRow} of ${total} ${total === 1 ? 'account' : 'accounts'}`}
      </p>
    </div>
  );
}
