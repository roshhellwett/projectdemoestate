-- =====================================================================
-- 0003 - security hardening + admin promotion
-- (Applied LIVE to production Supabase via MCP on 2026-09-12;
--  this file mirrors it for fresh-clone reproducibility.)
-- =====================================================================

-- is_admin() must also confirm the JWT subject still exists as a live,
-- non-deleted, non-banned user. A cached token from a deleted/banned
-- admin then loses all write access immediately.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public, auth as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
      or (auth.jwt() -> 'user_metadata'  ->> 'role') = 'admin',
    false
  )
  and exists (
    select 1 from auth.users u
    where u.id = (auth.jwt() ->> 'sub')::uuid
      and u.deleted_at is null
      and u.banned_until is null
  );
$$;

-- The real business admin account gets the admin claim.
update auth.users set
  raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb,
  raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
where email = 'admin@apexliving-demo.com';
