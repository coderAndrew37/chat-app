"use client";

import { useState } from "react";
import { useDashboard } from "@/lib/use-dashboard";
import { CHATTING_SCENARIOS } from "@/lib/tasks/chatting";
import { TaskCTA } from "@/app/components/TaskCta";

const CARD =
  "rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]";

export default function ChattingPage() {
  const { freeUsedFor, limit, ready } = useDashboard();
  const [q, setQ] = useState("");

  if (!ready) return null;
  const used = freeUsedFor("chatting");
  const needle = q.trim().toLowerCase();
  const list = CHATTING_SCENARIOS.filter(
    (c) => !needle || `${c.name} ${c.brief}`.toLowerCase().includes(needle),
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-extrabold text-[#14213d] sm:text-2xl">
          Chatting scenarios
        </h2>
        <p className="mt-1 text-xs text-[#667088]">
          Reply to real customer messages. Structured, judged on clarity and empathy.{" "}
          {used}/{limit} free used.
        </p>
      </div>

      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search scenarios"
        className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
      />

      <p className="text-xs font-medium text-[#667088]">
        Showing <b className="text-[#14213d]">{list.length}</b> of {CHATTING_SCENARIOS.length}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <article key={c.slug} className={`${CARD} flex flex-col p-4`}>
            <div className="flex items-start justify-between gap-2">
              <span className="rounded-md bg-[#fff1d6] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#9a5b00]">
                {c.minReplies} replies
              </span>
              <span className="text-[11px] text-[#667088]">
                ~{c.estMinutes} min
              </span>
            </div>
            <h3 className="font-heading mt-2 line-clamp-2 text-base font-extrabold text-[#14213d]">
              {c.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#667088]">
              {c.brief}
            </p>
            <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#e5e6f1] pt-3">
              <b className="font-heading text-lg text-[#14213d]">
                ${c.pay.toFixed(2)}
              </b>
              <TaskCTA taskType="chatting" slug={c.slug} size="sm" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}