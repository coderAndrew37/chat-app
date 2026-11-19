"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useDashboard } from "@/lib/use-dashboard";
import { chattingBySlug } from "@/lib/tasks/chatting";

export default function ChattingScenarioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const scenario = chattingBySlug(slug);
  const { submitTask, completedFor, paywalledFor, ready } = useDashboard();
  const [replies, setReplies] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  if (!scenario) {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          Scenario not found
        </h2>
        <Link
          href="/dashboard/chatting"
          className="mt-3 inline-block text-sm font-semibold text-[#5b4bdb]"
        >
          ← Back to chatting
        </Link>
      </div>
    );
  }
  if (!ready) return null;

  const existing = completedFor("chatting", scenario.slug);
  if (existing && existing.status !== "Rejected") {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          You already completed this scenario
        </h2>
        <Link
          href="/dashboard/tasks"
          className="mt-4 inline-block rounded-lg bg-[#5b4bdb] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#4637c2]"
        >
          See my tasks
        </Link>
      </div>
    );
  }
  if (paywalledFor("chatting")) {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          Free limit reached
        </h2>
        <p className="mt-2 text-sm text-[#667088]">
          You&apos;ve used your 2 free chatting tasks. Upgrade to keep going.
        </p>
      </div>
    );
  }

  const replyAt = (i: number) => replies[i] ?? "";
  const setReply = (i: number, v: string) => {
    const next = [...replies];
    next[i] = v;
    setReplies(next);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    for (let i = 0; i < scenario.minReplies; i++) {
      if (!replyAt(i).trim() || replyAt(i).trim().length < 15)
        errs.push(`Reply ${i + 1} needs at least 15 characters.`);
    }
    if (errs.length) {
      setErrors(errs);
      return;
    }
    submitTask({
      taskType: "chatting",
      taskSlug: scenario.slug,
      taskTitle: scenario.name,
      rewardUsd: scenario.pay,
      payload: {
        kind: "chatting",
        scenarioId: scenario.slug,
        replies: replies.slice(0, scenario.minReplies).map((r) => r.trim()),
      },
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/dashboard/chatting"
        className="text-sm font-semibold text-[#667088] hover:text-[#14213d]"
      >
        ← Back to chatting
      </Link>
      <form
        onSubmit={submit}
        className="mt-4 rounded-xl border border-[#e5e6f1] bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="rounded-md bg-[#fff1d6] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#9a5b00]">
              {scenario.minReplies} replies expected
            </span>
            <h1 className="font-heading mt-2 text-xl font-extrabold text-[#14213d] sm:text-2xl">
              {scenario.name}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#667088]">
              {scenario.brief}
            </p>
          </div>
          <div className="text-right">
            <b className="font-heading block text-xl text-[#14213d]">
              ${scenario.pay.toFixed(2)}
            </b>
            <span className="text-[11px] text-[#667088]">
              ~{scenario.estMinutes} min
            </span>
          </div>
        </div>

        {/* Customer messages */}
        <div className="mt-5 space-y-2">
          {scenario.customerMessages.map((m) => (
            <div
              key={m.id}
              className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#f6f6fb] px-4 py-3 text-sm text-[#1c2438]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#667088]">
                Customer
              </p>
              <p className="mt-1">{m.text}</p>
            </div>
          ))}
        </div>

        {/* Reply fields */}
        <div className="mt-5 space-y-3">
          {Array.from({ length: scenario.minReplies }, (_, i) => (
            <div key={i}>
              <label className="mb-1 block text-xs font-semibold text-[#14213d]">
                Your reply {i + 1}
              </label>
              <textarea
                value={replyAt(i)}
                onChange={(e) => setReply(i, e.target.value)}
                rows={3}
                placeholder="Type your response…"
                className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
              />
              <p className="mt-0.5 text-right text-[11px] text-[#667088]">
                {replyAt(i).length} characters (min 15)
              </p>
            </div>
          ))}
        </div>

        {errors.length > 0 && (
          <div className="mt-4 rounded-lg bg-[#fde8e6] p-3 text-xs text-[#b42318]">
            <ul className="list-disc space-y-0.5 pl-4">
              {errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-[#5b4bdb] px-4 py-3 text-sm font-bold text-white hover:bg-[#4637c2]"
        >
          Submit replies →
        </button>
      </form>
    </div>
  );
}