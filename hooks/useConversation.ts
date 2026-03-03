"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";
import type {
  ConversationWithProfile,
  ProfileRow,
  MessageRow,
} from "@/types/database";

export function useConversations() {
  const { user } = useAuth();
  const supabase = createClient();
  const [conversations, setConversations] = useState<ConversationWithProfile[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    if (!user) return;

    const { data: convRows, error } = await supabase
      .from("conversations")
      .select("*")
      .or(`participant_one.eq.${user.id},participant_two.eq.${user.id}`)
      .order("updated_at", { ascending: false });

    if (error || !convRows) {
      setIsLoading(false);
      return;
    }

    // Collect all other user IDs
    const otherIds = convRows.map((c) =>
      c.participant_one === user.id ? c.participant_two : c.participant_one,
    );

    const [{ data: profilesData }, { data: lastMsgs }, { data: unreadData }] =
      await Promise.all([
        supabase.from("profiles").select("*").in("id", otherIds),
        // Last message per conversation
        supabase
          .from("messages")
          .select("*")
          .in(
            "conversation_id",
            convRows.map((c) => c.id),
          )
          .order("created_at", { ascending: false }),
        // Unread counts
        supabase
          .from("messages")
          .select("conversation_id")
          .in(
            "conversation_id",
            convRows.map((c) => c.id),
          )
          .eq("is_read", false)
          .neq("sender_id", user.id),
      ]);

    const profileMap = new Map<string, ProfileRow>(
      (profilesData ?? []).map((p) => [p.id, p]),
    );

    // Build last-message map (first per conversation = most recent)
    const lastMsgMap = new Map<string, MessageRow>();
    (lastMsgs ?? []).forEach((m) => {
      if (!lastMsgMap.has(m.conversation_id)) {
        lastMsgMap.set(m.conversation_id, m);
      }
    });

    // Unread count map
    const unreadMap = new Map<string, number>();
    (unreadData ?? []).forEach((m) => {
      unreadMap.set(
        m.conversation_id,
        (unreadMap.get(m.conversation_id) ?? 0) + 1,
      );
    });

    const enriched: ConversationWithProfile[] = convRows
      .map((c) => {
        const otherId =
          c.participant_one === user.id ? c.participant_two : c.participant_one;
        const otherProfile = profileMap.get(otherId);
        if (!otherProfile) return null;
        return {
          ...c,
          other_user: otherProfile,
          last_message: lastMsgMap.get(c.id) ?? null,
          unread_count: unreadMap.get(c.id) ?? 0,
        } satisfies ConversationWithProfile;
      })
      .filter(Boolean) as ConversationWithProfile[];

    setConversations(enriched);
    setIsLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchConversations();

    // Realtime: refresh when conversations or messages change
    const channel = supabase
      .channel("conversations-list")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conversations" },
        fetchConversations,
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        fetchConversations,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchConversations, supabase]);

  return { conversations, isLoading, refetch: fetchConversations };
}
