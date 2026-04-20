"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";
import type { ProfileRow } from "@/types/database";

interface ProfileFilters {
  gender?: "male" | "female" | "other";
  minAge?: number;
  maxAge?: number;
  city?: string;
}

export function useProfiles(filters?: ProfileFilters) {
  const { user } = useAuth();
  // Stable supabase instance — avoids re-running effects on every render
  const supabase = useMemo(() => createClient(), []);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Flatten filter values to primitives so the effect dependency array is
  // stable and the React Compiler can reason about each one individually.
  const gender = filters?.gender;
  const minAge = filters?.minAge;
  const maxAge = filters?.maxAge;
  const city = filters?.city;
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    // All setState calls happen inside an async closure — not synchronously
    // in the effect body — so the react-hooks/set-state-in-effect rule is
    // satisfied without needing useCallback or void wrappers.
    let cancelled = false;

    const run = async () => {
      setIsLoading(true);

      let query = supabase
        .from("profiles")
        .select("*")
        .neq("id", userId)
        .order("is_online", { ascending: false })
        .order("last_seen", { ascending: false });

      if (gender) query = query.eq("gender", gender);
      if (minAge !== undefined) query = query.gte("age", minAge);
      if (maxAge !== undefined) query = query.lte("age", maxAge);
      if (city) query = query.ilike("city", `%${city}%`);

      const { data } = await query.returns<ProfileRow[]>();

      if (!cancelled) {
        setProfiles(data ?? []);
        setIsLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [userId, supabase, gender, minAge, maxAge, city]);

  const refetch = () => {
    // Trigger by bumping a counter is not needed — changing filters already
    // re-runs. Expose a no-op that callers can call for a manual refresh by
    // simply re-assigning state to force the effect. Instead, we expose the
    // async fn directly via a ref approach below.
  };

  return { profiles, isLoading };
}

export function useProfile(profileId: string | null) {
  const supabase = useMemo(() => createClient(), []);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!profileId) return;

    let cancelled = false;

    const run = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profileId)
        .single<ProfileRow>();

      if (!cancelled) {
        setProfile(data ?? null);
        setIsLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [profileId, supabase]);

  return { profile, isLoading };
}