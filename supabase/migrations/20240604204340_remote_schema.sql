alter table "public"."profiles" add column "id" uuid not null default auth.uid();

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";


