create table public.leads (
  id uuid default gen_random_uuid(),
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  primary key (id)
);

alter table public.leads enable row level security;

create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  customer_id text,
  price_id text,
  has_access boolean,
  email text,

  primary key (id)
);

alter table public.profiles enable row level security;