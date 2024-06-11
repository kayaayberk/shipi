drop policy "Can update own user data." on "public"."users";

drop policy "Can view own user data." on "public"."users";

revoke delete on table "public"."leads" from "anon";

revoke insert on table "public"."leads" from "anon";

revoke references on table "public"."leads" from "anon";

revoke select on table "public"."leads" from "anon";

revoke trigger on table "public"."leads" from "anon";

revoke truncate on table "public"."leads" from "anon";

revoke update on table "public"."leads" from "anon";

revoke delete on table "public"."leads" from "authenticated";

revoke insert on table "public"."leads" from "authenticated";

revoke references on table "public"."leads" from "authenticated";

revoke select on table "public"."leads" from "authenticated";

revoke trigger on table "public"."leads" from "authenticated";

revoke truncate on table "public"."leads" from "authenticated";

revoke update on table "public"."leads" from "authenticated";

revoke delete on table "public"."leads" from "service_role";

revoke insert on table "public"."leads" from "service_role";

revoke references on table "public"."leads" from "service_role";

revoke select on table "public"."leads" from "service_role";

revoke trigger on table "public"."leads" from "service_role";

revoke truncate on table "public"."leads" from "service_role";

revoke update on table "public"."leads" from "service_role";

alter table "public"."users" drop constraint "users_id_fkey";

alter table "public"."leads" drop constraint "leads_pkey";

drop index if exists "public"."leads_pkey";

drop table "public"."leads";

alter table "public"."prices" drop column "metadata";

alter table "public"."products" drop column "image";

alter table "public"."products" drop column "metadata";

alter table "public"."users" alter column "has_access" drop default;

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
  begin
    insert into public.users (id, full_name, stripe_customer_id, price_id, has_access, email)
    values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'stripe_customer_id', new.raw_user_meta_data->>'price_id', new.raw_user_meta_data->>'has_access', new.raw_user_meta_data->>'email');
    return new;
  end;
$function$
;

create policy "Can update own user data."
on "public"."users"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));


create policy "Can view own user data."
on "public"."users"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = id));



