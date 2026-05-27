#

# 🚀 Next-Gen Learning Dashboard

A futuristic, premium-quality student learning dashboard built using modern frontend technologies with smooth animations, responsive Bento Grid layouts, and real-time Supabase integration.

This project was developed as part of a frontend engineering internship assignment focused on:

- high-performance UI
- modern architecture
- smooth Framer Motion animations
- responsive layouts
- server-rendered data fetching

---

# 🌟 Live Demo

https://next-gen-learning-dashboard-sable.vercel.app/

---

# 📂 GitHub Repository

https://github.com/Ayush-0915/Next-Gen-Learning-Dashboard

---


# ✨ Features

## 🎨 Modern UI/UX

- Premium dark mode interface
- Bento Grid dashboard layout
- Glassmorphism effects
- Gradient mesh backgrounds
- Smooth glowing hover effects
- Zero layout shifts

---

## 📚 Dynamic Learning Dashboard

- Dynamic course cards from Supabase
- Animated progress bars
- Daily learning streak
- Activity heatmap
- Quick stats overview

---

## 📅 Productivity Features

- Calendar page
- Upcoming tasks/events
- Achievements tracking
- Community section
- Premium subscription section
- User profile page

---

## ⚡ Performance Focused

- Server Components
- Optimized rendering
- Framer Motion spring animations
- Animated skeleton loaders
- Responsive across all devices

---

# 🛠 Tech Stack

## Frontend

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend / Database

- Supabase
- PostgreSQL

## Deployment

- Vercel

---

# 🏗 Architecture Decisions

## 1. Next.js App Router

The project uses the Next.js App Router architecture to leverage:

- React Server Components
- Nested layouts
- Streaming
- Improved routing
- Better performance

This architecture improves scalability and reduces unnecessary client-side JavaScript.

---

## 2. Server / Client Component Split

A major architectural decision was separating components into:

- Server Components
- Client Components

### ✅ Server Components

Used for:

- Fetching Supabase data
- Rendering dashboard content
- Improving SEO
- Reducing bundle size

Examples:

- Dashboard page
- Course data fetching
- Stats rendering

### ✅ Client Components

Used only where interactivity was required.

Examples:

- Framer Motion animations
- Hover effects
- Sidebar interactions
- Progress bar animations
- Mobile navigation

This approach helped optimize performance while keeping the UI highly interactive.

---

# 🧩 Component Structure

The project was designed using modular reusable components.

```bash
src/
├── app/
│   ├── dashboard/
│   ├── courses/
│   ├── calendar/
│   ├── profile/
│   ├── achievements/
│   ├── community/
│   └── settings/
│
├── components/
│   ├── dashboard/
│   ├── sidebar/
│   ├── cards/
│   ├── charts/
│   ├── premium/
│   └── ui/
│
├── lib/
│   └── supabase/
│
├── hooks/
├── types/
└── styles/
```

This structure improves:

- scalability
- readability
- maintainability
- code reusability

---

# 🎨 Design & Animation Philosophy

The UI design was inspired by:

- Linear
- Vercel
- Framer
- Modern SaaS dashboards

---

## Animation Principles

To ensure buttery-smooth performance:

- Only `transform` and `opacity` animations were used
- Spring physics with Framer Motion
- Staggered page load animations
- No layout-shifting animations

Example:

```ts
transition: {
	type: "spring",
	stiffness: 300,
	damping: 20
}
```

This ensured:

- smoother interactions
- GPU acceleration
- zero CLS (Cumulative Layout Shift)

---

# 🗄 Supabase Integration

Supabase PostgreSQL was used as the backend database.

---

## Database Schema

### `courses` table

| Column      | Type        |
| ----------- | ----------- |
| id          | uuid        |
| title       | text        |
| description | text        |
| progress    | int8        |
| icon_name   | text        |
| created_at  | timestamptz |

---

## Why Supabase?

- Easy PostgreSQL setup
- Real backend integration
- Server-side data fetching
- Scalable architecture
- Excellent Next.js compatibility

---

# 🦴 Loading States & Error Handling

Implemented:

- `loading.tsx`
- Suspense boundaries
- Animated skeleton loaders
- Graceful error handling

Skeleton loaders were carefully designed to:

- preserve layout structure
- avoid layout shifts
- improve perceived performance

---

# 📱 Responsive Design

## Desktop (>1024px)

- Full Bento Grid
- Expanded sidebar

---

## Tablet (768px–1024px)

- Collapsible sidebar
- 2-column responsive layout

---

## Mobile (<768px)

- Bottom navigation / hamburger menu
- Single-column stacked layout
- Optimized touch interactions

---

# ⚡ Challenges Faced

## 1. Preventing Layout Shifts

One of the biggest challenges was maintaining animation smoothness without causing browser repaints.

### Solution

- Used only `transform` and `opacity`
- Avoided animating:
  - width
  - height
  - margins
  - padding

---

## 2. Server & Client Component Separation

Carefully deciding which components should remain server-side vs client-side required architectural planning.

### Solution

- Kept all data fetching server-side
- Moved only interactive components to client-side

---

## 3. Responsive Bento Layout

Maintaining the premium Bento Grid structure across all devices was challenging.

### Solution

- CSS Grid
- Tailwind responsive utilities
- Modular responsive cards

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## 4️⃣ Run Development Server

```bash
npm run dev
```

---

# 🌐 Deployment

The project is deployed using Vercel.

---

## Deploy Locally

```bash
npm run build
npm start
```

---

# 🔐 Environment Variables

Required variables:

| Variable                      | Description             |
| ----------------------------- | ----------------------- |
| NEXT_PUBLIC_SUPABASE_URL      | Supabase project URL    |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase public API key |

---

# 📦 Main Dependencies

```json
{
  "next": "^15",
  "react": "^19",
  "tailwindcss": "^3",
  "framer-motion": "^11",
  "@supabase/supabase-js": "^2",
  "@supabase/ssr": "^0",
  "lucide-react": "^0"
}
```

---

# 🧠 Learnings From This Project

Through this project I improved my understanding of:

- React Server Components
- App Router architecture
- Framer Motion optimization
- Responsive Bento layouts
- Supabase integration
- Component scalability
- Performance-focused frontend engineering

---

# 🏆 Assignment Objectives Covered

✅ Next.js App Router  
✅ Supabase integration  
✅ Server-side data fetching  
✅ Framer Motion animations  
✅ Responsive Bento Grid  
✅ Loading skeletons  
✅ Error handling  
✅ Modular architecture  
✅ Semantic HTML  
✅ Premium UI design  
✅ Zero layout shifts

---

# 👨‍💻 Author

### Ayush Singh

Frontend Developer | AI/ML Student

---

# 📄 License

This project is for educational and internship assignment purposes.

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
