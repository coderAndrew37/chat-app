import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client — SERVER-SIDE ONLY. Never import this in a "use client" file.
// Bypasses RLS, so only use it in trusted API routes (e.g. payment approval).
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    }
  );
}