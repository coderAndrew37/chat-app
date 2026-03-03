"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import type { ConversationWithProfile } from "@/types/database";
import { useConversations } from "@/hooks/useConversation";

interface ConversationSidebarProps {
  selectedId: string | null;
  onSelect: (conv: ConversationWithProfile) => void;
}

function ConversationItem({
  conv,
  isSelected,
  onSelect,
}: {
  conv: ConversationWithProfile;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { other_user, last_message, unread_count } = conv;
  const initials = other_user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-gray-50 ${
        isSelected ? "bg-rose-50 border-r-2 border-rose-500" : ""
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {other_user.avatar_url ? (
          <Image
            src={other_user.avatar_url}
            alt={other_user.name}
            width={44}
            height={44}
            className="rounded-full object-cover w-11 h-11"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
            {initials}
          </div>
        )}
        {/* Online indicator */}
        {other_user.is_online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-900 text-sm truncate">
            {other_user.name}
          </span>
          {last_message && (
            <span className="text-xs text-gray-400 flex-shrink-0">
              {formatDistanceToNow(new Date(last_message.created_at), {
                addSuffix: false,
              })}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-xs text-gray-500 truncate">
            {last_message ? last_message.content : "Start a conversation"}
          </p>
          {unread_count > 0 && (
            <span className="flex-shrink-0 w-5 h-5 bg-rose-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
              {unread_count > 9 ? "9+" : unread_count}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default function ConversationSidebar({
  selectedId,
  onSelect,
}: ConversationSidebarProps) {
  const { conversations, isLoading } = useConversations();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h2 className="text-lg font-extrabold text-gray-900">Messages</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          {conversations.length} conversations
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <svg
              className="w-6 h-6 animate-spin text-rose-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center px-4">
            <div className="text-3xl mb-2">💬</div>
            <p className="text-sm text-gray-500">No conversations yet.</p>
            <p className="text-xs text-gray-400 mt-1">
              Browse profiles to start chatting!
            </p>
          </div>
        ) : (
          conversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conv={conv}
              isSelected={selectedId === conv.id}
              onSelect={() => onSelect(conv)}
            />
          ))
        )}
      </div>
    </div>
  );
}
