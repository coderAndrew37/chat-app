"use client";

import { useState } from "react";

import type { ConversationWithProfile } from "@/types/database";
import ChatWindow from "../components/ChatWindow";
import ConversationSidebar from "../components/ConversationSidebar";

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationWithProfile | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSelectConversation = (conv: ConversationWithProfile) => {
    setSelectedConversation(conv);
    setShowSidebar(false); // on mobile: hide sidebar when conv selected
  };

  const handleBack = () => {
    setShowSidebar(true);
    setSelectedConversation(null);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar — always visible on md+, toggleable on mobile */}
      <aside
        className={`
          ${showSidebar ? "flex" : "hidden"} md:flex
          flex-col w-full md:w-80 lg:w-96
          bg-white border-r border-gray-100
          flex-shrink-0 overflow-hidden
        `}
      >
        <ConversationSidebar
          selectedId={selectedConversation?.id ?? null}
          onSelect={handleSelectConversation}
        />
      </aside>

      {/* Chat area */}
      <main
        className={`
          ${!showSidebar ? "flex" : "hidden"} md:flex
          flex-1 flex-col overflow-hidden
        `}
      >
        {selectedConversation ? (
          <ChatWindow conversation={selectedConversation} onBack={handleBack} />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-4">
      <div className="text-6xl">💬</div>
      <div>
        <h2 className="text-xl font-extrabold text-gray-800 mb-2">
          Your Messages
        </h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Select a conversation from the sidebar, or browse profiles to start a
          new chat.
        </p>
      </div>
      <a
        href="/#profiles"
        className="mt-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors shadow-md shadow-rose-100"
      >
        Browse Profiles
      </a>
    </div>
  );
}
