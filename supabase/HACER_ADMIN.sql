-- Cambia el correo de ejemplo por el mismo correo que creaste en Authentication > Users.
do $$
declare
  selected_user uuid;
begin
  select id into selected_user
  from auth.users
  where lower(email) = lower('TU_CORREO@EJEMPLO.COM')
  limit 1;

  if selected_user is null then
    raise exception 'No existe un usuario con ese correo. Créalo primero en Authentication > Users.';
  end if;

  insert into public.admin_users(user_id, role, active)
  values (selected_user, 'owner', true)
  on conflict (user_id) do update set role = 'owner', active = true;
end $$;

