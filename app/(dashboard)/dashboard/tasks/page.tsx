"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useDashboard } from "@/lib/use-dashboard";
import {
  TASK_ACCENTS,
  TASK_LABELS,
  TASK_ROUTES,
  type TaskType,
} from "@/lib/tasks/types";
import type { TaskCompletion } from "@/lib/tasks/types";

const CARD =
  "rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]";

type Filter = "all" | TaskType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "hotel-review", label: "Hotels" },
  { value: "survey", label: "Surveys" },
  { value: "chatting", label: "Chatting" },
  { value: "ai-training", label: "AI" },
];

function summaryFor(t: TaskCompletion): string {
  switch (t.payload.kind) {
    case "hotel-review":
      return t.payload.title;
    case "survey":
      return `${Object.keys(t.payload.answers).length} answers`;
    case "chatting":
      return `${t.payload.replies.length} replies`;
    case "ai-rank":
      return `Chose response ${t.payload.chosen.toUpperCase()}`;
    case "ai-label":
      return `${Object.keys(t.payload.labels).length} items labeled`;
  }
}

export default function MyTasksPage() {
  const { state, ready, money } = useDashboard();
  const [filter, setFilter] = useState<Filter>("all");

  const tasks = useMemo(() => {
    if (!state) return [];
    return state.tasks.filter((t) => filter === "all" || t.taskType === filter);
  }, [state, filter]);

  if (!ready || !state) return null;

  if (state.tasks.length === 0) {
    return (
      <div className={`${CARD} px-6 py-16 text-center`}>
        <h2 className="font-heading text-lg font-extrabold text-[#14213d]">
          No tasks completed yet
        </h2>
        <p className="mt-1 text-sm text-[#667088]">
          Pick a track and complete your first task to earn.
        </p>
        <Link
          href="/tasks"
          className="mt-5 inline-block rounded-lg bg-[#5b4bdb] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#4637c2]"
        >
          Browse tasks
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-extrabold text-[#14213d] sm:text-2xl">
          My tasks
        </h2>
        <p className="mt-1 text-xs text-[#667088]">
          {state.tasks.length} total ·{" "}
          {state.tasks.filter((t) => t.status === "Verified").length} verified
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === f.value
                ? "bg-[#5b4bdb] text-white"
                : "border border-[#e5e6f1] bg-white text-[#14213d] hover:border-[#5b4bdb]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className={`${CARD} px-6 py-10 text-center text-sm text-[#667088]`}>
            No tasks of this type yet.
          </div>
        ) : (
          tasks.map((t) => {
            const accent = TASK_ACCENTS[t.taskType];
            return (
              <article key={t.id} className={`${CARD} p-4 sm:p-5`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: accent.bg, color: accent.text }}
                      >
                        {accent.icon} {TASK_LABELS[t.taskType]}
                      </span>
                      <h3 className="font-heading text-base font-extrabold text-[#14213d]">
                        {t.taskTitle}
                      </h3>
                    </div>
                    <p className="mt-1 text-xs text-[#667088]">
                      {new Date(t.date).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {summaryFor(t)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    {t.status === "Verified" && (
                      <>
                        <p className="text-sm font-bold tabular-nums text-[#13795b]">
                          +{money(t.rewardLocal)}
                        </p>
                        <p className="text-[11px] text-[#667088]">
                          ${t.rewardUsd.toFixed(2)}
                        </p>
                      </>
                    )}
                    {t.status === "Verifying" && (
                      <span className="rounded-full bg-[#fff1d6] px-2 py-0.5 text-[10px] font-bold text-[#9a5b00]">
                        Verifying
                      </span>
                    )}
                    {t.status === "Rejected" && (
                      <span className="rounded-full bg-[#fde8e6] px-2 py-0.5 text-[10px] font-bold text-[#b42318]">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
                {t.status === "Rejected" && t.reasons.length > 0 && (
                  <div className="mt-3 rounded-lg bg-[#fde8e6] p-3 text-xs text-[#b42318]">
                    <ul className="list-disc space-y-0.5 pl-4">
                      {t.reasons.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-3 flex justify-end">
                  <Link
                    href={`/${TASK_ROUTES[t.taskType]}/${t.taskSlug}`}
                    className="text-xs font-semibold text-[#5b4bdb] hover:text-[#4637c2]"
                  >
                    View task →
                  </Link>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}