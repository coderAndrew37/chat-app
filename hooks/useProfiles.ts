// hooks/useProfiles.ts
//
// Thin React wrapper over the data layer.
// Only concerned with state management — all fetching logic is in
// data/profiles.data.ts

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchProfiles, fetchProfile, type ProfileFilters } from "@/lib/data/profiles.data";
import type { ProfileRow } from "@/types/database";

// ─── useProfiles ──────────────────────────────────────────────────────────────

export function useProfiles(filters?: ProfileFilters) {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const gender = filters?.gender;
  const minAge = filters?.minAge;
  const maxAge = filters?.maxAge;
  const city = filters?.city;
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    const run = async () => {
      setIsLoading(true);
      const data = await fetchProfiles(userId, { gender, minAge, maxAge, city });
      if (!cancelled) {
        setProfiles(data);
        setIsLoading(false);
      }
    };

    void run();

    return () => { cancelled = true; };
  }, [userId, gender, minAge, maxAge, city]);

  return { profiles, isLoading };
}

// ─── useProfile ───────────────────────────────────────────────────────────────

export function useProfile(profileId: string | null) {
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!profileId) return;

    let cancelled = false;

    const run = async () => {
      setIsLoading(true);
      const data = await fetchProfile(profileId);
      if (!cancelled) {
        setProfile(data);
        setIsLoading(false);
      }
    };

    void run();

    return () => { cancelled = true; };
  }, [profileId]);

  return { profile, isLoading };
}