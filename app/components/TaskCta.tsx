"use client";

import Link from "next/link";
import { toast } from "sonner";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";
import { useDashboard } from "@/lib/use-dashboard";
import { TASK_ROUTES, type TaskType } from "@/lib/tasks/types";

export function TaskCTA({
  taskType,
  slug,
  size = "md",
}: {
  taskType: TaskType;
  slug: string;
  size?: "sm" | "md";
}) {
  const { completedFor, paywalledFor } = useDashboard();
  const existing = completedFor(taskType, slug);

  const base =
    "inline-flex items-center justify-center rounded-lg font-bold transition-colors";
  const sz =
    size === "sm"
      ? "px-3 py-1.5 text-xs"
      : "px-4 py-2.5 text-sm";

  if (existing) {
    if (existing.status === "Verified") {
      return (
        <Link
          href="/dashboard/tasks"
          className={`${base} ${sz} bg-[#e2f6ee] text-[#13795b] hover:bg-[#d1ecdf]`}
        >
          ✓ Completed
        </Link>
      );
    }
    if (existing.status === "Rejected") {
      return (
        <Link
          href={`/${TASK_ROUTES[taskType]}/${slug}`}
          className={`${base} ${sz} bg-[#fde8e6] text-[#b42318] hover:bg-[#fbd0cc]`}
        >
          Resubmit
        </Link>
      );
    }
    return (
      <Link
        href="/dashboard/tasks"
        className={`${base} ${sz} bg-[#fff1d6] text-[#9a5b00] hover:bg-[#ffe6b8]`}
      >
        Under verification
      </Link>
    );
  }

  if (paywalledFor(taskType)) {
    return (
      <button
        type="button"
        onClick={() => {
          toast(
            "You've used your free tasks for this track. Upgrade to keep going.",
          );
          window.open(VELLOEARN_REGISTER_URL, "_blank", "noopener,noreferrer");
        }}
        className={`${base} ${sz} bg-rose-500 text-white hover:bg-rose-600`}
      >
        Upgrade
      </button>
    );
  }

  return (
    <Link
      href={`/${TASK_ROUTES[taskType]}/${slug}`}
      className={`${base} ${sz} bg-[#5b4bdb] text-white hover:bg-[#4637c2]`}
    >
      Start task
    </Link>
  );
}