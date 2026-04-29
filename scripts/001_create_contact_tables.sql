-- ====================================================================
-- FinalOutreach — contact, newsletter, and lead-magnet tables
-- Run once in Supabase SQL Editor (or psql) to enable submission storage.
-- ====================================================================

create extension if not exists "pgcrypto";

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ip text,
  user_agent text,
  name text not null,
  email text not null,
  company text not null,
  role text,
  budget text,
  message text not null
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ip text,
  email text not null unique
);

create table if not exists public.lead_magnet_downloads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ip text,
  email text not null,
  resource text not null,
  name text,
  company text
);

create index if not exists contact_submissions_email_idx on public.contact_submissions (email);
create index if not exists contact_submissions_created_at_idx on public.contact_submissions (created_at desc);
create index if not exists newsletter_email_idx on public.newsletter_subscribers (email);
create index if not exists lead_magnet_email_idx on public.lead_magnet_downloads (email);

-- Enable Row Level Security. Inserts are done via the service-role key
-- on the server only; the anon key cannot read these tables by default.
alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.lead_magnet_downloads enable row level security;
