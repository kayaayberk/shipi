set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.users (id, has_access, email)
  values (new.id, new.has_access, new.email);
  return new;
end;
$function$
;


