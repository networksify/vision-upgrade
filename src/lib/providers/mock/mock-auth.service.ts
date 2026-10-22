import type { AuthService, ServiceResult, SignInRequest } from '@/lib/services/contracts';
import { serviceFail, serviceOk } from '@/lib/services/contracts';
import type { SessionUser } from '@/types/dashboard';

import { mockStore } from './store';

/**
 * Demo authentication adapter.
 *
 * IMPORTANT — this adapter is not authentication.
 *
 * It keeps the session in a JavaScript variable, verifies no credentials, and
 * protects nothing. It exists so the dashboard UI can be built and reviewed
 * without a backend. Before this dashboard is used for anything real, the
 * adapter must be replaced by a server-side provider that:
 *
 *   1. receives the credentials over HTTPS only;
 *   2. hashes them on the server (Argon2id or bcrypt) and never returns them;
 *   3. issues an opaque session in an `HttpOnly; Secure; SameSite=Lax` cookie;
 *   4. re-checks the session on every privileged request.
 *
 * No password is stored, compared or transmitted by this file: the check below
 * only confirms that the visitor typed a username that exists in the demo
 * seed data and an active account. Any non-empty password is accepted.
 */

const DEMO_LATENCY_MS = 250;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const mockAuthService: AuthService = {
  async getSession(): Promise<SessionUser | null> {
    await delay(120);
    return mockStore.session ? { ...mockStore.session } : null;
  },

  async signIn({ username, password }: SignInRequest): Promise<ServiceResult<SessionUser>> {
    await delay(DEMO_LATENCY_MS);

    const trimmedUsername = username.trim().toLowerCase();
    const account = mockStore.administrators.find(
      (candidate) => candidate.username.toLowerCase() === trimmedUsername,
    );

    if (!account || account.status !== 'active') {
      // Deliberately generic: the message must not reveal whether the account
      // exists, and it is the same text a real provider would return.
      return serviceFail(
        'unauthorized',
        'We could not sign you in with those details. Check them and try again.',
      );
    }

    if (password.length === 0) {
      return serviceFail('unauthorized', 'We could not sign you in with those details. Check them and try again.');
    }

    const user: SessionUser = {
      id: account.id,
      name: account.name,
      username: account.username,
      role: account.role,
    };

    mockStore.session = user;
    return serviceOk(user);
  },

  async signOut(): Promise<void> {
    await delay(80);
    mockStore.session = null;
  },
};
