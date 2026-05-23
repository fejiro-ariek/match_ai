create table public.match_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  status text not null default 'draft',
  brand_name text,
  niche text,
  platform text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint match_runs_status_check check (status in ('draft','active'))
);

alter table public.match_runs enable row level security;

create policy "Users read own match runs"
  on public.match_runs for select
  using (auth.uid() = user_id);

create policy "Users insert own match runs"
  on public.match_runs for insert
  with check (auth.uid() = user_id);

create policy "Users update own match runs"
  on public.match_runs for update
  using (auth.uid() = user_id);

create index match_runs_user_status_idx on public.match_runs(user_id, status);