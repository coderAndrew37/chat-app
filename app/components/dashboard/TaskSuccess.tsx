"use client";

import Link from "next/link";
import {
  TASK_ACCENTS,
  TASK_LABELS,
  type TaskType,
} from "@/lib/tasks/types";

type Props = {
  taskType: TaskType;
  itemName: string;
  rewardUsd: number;
  rewardLocal: string;
  backHref: string;
  backLabel: string;
};

export function TaskSuccess({
  taskType,
  itemName,
  rewardUsd,
  rewardLocal,
  backHref,
  backLabel,
}: Props) {
  const label = TASK_LABELS[taskType];
  const accent = TASK_ACCENTS[taskType];

  return (
    <div className="mx-auto max-w-lg">
      <div className="overflow-hidden rounded-2xl border border-[#e5e6f1] bg-white p-8 text-center shadow-[0_1px_2px_rgba(20,33,61,0.05),0_24px_64px_-24px_rgba(20,33,61,0.35)] sm:p-10">
        <div className="relative mx-auto grid h-24 w-24 place-items-center">
          <div className="ts-pop absolute inset-0 rounded-full bg-[#13795b]/10 blur-xl" />
          <svg
            viewBox="0 0 96 96"
            className="relative h-24 w-24"
            role="img"
            aria-label={`${label} submitted successfully`}
          >
            <circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              stroke="#13795b"
              strokeWidth="4"
              strokeLinecap="round"
              className="ts-circle"
              pathLength={100}
            />
            <path
              d="M30 49.5L43 62L66 36"
              fill="none"
              stroke="#13795b"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ts-check"
              pathLength={100}
            />
          </svg>
        </div>

        <div
          className="ts-fade ts-fade-1 mx-auto mt-5 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{ background: accent.bg, color: accent.text }}
        >
          {accent.icon} {label}
        </div>

        <h2 className="font-heading ts-fade ts-fade-2 mt-3 text-2xl font-extrabold text-[#14213d]">
          {label} submitted!
        </h2>
        <p className="ts-fade ts-fade-3 mt-2 text-sm text-[#667088]">
          Verification starts shortly — your reward is on its way to your
          wallet.
        </p>

        <div className="ts-fade ts-fade-3 mt-6 inline-flex items-center gap-2 rounded-full bg-[#e2f6ee] px-4 py-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#13795b] text-xs font-bold text-white">
            ✓
          </span>
          <span className="text-sm font-bold text-[#13795b]">
            +{rewardLocal}
          </span>
          <span className="text-xs font-semibold text-[#13795b]/70">
            ≈ ${rewardUsd.toFixed(2)}
          </span>
        </div>
        <p className="ts-fade ts-fade-3 mt-1 text-[11px] text-[#667088]">
          {itemName}
        </p>

        <div className="ts-fade ts-fade-4 mt-8 grid gap-2 sm:grid-cols-2">
          <Link
            href="/dashboard/tasks"
            className="rounded-lg bg-[#5b4bdb] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4637c2]"
          >
            View my tasks
          </Link>
          <Link
            href={backHref}
            className="rounded-lg border border-[#e5e6f1] bg-white px-4 py-2.5 text-sm font-bold text-[#14213d] transition-colors hover:border-[#5b4bdb] hover:text-[#5b4bdb]"
          >
            {backLabel}
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes ts-circle-draw {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ts-check-draw {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ts-pop-in {
          0%   { opacity: 0; transform: scale(0.6); }
          60%  { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ts-fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ts-circle {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: ts-circle-draw 0.55s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .ts-check {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: ts-check-draw 0.4s cubic-bezier(0.65, 0, 0.35, 1) 0.35s forwards;
        }
        .ts-pop {
          animation: ts-pop-in 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .ts-fade {
          opacity: 0;
          animation: ts-fade-up 0.4s ease-out forwards;
        }
        .ts-fade-1 { animation-delay: 0.35s; }
        .ts-fade-2 { animation-delay: 0.5s; }
        .ts-fade-3 { animation-delay: 0.7s; }
        .ts-fade-4 { animation-delay: 0.9s; }
        @media (prefers-reduced-motion: reduce) {
          .ts-circle,
          .ts-check,
          .ts-pop,
          .ts-fade {
            animation: none;
            opacity: 1;
            stroke-dashoffset: 0;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}