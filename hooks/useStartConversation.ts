"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

export function useStartConversation() {
  const { user } = useAuth();
  const supabase = createClient();
  const [isStarting, setIsStarting] = useState(false);

  // Calls the get_or_create_conversation Postgres function and returns the
  // conversation id, or null on failure.
  const startConversation = useCallback(
    async (otherUserId: string): Promise<string | null> => {
      if (!user) return null;
      setIsStarting(true);

      const { data, error } = await supabase.rpc("get_or_create_conversation", {
        user_a: user.id,
        user_b: otherUserId,
      });

      setIsStarting(false);

      if (error || !data) {
        console.error("Failed to start conversation:", error);
        return null;
      }

      return data as string;
    },
    [user, supabase],
  );

  return { startConversation, isStarting };
}