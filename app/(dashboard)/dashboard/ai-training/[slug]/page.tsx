"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useDashboard } from "@/lib/use-dashboard";
import { aiTrainingBySlug } from "@/lib/tasks/ai-training";

export default function AITrainingTaskPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const task = aiTrainingBySlug(slug);
  const { submitTask, completedFor, paywalledFor, ready } = useDashboard();

  if (!task) {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          Task not found
        </h2>
        <Link
          href="/dashboard/ai-training"
          className="mt-3 inline-block text-sm font-semibold text-[#5b4bdb]"
        >
          ← Back to AI tasks
        </Link>
      </div>
    );
  }
  if (!ready) return null;

  const existing = completedFor("ai-training", task.slug);
  if (existing && existing.status !== "Rejected") {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          You already completed this task
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
  if (paywalledFor("ai-training")) {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          Free limit reached
        </h2>
        <p className="mt-2 text-sm text-[#667088]">
          You&apos;ve used your 2 free AI tasks. Upgrade to keep going.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/dashboard/ai-training"
        className="text-sm font-semibold text-[#667088] hover:text-[#14213d]"
      >
        ← Back to AI tasks
      </Link>
      <div className="mt-4 rounded-xl border border-[#e5e6f1] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                task.kind === "rank"
                  ? "bg-[#f3e6ff] text-[#6b21a8]"
                  : "bg-[#eeecfd] text-[#4637c2]"
              }`}
            >
              {task.kind === "rank" ? "Compare" : "Label"}
            </span>
            <h1 className="font-heading mt-2 text-xl font-extrabold text-[#14213d] sm:text-2xl">
              {task.name}
            </h1>
          </div>
          <div className="text-right">
            <b className="font-heading block text-xl text-[#14213d]">
              ${task.pay.toFixed(2)}
            </b>
            <span className="text-[11px] text-[#667088]">
              ~{task.estMinutes} min
            </span>
          </div>
        </div>

        {task.kind === "rank" ? (
          <RankForm task={task} onSubmit={submitTask} />
        ) : (
          <LabelForm task={task} onSubmit={submitTask} />
        )}
      </div>
    </div>
  );
}

// ─── Rank form ──────────────────────────────────────────────────────────────

function RankForm({
  task,
  onSubmit,
}: {
  task: import("@/lib/tasks/ai-training").AIRankTask;
  onSubmit: ReturnType<typeof useDashboard>["submitTask"];
}) {
  const [chosen, setChosen] = useState<"a" | "b" | null>(null);
  const [rationale, setRationale] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!chosen) errs.push("Pick response A or B.");
    if (rationale.trim().length < 30)
      errs.push("Write a rationale of at least 30 characters.");
    if (errs.length) {
      setErrors(errs);
      return;
    }
    onSubmit({
      taskType: "ai-training",
      taskSlug: task.slug,
      taskTitle: task.name,
      rewardUsd: task.pay,
      payload: {
        kind: "ai-rank",
        promptId: task.slug,
        chosen: chosen!,
        rationale: rationale.trim(),
      },
    });
  };

  return (
    <form onSubmit={submit} className="mt-5 space-y-4">
      <div className="rounded-lg bg-[#f6f6fb] p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#667088]">
          Prompt
        </p>
        <p className="mt-1 text-sm font-semibold text-[#14213d]">{task.prompt}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {(["a", "b"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setChosen(k)}
            className={`rounded-xl border p-4 text-left text-sm transition-colors ${
              chosen === k
                ? "border-[#5b4bdb] bg-[#eeecfd] text-[#4637c2]"
                : "border-[#cfd2e3] bg-white hover:border-[#5b4bdb]"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Response {k.toUpperCase()}
            </span>
            <p className="mt-2 leading-relaxed">
              {k === "a" ? task.responseA : task.responseB}
            </p>
          </button>
        ))}
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-[#14213d]">
          Why did you pick that response?
        </label>
        <textarea
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          rows={3}
          placeholder="Explain your choice — accuracy, tone, clarity, naturalness…"
          className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
        />
        <p className="mt-0.5 text-right text-[11px] text-[#667088]">
          {rationale.length} characters (min 30)
        </p>
      </div>

      {errors.length > 0 && (
        <div className="rounded-lg bg-[#fde8e6] p-3 text-xs text-[#b42318]">
          <ul className="list-disc space-y-0.5 pl-4">
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-[#5b4bdb] px-4 py-3 text-sm font-bold text-white hover:bg-[#4637c2]"
      >
        Submit comparison →
      </button>
    </form>
  );
}

// ─── Label form ─────────────────────────────────────────────────────────────

function LabelForm({
  task,
  onSubmit,
}: {
  task: import("@/lib/tasks/ai-training").AILabelTask;
  onSubmit: ReturnType<typeof useDashboard>["submitTask"];
}) {
  const [labels, setLabels] = useState<Record<string, "correct" | "incorrect">>(
    {},
  );
  const [errors, setErrors] = useState<string[]>([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = task.items.filter((it) => !labels[it.id]);
    if (missing.length) {
      setErrors([`Label all ${task.items.length} items before submitting.`]);
      return;
    }
    onSubmit({
      taskType: "ai-training",
      taskSlug: task.slug,
      taskTitle: task.name,
      rewardUsd: task.pay,
      payload: {
        kind: "ai-label",
        itemId: task.slug,
        labels,
      },
    });
  };

  return (
    <form onSubmit={submit} className="mt-5 space-y-2">
      {task.items.map((item, i) => (
        <div
          key={item.id}
          className="rounded-lg border border-[#e5e6f1] bg-white p-3"
        >
          <p className="text-sm text-[#1c2438]">
            <b className="text-[#667088]">{i + 1}.</b> {item.text}
          </p>
          <div className="mt-2 flex gap-2">
            {(["correct", "incorrect"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() =>
                  setLabels((l) => ({ ...l, [item.id]: v }))
                }
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
                  labels[item.id] === v
                    ? v === "correct"
                      ? "bg-[#13795b] text-white"
                      : "bg-[#b42318] text-white"
                    : "border border-[#cfd2e3] bg-white text-[#14213d] hover:border-[#5b4bdb]"
                }`}
              >
                {v === "correct" ? "✓ Correct" : "✗ Incorrect"}
              </button>
            ))}
          </div>
        </div>
      ))}

      {errors.length > 0 && (
        <div className="rounded-lg bg-[#fde8e6] p-3 text-xs text-[#b42318]">
          <ul className="list-disc space-y-0.5 pl-4">
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        className="mt-2 w-full rounded-lg bg-[#5b4bdb] px-4 py-3 text-sm font-bold text-white hover:bg-[#4637c2]"
      >
        Submit labels →
      </button>
    </form>
  );
}