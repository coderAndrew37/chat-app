// data/profiles.data.ts
//
// All profile data fetching lives here.
// Returns plain data — no React state, no hooks.
// Hooks in /hooks import from here and manage state themselves.

import { createClient } from "@/lib/supabase/client";
import type { ProfileRow } from "@/types/database";

export interface ProfileFilters {
  gender?: "male" | "female" | "other";
  minAge?: number;
  maxAge?: number;
  city?: string;
}

// ─── Fetch many profiles ──────────────────────────────────────────────────────

export async function fetchProfiles(
  userId: string,
  filters?: ProfileFilters,
): Promise<ProfileRow[]> {
  const supabase = createClient();

  let query = supabase
    .from("profiles")
    .select("*")
    .neq("id", userId)
    .order("is_online", { ascending: false })
    .order("last_seen", { ascending: false });

  if (filters?.gender) query = query.eq("gender", filters.gender);
  if (filters?.minAge !== undefined) query = query.gte("age", filters.minAge);
  if (filters?.maxAge !== undefined) query = query.lte("age", filters.maxAge);
  if (filters?.city) query = query.ilike("city", `%${filters.city}%`);

  const { data, error } = await query.returns<ProfileRow[]>();

  if (error) {
    console.error("[data/fetchProfiles] error:", error.message);
    return [];
  }

  return data ?? [];
}

// ─── Fetch single profile ─────────────────────────────────────────────────────

export async function fetchProfile(
  profileId: string,
): Promise<ProfileRow | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .single<ProfileRow>();

  if (error) {
    console.error("[data/fetchProfile] error:", error.message);
    return null;
  }

  return data;
}

// ─── Upsert profile ───────────────────────────────────────────────────────────

// export async function upsertProfile(
//   profile: Parameters<
//     ReturnType<typeof createClient>["from"]
//   > extends [(infer T)] ? never : never,
// ): Promise<void> {
//   // Intentionally typed through the database Insert type below
// }

export type ProfileInsert = {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: "male" | "female" | "other";
  is_online?: boolean;
  last_seen?: string;
  city?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
};

export async function upsertProfileData(
  profile: ProfileInsert,
): Promise<{ error: string | null }> {
  const supabase = createClient();

  const { error } = await supabase
    .from("profiles")
    .upsert(profile, { onConflict: "id" });

  if (error) {
    console.error("[data/upsertProfile] error:", error.message);
    return { error: error.message };
  }

  return { error: null };
}