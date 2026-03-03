"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/context/AuthContext";
import { sendMessageSchema, type SendMessageFormData } from "@/types/schemas";
import type { ConversationWithProfile } from "@/types/database";
import MessageBubble from "./MessageBubble";

interface ChatWindowProps {
  conversation: ConversationWithProfile;
  onBack?: () => void; // mobile back button
}

export default function ChatWindow({ conversation, onBack }: ChatWindowProps) {
  const { user } = useAuth();
  const { messages, isLoading, sendMessage } = useMessages(conversation.id);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { other_user } = conversation;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<SendMessageFormData>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: { content: "" },
  });

  const contentValue = watch("content");

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data: SendMessageFormData) => {
    const ok = await sendMessage(data.content);
    if (!ok) {
      toast.error("Failed to send message. Please try again.");
      return;
    }
    reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const initials = other_user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white shadow-sm">
        {/* Mobile back */}
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden p-2 -ml-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            aria-label="Back"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {other_user.avatar_url ? (
            <Image
              src={other_user.avatar_url}
              alt={other_user.name}
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </div>
          )}
          {other_user.is_online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>

        {/* Name + status */}
        <div>
          <p className="font-bold text-gray-900 text-sm">{other_user.name}</p>
          <p className="text-xs text-gray-400">
            {other_user.is_online ? (
              <span className="text-green-500 font-medium">Online now</span>
            ) : (
              `Last seen ${other_user.last_seen ? new Date(other_user.last_seen).toLocaleDateString() : "recently"}`
            )}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
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
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-2">
            <div className="text-4xl">👋</div>
            <p className="text-sm font-semibold text-gray-700">
              Say hello to {other_user.name}!
            </p>
            <p className="text-xs text-gray-400">
              Be the first to start the conversation.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isOwn={msg.sender_id === user?.id}
              />
            ))}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Message input */}
      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-end gap-2"
        >
          <textarea
            {...register("content")}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${other_user.name}...`}
            rows={1}
            className="flex-1 resize-none px-4 py-3 bg-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white border border-transparent focus:border-rose-200 transition-all max-h-32"
            style={{ minHeight: "44px" }}
          />
          <button
            type="submit"
            disabled={isSubmitting || !contentValue?.trim()}
            className="flex-shrink-0 w-11 h-11 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white rounded-full flex items-center justify-center transition-colors shadow-md shadow-rose-100"
            aria-label="Send message"
          >
            {isSubmitting ? (
              <svg
                className="w-4 h-4 animate-spin"
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
            ) : (
              <svg
                className="w-4 h-4 translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </form>
        <p className="text-[10px] text-gray-400 mt-1.5 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
