# Orbit — Student Dashboard

A production-ready, dark-futuristic student dashboard built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Supabase**, and **lucide-react**.

![bento-grid](https://img.shields.io/badge/layout-bento-violet) ![next](https://img.shields.io/badge/Next.js-15-black) ![ts](https://img.shields.io/badge/TypeScript-strict-blue)

---

## ✨ Features

- **Bento Grid** dashboard with a hero, streak, stats, course cards, and an activity heatmap
- **Server Components** fetching from Supabase — no client-side `useEffect` for course data
- Collapsible **sidebar** (desktop / tablet) and **bottom navigation** (mobile)
- Animated active-item indicator using Framer Motion `layoutId`
- Staggered entrance animations, spring hover interactions, transform/opacity only
- Animated **skeleton loaders** (`app/loading.tsx`) and graceful **error boundary** (`app/error.tsx`)
- Strict **TypeScript** throughout, semantic HTML, fully responsive

---

## 🏗 Architecture overview

```
app/
  layout.tsx            # Root layout — sidebar + main + mobile nav
  page.tsx              # Server Component — fetches courses, renders grid
  loading.tsx           # Animated skeleton tiles
  error.tsx             # Client error boundary with retry
  globals.css           # Tailwind + design tokens

components/
  sidebar.tsx           # Client — collapsible nav, layoutId active pill
  mobile-nav.tsx        # Client — bottom tab bar for mobile
  dashboard-grid.tsx    # Client — bento layout with stagger animations
  tiles/
    hero-tile.tsx       # Welcome + streak CTA
    streak-tile.tsx     # Animated streak bars
    stat-tile.tsx       # Generic KPI tile
    course-tile.tsx     # Dynamic Lucide icon + progress bar + hover glow
    activity-tile.tsx   # Contribution heatmap

lib/
  supabase/server.ts    # SSR Supabase client (cookies-aware)
  courses.ts            # server-only data access for courses
  activity.ts           # deterministic activity sample (swap for real table)
  icon-map.ts           # icon_name -> Lucide component
  nav.ts                # Nav config

types/
  index.ts              # Shared TS types (Course, NavItem, ActivityDay)

supabase/
  schema.sql            # Table + RLS + seed data
```

### Server vs Client component split

- **Server Components** (default): `app/layout.tsx`, `app/page.tsx`. They run on the server, read env vars safely, and call Supabase via the SSR client. No secrets ever reach the browser.
- **Client Components** (`"use client"`): anything that needs interaction or Framer Motion — sidebar, mobile nav, dashboard grid, every tile. They receive plain serialized data as props from the server.
- `lib/courses.ts` is marked `import "server-only"` so it can never be accidentally bundled into the client.

---

## 🗄 Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/schema.sql`](./supabase/schema.sql). It creates the `courses` table, enables RLS, grants Data API access, adds a public-read policy, and seeds demo rows.
3. Copy your project URL and **anon** key from *Project Settings → API*.
4. Create `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
   ```

> The anon key is publishable and safe in `NEXT_PUBLIC_*`. RLS policies are the security boundary — keep them tight in production.

---

## 🚀 Local development

```bash
# 1. Install
npm install            # or pnpm install / bun install

# 2. Configure env
cp .env.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Run
npm run dev
```

Open <http://localhost:3000>.

---

## ▲ Deploy to Vercel

1. Push this repo to GitHub.
2. Import it on [vercel.com/new](https://vercel.com/new).
3. Add the two environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in *Project → Settings → Environment Variables*.
4. Deploy. That's it.

The page revalidates every 60 seconds (`export const revalidate = 60` in `app/page.tsx`); change to `0` for fully dynamic or set up on-demand revalidation as needed.

---

## 🎨 Design tokens

Defined in `tailwind.config.ts`:

| Token | Value |
| --- | --- |
| `bg-base` | `#07070b` |
| `bg-surface` | `#0e0e14` |
| `bg-elevated` | `#15151f` |
| `accent-violet` | `#8b5cf6` |
| `accent-cyan` | `#22d3ee` |
| `accent-pink` | `#ec4899` |
| `accent-emerald` | `#34d399` |

All tiles share the `.tile` utility (in `globals.css`) for consistent surface, border, and pointer-tracked glow.

---

## 📜 License

MIT
