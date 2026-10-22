import type {
  AdministratorListQuery,
  AdministratorListResponse,
  AdministratorService,
  AdministratorSortField,
  CreateAdministratorRequest,
  ServiceResult,
  SortDirection,
  UpdateAdministratorRequest,
} from '@/lib/services/contracts';
import { serviceFail, serviceOk } from '@/lib/services/contracts';
import type { AdministratorAccount, AccountStatus } from '@/types/dashboard';

import { mockStore, nextMockId } from './store';

const DEMO_LATENCY_MS = 220;
const DEMO_MUTATION_LATENCY_MS = 320;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Compares two accounts on the requested field.
 *
 * `lastActiveAt` is nullable, so accounts that have never signed in sort last
 * regardless of direction rather than jumping to the top.
 */
const compareBy = (
  field: AdministratorSortField,
  a: AdministratorAccount,
  b: AdministratorAccount,
): number => {
  switch (field) {
    case 'username':
      return a.username.localeCompare(b.username);
    case 'role':
      return a.role.localeCompare(b.role);
    case 'status':
      return a.status.localeCompare(b.status);
    case 'createdAt':
      return a.createdAt.localeCompare(b.createdAt);
    case 'lastActiveAt': {
      if (!a.lastActiveAt && !b.lastActiveAt) return 0;
      if (!a.lastActiveAt) return 1;
      if (!b.lastActiveAt) return -1;
      return a.lastActiveAt.localeCompare(b.lastActiveAt);
    }
    case 'name':
    default:
      return a.name.localeCompare(b.name);
  }
};

export const mockAdministratorService: AdministratorService = {
  async list(query: AdministratorListQuery = {}): Promise<ServiceResult<AdministratorListResponse>> {
    await delay(DEMO_LATENCY_MS);

    const search = query.search?.trim().toLowerCase() ?? '';
    const role = query.role ?? 'all';
    const status = query.status ?? 'all';
    const page = Math.max(1, query.page ?? 1);
    const pageSize = Math.max(1, query.pageSize ?? 10);
    const sortBy = query.sortBy ?? 'name';
    const sortDirection: SortDirection = query.sortDirection ?? 'asc';

    const filtered = mockStore.administrators.filter((account) => {
      if (role !== 'all' && account.role !== role) return false;
      if (status !== 'all' && account.status !== status) return false;
      if (!search) return true;
      return (
        account.name.toLowerCase().includes(search) ||
        account.username.toLowerCase().includes(search)
      );
    });

    const factor = sortDirection === 'asc' ? 1 : -1;
    filtered.sort((a, b) => compareBy(sortBy, a, b) * factor);

    const start = (page - 1) * pageSize;

    return serviceOk({
      items: filtered.slice(start, start + pageSize).map((account) => ({ ...account })),
      total: filtered.length,
      page,
      pageSize,
    });
  },

  async create(
    request: CreateAdministratorRequest,
  ): Promise<ServiceResult<AdministratorAccount>> {
    await delay(DEMO_MUTATION_LATENCY_MS);

    const username = request.username.trim().toLowerCase();
    const exists = mockStore.administrators.some(
      (account) => account.username.toLowerCase() === username,
    );

    if (exists) {
      return serviceFail('conflict', 'That username is already taken.', {
        username: ['That username is already taken.'],
      });
    }

    const account: AdministratorAccount = {
      id: nextMockId('adm'),
      name: request.name.trim(),
      username,
      role: request.role,
      status: 'active',
      createdAt: new Date().toISOString(),
      lastActiveAt: null,
    };

    mockStore.administrators.push(account);

    return serviceOk(account);
  },

  async update(
    id: string,
    request: UpdateAdministratorRequest,
  ): Promise<ServiceResult<AdministratorAccount>> {
    await delay(DEMO_MUTATION_LATENCY_MS);

    const account = mockStore.administrators.find((candidate) => candidate.id === id);
    if (!account) {
      return serviceFail('not_found', 'That administrator account no longer exists.');
    }

    const username = request.username.trim().toLowerCase();
    const taken = mockStore.administrators.some(
      (candidate) => candidate.id !== id && candidate.username.toLowerCase() === username,
    );

    if (taken) {
      return serviceFail('conflict', 'That username is already taken.', {
        username: ['That username is already taken.'],
      });
    }

    account.name = request.name.trim();
    account.username = username;
    account.role = request.role;

    return serviceOk({ ...account });
  },

  async setStatus(
    id: string,
    status: AccountStatus,
  ): Promise<ServiceResult<AdministratorAccount>> {
    await delay(DEMO_MUTATION_LATENCY_MS);

    const account = mockStore.administrators.find((candidate) => candidate.id === id);
    if (!account) {
      return serviceFail('not_found', 'That administrator account no longer exists.');
    }

    if (account.status === status) {
      return serviceOk({ ...account });
    }

    account.status = status;

    return serviceOk({ ...account });
  },
};
