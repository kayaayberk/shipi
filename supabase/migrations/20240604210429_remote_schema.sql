drop policy "Enable insert for authenticated users only" on "public"."profiles";

drop policy "Enable read access for all users" on "public"."profiles";

alter table "public"."profiles" alter column "id" drop default;

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";


