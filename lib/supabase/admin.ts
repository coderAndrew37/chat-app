// lib/supabase/admin.ts
//
// Service-role Supabase client.
// Bypasses RLS — ONLY import this in server-side code (actions, route handlers).
// NEVER import in "use client" files or expose to the browser.
//
// Required env var: SUPABASE_SERVICE_ROLE_KEY
// Found in: Supabase Dashboard → Settings → API → service_role key

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Module-level singleton — instantiated once per server process
let adminClient: ReturnType<typeof createClient<Database>> | null = null;

export function createAdminSupabaseClient() {
  if (adminClient) return adminClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "[supabase/admin] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars",
    );
  }

  adminClient = createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}