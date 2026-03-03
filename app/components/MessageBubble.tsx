import { format } from "date-fns";
import type { MessageRow } from "@/types/database";

interface MessageBubbleProps {
  message: MessageRow;
  isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`group max-w-[72%] sm:max-w-[60%] ${
          isOwn
            ? "bg-rose-500 text-white rounded-2xl rounded-br-sm"
            : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm"
        } px-4 py-2.5`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <div
          className={`flex items-center gap-1 mt-1 ${isOwn ? "justify-end" : "justify-start"}`}
        >
          <span
            className={`text-[10px] ${isOwn ? "text-rose-200" : "text-gray-400"}`}
          >
            {format(new Date(message.created_at), "h:mm a")}
          </span>
          {isOwn && (
            <svg
              className={`w-3 h-3 ${message.is_read ? "text-rose-200" : "text-rose-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {message.is_read ? (
                // Double checkmark (read)
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0zm-3 0a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L8 9.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              ) : (
                // Single checkmark (sent)
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
