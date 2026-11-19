"use client";

import { use, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useDashboard } from "@/lib/use-dashboard";
import { surveyBySlug } from "@/lib/tasks/surveys";
import { localAmount } from "@/lib/money";
import { TaskSuccess } from "@/app/components/dashboard/TaskSuccess";

type SubmittedInfo = { rewardUsd: number; surveyName: string };

export default function SurveyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const survey = surveyBySlug(slug);
  const { submitTask, completedFor, paywalledFor, ready, country, money } =
    useDashboard();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [advancing, setAdvancing] = useState(false);
  const [submitted, setSubmitted] = useState<SubmittedInfo | null>(null);

  if (!survey) {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          Survey not found
        </h2>
        <Link
          href="/dashboard/surveys"
          className="mt-3 inline-block text-sm font-semibold text-[#5b4bdb]"
        >
          ← Back to surveys
        </Link>
      </div>
    );
  }

  if (!ready) return null;

  if (submitted) {
    return (
      <TaskSuccess
        taskType="survey"
        itemName={submitted.surveyName}
        rewardUsd={submitted.rewardUsd}
        rewardLocal={money(
          localAmount(submitted.rewardUsd, country.rate, country.dec),
        )}
        backHref="/dashboard/surveys"
        backLabel="Back to surveys"
      />
    );
  }

  const existing = completedFor("survey", survey.slug);
  if (existing && existing.status !== "Rejected") {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          You already completed this survey
        </h2>
        <p className="mt-2 text-sm text-[#667088]">
          {existing.status === "Verified"
            ? "Your reward has been credited."
            : "Your submission is being verified."}
        </p>
        <Link
          href="/dashboard/tasks"
          className="mt-4 inline-block rounded-lg bg-[#5b4bdb] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#4637c2]"
        >
          See my tasks
        </Link>
      </div>
    );
  }

  if (paywalledFor("survey")) {
    return (
      <div className="rounded-xl border border-[#e5e6f1] bg-white p-10 text-center">
        <h2 className="font-heading text-xl font-extrabold text-[#14213d]">
          Free limit reached
        </h2>
        <p className="mt-2 text-sm text-[#667088]">
          You&apos;ve used your 2 free surveys. Upgrade to keep going.
        </p>
        <Link
          href="/dashboard/wallet"
          className="mt-4 inline-block rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-rose-600"
        >
          View wallet
        </Link>
      </div>
    );
  }

  // ── Wizard state ────────────────────────────────────────────────────────
  const total = survey.questions.length;
  const q = survey.questions[step];
  const selected = answers[q.id];
  const isLast = step === total - 1;
  const answeredCount = survey.questions.filter((x) => answers[x.id]).length;
  const progress = (answeredCount / total) * 100;

  const handleSelect = (opt: string) => {
    if (advancing) return;
    const wasSelected = answers[q.id];
    setAnswers((a) => ({ ...a, [q.id]: opt }));
    if (!isLast && wasSelected !== opt) {
      setAdvancing(true);
      setTimeout(() => {
        setStep((s) => Math.min(s + 1, total - 1));
        setAdvancing(false);
      }, 350);
    }
  };

  const goBack = () => {
    setAdvancing(false);
    setStep((s) => Math.max(0, s - 1));
  };

  const goNext = () => {
    if (!selected) return;
    setStep((s) => Math.min(s + 1, total - 1));
  };

  const handleSubmit = () => {
    if (answeredCount < total) {
      const missing = survey.questions.findIndex((x) => !answers[x.id]);
      if (missing >= 0) {
        setStep(missing);
        toast.error(`Question ${missing + 1} still needs an answer.`);
      }
      return;
    }
    submitTask({
      taskType: "survey",
      taskSlug: survey.slug,
      taskTitle: survey.name,
      rewardUsd: survey.pay,
      payload: { kind: "survey", surveyId: survey.slug, answers },
    });
    setSubmitted({ rewardUsd: survey.pay, surveyName: survey.name });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/dashboard/surveys"
        className="text-sm font-semibold text-[#667088] hover:text-[#14213d]"
      >
        ← Back to surveys
      </Link>

      <div className="mt-4 overflow-hidden rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]">
        {/* Header */}
        <div className="border-b border-[#e5e6f1] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="rounded-md bg-[#e2f6ee] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#13795b]">
                {survey.topic}
              </span>
              <h1 className="font-heading mt-2 text-lg font-extrabold text-[#14213d] sm:text-xl">
                {survey.name}
              </h1>
            </div>
            <div className="shrink-0 text-right">
              <b className="font-heading block text-lg text-[#14213d]">
                ${survey.pay.toFixed(2)}
              </b>
              <span className="text-[11px] text-[#667088]">
                ~{survey.estMinutes} min
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-[11px] font-semibold text-[#667088]">
              <span>
                Question {step + 1} of {total}
              </span>
              <span className="tabular-nums">
                {answeredCount}/{total} answered
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#eeecfd]">
              <div
                className="h-full rounded-full bg-[#5b4bdb] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question body */}
        <div className="p-5 sm:p-6">
          <div key={step} className="sw-slide-in">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#667088]">
              Question {step + 1}
            </p>
            <h2 className="font-heading mt-1 text-lg font-extrabold leading-snug text-[#14213d] sm:text-xl">
              {q.q}
            </h2>

            <div className="mt-4 space-y-2" role="radiogroup" aria-label={q.q}>
              {q.options.map((opt) => {
                const active = selected === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => handleSelect(opt)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
                      active
                        ? "border-[#5b4bdb] bg-[#eeecfd] text-[#4637c2]"
                        : "border-[#cfd2e3] bg-white text-[#1c2438] hover:border-[#5b4bdb] hover:bg-[#f6f6fb]"
                    }`}
                  >
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                        active
                          ? "border-[#5b4bdb] bg-[#5b4bdb]"
                          : "border-[#cfd2e3]"
                      }`}
                      aria-hidden="true"
                    >
                      {active && (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12l5 5 9-10" />
                        </svg>
                      )}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between gap-2 border-t border-[#e5e6f1] pt-4">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="rounded-lg border border-[#e5e6f1] bg-white px-4 py-2 text-xs font-bold text-[#14213d] transition-colors hover:border-[#5b4bdb] hover:text-[#5b4bdb] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            {isLast ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!selected}
                className="sw-pulse rounded-lg bg-[#5b4bdb] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4637c2] disabled:opacity-50 disabled:[animation:none]"
              >
                Submit survey
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                disabled={!selected}
                className="rounded-lg bg-[#5b4bdb] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#4637c2] disabled:opacity-50"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sw-slide-in {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .sw-slide-in {
          animation: sw-slide-in 0.3s cubic-bezier(0.65, 0, 0.35, 1) both;
        }
        @keyframes sw-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(91, 75, 219, 0.35); }
          50%      { box-shadow: 0 0 0 6px rgba(91, 75, 219, 0); }
        }
        .sw-pulse {
          animation: sw-pulse 1.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .sw-slide-in, .sw-pulse { animation: none; }
        }
      `}</style>
    </div>
  );
}