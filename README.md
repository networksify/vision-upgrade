# Vision Upgrade

Marketing site for **Vision Upgrade** — an AI machine-vision platform that turns live camera feeds into decisions (detection, quality inspection, workflow automation).

The site is currently **front-end only**. All content is served from local mock files so that copy, sections and lists can be changed without touching a single component.

> **Audience:** this document is written for a backend developer joining the project. Section [3. Mock data system](#3-mock-data-system) is the important part — it explains where content lives, the exact data shapes the API will need to return, and how to swap the mocks for real endpoints.

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

---

## 1. Tech stack

| Concern      | Choice                                              |
| ------------ | --------------------------------------------------- |
| Framework    | Next.js 16.4.2 (App Router, Turbopack)              |
| UI           | React 19.3, Tailwind CSS 4 (`@tailwindcss/turbopack`)|
| Language     | TypeScript 5 (`strict: true`)                        |
| Fonts        | Lato (via `globals.css`), Geist (via `next/font`)    |
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
│   ├── layout.tsx                    # Root layout: fonts, <body> wrapper, metadata
│   ├── page.tsx                      # "/" landing page — composes the sections
│   ├── globals.css                   # Tailwind import, @theme tokens, smooth scroll
│   ├── contact/page.tsx              # "/contact" — dedicated contact page
│   ├── (auth)/login/page.tsx         # "/login" — stub
│   ├── dashboard/page.tsx            # "/dashboard" — stub
│   ├── dashboard/_layout.tsx         # empty placeholder
│   └── employees/page.tsx            # "/employees" — stub
│
├── components/
│   ├── ui/                           # Generic, reusable primitives (no business content)
│   │   ├── Icon.tsx                  # SVG icon set, keyed by IconName
│   │   ├── ButtonLink.tsx            # CTA link, variants: primary | secondary | plain
│   │   ├── ArrowLink.tsx             # "text + arrow" inline link
│   │   ├── SectionHeading.tsx        # eyebrow + h2 + description
│   │   ├── FormField.tsx             # Renders one field from a FormField object
│   │   └── HeroPreview.tsx           # The mock "live feed" card in the hero
│   │
│   ├── home/                         # Landing page sections — all props-driven
│   │   ├── Home.tsx                  # hero            ← HeroProps
│   │   ├── About.tsx                 # about           ← AboutProps
│   │   ├── Services.tsx              # services grid   ← ServicesProps
│   │   └── Contact.tsx               # contact + form  ← ContactProps  ('use client')
│   │
│   └── layout/
│       ├── Navbar.tsx                # responsive nav  ← NavbarProps  ('use client')
│       ├── Footer.tsx                # site footer     ← FooterProps
│       ├── HomeComponent.tsx         # composes the four landing sections
│       └── Sidebar.tsx               # empty placeholder
│
├── data/
│   └── mock/                         # ← ALL CONTENT LIVES HERE
│       ├── navbar.ts  hero.ts  about.ts
│       ├── services.ts  contact.ts  footer.ts
│       └── courses.ts                # empty placeholder
│
└── types/
    └── types.ts                      # Every prop shape in the project
```

**Directory intent**

| Folder            | Rule                                                                    |
| ----------------- | ----------------------------------------------------------------------- |
| `app/`            | Routing and page composition only. No business logic, no content.       |
| `components/ui/`  | Zero project-specific knowledge. Reusable anywhere.                     |
| `components/home/`| Landing page sections. Know their props shape, not the copy.           |
| `components/layout/`| Chrome shared across pages (navbar, footer).                           |
| `data/mock/`      | The content layer. The only files a copywriter or backend touches.     |
| `types/`          | The contract between `data/mock/` and `components/`.                   |

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

| Route        | Page             | Status                                                       |
| ------------ | ---------------- | ------------------------------------------------------------ |
| `/`          | `app/page.tsx`   | Landing page: navbar → hero → about → services → contact → footer. Static. |
| `/contact`   | `app/contact/page.tsx` | Navbar → contact section → footer. Static. Shares `ContactSection` and `FooterSection` with `/`. |
| `/login`     | `app/(auth)/login/page.tsx` | Stub — placeholder markup only.                 |
| `/dashboard` | `app/dashboard/page.tsx` | Stub — placeholder markup only.                     |
| `/employees` | `app/employees/page.tsx` | Stub — placeholder markup only.                     |

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

**The copyright year is hard-coded** (`'2026 Vision Upgrade. All rights reserved.'` in `footer.ts`) rather than computed, to keep the page fully static.

**`scroll-behavior: smooth` is set globally** in `globals.css` (`* { scroll-behavior: smooth }`). Anchor navigation therefore animates rather than jumping.

**Images:** there are none. All visuals are CSS gradients, SVG and divs. Adding images means adding to `next.config.ts` (or `<Image>`) — no image pipeline is configured yet.

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
- `/login`, `/dashboard` and `/employees` are placeholder markup
- `src/components/layout/Sidebar.tsx` and `src/data/mock/courses.ts` are empty placeholders
- No test suite, no CI, no error boundary, no loading states
- No analytics, no cookie consent, no SEO metadata beyond titles and descriptions
- No image assets or `next/image` usage

---

<div align="center">

Built with [Next.js](https://nextjs.org) · TypeScript · Tailwind CSS

</div>
