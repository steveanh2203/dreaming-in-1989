alter function public.set_updated_at()
set search_path = public;

revoke execute on function public.handle_new_user_profile() from public, anon, authenticated;
