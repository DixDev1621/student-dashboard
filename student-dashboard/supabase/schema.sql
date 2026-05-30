-- Schema for the Student Dashboard
-- Run this in the Supabase SQL editor.

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0 check (progress between 0 and 100),
  icon_name text not null default 'book-open',
  created_at timestamptz not null default now()
);

-- Data API access (PostgREST does not grant defaults on public schema)
grant select on public.courses to anon;
grant select, insert, update, delete on public.courses to authenticated;
grant all on public.courses to service_role;

alter table public.courses enable row level security;

-- Public read access for the dashboard demo.
-- Tighten this to auth.uid() once you add per-user data.
create policy "Public can read courses"
  on public.courses
  for select
  to anon, authenticated
  using (true);

-- Seed
insert into public.courses (title, progress, icon_name) values
  ('Advanced Algorithms', 72, 'brain'),
  ('Database Systems', 45, 'database'),
  ('Quantum Physics I', 28, 'atom'),
  ('Web Development with React', 91, 'code'),
  ('Linear Algebra', 60, 'calculator'),
  ('Generative Design', 14, 'palette')
on conflict do nothing;
