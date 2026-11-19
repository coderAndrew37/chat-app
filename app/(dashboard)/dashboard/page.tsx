// app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { useDashboard } from "@/lib/use-dashboard";
import {
  FREE_LIMIT,
  TASK_ACCENTS,
  TASK_LABELS,
  TASK_ROUTES,
  type TaskCompletion,
  type TaskType,
} from "@/lib/tasks/types";
import { catalogCount } from "@/lib/tasks";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";

const CARD =
  "rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]";

const TRACKS: TaskType[] = ["hotel-review", "survey", "chatting", "ai-training"];

// ─── helpers ────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
  });
}

// ─── balance hero ───────────────────────────────────────────────────────────

function BalanceHero() {
  const { wallet, country, money, usd, isActivated } = useDashboard();

  const pct = Math.min(
    100,
    Math.round((wallet.avail / country.min) * 100),
  );
  const shortfall = Math.max(0, country.min - wallet.avail);
  const hasMin = wallet.avail >= country.min;
  const canWithdraw = hasMin && isActivated;

  let statusLine: string;
  if (wallet.avail === 0) {
    statusLine = `Complete tasks to earn your first ${money(country.min)} and unlock withdrawals.`;
  } else if (!hasMin) {
    statusLine = `Earn ${money(shortfall)} more to reach the ${money(
      country.min,
    )} minimum.`;
  } else if (!isActivated) {
    statusLine = "Withdraw your earnings in 3 seconds.";
  } else {
    statusLine = "You can withdraw now.";
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#14213d] to-[#2a2f7a] p-5 text-white sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#b9c0d6]">
          Available balance
        </p>
        {wallet.pending > 0 && (
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white/90">
            +{money(wallet.pending)} pending
          </span>
        )}
      </div>

      <p className="font-heading mt-1 text-4xl font-extrabold tabular-nums leading-none sm:text-5xl">
        {money(wallet.avail)}
      </p>
      <p className="mt-2 text-sm tabular-nums text-[#b9c0d6]">
        ≈ {usd(wallet.avail / country.rate)} · $1 = {country.cur}{" "}
        {country.rate.toLocaleString()}
      </p>

      <div className="mt-5 max-w-md">
        <div className="mb-1.5 flex justify-between text-xs text-[#b9c0d6]">
          <span>Progress to minimum withdrawal</span>
          <span className="tabular-nums">{pct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-[#ff7a00] transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-[#b9c0d6]">{statusLine}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/dashboard/withdrawals"
          aria-disabled={!canWithdraw && isActivated}
          className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
            !isActivated
              ? "bg-[#5b4bdb] text-white hover:bg-[#4637c2]"
              : canWithdraw
                ? "bg-[#ff7a00] text-white hover:bg-[#e86d00]"
                : "pointer-events-none bg-white/10 text-white/40"
          }`}
        >
          {!isActivated
            ? "Withdraw Now"
            : canWithdraw
              ? "Withdraw funds"
              : `Need ${money(shortfall)} more`}
        </Link>
        <Link
          href="/tasks"
          className="rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/20"
        >
          Earn more
        </Link>
      </div>
    </div>
  );
}

// ─── compact stat ───────────────────────────────────────────────────────────

function MiniStat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "warn" | "good";
}) {
  const color =
    tone === "warn"
      ? "text-[#9a5b00]"
      : tone === "good"
        ? "text-[#13795b]"
        : "text-[#14213d]";
  return (
    <div className={`${CARD} px-3 py-2.5 sm:px-4 sm:py-3`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#667088]">
        {label}
      </p>
      <p className={`font-heading mt-0.5 text-base font-extrabold tabular-nums ${color} sm:text-lg`}>
        {value}
      </p>
    </div>
  );
}

// ─── track card ─────────────────────────────────────────────────────────────

function TrackCard({ type }: { type: TaskType }) {
  const { freeUsedFor, paywalledFor, ready, state } = useDashboard();
  if (!ready || !state) return null;

  const accent = TASK_ACCENTS[type];
  const used = freeUsedFor(type);
  const limit = FREE_LIMIT[type];
  const paywalled = paywalledFor(type);
  const total = catalogCount(type);
  const completed = state.tasks.filter(
    (t) => t.taskType === type && t.status === "Verified",
  ).length;
  const available = total - completed;

  return (
    <Link
      href={`/${TASK_ROUTES[type]}`}
      className={`${CARD} group flex flex-col p-4 transition-shadow hover:shadow-[0_1px_2px_rgba(20,33,61,0.05),0_12px_32px_-12px_rgba(20,33,61,0.35)]`}
    >
      <div className="flex items-start gap-3">
        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl"
          style={{ background: accent.bg }}
        >
          {accent.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-heading text-sm font-extrabold leading-tight text-[#14213d] group-hover:text-[#5b4bdb]">
            {TASK_LABELS[type]}s
          </h4>
          <p className="mt-0.5 text-[11px] text-[#667088]">
            {available} task{available === 1 ? "" : "s"} available
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#667088]">
          {paywalled ? (
            <span className="text-[#b42318]">Upgrade</span>
          ) : (
            `${used}/${limit} used`
          )}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[#e5e6f1] pt-2.5">
        <span className="text-[11px] text-[#667088]">
          {completed > 0 ? (
            <>
              <b className="text-[#14213d]">{completed}</b> completed
            </>
          ) : (
            "Not started yet"
          )}
        </span>
        <span
          className="text-xs font-bold"
          style={{ color: accent.text }}
        >
          Open →
        </span>
      </div>
    </Link>
  );
}

// ─── earnings chart ─────────────────────────────────────────────────────────

function EarningsChart({
  rewards,
}: {
  rewards: { day: string; amount: number }[];
}) {
  const { country } = useDashboard();
  const max = Math.max(...rewards.map((r) => r.amount), 1);

  return (
    <div className={`${CARD} p-4 sm:p-5`}>
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-[#14213d]">
          Last 7 days ({country.cur})
        </h3>
        <span className="text-[11px] text-[#667088]">
          {rewards.reduce((a, r) => a + r.amount, 0).toLocaleString()}
        </span>
      </div>
      <svg
        viewBox="0 0 420 140"
        className="mt-3 w-full"
        role="img"
        aria-label="Earnings over the last 7 days"
      >
        {rewards.map((r, i) => {
          const h = Math.max(3, (r.amount / max) * 90);
          const x = 14 + i * 58;
          const label = new Date(`${r.day}T12:00:00`).toLocaleDateString(
            "en-KE",
            { weekday: "short" },
          );
          return (
            <g key={r.day}>
              <rect
                x={x}
                y={110 - h}
                width={38}
                height={h}
                rx={5}
                className={r.amount ? "fill-[#5b4bdb]" : "fill-[#e5e6f1]"}
              >
                <title>{r.amount.toLocaleString()}</title>
              </rect>
              <text
                x={x + 19}
                y={128}
                textAnchor="middle"
                className="fill-[#667088] text-[11px]"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── recent activity ────────────────────────────────────────────────────────

function RecentActivity({ tasks }: { tasks: TaskCompletion[] }) {
  const { money } = useDashboard();
  const recent = tasks.slice(0, 5);

  return (
    <div className={`${CARD} p-4 sm:p-5`}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-[#14213d]">
          Recent activity
        </h3>
        {tasks.length > 0 && (
          <Link
            href="/dashboard/tasks"
            className="text-xs font-semibold text-[#5b4bdb] hover:text-[#4637c2]"
          >
            View all →
          </Link>
        )}
      </div>

      {recent.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm font-bold text-[#14213d]">
            No tasks completed yet
          </p>
          <p className="mt-1 text-xs text-[#667088]">
            Pick a track above to start earning.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[#e5e6f1]">
          {recent.map((t) => {
            const accent = TASK_ACCENTS[t.taskType];
            return (
              <li
                key={t.id}
                className="flex items-center justify-between gap-3 py-2.5"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm"
                    style={{ background: accent.bg }}
                    aria-hidden="true"
                  >
                    {accent.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#14213d]">
                      {t.taskTitle}
                    </p>
                    <p className="truncate text-[11px] text-[#667088]">
                      {TASK_LABELS[t.taskType]} · {timeAgo(t.date)}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  {t.status === "Verified" ? (
                    <p className="text-sm font-bold tabular-nums text-[#13795b]">
                      +{money(t.rewardLocal)}
                    </p>
                  ) : t.status === "Verifying" ? (
                    <span className="rounded-full bg-[#fff1d6] px-2 py-0.5 text-[10px] font-bold text-[#9a5b00]">
                      Verifying
                    </span>
                  ) : (
                    <span className="rounded-full bg-[#fde8e6] px-2 py-0.5 text-[10px] font-bold text-[#b42318]">
                      Rejected
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ─── activation banner (only when needed) ──────────────────────────────────

function ActivationBanner() {
  const { wallet, isActivated, ready } = useDashboard();
  if (!ready || isActivated || wallet.earned === 0) return null;

  return (
    <div className="rounded-xl border border-[#fde8c5] bg-[#fff1d6] p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-heading text-sm font-bold text-[#9a5b00]">
            Activate your account to withdraw
          </p>
          <p className="mt-0.5 text-xs text-[#9a5b00]/85">
            Your earnings are safe. Create and activate a VelloEarn account to
            unlock withdrawals.
          </p>
        </div>
        <a
          href={VELLOEARN_REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg bg-[#9a5b00] px-4 py-2 text-xs font-bold text-white hover:bg-[#7a4700]"
        >
          Activate now →
        </a>
      </div>
    </div>
  );
}

// ─── page ───────────────────────────────────────────────────────────────────

export default function OverviewPage() {
  const { state, ready, wallet, money, country } = useDashboard();

  if (!ready || !state) return null;

  const name = state.profile.name.trim();
  const firstName = name ? name.split(" ")[0] : "";

  const rewards = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const day = d.toLocaleDateString("en-CA");
    const amount = state.tx
      .filter((t) => t.type === "reward" && t.date.slice(0, 10) === day)
      .reduce((a, t) => a + t.amount, 0);
    return { day, amount };
  });

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Welcome */}
      <div>
        <h2 className="font-heading text-xl font-extrabold text-[#14213d] sm:text-2xl">
          {firstName ? `Welcome back, ${firstName}` : "Welcome to HotelRate"}
        </h2>
        <p className="mt-1 text-xs text-[#667088]">
          Your wallet is in {country.cur} · $1 = {country.cur}{" "}
          {country.rate.toLocaleString()}
        </p>
      </div>

      {/* Balance hero */}
      <BalanceHero />

      {/* Compact stats */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        <MiniStat
          label="Total earned"
          value={money(wallet.earned)}
          tone="good"
        />
        <MiniStat
          label="Pending"
          value={money(wallet.pending)}
          tone={wallet.pending > 0 ? "warn" : "default"}
        />
        <MiniStat
          label="Withdrawn"
          value={money(wallet.withdrawn)}
        />
      </div>

      {/* Activation nudge */}
      <ActivationBanner />

      {/* Tracks */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-heading text-sm font-bold text-[#14213d] sm:text-base">
            Pick a track
          </h3>
          <Link
            href="/tasks"
            className="text-xs font-semibold text-[#5b4bdb] hover:text-[#4637c2]"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TRACKS.map((type) => (
            <TrackCard key={type} type={type} />
          ))}
        </div>
      </div>

      {/* Chart + recent activity */}
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
        <EarningsChart rewards={rewards} />
        <RecentActivity tasks={state.tasks} />
      </div>
    </div>
  );
}