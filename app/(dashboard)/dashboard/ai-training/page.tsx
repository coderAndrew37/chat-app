"use client";

import { useState } from "react";
import { useDashboard } from "@/lib/use-dashboard";
import { AI_TRAINING_TASKS } from "@/lib/tasks/ai-training";
import { TaskCTA } from "@/app/components/TaskCta";

const CARD =
  "rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]";

type Filter = "all" | "rank" | "label";

export default function AITrainingPage() {
  const { freeUsedFor, limit, ready } = useDashboard();
  const [filter, setFilter] = useState<Filter>("all");

  if (!ready) return null;
  const used = freeUsedFor("ai-training");
  const list = AI_TRAINING_TASKS.filter(
    (t) => filter === "all" || t.kind === filter,
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-extrabold text-[#14213d] sm:text-2xl">
          AI training
        </h2>
        <p className="mt-1 text-xs text-[#667088]">
          Rank AI responses or label datasets. Your judgment trains models. {used}/{limit} free used.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", "rank", "label"] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              filter === f
                ? "bg-[#5b4bdb] text-white"
                : "border border-[#e5e6f1] bg-white text-[#14213d] hover:border-[#5b4bdb]"
            }`}
          >
            {f === "all" ? "All" : f === "rank" ? "Rank responses" : "Label data"}
          </button>
        ))}
      </div>

      <p className="text-xs font-medium text-[#667088]">
        Showing <b className="text-[#14213d]">{list.length}</b> of {AI_TRAINING_TASKS.length}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <article key={t.slug} className={`${CARD} flex flex-col p-4`}>
            <div className="flex items-start justify-between gap-2">
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  t.kind === "rank"
                    ? "bg-[#f3e6ff] text-[#6b21a8]"
                    : "bg-[#eeecfd] text-[#4637c2]"
                }`}
              >
                {t.kind === "rank" ? "Compare" : "Label"}
              </span>
              <span className="text-[11px] text-[#667088]">
                ~{t.estMinutes} min
              </span>
            </div>
            <h3 className="font-heading mt-2 line-clamp-2 text-base font-extrabold text-[#14213d]">
              {t.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#667088]">
              {t.kind === "rank" ? t.prompt : `${t.items.length} items to label`}
            </p>
            <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#e5e6f1] pt-3">
              <b className="font-heading text-lg text-[#14213d]">
                ${t.pay.toFixed(2)}
              </b>
              <TaskCTA taskType="ai-training" slug={t.slug} size="sm" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}