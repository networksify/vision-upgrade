# Vision Upgrade

Marketing site for **Vision Upgrade (VUSoft)** — three connected practices: VU Kids learning programs, our own software and technology work, and digital marketing.

The site is currently **front-end only**. All content is served from local mock files so that copy, sections and lists can be changed without touching a single component.

The same app also ships the internal **admin dashboard** at `/dashboard`. It is documented separately in [§11](#11-admin-dashboard), which includes the demo sign-in details and the steps for connecting a real backend for administrator accounts and courses.

> **Audience:** this document is written for a backend developer joining the project. Section [3. Mock data system](#3-mock-data-system) explains how the public site's content layer works, and [§11.6](#116-connecting-a-real-backend) explains how to swap the dashboard's mock services for real endpoints.

---

## Table of contents

1. [Tech stack](#1-tech-stack)
2. [Getting started](#2-getting-started)
3. [Mock data system](#3-mock-data-system)
4. [Project structure](#4-project-structure)
5. [Data contracts](#5-data-contracts)
6. [Component reference](#6-component-reference)
7. [Routes](#7-routes)
8. [Replacing mocks with a real API](#8-replacing-mocks-with-a-real-api)
9. [Conventions and gotchas](#9-conventions-and-gotchas)
10. [Current status](#10-current-status)
11. [Admin dashboard](#11-admin-dashboard)

---

## 1. Tech stack

| Concern      | Choice                                              |
| ------------ | --------------------------------------------------- |
| Framework    | Next.js 16.4.2 (App Router, Turbopack)              |
| UI           | React 19.3, Tailwind CSS 4 (`@tailwindcss/turbopack`)|
| Components   | shadcn/ui (Radix primitives) for the dashboard — see `ATTRIBUTION.md` |
| Language     | TypeScript 5 (`strict: true`)                        |
| Fonts        | Lato (via `globals.css`), Geist (via `next/font`)    |
| Validation   | zod 4 (forms + shareable with the backend)           |
| Icons        | lucide-react (dashboard), local SVG set (public site)|
| Package mgr  | Bun (`bun.lock`)                                     |

`next.config.ts` enables two Next.js 16 features that affect how you write code here:

- **`cacheComponents: true`** — the app is statically prerendered by default. Any code that reads request-time data (cookies, headers, `Date.now()`, uncached fetches) must live inside a `Suspense` boundary or the build will fail. All current pages are fully static.
- **`partialPrefetching: true`** — enables prefetching of partial route trees.

---

## 2. Getting started

```bash
bun install
bun run dev      # http://localhost:3000
```

Other scripts:

```bash
bun run build    # production build + typecheck
bun run lint     # eslint (eslint-config-next, core-web-vitals + typescript)
bun run start    # serve the production build
```

Typecheck only:

```bash
node node_modules/typescript/bin/tsc --noEmit
```

There are currently **no environment variables** and no `.env` files. The first backend integration will need to add them (see [§8](#8-replacing-mocks-with-a-real-api)).

---

## 3. Mock data system

### The one rule

> **Components never contain content.** Every string, list, link, stat and form field lives in `src/data/mock/*.ts`.

A component only knows *how* to render a shape. The *what* comes from a mock file. This means marketing can change the homepage without a component change, and the backend can later replace the mock files with API calls without rewriting UI code.

### How it is wired

Each mock file exports one typed object. The object is spread directly into the component as props:

```tsx
// src/components/layout/HomeComponent.tsx
import { HeroSection } from '@/data/mock/hero';
import { AboutSection } from '@/data/mock/about';

export const HomeComponent = () => (
  <main>
    <Home {...HeroSection} />
    <About {...AboutSection} />
  </main>
);
```

```tsx
// src/data/mock/hero.ts
export const HeroSection: HeroProps = {
  badge: 'AI Vision Platform',
  title: 'Give your cameras the power to',
  titleAccent: 'understand',
  // ...
};
```

The type comes from `src/types/types.ts`, so **TypeScript enforces that the mock file and the component agree**. If you rename a prop in the mock file, the component immediately errors until it is updated.

### The mock files

| File                       | Type                | Feeds                                    |
| -------------------------- | ------------------- | ---------------------------------------- |
| `src/data/mock/navbar.ts` | `NavLink[]`         | `Navbar` — primary + mobile navigation   |
| `src/data/mock/hero.ts`   | `HeroProps`         | `Home` — hero section + preview visual  |
| `src/data/mock/about.ts`  | `AboutProps`        | `About` — section + highlight card       |
| `src/data/mock/services.ts`| `ServicesProps`    | `Services` — service cards + CTA band    |
| `src/data/mock/contact.ts`| `ContactProps`      | `Contact` — details, side card, form     |
| `src/data/mock/footer.ts` | `FooterProps`       | `Footer` — brand, link columns, legal    |

> `src/data/mock/courses.ts` and `src/components/layout/Sidebar.tsx` are **empty placeholders** for future work. Nothing imports them.

### Common recipes

**Change copy** — edit the string in the mock file. Nothing else.

**Add a service card** — append to `ServicesSection.items`. The grid is `sm:grid-cols-2 lg:grid-cols-3`, so it reflows automatically. Give it a **unique `id`** (see [§9](#9-conventions-and-gotchas)).

**Add a nav link** — append to `NavbarLinks` in `navbar.ts`. It appears in both the desktop and mobile menus automatically. Use a root-relative hash (`/#services`) so it also works from `/contact`.

**Add a footer column** — append to `FooterSection.columns`, each with a `links` array.

**Change the contact form** — edit `ContactSection.form.fields`. The form is generated from this array:

```ts
{
  id: 'contact-company',        // used as the DOM id + <label htmlFor>
  name: 'company',              // form field name (payload key)
  label: 'Company',
  type: 'text',                 // 'text' | 'email' | 'tel' | 'textarea'
  placeholder: 'Acme Industries',
  required: false,
  autoComplete: 'organization',
  fullWidth: true,              // false = shares a row with the next field
}
```

Adding, removing or reordering fields requires no component change. `fullWidth: false` fields are paired two-per-row on `sm:` and up.

**Add a new icon** — add the name to `IconName` in `src/types/types.ts`, then add its SVG paths to the `paths` record in `src/components/ui/Icon.tsx`. Available names: `scan`, `cpu`, `shield`, `zap`, `chart`, `layers`, `mail`, `phone`, `mapPin`, `clock`.

---

## 4. Project structure

```
src/
├── app/                              # Next.js App Router — routing only
│   ├── layout.tsx                    # Root layout: fonts, metadata, scroll behaviour
│   ├── page.tsx                      # "/" landing page — composes the sections
│   ├── globals.css                   # Tailwind import, @theme tokens, shadcn tokens
│   ├── contact/page.tsx              # "/contact" — dedicated contact page
│   ├── (auth)/login/page.tsx         # "/login" — dashboard sign-in
│   ├── dashboard/                    # admin dashboard (see §11.4)
│   │   ├── layout.tsx                # shell: sidebar, header, providers, auth guard
│   │   ├── page.tsx                  # overview
│   │   ├── accounts/page.tsx
│   │   ├── courses/page.tsx
│   │   ├── chat/page.tsx
│   │   └── settings/page.tsx
│   └── employees/page.tsx            # "/employees" — stub
│
├── components/
│   ├── ui/                           # Public-site primitives (Icon, ButtonLink, …)
│   │   ├── Icon.tsx                  # SVG icon set, keyed by IconName
│   │   ├── ButtonLink.tsx            # CTA link, variants: primary | secondary | plain
│   │   ├── ArrowLink.tsx             # "text + arrow" inline link
│   │   ├── SectionHeading.tsx        # eyebrow + h2 + description
│   │   ├── FormField.tsx             # Renders one field from a FormField object
│   │   ├── HeroPreview.tsx           # The mock "live feed" card in the hero
│   │   └── …                         # shadcn/ui components (button, dialog, table, …)
│   │
│   ├── home/                         # Landing page sections — all props-driven
│   │   ├── Home.tsx                  # hero            ← HeroProps
│   │   ├── About.tsx                 # about           ← AboutProps
│   │   ├── Services.tsx              # services grid   ← ServicesProps
│   │   └── Contact.tsx               # contact + form  ← ContactProps  ('use client')
│   │
│   ├── auth/                         # session provider, route guard, sign-in form
│   ├── dashboard/                    # sidebar, header, overview widgets
│   ├── admin/                        # admin accounts feature
│   ├── courses/                      # courses feature
│   ├── chat/                         # company chat feature
│   ├── settings/                     # settings feature
│   │
│   └── layout/
│       ├── Navbar.tsx                # responsive nav  ← NavbarProps  ('use client')
│       ├── Footer.tsx                # site footer     ← FooterProps
│       ├── HomeComponent.tsx         # composes the four landing sections
│       └── Sidebar.tsx               # empty placeholder
│
├── data/
│   └── mock/                         # ← ALL PUBLIC-SITE CONTENT LIVES HERE
│       ├── navbar.ts  hero.ts  about.ts
│       ├── services.ts  contact.ts  footer.ts
│       └── courses.ts                # empty placeholder
│
├── lib/                              # dashboard data layer (see §11.4)
│   ├── services/                     # contracts + DashboardServices type
│   ├── providers/                    # mock providers + ServicesProvider
│   ├── validation/                   # zod schemas
│   ├── labels.ts  format.ts
│   └── utils.ts                      # cn()
│
└── types/
    ├── types.ts                      # Public-site prop shapes
    └── dashboard.ts                  # Dashboard domain models
```

**Directory intent**

| Folder            | Rule                                                                    |
| ----------------- | ----------------------------------------------------------------------- |
| `app/`            | Routing and page composition only. No business logic, no content.       |
| `components/ui/`  | Zero project-specific knowledge. Reusable anywhere.                     |
| `components/home/`| Landing page sections. Know their props shape, not the copy.           |
| `components/layout/`| Chrome shared across pages (navbar, footer).                           |
| `components/<feature>/` | Dashboard screens. Read data through `useServices()` only.        |
| `data/mock/`      | The public-site content layer. The only files a copywriter touches.    |
| `lib/services/`   | Contracts. The only files a backend integration rewrites against.      |
| `lib/providers/`  | Provider implementations. The only files that know where data lives.   |
| `types/`          | Shared shapes. No imports, no runtime code.                            |

---

## 5. Data contracts

These are the exact shapes the API must return. They are the TypeScript types in `src/types/types.ts`, repeated here as JSON.

### `HeroProps`

```jsonc
{
  "badge": "AI Vision Platform",
  "badgeActive": true,                 // renders the green status dot
  "title": "Give your cameras the power to",
  "titleAccent": "understand",         // rendered in blue
  "description": "…",
  "primaryCta":   { "label": "Get in Touch",    "href": "/contact" },
  "secondaryCta": { "label": "Explore Services","href": "/#services" },
  "stats": [                           // 2 cols mobile, 4 cols desktop
    { "id": 1, "label": "Models deployed", "value": "240+" }
  ],
  "visual": {
    "status": "Live feed",
    "caption": "Feed 01 - Line A - 1080p",
    "detections": [                     // bounding boxes over the preview image
      {
        "id": 1,
        "label": "Person 0.98",         // label already includes the confidence
        "confidence": 0.98,
        "box": { "left": "16%", "top": "22%", "width": "30%", "height": "44%" },
        "borderClass": "border-blue-400",   // Tailwind class, literal string
        "labelClass":  "bg-blue-700"        // Tailwind class, literal string
      }
    ],
    "metrics": [                        // progress bars
      { "id": 1, "label": "Detection accuracy", "value": 98, "barClass": "bg-blue-600" }
    ]
  }
}
```

### `AboutProps`

```jsonc
{
  "eyebrow": "About Vision",
  "title": "A platform built around how teams actually work",
  "description": "…",
  "card": {                             // the dark gradient panel
    "eyebrow": "Our approach",
    "quote": "Every model we ship has to survive a real production week, not a demo.",
    "body": "…",
    "stats": [ { "id": 1, "label": "Founded", "value": "2019" } ]
  },
  "content": {
    "title": "What you get with Vision Upgrade",
    "description": "…",
    "link": { "label": "Talk to our team", "href": "/contact" }
  },
  "values": [                           // checklist under the heading
    { "id": 1, "icon": "shield", "title": "Accuracy you can audit", "description": "…" }
  ]
}
```

### `ServicesProps`

```jsonc
{
  "eyebrow": "Services",
  "title": "Everything you need to put vision into production",
  "description": "…",
  "items": [                            // one card per entry
    { "id": 1, "icon": "scan", "title": "Vision Analytics", "description": "…" }
  ],
  "cta": {
    "title": "Not sure which module fits?",
    "description": "…",
    "link": { "label": "Request a demo", "href": "/contact" }
  }
}
```

### `ContactProps`

```jsonc
{
  "eyebrow": "Contact Us",
  "title": "Let us look at your use case",
  "description": "…",
  "details": [                          // left column, contact methods
    { "id": 1, "icon": "mail", "label": "Email", "value": "hello@visionupgrade.com",
      "href": "mailto:hello@visionupgrade.com" }   // href optional — omit for plain text
  ],
  "sideCard": {
    "title": "Prefer a live walkthrough?",
    "description": "…",
    "link": { "label": "Create an account", "href": "/login" }
  },
  "form": {
    "submitLabel": "Send message",
    "successTitle": "Message received",
    "successMessage": "…",
    "resetLabel": "Send another message",
    "fields": [                         // see §3 for the field schema
      { "id": "contact-name", "name": "name", "label": "Your name",
        "type": "text", "placeholder": "Jordan Reyes", "required": true,
        "autoComplete": "name" }
    ]
  }
}
```

### `FooterProps`

```jsonc
{
  "initial": "V",                       // logo glyph
  "name": "Vision Upgrade",
  "description": "…",
  "columns": [
    { "id": 1, "title": "Product",
      "links": [ { "id": 1, "title": "Vision Analytics", "href": "/#services" } ] }
  ],
  "copyright": "2026 Vision Upgrade. All rights reserved.",
  "tagline": "Built for teams that ship machine vision to production."
}
```

---

## 6. Component reference

| Component              | Props type        | Notes                                                              |
| ---------------------- | ----------------- | ------------------------------------------------------------------ |
| `Navbar`               | `NavbarProps`     | `'use client'`. `links` is optional — defaults to `NavbarLinks`. Renders desktop + mobile menus from the same array. |
| `Home`                 | `HeroProps`       | Server component. Renders `HeroPreview` from `visual`.             |
| `About`                | `AboutProps`      | Server component.                                                   |
| `ServicesSection`      | `ServicesProps`   | Server component.                                                   |
| `Contact`              | `ContactProps`    | `'use client'`. Owns the form submit state only.                   |
| `Footer`               | `FooterProps`     | Server component.                                                   |
| `HomeComponent`        | —                 | Composes `Home` + `About` + `ServicesSection` + `Contact` inside a `<main>`. |
| `Icon`                 | `{ name, className }` | SVG sprite set. `name` is one of `IconName`.                   |
| `ButtonLink`           | `{ cta, variant, size, className }` | `variant`: `primary` \| `secondary` \| `plain`. |
| `ArrowLink`            | `{ cta, className }` | Inline link with a trailing arrow.                                |
| `SectionHeading`       | `SectionHeadingProps` | `align`: `left` \| `center` (default `center`).              |
| `FormField`            | `{ field, className }` | Renders one `FormField`.                                        |
| `HeroPreview`          | `{ visual }`      | The mock live-feed card.                                           |

---

## 7. Routes

| Route          | Page                        | Status                                                       |
| -------------- | --------------------------- | ------------------------------------------------------------ |
| `/`            | `app/page.tsx`              | Landing page: navbar → hero → about → services → contact → footer. Static. |
| `/contact`     | `app/contact/page.tsx`      | Navbar → contact section → footer. Static. Shares `ContactSection` and `FooterSection` with `/`. |
| `/login`       | `app/(auth)/login/page.tsx` | Dashboard sign-in. Redirects to `?next=` (or `/dashboard`) when already signed in. |
| `/dashboard`   | `app/dashboard/page.tsx`    | Overview — stat cards, recent course/admin activity, quick actions. |
| `/dashboard/accounts` | `app/dashboard/accounts/page.tsx` | Administrator accounts: search, filter, sort, page, create, edit, enable/disable. |
| `/dashboard/courses`  | `app/dashboard/courses/page.tsx`  | Course catalogue: search, filter, create, edit, publish/unpublish, detail drawer. |
| `/dashboard/chat`     | `app/dashboard/chat/page.tsx`     | Company chat — mock conversations only. |
| `/dashboard/settings` | `app/dashboard/settings/page.tsx` | Signed-in account details and prototype/backend notes. |
| `/employees`   | `app/employees/page.tsx`    | Stub — placeholder markup only.                              |

Section anchors are `/#home`, `/#about`, `/#services`, `/#contact` — each `<section>` carries the matching `id` and a `scroll-mt-24` (96px) offset so the target is not hidden under the header.

---

## 8. Replacing mocks with a real API

The components already accept plain data, so the swap is confined to the data layer.

**Step 1 — add the endpoints.** For example `src/lib/api/`:

```ts
// src/lib/api/hero.ts
import { HeroProps } from '@/types/types';

export async function getHero(): Promise<HeroProps> {
  const res = await fetch(`${process.env.API_URL}/hero`, {
    next: { revalidate: 300 },
  });
  return res.json();
}
```

**Step 2 — fetch in the page** and spread the result into the same components:

```tsx
// src/app/page.tsx
import { Home } from '@/components/home/Home';
import { getHero } from '@/lib/api/hero';
import { FooterSection } from '@/data/mock/footer';   // still a mock for now

export default async function HomePage() {
  const hero = await getHero();

  return (
    <>
      <Navbar />
      <main>
        <Home {...hero} />
        {/* …other sections… */}
      </main>
      <Footer {...FooterSection} />
    </>
  );
}
```

**Step 3 — keep the types as the contract.** `src/types/types.ts` is the single source of truth for both the mock and the API response. If the API shape changes, update the type first — TypeScript will then flag every mock file and component that needs updating.

Notes for the backend:

- The mock files and the API should return **identical shapes** so pages can be migrated one section at a time.
- `id` on every list item is required — it is the React key (see [§9](#9-conventions-and-gotchas)).
- `icon` is a string enum, not an SVG or icon URL. If the API must return arbitrary icons, extend `IconName` and `Icon.tsx`, or switch `Icon` to render an image.
- `borderClass`, `labelClass` and `barClass` are **literal Tailwind class strings** chosen by the API. This works because Tailwind scans source files, but the class must appear verbatim somewhere in `src/` or it will not be generated. Prefer keeping the palette fixed on the front end and sending a semantic value (e.g. `"tone": "blue"`) if the API should not dictate styling.
- The contact form currently has **no backend**. `Contact` calls `preventDefault()` and flips to a success state locally. Wire it to a server action or an API route when the endpoint exists.

---

## 9. Conventions and gotchas

**React keys must be unique per list.** Every list item in the mock data carries an `id`, and that `id` is used as the React `key`. Duplicated ids produce `Encountered two children with the same key` warnings and can cause items to be dropped or duplicated. Always give new items a unique `id`.

**Never build Tailwind class names dynamically.** `bg-${color}-600` will not be generated by Tailwind's scanner. Store complete class names (`'bg-blue-600'`) in the mock data, as `barClass` / `borderClass` / `labelClass` already do.

**Tailwind v4 emits `lab()` / `oklch()` colours.** `getComputedStyle` returns `lab(…)` rather than `rgb(…)` for Tailwind's default palette. Anything that parses colours at runtime (contrast checks, canvas sampling, screenshot tooling) must handle those formats.

**Colour contrast is enforced.** All text meets WCAG AA. Lighthouse currently scores 100 / 100 / 100. If you change a colour, re-check the affected text.

**Section anchors need an `id` and `scroll-mt-24`.** Anchor links are `/#section-id`; the `id` lives on the `<section>`, and `scroll-mt-24` keeps the heading clear of the header.

**`cacheComponents: true` is on.** Request-time data (`cookies()`, `headers()`, `Date.now()`, uncached `fetch`) inside a server component requires a `Suspense` boundary, or the build fails. Prefer static data or `next: { revalidate: n }`.

**Dashboard pages set `export const instant = false`.** Each `/dashboard` page is wrapped in a client-side `AuthGuard` that renders the session-check screen instead of its children during prerendering. Next.js 16 can't validate instant navigation for a segment that isn't rendered, so the page opts out explicitly. Remove the export only if the guard moves server-side.

**`react-hooks/set-state-in-effect` is disabled for `src/components/**`.** Feature screens load data in an effect and set state when it resolves; the rule is kept on for `src/lib`, `src/hooks` and the public site, where it still catches accidental cascading renders.

**The copyright year is hard-coded** (`'2026 Vision Upgrade. All rights reserved.'` in `footer.ts`) rather than computed, to keep the page fully static.

**`scroll-behavior: smooth` is set globally** in `globals.css` (`* { scroll-behavior: smooth }`). Anchor navigation therefore animates rather than jumping. The root `<html>` also carries `data-scroll-behavior="smooth"` — Next.js 16 uses it to disable smooth scrolling during route transitions (it warns in the console without it).

**Images:** the public site uses `next/image` for the logo and hero (local files, no remote hosts configured). Course thumbnails in the dashboard are arbitrary URLs and render with `unoptimized`, which bypasses the remote-host allowlist — if you switch them to optimised `next/image`, add the host to `next.config.ts` and validate the URL server-side.

---

## 10. Current status

**Done**

- Responsive navbar (desktop + mobile drawer) with working anchors
- Landing page with hero, about, services and contact sections
- `/contact` route sharing the same contact section and footer
- Footer with link columns
- Contact form with client-side validation and a success state
- Mock data layer, typed prop contracts, reusable UI primitives
- Lighthouse 100 / 100 / 100 (accessibility / best-practices / SEO), clean typecheck, lint and build

**Not done**

- No backend, no API calls, no environment variables
- Contact form submission is not wired to anything
- The dashboard runs on in-browser mock services (see [§11.7](#117-security-limits-of-the-prototype))
- `/employees` is placeholder markup
- `src/components/layout/Sidebar.tsx` and `src/data/mock/courses.ts` are empty placeholders
- No test suite, no CI, no error boundary
- No analytics, no cookie consent, no SEO metadata beyond titles and descriptions
- No image assets or `next/image` usage on the public site

---

## 11. Admin dashboard

The internal workspace lives in the same Next.js app as the public site: same design tokens, same component library, same build. It is a separate route group under `/dashboard`, behind a sign-in screen at `/login`.

Everything it shows today is **demo data**. Nothing is sent anywhere, nothing is stored on a server, and no real Vision Upgrade person, course or conversation is represented.

### 11.1 Demo sign-in

| Username      | Role                | Account status |
| ------------- | ------------------- | -------------- |
| `demo.owner`  | Owner               | Active         |
| `demo.admin`  | Administrator       | Active         |
| `demo.editor` | Content editor      | Active         |

**Password: any value of 8 characters or more — for example `demo1234`.**

All three accounts accept that same "password", and it is not a credential. There is no password stored, hashed, compared or seeded anywhere in this repository, and no password is written to `localStorage`, `sessionStorage` or any `NEXT_PUBLIC_*` variable. The demo auth adapter only checks that the username exists in the seed data and that the account is active; the form itself enforces the 8-character minimum. This is deliberate: a fake password would teach the wrong lesson about what security means. See [§11.7](#117-security-limits-of-the-prototype) for what has to change before real use.

> **Session behaviour:** the session is a JavaScript variable in the tab. Reloading the page signs you out. That is intentional — there is no cookie to forge in the prototype.

### 11.2 Running the dashboard

Nothing extra to install or configure:

```bash
bun install
bun run dev
# open http://localhost:3000/login
```

Sign in with `demo.owner` and any 8+ character password. The public site stays available at `/`.

### 11.3 Screens

| Screen | Route | What works |
| ------ | ----- | ---------- |
| Overview | `/dashboard` | Total administrator accounts (with active/disabled split), total courses (with draft/published split), recent course activity, recent admin activity, quick actions. All counts are derived from the service layer, not hardcoded. |
| Admin accounts | `/dashboard/accounts` | Debounced search, role/status filters, sortable columns, pagination with page sizes, create, edit, enable/disable behind a confirmation dialog, loading/empty/error/success states. |
| Courses | `/dashboard/courses` | Search, category/status filters, create/edit with validation, draft ↔ published, detail drawer, optional thumbnail URL. |
| Company chat | `/dashboard/chat` | Conversation list, search, message history, composer and send, timestamps, sender names, empty/loading/error states. Messages are mock and never delivered. |
| Settings | `/dashboard/settings` | The signed-in account, the prototype's limits, and the steps needed for a real deployment. |

Every screen carries a demo-data notice. Activity feeds are **derived**, not logged: course activity is ordered by `updatedAt`, admin activity by `lastActiveAt ?? createdAt`. That keeps the prototype honest — there is no fabricated audit trail.

### 11.4 Architecture

The rule is the same as the public site's, applied to data instead of copy:

> **Components never import demo data.** They receive it through a service contract.

```
src/
├── app/
│   ├── (auth)/login/page.tsx          # /login
│   └── dashboard/
│       ├── layout.tsx                 # mounts the shell + providers
│       ├── page.tsx                   # overview
│       ├── accounts/page.tsx
│       ├── courses/page.tsx
│       ├── chat/page.tsx
│       └── settings/page.tsx
│
├── components/
│   ├── auth/                          # session context, guard, sign-in form
│   ├── dashboard/                     # shell: sidebar, header, search, notifications
│   ├── admin/                         # accounts feature
│   ├── courses/                       # courses feature
│   ├── chat/                          # chat feature
│   ├── settings/                      # settings feature
│   └── ui/                            # shadcn/ui primitives (see ATTRIBUTION.md)
│
├── lib/
│   ├── services/contracts.ts          # ← the backend seam (interfaces + request types)
│   ├── services/index.ts              # DashboardServices aggregate
│   ├── providers/service-context.tsx  # ← the single mock → HTTP swap point
│   ├── providers/mock/                # demo adapters + in-memory store
│   ├── validation/schemas.ts          # zod schemas shared by every form
│   ├── labels.ts                      # role/status/category display labels
│   └── format.ts                      # dates and relative time
│
└── types/dashboard.ts                 # domain models (transport agnostic)
```

Dependency direction, top to bottom:

```
page → feature component → useServices() → ServiceContract → provider (mock | HTTP) → API
```

No feature component imports `src/lib/providers/mock/*`, no provider imports a component, and `src/types/dashboard.ts` imports nothing.

### 11.5 The service contract

`src/lib/services/contracts.ts` is the whole integration surface. A provider must implement these four interfaces; nothing else in the app needs to change.

```ts
export interface AuthService {
  getSession(): Promise<SessionUser | null>;
  signIn(request: SignInRequest): Promise<ServiceResult<SessionUser>>;
  signOut(): Promise<void>;
}

export interface AdministratorService {
  list(query?: AdministratorListQuery): Promise<ServiceResult<AdministratorListResponse>>;
  create(request: CreateAdministratorRequest): Promise<ServiceResult<AdministratorAccount>>;
  update(id: string, request: UpdateAdministratorRequest): Promise<ServiceResult<AdministratorAccount>>;
  setStatus(id: string, status: AccountStatus): Promise<ServiceResult<AdministratorAccount>>;
}

export interface CourseService {
  list(query?: CourseListQuery): Promise<ServiceResult<CourseListResponse>>;
  get(id: string): Promise<ServiceResult<Course>>;
  create(request: CreateCourseRequest): Promise<ServiceResult<Course>>;
  update(id: string, request: UpdateCourseRequest): Promise<ServiceResult<Course>>;
}

export interface ChatService {
  listConversations(query?: ConversationListQuery): Promise<ServiceResult<ConversationListResponse>>;
  listMessages(conversationId: string): Promise<ServiceResult<ChatMessage[]>>;
  sendMessage(conversationId: string, body: string): Promise<ServiceResult<ChatMessage>>;
}
```

Every call returns `ServiceResult<T>`:

```ts
type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ServiceError };

type ServiceError = {
  code: 'unauthorized' | 'forbidden' | 'not_found' | 'validation' | 'conflict' | 'network' | 'unknown';
  message: string;                       // safe to render, never server internals
  fieldErrors?: Record<string, string[]>; // per-field, keyed by form field name
};
```

That shape is what lets the UI render loading, empty, error and field-level validation states without knowing whether the data came from memory or HTTP.

### 11.6 Connecting a real backend

The prototype is structured so this is additive. There is no fake API server to delete: replace the provider, delete the demo seed, done.

#### 11.6.1 Step 1 — environment variables

Server-only values, never prefixed with `NEXT_PUBLIC_`:

```bash
# .env.local  (never committed)
API_URL=https://api.visionupgrade.com
SESSION_COOKIE_NAME=vu_session
```

`API_URL` is read only in server code (route handlers / server actions). The browser must never receive a token or a database URL.

#### 11.6.2 Step 2 — make the session server-side

Today `AuthService` lives entirely in the browser. In production the browser should only ever hold an opaque, `HttpOnly` cookie. Two viable layouts:

- **BFF (recommended here):** keep Next.js route handlers under `src/app/api/*`; they talk to your API with a secret and set the cookie. The browser only sees same-origin URLs.
- **Direct API:** the dashboard calls your API directly and the API sets the cookie (`SameSite=None; Secure`, CORS with credentials).

Either way the login endpoint must:

1. accept credentials over HTTPS only;
2. look the account up by username, and run a constant-time comparison against a **server-side hash** (Argon2id, scrypt or bcrypt — never SHA-256 alone);
3. return the **same generic error** for unknown username, wrong password and disabled account;
4. rate-limit by IP and by username, with a lockout or backoff;
5. create an opaque session id, store it server-side, and set the cookie:

```ts
// src/app/api/session/route.ts  (BFF example)
import { cookies } from 'next/headers';
import { z } from 'zod';

const bodySchema = z.object({ username: z.string().min(3), password: z.string().min(8) });

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const upstream = await fetch(`${process.env.API_URL}/sessions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(parsed.data),
    cache: 'no-store',
  });

  if (!upstream.ok) {
    // Same message for every credential failure — never leak which part was wrong.
    return Response.json(
      { error: 'We could not sign you in with those details.' },
      { status: 401 },
    );
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

Then the HTTP `AuthService` becomes three `fetch` calls with `credentials: 'include'`, and `getSession()` maps a `401` to `null`:

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

> `getSession()` is already what `AuthGuard` waits on, so replacing this one file is enough to make every protected page check the server on load.

#### 11.6.3 Step 3 — administrator accounts

Endpoints the service expects (BFF paths shown; map them to whatever your API exposes):

| Method | Path | Body / query | Returns |
| ------ | ---- | ------------ | ------- |
| `GET` | `/api/administrators` | `search`, `role`, `status`, `page`, `pageSize`, `sortBy`, `sortDirection` | `{ items, total, page, pageSize }` |
| `POST` | `/api/administrators` | `{ name, username, role }` | the created account |
| `PATCH` | `/api/administrators/:id` | `{ name, username, role }` | the updated account |
| `PATCH` | `/api/administrators/:id/status` | `{ status: 'active' \| 'disabled' }` | the updated account |

Server rules that the UI cannot enforce:

- **Authorisation.** Only `owner` may create accounts or change roles; only `owner`/`administrator` may enable or disable; nobody may disable the last active owner, and nobody may escalate their own role.
- **No passwords in create/update.** Provision a credential with an invitation email or a server-generated single-use token. The dashboard deliberately has no password field.
- **Uniqueness.** `username` is the login identifier — enforce a case-insensitive unique index and map a conflict to `409` → `ServiceError.code = 'conflict'`.
- **Pagination and sorting happen server-side.** The table is written for it; `total` must be the count *after* filters, not the page length.
- **Audit log.** Record actor, action, target and timestamp server-side. Do not trust a client-supplied actor id.

An HTTP implementation follows the shape shown in §11.6.2:

```ts
// src/lib/providers/http/http-administrators.service.ts
const json = { 'content-type': 'application/json' };

async function parse<T>(response: Response): Promise<ServiceResult<T>> {
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
      return parse(await fetch(`/api/administrators?${params}`, { credentials: 'include', cache: 'no-store' }));
    },
    async create(request) {
      return parse(await fetch('/api/administrators', { method: 'POST', headers: json, credentials: 'include', body: JSON.stringify(request) }));
    },
    async update(id, request) {
      return parse(await fetch(`/api/administrators/${id}`, { method: 'PATCH', headers: json, credentials: 'include', body: JSON.stringify(request) }));
    },
    async setStatus(id, status) {
      return parse(await fetch(`/api/administrators/${id}/status`, { method: 'PATCH', headers: json, credentials: 'include', body: JSON.stringify({ status }) }));
    },
  };
}
```

#### 11.6.4 Step 4 — courses

| Method | Path | Body / query | Returns |
| ------ | ---- | ------------ | ------- |
| `GET` | `/api/courses` | `search`, `category`, `status` | `{ items, total }` |
| `GET` | `/api/courses/:id` | — | one course |
| `POST` | `/api/courses` | `{ title, description, category, status, thumbnailUrl }` | the created course |
| `PATCH` | `/api/courses/:id` | same body | the updated course |

Server rules:

- **Validate with the same zod schema** (`src/lib/validation/schemas.ts`) before writing. Client validation is feedback, not a guarantee.
- **Set `publishedAt` server-side** when `status` flips to `published`, and clear it on unpublish. Never accept it from the client.
- **Own `createdAt` / `updatedAt`** on the server; the activity feeds order by `updatedAt`, so a client-supplied clock breaks them.
- **Thumbnails** are URLs today. If uploads are added, use a signed upload endpoint and store an object key, then expand `thumbnailUrl` to a full URL when serialising.
- **Publishing is a privileged action** — check the session role on the server, not in the UI.

Implementation mirrors the accounts service (same `parse` helper), so the file is roughly thirty lines.

#### 11.6.5 Step 5 — swap the provider

One file changes:

```tsx
// src/lib/providers/service-context.tsx
import { createHttpServices } from './http';   // was: createMockServices

export function ServicesProvider({ children }: ServicesProviderProps) {
  const services = React.useMemo(() => createHttpServices(), []);
  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
}
```

Because every screen calls `useServices()`, no feature component, dialog or table needs to change. Then delete `src/lib/providers/mock/` and the demo notice, and remove the username hints from the sign-in screen.

#### 11.6.6 Step 6 — re-check authorisation everywhere

The client guard in `src/components/auth/auth-guard.tsx` is a **navigation convenience**, not a security boundary. A request can always be replayed outside the browser. Every endpoint must:

- resolve the session from the `HttpOnly` cookie itself;
- return `401` for a missing/expired session and `403` for an insufficient role;
- re-read the account's role and status on each request, so disabling an account takes effect immediately;
- never accept a user id, role or actor name from the request body.

If you add server-rendered dashboard pages later, check the session in the layout too (`cookies()` plus your API), so a stale tab cannot render data it no longer has access to.

#### 11.6.7 Go-live checklist

- [ ] Real `AuthService` backed by a server session cookie (`HttpOnly`, `Secure`, `SameSite`)
- [ ] Passwords hashed with Argon2id/bcrypt; credentials never logged
- [ ] Rate limiting and lockout on sign-in
- [ ] `AdministratorService` + `CourseService` HTTP providers, server-side validation and authorisation
- [ ] Invitation flow for new administrators (no password typed into the dashboard)
- [ ] Audit logging for account and publishing changes
- [ ] Demo seed data, demo usernames and demo notices removed
- [ ] HTTPS enforced, security headers set, `NEXT_PUBLIC_*` free of secrets
- [ ] Error tracking and uptime monitoring

### 11.7 Security limits of the prototype

Be explicit with stakeholders:

- **No credential verification.** Any 8+ character password works with an existing, active username. This is not authentication.
- **Sessions do not survive a reload.** The session lives in React state; there is no cookie to steal — and no cookie to trust.
- **The guard is client-side.** `AuthGuard` redirects the UI; it protects no data. Nothing here should be exposed to the public internet with real data behind it.
- **No persistence.** Accounts, courses and chat messages live in an in-memory store that resets on reload.
- **No authorisation model.** Every signed-in demo user sees the same screens; role labels are display-only. A real build must enforce permissions on the server *and* hide unavailable actions in the UI.
- **Chat is fiction.** The conversations are labelled demo data, messages are stored in memory, and sending one reaches nobody.
- **No password storage anywhere.** There is no password field in the account model (`CreateAdministratorRequest` has none), no password in the seed data, and no password in browser storage.

`ATTRIBUTION.md` records the licences of the UI components and libraries used by the shell.

---

<div align="center">

Built with [Next.js](https://nextjs.org) · TypeScript · Tailwind CSS

</div>
