'use client';

import * as React from 'react';
import { FilterXIcon, SearchIcon, TriangleAlertIcon, UserPlusIcon } from 'lucide-react';
import { toast } from 'sonner';

import { AccountDialog } from '@/components/admin/account-dialog';
import { AccountsTable } from '@/components/admin/accounts-table';
import { DemoNotice } from '@/components/dashboard/demo-notice';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import {
  ACCOUNT_STATUS_OPTIONS,
  ROLE_OPTIONS,
} from '@/lib/labels';
import { useServices } from '@/lib/providers/service-context';
import type { AdministratorSortField, SortDirection } from '@/lib/services';
import type { AccountStatus, AdministratorAccount, AdminRole } from '@/types/dashboard';

type AccountsState = {
  status: 'loading' | 'ready' | 'error';
  items: AdministratorAccount[];
  total: number;
  message: string | null;
};

const INITIAL_STATE: AccountsState = {
  status: 'loading',
  items: [],
  total: 0,
  message: null,
};

const PAGE_SIZES = [10, 25, 50] as const;

/**
 * Admin accounts screen.
 *
 * Everything on this page comes from the `AdministratorService` contract: the
 * component never imports the mock data. Search, filters, sorting and paging
 * are all expressed as a service query, so the same screen works against an
 * HTTP provider without a rewrite.
 */
export function AccountsPage() {
  const { administrators } = useServices();

  const [searchInput, setSearchInput] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [role, setRole] = React.useState<AdminRole | 'all'>('all');
  const [status, setStatus] = React.useState<AccountStatus | 'all'>('all');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [sortBy, setSortBy] = React.useState<AdministratorSortField>('name');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');

  const [state, setState] = React.useState<AccountsState>(INITIAL_STATE);
  const [reloadToken, setReloadToken] = React.useState(0);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<AdministratorAccount | null>(null);
  const [pendingStatus, setPendingStatus] = React.useState<AdministratorAccount | null>(null);
  const [statusWorking, setStatusWorking] = React.useState(false);

  // Debounce the search box so typing does not fire a request per keystroke.
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchInput]);

  /**
   * Deep links.
   *
   * `?create=1` opens the add dialog and `?q=` pre-fills the search. They are
   * read from `window.location.search` in an effect so the route stays
   * statically rendered.
   */
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSearch = params.get('q');

    if (requestedSearch) {
      setSearchInput(requestedSearch);
      setSearch(requestedSearch.trim());
    }

    if (params.get('create') === '1') {
      setEditing(null);
      setDialogOpen(true);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    setState((current) => ({ ...current, status: 'loading' }));

    void administrators
      .list({ search, role, status, page, pageSize, sortBy, sortDirection })
      .then((result) => {
        if (!active) return;

        if (!result.ok) {
          setState({
            status: 'error',
            items: [],
            total: 0,
            message: result.error.message,
          });
          return;
        }

        setState({
          status: 'ready',
          items: result.data.items,
          total: result.data.total,
          message: null,
        });
      })
      .catch(() => {
        if (!active) return;
        setState({
          status: 'error',
          items: [],
          total: 0,
          message: 'The account list could not be loaded.',
        });
      });

    return () => {
      active = false;
    };
  }, [administrators, search, role, status, page, pageSize, sortBy, sortDirection, reloadToken]);

  // A shorter result set can leave the visitor on a page that no longer exists.
  React.useEffect(() => {
    if (state.status !== 'ready') return;

    const lastPage = Math.max(1, Math.ceil(state.total / pageSize));
    if (page > lastPage) setPage(lastPage);
  }, [state, page, pageSize]);

  const handleSortChange = (field: AdministratorSortField) => {
    if (field === sortBy) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortBy(field);
    setSortDirection('asc');
    setPage(1);
  };

  const handleSaved = () => {
    toast.success(editing ? 'Account updated.' : 'Administrator added.');
    setReloadToken((token) => token + 1);
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearch('');
    setRole('all');
    setStatus('all');
    setPage(1);
  };

  const confirmStatusChange = async () => {
    if (!pendingStatus) return;

    const nextStatus: AccountStatus =
      pendingStatus.status === 'active' ? 'disabled' : 'active';

    setStatusWorking(true);
    const result = await administrators.setStatus(pendingStatus.id, nextStatus);
    setStatusWorking(false);

    if (!result.ok) {
      toast.error(result.error.message);
      setPendingStatus(null);
      return;
    }

    toast.success(
      nextStatus === 'active'
        ? `${pendingStatus.name} can sign in again.`
        : `${pendingStatus.name} can no longer sign in.`,
    );

    setPendingStatus(null);
    setReloadToken((token) => token + 1);
  };

  const totalPages = Math.max(1, Math.ceil(state.total / pageSize));
  const hasFilters = search !== '' || role !== 'all' || status !== 'all';

  return (
    <div className="flex flex-col gap-6">
      <DemoNotice>
        These are demo administrator accounts. No real person is listed here, and no credential is
        stored anywhere in this prototype.
      </DemoNotice>

      <Card className="gap-0 border-line bg-white">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <div className="flex flex-1 flex-col gap-1.5">
              <Label htmlFor="account-search">Search accounts</Label>
              <div className="relative">
                <SearchIcon
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="account-search"
                  type="search"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Name or username"
                  className="h-10 pl-9"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:w-48">
              <Label htmlFor="role-filter">Role</Label>
              <Select
                value={role}
                onValueChange={(value) => {
                  setRole(value as AdminRole | 'all');
                  setPage(1);
                }}
              >
                <SelectTrigger id="role-filter" className="h-10 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  {ROLE_OPTIONS.map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5 sm:w-48">
              <Label htmlFor="status-filter">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value as AccountStatus | 'all');
                  setPage(1);
                }}
              >
                <SelectTrigger id="status-filter" className="h-10 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {ACCOUNT_STATUS_OPTIONS.map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              className="h-10 lg:ml-auto"
              onClick={() => {
                setEditing(null);
                setDialogOpen(true);
              }}
            >
              <UserPlusIcon />
              Add administrator
            </Button>
          </div>

          {hasFilters ? (
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">Filters are narrowing this list.</p>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <FilterXIcon />
                Clear filters
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {state.status === 'error' ? (
        <Card className="gap-0 border-destructive/30 bg-white">
          <CardContent className="flex flex-col items-start gap-3 p-5">
            <span className="flex items-center gap-2 text-destructive">
              <TriangleAlertIcon className="size-5" aria-hidden="true" />
              <p className="font-semibold">The account list could not be loaded</p>
            </span>
            <p className="text-sm text-muted-foreground">{state.message}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReloadToken((token) => token + 1)}
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : (
        <AccountsTable
          accounts={state.items}
          total={state.total}
          page={page}
          pageSize={pageSize}
          loading={state.status === 'loading'}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          onEdit={(account) => {
            setEditing(account);
            setDialogOpen(true);
          }}
          onToggleStatus={(account) => setPendingStatus(account)}
          filtered={hasFilters}
          onClearFilters={clearFilters}
        />
      )}

      {state.status === 'ready' && state.total > 0 ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="page-size" className="text-sm text-muted-foreground">
              Rows per page
            </Label>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setPage(1);
              }}
            >
              <SelectTrigger id="page-size" className="h-8 w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZES.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}

      <AccountDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        account={editing}
        onSaved={handleSaved}
      />

      <AlertDialog
        open={pendingStatus !== null}
        onOpenChange={(open) => {
          if (!open) setPendingStatus(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingStatus?.status === 'active' ? 'Disable this account?' : 'Enable this account?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingStatus?.status === 'active'
                ? `${pendingStatus?.name} will no longer be able to sign in to the dashboard. Their records are kept.`
                : `${pendingStatus?.name} will be able to sign in to the dashboard again.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={statusWorking}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                // Keep the dialog open while the request is in flight.
                event.preventDefault();
                void confirmStatusChange();
              }}
              disabled={statusWorking}
            >
              {statusWorking ? <Spinner /> : null}
              {pendingStatus?.status === 'active' ? 'Disable account' : 'Enable account'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
