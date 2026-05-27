# Next-Gen Learning Dashboard — Notes

This README documents the architectural choices, how the server/client component split was handled, responsive behaviors added (desktop/tablet/mobile), and challenges encountered while implementing the mobile menu and responsive sidebar.

## Architecture

- Framework: Next.js (App Router) — pages are implemented under `src/app` and componentized under `src/components`.
- Styling: Tailwind CSS utility classes. Small UI primitives live in `src/components/ui` (e.g. `button.tsx`, `card-shell.tsx`).
- Data: Supabase client utilities are in `src/lib/supabase` and SQL migrations/seed files are in `supabase/` and `migrations/`.

Design goals: composition over duplication (small focused components), predictable responsive behavior using Tailwind breakpoints, and accessibility-minded interactive elements (buttons, overlays).

## Server / Client component split

- Server components are used in route-level files under `src/app` when data fetching on the server is appropriate.
- Client components are marked with `"use client"` and live under `src/components/*` where they require state, effects, or browser-only APIs (navigation, window size, interactivity).

Specifics in this work:

- `AppShell` is a client component because it manages `collapsed` and `mobileMenuOpen` state and listens to `window.resize` to auto-collapse the sidebar.
- Interactive UI pieces such as `MobileMenu`, `MobileNav`, `Sidebar`, and `BentoGrid` are client components to support event handlers and dynamic behavior.
- Cards and small presentational components (if purely presentational and server-renderable) can be server components, but in this repo many are client components to keep consistent behavior across interactions.

## Responsive behavior implemented

- Desktop (>1024px): full sidebar visible; Bento grid uses four columns for course cards and stats panel.
- Tablet (768px–1023px): sidebar auto-collapses to an icons-only column; Bento grid uses two columns for course cards and stats.
- Mobile (<768px): full sidebar is hidden, `MobileNav` (bottom bar) remains, plus a top-left hamburger opens a slide-up `MobileMenu` (kept alongside the bottom nav as requested).

Files changed/added for responsiveness and mobile menu:

- `src/components/dashboard/bento-grid.tsx` — updated grid classes to `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` where appropriate.
- `src/components/layout/app-shell.tsx` — added auto-collapse logic based on `window.innerWidth`, mobile hamburger toggle, and rendering of `MobileMenu`.
- `src/components/sidebar/mobile-menu.tsx` — new slide-up mobile menu component (overlay + accessible close button).

## Accessibility & UX tradeoffs

- The `MobileMenu` uses an overlay and a focus target for the close button to simplify keyboard access. A full focus-trap was not added to keep changes minimal but can be layered in (e.g., `react-focus-lock`) if needed.
- The auto-collapse behavior uses a simple `resize` listener to keep the sidebar state in sync with viewport width. This keeps predictable behavior but may be replaced with CSS-only approaches if you prefer visual-only control without JS.

## How to run

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Local site: `http://localhost:3000`

## Challenges encountered

- Coordinating sidebar collapse state across breakpoints while preserving a manual toggle required a small `resize` listener. I kept manual toggle available (user can still collapse/expand on large screens).
- Implementing a mobile slide-up menu while keeping the bottom `MobileNav` meant adding an overlay and ensuring the menu only renders on small screens (via container classes and `md:hidden`).
- Focus management for the mobile menu was simplified to focusing the close button on open; a proper focus trap would be better for full accessibility and can be added.

If you want, I can:

- Add a focus trap to `MobileMenu` for stronger keyboard accessibility.
- Replace the `resize`-based collapse with a CSS-first approach using container queries or purely Tailwind-driven layout rules.
- Run accessibility audits (Lighthouse) and fix any issues found.

—
If you'd like this README extended or want me to create a short ADR (architecture decision record), tell me what to include and I’ll add it.

# Student Learning Dashboard

Premium dark-mode student dashboard built with Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React, and Supabase.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- Lucide React

## Features

- Server Component data fetching from Supabase
- Collapsible sidebar with animated active states
- Bento grid dashboard layout
- Dynamic course cards with Lucide icons and animated progress bars
- Custom activity heatmap
- Loading skeletons and route error handling
- Responsive desktop, tablet, and mobile layouts

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example env file and add your Supabase values:

```bash
cp .env.example .env.local
# then edit .env.local and add your SUPABASE URL + ANON KEY
```

3. (Optional) Create the `courses` table and seed via SQL files using the Supabase SQL editor or psql:

```sql
-- run supabase/schema.sql first, then supabase/seed.sql
```

4. Or seed programmatically (convenient for local development):

```bash
# requires .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
node ./scripts/seed.mjs
```

5. Run the dev server:

```bash
npm run dev
```

## Supabase SQL

Run the schema file first, then the seed file. The app falls back to mock data if the Supabase connection is missing, but the production flow expects the `courses` table to exist.

## Notes

- The dashboard intentionally uses transform and opacity-based motion only.
- The layout is designed to stay stable while loading.
- The activity chart is implemented with a custom CSS grid so it remains lightweight.
