"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/context/AuthContext";
import { sendMessageSchema, type SendMessageFormData } from "@/types/schemas";
import type { ConversationWithProfile } from "@/types/database";
import MessageBubble from "./MessageBubble";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatWindowProps {
  conversation: ConversationWithProfile;
  onBack?: () => void;
}

// ─── Quick emoji set ──────────────────────────────────────────────────────────

const QUICK_EMOJIS = ["😍", "😘", "🥰", "❤️", "🔥", "💋", "😏", "👋", "😂", "🙈", "💯", "✨"];

// ─── TypingIndicator ──────────────────────────────────────────────────────────

function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex items-end gap-2 mb-2">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 flex-shrink-0" />
      <div className="bg-white rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 mr-1">{name.split(" ")[0]} is typing</span>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EmojiPicker ─────────────────────────────────────────────────────────────

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  return (
    <div className="absolute bottom-full left-0 mb-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-20">
      <div className="grid grid-cols-6 gap-1">
        {QUICK_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => {
              onSelect(emoji);
              onClose();
            }}
            className="w-9 h-9 text-xl flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ChatWindow ───────────────────────────────────────────────────────────────

export default function ChatWindow({ conversation, onBack }: ChatWindowProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { messages, isLoading, sendMessage } = useMessages(conversation.id);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { other_user } = conversation;

  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // simulated for demo
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
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

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "44px";
    ta.style.height = `${Math.min(ta.scrollHeight, 128)}px`;
  }, [contentValue]);

  // Simulate typing indicator when other user is online (demo behavior)
  useEffect(() => {
    if (!other_user.is_online || messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.sender_id === user?.id) {
      // Show typing after we send
      const timeout = setTimeout(() => {
        setIsTyping(true);
        const clearTimeout2 = setTimeout(() => setIsTyping(false), 3000);
        typingTimeoutRef.current = clearTimeout2;
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [messages, other_user.is_online, user?.id]);

  const onSubmit = async (data: SendMessageFormData) => {
    const ok = await sendMessage(data.content);
    if (!ok) {
      toast.error("Failed to send message. Please try again.");
      return;
    }
    reset();
    setShowEmoji(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit(onSubmit)();
    }
  };

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      const current = contentValue ?? "";
      setValue("content", current + emoji, { shouldValidate: true });
      textareaRef.current?.focus();
    },
    [contentValue, setValue],
  );

  const { ref: registerRef, ...restRegister } = register("content");

  const initials = other_user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col h-full">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white shadow-sm">
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden p-2 -ml-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            aria-label="Back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Tappable profile area */}
        <button
          className="flex items-center gap-3 flex-1 min-w-0 text-left"
          onClick={() => router.push(`/profiles/${other_user.id}`)}
        >
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

          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">{other_user.name}</p>
            <p className="text-xs">
              {isTyping ? (
                <span className="text-rose-400 font-medium">typing...</span>
              ) : other_user.is_online ? (
                <span className="text-green-500 font-medium">Online now</span>
              ) : (
                <span className="text-gray-400">
                  {other_user.last_seen
                    ? `Last seen ${new Date(other_user.last_seen).toLocaleDateString()}`
                    : "Recently active"}
                </span>
              )}
            </p>
          </div>
        </button>

        {/* View profile */}
        <button
          onClick={() => router.push(`/profiles/${other_user.id}`)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="View profile"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>

      {/* ── Messages ───────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50"
        onClick={() => setShowEmoji(false)}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <svg className="w-6 h-6 animate-spin text-rose-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3 px-6">
            {/* Profile preview */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center text-white font-bold text-2xl mb-1">
              {initials}
            </div>
            <p className="font-extrabold text-gray-800 text-lg">{other_user.name}</p>
            {other_user.city && (
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {other_user.city}
              </p>
            )}
            <div className="mt-2 bg-rose-50 rounded-2xl px-5 py-3">
              <p className="text-sm font-semibold text-rose-500 mb-0.5">Say hello! 👋</p>
              <p className="text-xs text-gray-400">
                Be genuine, be yourself — great conversations start here.
              </p>
            </div>

            {/* Conversation starters */}
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {["Hey there! 😊", "What's up? 👋", "You seem interesting 👀"].map((starter) => (
                <button
                  key={starter}
                  onClick={() => {
                    setValue("content", starter, { shouldValidate: true });
                    textareaRef.current?.focus();
                  }}
                  className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-rose-200 hover:text-rose-500 transition-colors"
                >
                  {starter}
                </button>
              ))}
            </div>
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
            {isTyping && <TypingIndicator name={other_user.name} />}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input area ─────────────────────────────────────────── */}
      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-end gap-2 relative"
        >
          {/* Emoji button */}
          <div className="relative">
            {showEmoji && (
              <EmojiPicker
                onSelect={handleEmojiSelect}
                onClose={() => setShowEmoji(false)}
              />
            )}
            <button
              type="button"
              onClick={() => setShowEmoji((s) => !s)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                showEmoji
                  ? "bg-rose-100 text-rose-500"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
              aria-label="Emoji"
            >
              <span className="text-xl">😊</span>
            </button>
          </div>

          {/* Textarea */}
          <textarea
            {...restRegister}
            ref={(el) => {
              registerRef(el);
              (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
            }}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${other_user.name.split(" ")[0]}...`}
            rows={1}
            className="flex-1 resize-none px-4 py-3 bg-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white border border-transparent focus:border-rose-200 transition-all"
            style={{ minHeight: "44px", maxHeight: "128px" }}
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={isSubmitting || !contentValue?.trim()}
            className="flex-shrink-0 w-11 h-11 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white rounded-full flex items-center justify-center transition-colors shadow-md shadow-rose-100"
            aria-label="Send message"
          >
            {isSubmitting ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </form>

        <p className="text-[10px] text-gray-400 mt-1.5 text-center">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}