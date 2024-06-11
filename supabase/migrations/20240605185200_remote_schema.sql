create schema if not exists "next_auth";

create table "next_auth"."accounts" (
    "id" uuid not null default uuid_generate_v4(),
    "type" text not null,
    "provider" text not null,
    "providerAccountId" text not null,
    "refresh_token" text,
    "access_token" text,
    "expires_at" bigint,
    "token_type" text,
    "scope" text,
    "id_token" text,
    "session_state" text,
    "oauth_token_secret" text,
    "oauth_token" text,
    "userId" uuid
);


create table "next_auth"."sessions" (
    "id" uuid not null default uuid_generate_v4(),
    "expires" timestamp with time zone not null,
    "sessionToken" text not null,
    "userId" uuid
);


create table "next_auth"."users" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text,
    "email" text,
    "emailVerified" timestamp with time zone,
    "image" text
);


create table "next_auth"."verification_tokens" (
    "identifier" text,
    "token" text not null,
    "expires" timestamp with time zone not null
);


CREATE UNIQUE INDEX accounts_pkey ON next_auth.accounts USING btree (id);

CREATE UNIQUE INDEX email_unique ON next_auth.users USING btree (email);

CREATE UNIQUE INDEX provider_unique ON next_auth.accounts USING btree (provider, "providerAccountId");

CREATE UNIQUE INDEX sessions_pkey ON next_auth.sessions USING btree (id);

CREATE UNIQUE INDEX sessiontoken_unique ON next_auth.sessions USING btree ("sessionToken");

CREATE UNIQUE INDEX token_identifier_unique ON next_auth.verification_tokens USING btree (token, identifier);

CREATE UNIQUE INDEX users_pkey ON next_auth.users USING btree (id);

CREATE UNIQUE INDEX verification_tokens_pkey ON next_auth.verification_tokens USING btree (token);

alter table "next_auth"."accounts" add constraint "accounts_pkey" PRIMARY KEY using index "accounts_pkey";

alter table "next_auth"."sessions" add constraint "sessions_pkey" PRIMARY KEY using index "sessions_pkey";

alter table "next_auth"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "next_auth"."verification_tokens" add constraint "verification_tokens_pkey" PRIMARY KEY using index "verification_tokens_pkey";

alter table "next_auth"."accounts" add constraint "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES next_auth.users(id) ON DELETE CASCADE not valid;

alter table "next_auth"."accounts" validate constraint "accounts_userId_fkey";

alter table "next_auth"."accounts" add constraint "provider_unique" UNIQUE using index "provider_unique";

alter table "next_auth"."sessions" add constraint "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES next_auth.users(id) ON DELETE CASCADE not valid;

alter table "next_auth"."sessions" validate constraint "sessions_userId_fkey";

alter table "next_auth"."sessions" add constraint "sessiontoken_unique" UNIQUE using index "sessiontoken_unique";

alter table "next_auth"."users" add constraint "email_unique" UNIQUE using index "email_unique";

alter table "next_auth"."verification_tokens" add constraint "token_identifier_unique" UNIQUE using index "token_identifier_unique";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION next_auth.uid()
 RETURNS uuid
 LANGUAGE sql
 STABLE
AS $function$
  select
  	coalesce(
		nullif(current_setting('request.jwt.claim.sub', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
	)::uuid
$function$
;

grant delete on table "next_auth"."accounts" to "service_role";

grant insert on table "next_auth"."accounts" to "service_role";

grant references on table "next_auth"."accounts" to "service_role";

grant select on table "next_auth"."accounts" to "service_role";

grant trigger on table "next_auth"."accounts" to "service_role";

grant truncate on table "next_auth"."accounts" to "service_role";

grant update on table "next_auth"."accounts" to "service_role";

grant delete on table "next_auth"."sessions" to "service_role";

grant insert on table "next_auth"."sessions" to "service_role";

grant references on table "next_auth"."sessions" to "service_role";

grant select on table "next_auth"."sessions" to "service_role";

grant trigger on table "next_auth"."sessions" to "service_role";

grant truncate on table "next_auth"."sessions" to "service_role";

grant update on table "next_auth"."sessions" to "service_role";

grant delete on table "next_auth"."users" to "service_role";

grant insert on table "next_auth"."users" to "service_role";

grant references on table "next_auth"."users" to "service_role";

grant select on table "next_auth"."users" to "service_role";

grant trigger on table "next_auth"."users" to "service_role";

grant truncate on table "next_auth"."users" to "service_role";

grant update on table "next_auth"."users" to "service_role";

grant delete on table "next_auth"."verification_tokens" to "service_role";

grant insert on table "next_auth"."verification_tokens" to "service_role";

grant references on table "next_auth"."verification_tokens" to "service_role";

grant select on table "next_auth"."verification_tokens" to "service_role";

grant trigger on table "next_auth"."verification_tokens" to "service_role";

grant truncate on table "next_auth"."verification_tokens" to "service_role";

grant update on table "next_auth"."verification_tokens" to "service_role";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON next_auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


drop policy "Can update own user data." on "public"."users";

drop policy "Can view own user data." on "public"."users";

alter table "public"."users" drop constraint "users_id_fkey";

alter table "public"."users" alter column "has_access" set default false;

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES next_auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.users (id, stripe_customer_id, price_id, has_access, full_name, email)
  values (new.id, new.stripe_customer_id, new.price_id, new.has_access, new.full_name, new.email);
  return new;
end;
$function$
;

create policy "Can update own user data."
on "public"."users"
as permissive
for update
to public
using ((next_auth.uid() = id));


create policy "Can view own user data."
on "public"."users"
as permissive
for select
to public
using ((next_auth.uid() = id));



