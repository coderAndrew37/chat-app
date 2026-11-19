"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "@/lib/use-dashboard";
import { SURVEYS } from "@/lib/tasks/surveys";
import { TaskCTA } from "@/app/components/TaskCta";

const CARD =
  "rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]";

type Sort = "pay" | "time" | "name";

export default function SurveysPage() {
  const { freeUsedFor, limit, ready } = useDashboard();
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("all");
  const [sort, setSort] = useState<Sort>("pay");

  const topics = useMemo(
    () => Array.from(new Set(SURVEYS.map((s) => s.topic))).sort(),
    [],
  );

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return SURVEYS.filter(
      (s) =>
        (topic === "all" || s.topic === topic) &&
        (!needle ||
          `${s.name} ${s.topic}`.toLowerCase().includes(needle)),
    ).sort((a, b) => {
      if (sort === "pay") return b.pay - a.pay;
      if (sort === "time") return a.estMinutes - b.estMinutes;
      return a.name.localeCompare(b.name);
    });
  }, [q, topic, sort]);

  if (!ready) return null;
  const used = freeUsedFor("survey");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-extrabold text-[#14213d] sm:text-2xl">
          Surveys
        </h2>
        <p className="mt-1 text-xs text-[#667088]">
          Short paid surveys from brands and research firms. {used}/{limit} free used.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search surveys"
          className="w-full flex-1 rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
        />
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none sm:w-44"
        >
          <option value="all">All topics</option>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none sm:w-44"
        >
          <option value="pay">Highest pay</option>
          <option value="time">Shortest first</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      <p className="text-xs font-medium text-[#667088]">
        Showing <b className="text-[#14213d]">{list.length}</b> of {SURVEYS.length} surveys
      </p>

      {list.length === 0 ? (
        <div className={`${CARD} px-6 py-16 text-center`}>
          <p className="font-heading text-base font-extrabold text-[#14213d]">
            No surveys match
          </p>
          <p className="mt-1 text-sm text-[#667088]">
            Try a different search or topic.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <article key={s.slug} className={`${CARD} flex flex-col p-4`}>
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-md bg-[#e2f6ee] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#13795b]">
                  {s.topic}
                </span>
                <span className="text-[11px] text-[#667088]">
                  ~{s.estMinutes} min
                </span>
              </div>
              <h3 className="font-heading mt-2 line-clamp-2 text-base font-extrabold text-[#14213d]">
                {s.name}
              </h3>
              <p className="mt-1 text-xs text-[#667088]">
                {s.questions.length} questions
              </p>
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#e5e6f1] pt-3">
                <b className="font-heading text-lg text-[#14213d]">
                  ${s.pay.toFixed(2)}
                </b>
                <TaskCTA taskType="survey" slug={s.slug} size="sm" />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}