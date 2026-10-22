# Vision Upgrade

Two products, one Next.js application:

1. **The public marketing site** — Vision Upgrade (VUSoft) presents three connected practices: **VU Kids** learning programs, **software and technology** work, and **digital marketing**.
2. **The internal admin dashboard** — a sign-in-protected workspace for managing administrator accounts, publishing courses and internal messages.

Both are **front-end only** today. Every piece of content and every record is local mock data, clearly labelled as such. Nothing is sent to a server, nothing is stored in a database, and no real person, course or conversation is represented.

- **New here?** Start with [§2 Quick start](#2-quick-start) and [§3 Demo sign-in](#3-demo-sign-in).
- **Connecting a backend?** Read [§10 Connecting a backend](#10-connecting-a-backend).
- **Reviewing the security story?** Read [§9 Authentication](#9-authentication-and-route-protection) and [§11 Security posture](#11-security-posture).

---

## Contents

1. [Quick start](#1-quick-start)
2. [Demo sign-in](#2-demo-sign-in)
3. [Routes](#3-routes)
4. [Tech stack](#4-tech-stack)
5. [Architecture](#5-architecture)
6. [The public site](#6-the-public-site)
7. [The admin dashboard](#7-the-admin-dashboard)
8. [Design system](#8-design-system)
9. [Authentication and route protection](#9-authentication-and-route-protection)
10. [Connecting a backend](#10-connecting-a-backend)
11. [Security posture](#11-security-posture)
12. [Conventions and gotchas](#12-conventions-and-gotchas)
13. [Verification](#13-verification)
14. [Project structure](#14-project-structure)
15. [Attribution](#15-attribution)
16. [Status](#16-status)

---

## 1. Quick start

Requirements: **Node.js 20.9+** (or **Bun 1.4+**, which is what the repo uses) and a modern browser.

```bash
bun install
bun run dev        # http://localhost:3000
```

Other scripts:

| Command            | What it does                                            |
| ------------------ | ------------------------------------------------------- |
| `bun run dev`      | Dev server with Turbopack and React Fast Refresh        |
| `bun run build`    | Production build + TypeScript check + static generation |
| `bun run start`    | Serve the production build                              |
| `bun run lint`     | ESLint (`eslint-config-next`, core-web-vitals + TS)     |

Typecheck on its own:

```bash
node node_modules/typescript/bin/tsc --noEmit
```

There are **no environment variables** today and no `.env` file. The backend integration in [§10](#10-connecting-a-backend) introduces the first ones.

> The app is configured for static prerendering (`cacheComponents: true`). Any code that reads request data — `cookies()`, `headers()`, `Date.now()`, uncached `fetch` — must sit behind a `Suspense` boundary or the build fails. Every page currently ships static.

---

## 2. Demo sign-in

The dashboard is gated by a sign-in screen at `/login`.

| Username      | Role             | Account status |
| ------------- | ---------------- | -------------- |
| `demo.owner`  | Owner            | Active         |
| `demo.admin`  | Administrator    | Active         |
| `demo.editor` | Content editor   | Active         |

**Password: any value of 8 characters or more — for example `demo1234`.**

That is not a credential. There is **no password** stored, hashed, compared or seeded anywhere in this repository, and no password is written to `localStorage`, `sessionStorage` or a `NEXT_PUBLIC_*` variable. The demo adapter checks only that the username exists in the seed data and that the account is active; the form enforces the 8-character minimum. Inventing a fake password would have implied a security model that does not exist.

The sign-in screen states this in a "Prototype mode" panel and offers the three usernames as one-click fill buttons.

> **Session behaviour:** the session is a JavaScript value in the tab. Reloading signs you out. That is deliberate — there is no cookie to forge.

Disabled demo accounts (`demo.guest`, `demo.platform`) exist so the accounts table can show the disabled state; they are rejected at sign-in.

---

## 3. Routes

| Route                 | Page                                  | Notes |
| --------------------- | ------------------------------------- | ----- |
| `/`                   | `src/app/page.tsx`                    | Landing page: hero → programs intro → VU Kids → software → digital marketing → about → why us → contact, plus navbar and footer. Static. |
| `/contact`            | `src/app/contact/page.tsx`            | Dedicated contact page sharing the same sections and footer. Static. |
| `/login`              | `src/app/(auth)/login/page.tsx`       | Dashboard sign-in. Honours `?next=` (same-origin paths only) and forwards signed-in visitors to the dashboard. |
| `/dashboard`          | `src/app/dashboard/page.tsx`          | Overview: account and course totals, recent activity, quick actions. |
| `/dashboard/accounts` | `src/app/dashboard/accounts/page.tsx` | Administrator accounts: search, filters, sorting, pagination, create, edit, enable/disable. |
| `/dashboard/courses`  | `src/app/dashboard/courses/page.tsx`  | Course catalogue: search, filters, create, edit, publish/unpublish, detail drawer. |
| `/dashboard/chat`     | `src/app/dashboard/chat/page.tsx`     | Company chat — mock conversations only. |
| `/dashboard/settings` | `src/app/dashboard/settings/page.tsx` | Signed-in account, prototype limits, backend notes. |
| `/employees`          | `src/app/employees/page.tsx`          | Unfinished placeholder. Not linked from anywhere; leave it alone until the feature is specified. |

Section anchors on the public site are `/#home`, `/#programs`, `/#vu-kids`, `/#vision-upgrade` (the software practice), `/#digital-marketing`, `/#about`, `/#why-us`, `/#contact`. Each `<section>` carries a matching `id` and `scroll-mt-24` so headings clear the fixed navbar.

---

## 4. Tech stack

| Concern      | Choice |
| ------------ | ------ |
| Framework    | Next.js **16.4.2** (App Router, Turbopack) |
| UI runtime   | React **19.3** |
| Styling      | Tailwind CSS **4** via `@tailwindcss/turbopack` |
| Language     | TypeScript **5** (`strict`) |
| Components   | **shadcn/ui** v4 registry on top of `radix-ui` (see [§15](#15-attribution)) |
| Icons        | `lucide-react` in the dashboard; a local SVG set on the public site |
| Validation   | **zod 4**, shared by every form and reusable on the server |
| Toasts       | `sonner` |
| Utilities    | `class-variance-authority`, `cn` (class merging), `tw-animate-css` |
| Package mgr  | Bun (`bun.lock`) |

`next.config.ts` enables three things worth knowing:

- **`cacheComponents: true`** — static prerendering by default; request-time APIs need `Suspense`.
- **`partialPrefetching: true`** — partial route prefetching (Next 16 instant navigation).
- **`turbopack.rules`** — loads every `*.css` through the Tailwind Turbopack loader.

---

## 5. Architecture

Two data strategies, one rule each:

> **Public site:** components never contain content. Copy and lists live in `src/data/mock/*.ts` and arrive as props.
>
> **Dashboard:** components never import demo data. Records arrive through service contracts in `src/lib/services/contracts.ts`.

```
                    ┌──────────────────────────────┐
  Public pages ────► │ components/home, layout      │ ◄── src/data/mock/*.ts (content)
                    └──────────────────────────────┘

  Dashboard pages ─► │ components/<feature>         │
                    │        │                     │
                    │        ▼                     │
                    │  useServices()               │
                    │        │                     │
                    │        ▼                     │
                    │  Service contracts           │ ◄── types/dashboard.ts (models)
                    │        │                     │
                    │        ▼                     │
                    │  Provider: mock | HTTP       │
                    └──────────────────────────────┘
```

Dependency direction is strictly downwards:

```
page → feature component → useServices() → contract → provider → data source
```

No feature component imports a provider, no provider imports a component, and `src/types/*` imports nothing.

### Layer map

| Layer | Location | May depend on |
| ----- | -------- | ------------- |
| Routes / pages | `src/app/**` | components, services types |
| UI primitives | `src/components/ui/**` | nothing project-specific |
| Public sections | `src/components/home/**`, `src/components/layout/**` | `types/types.ts` |
| Dashboard features | `src/components/{admin,courses,chat,settings,dashboard,auth}/**` | `lib/services`, `lib/providers/service-context`, `types/dashboard.ts` |
| Contracts | `src/lib/services/**` | `types/dashboard.ts` |
| Providers | `src/lib/providers/**` | contracts, validation |
| Validation | `src/lib/validation/**` | zod |
| Domain models | `src/types/**` | nothing |

### Where to make common changes

| Task | Touch only |
| ---- | ---------- |
| Change public copy | the relevant file in `src/data/mock/` |
| Add a nav link | `src/data/mock/navbar.ts` (desktop + mobile menus read the same array) |
| Add a dashboard field to an account | `types/dashboard.ts` → mock seed → contract → form schema → table |
| Add a new dashboard screen | a page in `src/app/dashboard/`, a feature folder in `src/components/`, a route entry in `DASHBOARD_PAGES` (`site-header.tsx`) and the sidebar |
| Swap mock data for a real API | `src/lib/providers/service-context.tsx` (see [§10.6](#106-step-6--swap-the-provider)) |
| Re-skin the app | `src/app/globals.css` tokens |

---

## 6. The public site

### Sections

`src/components/layout/HomeComponent.tsx` composes the landing page:

| Component | File | Data source |
| --------- | ---- | ----------- |
| `Navbar` | `layout/Navbar.tsx` | `data/mock/navbar.ts` |
| `Hero` | `home/Hero.tsx` | `data/mock/hero.ts` |
| `ProgramsIntro` | `home/ProgramsIntro.tsx` | `data/mock/programs.ts` |
| `VuKids` | `home/programs/VuKids.tsx` | `data/mock/programs.ts` |
| `Software` | `home/programs/Software.tsx` | `data/mock/programs.ts` |
| `DigitalMarketing` | `home/programs/DigitalMarketing.tsx` | `data/mock/programs.ts` |
| `About` | `home/About.tsx` | `data/mock/about.ts` |
| `WhyUs` | `home/WhyUs.tsx` | `data/mock/whyus.ts` |
| `Contact` | `home/Contact.tsx` | `data/mock/contact.ts` |
| `Footer` | `layout/Footer.tsx` | `data/mock/footer.ts` |

Pages stay thin: they import a mock object, spread it into a component, and render. Everything is a server component except `Navbar` (mobile menu state) and `Contact` (form state).

### Content contracts

All public prop shapes live in `src/types/types.ts`. Highlights:

- `BrandAssets` — the four logo files, from `src/data/brand.ts`. **The logo is never redrawn in CSS or text.**
- `HeroProps`, `ProgramsIntroProps`, `ProgramProps`, `AboutProps`, `WhyUsProps` — section content.
- `ContactProps` — details, notes and a generated form description:
  ```ts
  form: {
    mode: 'demo' | 'api';   // 'demo' validates locally; 'api' posts to endpoint
    endpoint?: string;
    fields: FormFieldConfig[];
    // labels for submit / success / error / retry states
  }
  ```
- `FooterProps`, `NavbarProps`, `SectionHeadingProps` — chrome.

`IconName` is a closed union rendered by `src/components/ui/Icon.tsx`. Adding an icon means adding the name to the union **and** its paths to the `paths` record.

> `src/data/mock/courses.ts` and `src/components/layout/Sidebar.tsx` are empty placeholders. Nothing imports them.

### The contact form

Today `contact.ts` sets `mode: 'demo'`: the form validates, shows a success state, and plainly says nothing was transmitted. To connect it:

1. Set `mode: 'api'` and `endpoint` in `src/data/mock/contact.ts`.
2. Return `2xx` on success; the component handles network and server errors, a retry action and a reset action.

Never send the form straight to a third party from the browser if the endpoint needs a secret — proxy it through a route handler.

---

## 7. The admin dashboard

### Screens and behaviour

| Screen | What works |
| ------ | ---------- |
| **Overview** (`/dashboard`) | Total administrator accounts with the active/disabled split, total courses with the draft/published split, recent course activity, recent admin activity, quick actions. All counts come from the service layer, not constants. |
| **Admin accounts** (`/dashboard/accounts`) | Debounced search, role and status filters, sortable columns, pagination with page sizes, create, edit, enable/disable behind a confirmation dialog, loading/empty/error/success states, deep links (`?q=`, `?create=1`). |
| **Courses** (`/dashboard/courses`) | Search, category and status filters, create/edit with validation, draft ↔ published, detail drawer, optional thumbnail URL. |
| **Company chat** (`/dashboard/chat`) | Conversation list, search, message history, composer and send, timestamps, sender names, empty/loading/error states. Messages are mock and reach nobody. |
| **Settings** (`/dashboard/settings`) | Signed-in account, prototype limitations, production notes. |

### Shell

`dashboard/layout.tsx` wraps every screen in `AppProviders` → `ServicesProvider` → `AuthProvider` → `DashboardShell`.

The shell provides:

- a navy sidebar with the real logo, grouped navigation, active states, and a collapsible mobile drawer;
- a sticky header with breadcrumbs, a global search across courses and accounts, a notifications popover with an honest empty state, and the profile menu (account, workspace, sign out);
- a skip link, a single visually hidden `<h1>` per page, and the demo-data notice.

### Data flow on a screen

`AccountsPage` is representative:

1. Component state holds `{ search, role, status, page, pageSize, sortBy, sortDirection }`.
2. An effect calls `administrators.list(query)` with a `reloadToken` that mutations bump.
3. The service returns `ServiceResult<{ items, total, page, pageSize }>`.
4. The component renders loading, error, empty or table states from that result — it never knows where the records came from.

The same shape is used by an HTTP provider, so search, sorting and paging are already written for server-side implementations.

### Activity feeds

There is no fake audit log. Overview activity is **derived**:

- course activity = courses ordered by `updatedAt`;
- admin activity = accounts ordered by `lastActiveAt ?? createdAt`.

That keeps the prototype honest and gives a backend an obvious place to introduce a real event stream later.

### Chat limits

Conversations and messages are fabricated demo data. Sending a message appends it to an in-memory array for the current page load. Nothing is delivered, queued or persisted. The UI says so in three places: the page notice, the conversation list footer, and the send confirmation.

---

## 8. Design system

### Palette

Defined once as Tailwind theme tokens in `src/app/globals.css`:

| Token | Value | Use |
| ----- | ----- | --- |
| `--color-navy` | `#171447` | Headings, sidebar, dark surfaces |
| `--color-navy-deep` | `#0b0926` | Deepest backgrounds |
| `--color-brand` | `#FF7900` | Primary actions, active states, accents |
| `--color-brand-deep` | `#F02B16` | Limited emphasis |
| `--color-brand-ink` | `#C42A12` | Accessible orange text on light backgrounds |
| `--color-brand-tint` | `#FFF3E8` | Soft orange fills |
| `--color-surface` | `#F7F8FC` | Page background |
| `--color-line` | `#E5E7F0` | Borders |
| `--color-muted-foreground` | `#686B7A` | Secondary text |

Text contrast drives two decisions:

- The default button is orange **with navy text** — white on `#FF7900` is only 2.63:1, navy is 6.5:1.
- `--destructive` is `#C42A12`, and `--ring` is navy so focus rings stay visible on the light surface.

The brand token was renamed from `--color-muted` to `--color-muted-foreground` because shadcn already owns `muted`; that collision would have silently changed body text.

### Type and motion

`Lato` for both body and headings (declared in `@theme`). Motion is limited to short enter/exit transitions from `tw-animate-css` plus one reveal-on-scroll effect on the public site. No decorative dashboards, invented charts or ambient animation.

### Accessibility

- semantic landmarks (`header`, `nav`, `main`, `footer`), one `<h1>` per page;
- visible focus rings (`:focus-visible`), keyboard-operable menus, dialogs and tables;
- labelled inputs, `aria-invalid` + `aria-describedby` on form errors, `role="alert"` for form-level errors;
- skip link to `#dashboard-content`, which is a focusable target;
- dialogs trap focus and restore it on close (Radix);
- status is never conveyed by colour alone — badges carry text.

---

## 9. Authentication and route protection

### How it works today

```
LoginForm → AuthProvider.signIn() → AuthService.signIn() → mock adapter
                                              │
                                              ▼
                                   session held in React state
                                              │
DashboardShell → AuthGuard ───────────────────┘
```

- `AuthProvider` (`src/components/auth/auth-provider.tsx`) owns `{ status, user, signIn, signOut }`.
- On mount it calls `auth.getSession()`; until that resolves, `status` is `loading`.
- `AuthGuard` (`src/components/auth/auth-guard.tsx`) shows a spinner while loading and redirects to `/login?next=<path>` when unauthenticated.
- `LoginForm` validates with zod, shows a generic error for every credential failure, and redirects to `next` or `/dashboard`.
- `signOut()` clears the session and returns the visitor to the sign-in screen.

The comment at the top of `auth-guard.tsx` says it plainly: **this is a UX convenience, not a security control.**

### Why there is no middleware (and why `AuthProvider` instead)

Three reasons, in order of importance:

1. **There is nothing for middleware to check.** The demo session lives in React state — not in a cookie, not in a header, not in a JWT. Middleware runs on the server *before* React exists, so it can only see the incoming request. With no cookie, a middleware check would see "no session" on every request and bounce `/dashboard` back to `/login` immediately after signing in. The demo could not work at all.
2. **Middleware is an optimistic check even in production.** Next.js 16 renamed the file convention to **`proxy.ts`** and its own authentication guide describes Proxy as an *optional, optimistic* layer: read the cookie, redirect early, never hit the database. The real authorisation decision has to happen where the data is read — route handlers, server actions, the data-access layer — because a request can bypass the UI entirely.
3. **Faking it would be worse than omitting it.** A `proxy.ts` that "protects" `/dashboard` by checking a cookie the browser can mint would look like security while providing none. That is exactly the kind of fake boundary this project avoids.

What would change that: once sign-in is server-issued (see [§10.2](#102-step-2--make-the-session-server-side)), a `src/proxy.ts` becomes genuinely useful for redirecting early. It still would not replace per-request checks.

```ts
// src/proxy.ts — only meaningful once a real session cookie exists.
import { NextResponse, type NextRequest } from 'next/server';

const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME ?? 'vu_session';

export function proxy(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !hasSession) {
    const login = new URL('/login', request.url);
    login.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  if (!isDashboard && hasSession && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
```

> The cookie check above is presence only — the API must still validate the session on every request. Treat it as a redirect optimisation.

`AuthProvider` would stay even with Proxy in place: the UI still needs to know who is signed in, and client navigations still need a loading state while the session resolves.

---

## 10. Connecting a backend

The prototype is built so this is **additive**: replace providers, delete the seed data, done. There is no fake API server to remove.

### 10.1 Step 1 — environment variables

```bash
# .env.local — never committed
API_URL=https://api.visionupgrade.com
SESSION_COOKIE_NAME=vu_session
```

Rules:

- server-only values are **never** prefixed `NEXT_PUBLIC_`;
- the browser never receives an API key, a database URL or a session signing key;
- `.env*` stays in `.gitignore`.

### 10.2 Step 2 — make the session server-side

Two workable layouts:

- **BFF (recommended):** Next.js route handlers under `src/app/api/*` talk to your API with a server-held secret and set the cookie. The browser only ever calls same-origin paths.
- **Direct API:** the dashboard calls the API directly and the API sets the cookie (`Secure`, `SameSite=None` if cross-site, CORS with credentials).

The sign-in endpoint must:

1. accept credentials over HTTPS only;
2. look the account up by username and compare against a **server-side hash** (Argon2id, scrypt or bcrypt — never plain SHA-256);
3. return the **same generic error** for unknown username, wrong password and disabled account;
4. rate-limit by IP *and* by username, with backoff or lockout;
5. create an opaque session id, store it server-side, and set the cookie.

```ts
// src/app/api/session/route.ts  (BFF example)
import { cookies } from 'next/headers';
import { z } from 'zod';

const bodySchema = z.object({ username: z.string().min(3), password: z.string().min(8) });

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: 'Invalid request' }, { status: 400 });

  const upstream = await fetch(`${process.env.API_URL}/sessions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(parsed.data),
    cache: 'no-store',
  });

  if (!upstream.ok) {
    // Identical message for every credential failure.
    return Response.json({ error: 'We could not sign you in with those details.' }, { status: 401 });
  }

  const { sessionId, user } = await upstream.json();
  const jar = await cookies();

  jar.set(process.env.SESSION_COOKIE_NAME ?? 'vu_session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return Response.json({ user });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(process.env.SESSION_COOKIE_NAME ?? 'vu_session');
  return new Response(null, { status: 204 });
}
```

The HTTP `AuthService` is then three fetches. `getSession()` maps `401` to `null`, which is exactly what `AuthProvider` already expects:

```ts
// src/lib/providers/http/http-auth.service.ts
import type { AuthService, SignInRequest, ServiceResult } from '@/lib/services/contracts';
import { serviceFail, serviceOk } from '@/lib/services/contracts';
import type { SessionUser } from '@/types/dashboard';

export function createHttpAuthService(): AuthService {
  return {
    async getSession() {
      const response = await fetch('/api/session', { credentials: 'include', cache: 'no-store' });
      if (response.status === 401) return null;
      if (!response.ok) throw new Error('Session check failed');
      return (await response.json()).user as SessionUser;
    },

    async signIn(request: SignInRequest): Promise<ServiceResult<SessionUser>> {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request),
        credentials: 'include',
      });

      if (response.status === 401) {
        return serviceFail('unauthorized', 'We could not sign you in with those details.');
      }
      if (!response.ok) {
        return serviceFail('network', 'Sign-in is temporarily unavailable. Try again.');
      }

      return serviceOk((await response.json()).user as SessionUser);
    },

    async signOut() {
      await fetch('/api/session', { method: 'DELETE', credentials: 'include' });
    },
  };
}
```

Because `AuthProvider` already calls `getSession()` on mount, this one file turns every protected page into a real session check. Adding `src/proxy.ts` ([§9](#9-authentication-and-route-protection)) on top removes the flash of the guard spinner on cold loads.

### 10.3 Step 3 — administrator accounts

Endpoints the service expects (BFF paths shown; map them to your API):

| Method | Path | Body / query | Returns |
| ------ | ---- | ------------ | ------- |
| `GET` | `/api/administrators` | `search`, `role`, `status`, `page`, `pageSize`, `sortBy`, `sortDirection` | `{ items, total, page, pageSize }` |
| `POST` | `/api/administrators` | `{ name, username, role }` | the created account |
| `PATCH` | `/api/administrators/:id` | `{ name, username, role }` | the updated account |
| `PATCH` | `/api/administrators/:id/status` | `{ status: 'active' \| 'disabled' }` | the updated account |

References: `AdministratorListQuery`, `CreateAdministratorRequest`, `UpdateAdministratorRequest` in `src/lib/services/contracts.ts`.

Server rules the UI cannot enforce:

- **Authorisation.** Only `owner` may create accounts or change roles; only `owner`/`administrator` may enable or disable. Nobody may disable the last active owner, and nobody may escalate their own role.
- **No passwords in create/update.** `CreateAdministratorRequest` has no password field on purpose. Provision credentials with an invitation email or a server-generated single-use token.
- **Uniqueness.** `username` is the login identifier — enforce a case-insensitive unique index and map violations to `409` → `ServiceError.code = 'conflict'`.
- **Server-side paging and sorting.** The table is built for it. `total` must be the count *after* filters, not the page length.
- **Audit log.** Record actor, action, target and timestamp server-side. Never trust a client-supplied actor id.

```ts
// src/lib/providers/http/http-administrators.service.ts
import type { AdministratorService } from '@/lib/services/contracts';
import { serviceFail, serviceOk } from '@/lib/services/contracts';

const json = { 'content-type': 'application/json' };

async function parse<T>(response: Response) {
  if (response.ok) return serviceOk((await response.json()) as T);

  const body = await response.json().catch(() => ({}));
  const code =
    response.status === 401 ? 'unauthorized'
    : response.status === 403 ? 'forbidden'
    : response.status === 404 ? 'not_found'
    : response.status === 409 ? 'conflict'
    : response.status === 422 ? 'validation'
    : 'unknown';

  return serviceFail(code, body.message ?? 'Something went wrong. Try again.', body.fieldErrors);
}

export function createHttpAdministratorService(): AdministratorService {
  return {
    async list(query = {}) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== 'all') params.set(key, String(value));
      }
      return parse(await fetch(`/api/administrators?${params}`, {
        credentials: 'include',
        cache: 'no-store',
      }));
    },
    async create(request) {
      return parse(await fetch('/api/administrators', {
        method: 'POST', headers: json, credentials: 'include', body: JSON.stringify(request),
      }));
    },
    async update(id, request) {
      return parse(await fetch(`/api/administrators/${id}`, {
        method: 'PATCH', headers: json, credentials: 'include', body: JSON.stringify(request),
      }));
    },
    async setStatus(id, status) {
      return parse(await fetch(`/api/administrators/${id}/status`, {
        method: 'PATCH', headers: json, credentials: 'include', body: JSON.stringify({ status }),
      }));
    },
  };
}
```

`parse` normalises HTTP status into the `ServiceErrorCode` union, so dialogs can show field errors and toasts without any change.

### 10.4 Step 4 — courses

| Method | Path | Body / query | Returns |
| ------ | ---- | ------------ | ------- |
| `GET` | `/api/courses` | `search`, `category`, `status` | `{ items, total }` |
| `GET` | `/api/courses/:id` | — | one course |
| `POST` | `/api/courses` | `{ title, description, category, status, thumbnailUrl }` | the created course |
| `PATCH` | `/api/courses/:id` | same body | the updated course |

Server rules:

- **Validate with the same schema.** Import `courseSchema` from `src/lib/validation/schemas.ts`; client validation is feedback, not a guarantee.
- **Own `publishedAt`.** Set it when status flips to `published`, clear it on unpublish, and never accept it from the client.
- **Own `createdAt` / `updatedAt`.** The activity feeds order by `updatedAt`; a client clock breaks them.
- **Authorise publishing.** Check the session role server-side; the UI hiding a button is not permission.
- **Category is an enum**, not free text: `vu-kids | software | digital-marketing`.
- **Thumbnails are URLs today.** For uploads, use a signed upload endpoint, store an object key, and expand to a URL when serialising. Validate the URL and restrict hosts before rendering optimised images.

Implementation mirrors the accounts service — same `parse` helper, roughly thirty lines.

### 10.5 Step 5 — company chat (optional)

`ChatService` has three methods: `listConversations`, `listMessages`, `sendMessage`. For a real build:

- back conversations with tables (conversations, participants, messages);
- page message history instead of returning everything;
- authorise membership on every call — a conversation id is not permission;
- push new messages over WebSocket/SSE, or poll while the tab is visible;
- store the sender server-side from the session, never from the request body.

Until then, keep the mock provider and the "not connected to anyone" notices.

### 10.6 Step 6 — swap the provider

One file changes:

```tsx
// src/lib/providers/service-context.tsx
import { createHttpServices } from './http';   // was: createMockServices

export function ServicesProvider({ children }: ServicesProviderProps) {
  const services = React.useMemo(() => createHttpServices(), []);
  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
}
```

`createHttpServices()` returns the same `DashboardServices` object:

```ts
export function createHttpServices(): DashboardServices {
  return {
    auth: createHttpAuthService(),
    administrators: createHttpAdministratorService(),
    courses: createHttpCourseService(),
    chat: createHttpChatService(),
  };
}
```

Then delete `src/lib/providers/mock/`, the demo notice, and the username hints in `demo-data.ts`/`LoginForm`.

### 10.7 Step 7 — go-live checklist

- [ ] Server-issued session in an `HttpOnly; Secure; SameSite` cookie
- [ ] Argon2id/bcrypt hashing; credentials never logged
- [ ] Rate limiting and lockout on sign-in
- [ ] `AdministratorService` and `CourseService` HTTP providers deployed
- [ ] Server-side validation (zod) and role checks on every mutation
- [ ] Invitation flow for new administrators — no password typed into the dashboard
- [ ] Audit logging for account, role and publishing changes
- [ ] Demo seed data, demo usernames and demo notices removed
- [ ] HTTPS enforced, security headers, no secrets in `NEXT_PUBLIC_*`
- [ ] `src/proxy.ts` redirect added (optional but recommended)
- [ ] Error tracking and uptime monitoring

---

## 11. Security posture

### What is true today

| Area | Reality |
| ---- | ------- |
| Credentials | None stored, hashed, compared or transmitted. Any 8+ character password works with an active demo username. |
| Session | React state only. Reload signs you out. No cookie, no token, no `localStorage` flag. |
| Route protection | `AuthGuard` redirects the UI. It protects no data. |
| Authorisation | None. Every signed-in demo user sees every screen; role labels are display-only. |
| Persistence | In-memory store, reset on reload. |
| Chat | Fabricated conversations, in-memory messages, delivered to nobody. |
| Transport | Local development over HTTP; no API exists yet. |
| Secrets | None in the repo, none in `NEXT_PUBLIC_*`. |

### What must never regress

- **No passwords in source, mock data, browser storage or public env vars.** Not even fake ones — a fake password implies a real check.
- **No client-side privilege.** The UI may hide actions by role, but the server decides.
- **No secrets in the client bundle.** Anything in `NEXT_PUBLIC_*` is public by definition.
- **No real credentials in Git.** `.env*` stays ignored; use a secret manager in deployment.
- **No "security" that a user can toggle.** A hidden route or a `localStorage` flag is not a boundary.

### Threat notes for the real build

- **CSRF:** cookie-auth mutations need `SameSite=Lax` (or `Strict`), plus an origin check or CSRF token on non-GET requests.
- **Session fixation:** rotate the session id on sign-in and on privilege change.
- **Enumeration:** identical error text and timing for unknown users and wrong passwords.
- **XSS:** never inject message or course content with `dangerouslySetInnerHTML`; render as text.
- **Open redirects:** `?next=` is already restricted to same-origin paths in `nextPathAfterSignIn()`.
- **Thumbnail URLs:** `next/image` renders them `unoptimized`, which bypasses the remote-host allowlist. Add host validation before switching to optimised images.

---

## 12. Conventions and gotchas

**React keys must be unique per list.** Every mock list item carries an `id` used as the key. Duplicates produce "two children with the same key" warnings and can drop items.

**Never build Tailwind class names dynamically.** `bg-${color}-600` will not be generated. Store complete class strings (`'bg-navy'`) in data, or map semantic names to fixed classes in the component.

**Tailwind v4 emits `oklch()` / `lab()`.** Anything that parses colours at runtime (contrast checks, canvas) must handle those formats.

**`cacheComponents: true` is on.** Request-time data in a server component needs a `Suspense` boundary or the build fails. Prefer static data.

**Dashboard pages declare `export const instant = false`.** The client-side `AuthGuard` replaces the page tree while the session resolves, so Next.js 16 cannot validate instant navigation for that segment. The export is the documented opt-out. Remove it only when the guard moves server-side.

**`react-hooks/set-state-in-effect` is disabled for `src/components/**` only.** Data-fetching effects legitimately set state after a promise resolves. The rule stays on for `src/lib`, `src/hooks` and the public site.

**`scroll-behavior: smooth` is global.** The root `<html>` carries `data-scroll-behavior="smooth"` so Next.js can suppress smooth scrolling during route transitions (it warns without it).

**Use `data-scroll-behavior` rather than removing smooth scrolling.** Anchor links on the public site depend on it.

**`next/image` with `unoptimized` skips the remote-host allowlist.** That is what makes arbitrary course thumbnails render safely today — do not enable optimisation without a host allowlist.

**The demo clock is module-level.** `demo-data.ts` computes timestamps relative to first evaluation, so "3 hours ago" stays believable while the page is open.

**PowerShell can corrupt UTF-8.** Do not round-trip files through `Get-Content -Raw` + `WriteAllText`; it mangles em dashes. Use the editor or a UTF-8 aware tool.

**`package.json` contains a self-dependency** (`"vision-upgrade": "."`). It is harmless but should be removed in a dependency cleanup, together with a fresh `bun install`.

---

## 13. Verification

Run before shipping a change:

```bash
node node_modules/typescript/bin/tsc --noEmit
bun run lint
bun run build
```

The production build prerenders every route:

```
○ /                    ○ /dashboard           ○ /dashboard/chat
○ /_not-found          ○ /dashboard/accounts  ○ /dashboard/courses
○ /contact             ○ /employees           ○ /dashboard/settings
○ /login
```

### Manual smoke test

1. `/` — all sections render, anchors scroll, no console errors.
2. `/contact` — form validates, demo notice is visible, no request is sent.
3. `/dashboard` while signed out → redirects to `/login?next=%2Fdashboard`.
4. Sign in with `demo.owner` and any 8+ character password.
5. Accounts: create a record, edit it, disable it behind the confirmation dialog, search, filter, sort, page.
6. Courses: create a course, publish it, open the drawer, move it back to draft, edit it.
7. Chat: send a message, confirm it appears and the composer clears.
8. Global search: open it from the header, search an account, jump to it.
9. Profile menu → sign out → back at `/login`.
10. Reload the dashboard while signed in → signed out, as documented.

### What has been checked in this build

- TypeScript, ESLint and `next build` are clean.
- All routes above were exercised in a browser with no console errors (beyond transient HMR socket noise caused by running a build next to a dev server).
- Create/edit/enable-disable, publish/unpublish, chat send, search, deep links and sign-out were verified against the mock providers.

---

## 14. Project structure

```
.
├── public/
│   ├── logo-full.png  logo-mark.png
│   ├── logo-wordmark.png  logo-wordmark-light.png
│   └── vision-upgrade-logo.jpg        # original supplied artwork
├── scripts/
│   └── generate-logo-assets.mjs       # derives the PNGs above from the original
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # fonts, metadata, <html data-scroll-behavior>
│   │   ├── globals.css                # Tailwind + brand tokens + shadcn layer
│   │   ├── page.tsx                   # "/"
│   │   ├── contact/page.tsx           # "/contact"
│   │   ├── (auth)/
│   │   │   ├── layout.tsx             # branded sign-in shell
│   │   │   └── login/page.tsx         # "/login"
│   │   ├── dashboard/
│   │   │   ├── layout.tsx             # providers + shell
│   │   │   ├── page.tsx               # overview
│   │   │   ├── accounts/page.tsx
│   │   │   ├── courses/page.tsx
│   │   │   ├── chat/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── employees/page.tsx         # placeholder
│   ├── components/
│   │   ├── ui/                        # shadcn primitives + public-site primitives
│   │   ├── home/                      # landing sections (props-driven)
│   │   ├── layout/                    # navbar, footer, HomeComponent
│   │   ├── auth/                      # providers, guard, login form
│   │   ├── dashboard/                 # shell, sidebar, header, widgets
│   │   ├── admin/                     # accounts feature
│   │   ├── courses/                   # courses feature
│   │   ├── chat/                      # chat feature
│   │   └── settings/                  # settings feature
│   ├── data/
│   │   ├── brand.ts                   # the four logo paths
│   │   └── mock/                      # ALL public-site content
│   ├── hooks/use-mobile.ts
│   ├── lib/
│   │   ├── services/                  # contracts + DashboardServices
│   │   ├── providers/
│   │   │   ├── service-context.tsx    # provider injection point
│   │   │   └── mock/                  # demo adapters + in-memory store
│   │   ├── validation/schemas.ts      # zod schemas
│   │   ├── labels.ts  format.ts  utils.ts
│   └── types/
│       ├── types.ts                   # public-site prop shapes
│       └── dashboard.ts               # dashboard domain models
├── ATTRIBUTION.md                     # shadcn licence + dependency licences
├── components.json                    # shadcn CLI config
├── eslint.config.mjs
└── next.config.ts
```

---

## 15. Attribution

The dashboard's UI primitives and shell are adapted from **shadcn/ui** (MIT) — CLI `shadcn@4.22.1`, style `radix-nova`, blocks `sidebar-01`, `dashboard-01` and `login-01`. They were re-skinned with the Vision Upgrade palette and wired to this project's service layer.

The MIT licence text and the licences of every runtime dependency added for the dashboard are recorded in [`ATTRIBUTION.md`](./ATTRIBUTION.md).

The public site's logo is supplied artwork, processed by `scripts/generate-logo-assets.mjs`. It is rendered as an image everywhere; it is never reconstructed with CSS or text.

---

## 16. Status

**Working**

- Responsive public site with hero, programs (VU Kids, software, digital marketing), about, why-us, contact and footer
- `/contact` sharing the same sections
- Dashboard: sign-in, overview, accounts, courses, chat, settings
- Service-layer architecture ready for an HTTP provider
- Typecheck, lint and production build clean
- Keyboard navigation, focus states, labelled forms, one `<h1>` per page

**Not built yet**

- No backend, no API calls, no environment variables
- Contact form is not connected to anything
- Dashboard runs on in-memory demo data; sessions do not survive reload
- `/employees` is placeholder markup
- `src/components/layout/Sidebar.tsx` and `src/data/mock/courses.ts` are unused placeholders
- No test suite, no CI, no error monitoring
- No analytics, cookie consent or sitemap
- No public-site image pipeline beyond the logo and hero

**Next**

1. Stand up the session endpoint and swap `AuthProvider` onto the HTTP auth service.
2. Implement the administrators and courses endpoints from [§10](#10-connecting-a-backend), keeping the contract types unchanged.
3. Add `src/proxy.ts` for fast redirects once the cookie exists.
4. Delete the demo providers, seed data and demo notices.
5. Add integration tests around the provider layer, then E2E tests for sign-in and the two CRUD flows.

---

<div align="center">

**Vision Upgrade** · Next.js · TypeScript · Tailwind CSS

</div>
