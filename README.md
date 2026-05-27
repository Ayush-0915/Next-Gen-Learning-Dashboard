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
