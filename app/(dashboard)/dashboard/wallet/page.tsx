"use client";

import Link from "next/link";
import { useDashboard } from "@/lib/use-dashboard";

const CARD =
  "rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]";

export default function WalletPage() {
  const { state, ready, wallet, country, money, usd } = useDashboard();
  if (!ready || !state) return null;

  const rewards = state.tx.filter((t) => t.type === "reward");
  const pct = Math.min(100, Math.round((wallet.avail / country.min) * 100));
  const canWithdraw = wallet.avail >= country.min;
  const avg = rewards.length ? wallet.earned / rewards.length : 0;
  const pendingWd = state.tx.filter(
    (t) => t.type === "withdrawal" && t.status === "Pending",
  ).length;

  return (
    <div className="space-y-4">
      {/* Hero */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#14213d] to-[#2a2f7a] p-5 text-white sm:p-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#b9c0d6]">
              Available balance
            </p>
            <p className="font-heading mt-1 text-3xl font-extrabold tabular-nums leading-tight sm:text-4xl">
              {money(wallet.avail)}
            </p>
            <p className="mt-1 text-sm tabular-nums text-[#b9c0d6]">
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
              <p className="mt-2 text-xs text-[#b9c0d6]">
                {canWithdraw
                  ? `You can withdraw now. Minimum is ${money(country.min)}.`
                  : `Earn ${money(
                      Math.max(0, country.min - wallet.avail),
                    )} more to reach the ${money(country.min)} minimum.`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/withdrawals"
              aria-disabled={!canWithdraw}
              className={`rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
                canWithdraw
                  ? "bg-[#ff7a00] text-white hover:bg-[#e86d00]"
                  : "pointer-events-none bg-white/10 text-white/40"
              }`}
            >
              Withdraw funds
            </Link>
            <Link
              href="/dashboard/hotels"
              className="rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/20"
            >
              Earn more
            </Link>
          </div>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <MiniStat
          label="Total earnings"
          value={money(wallet.earned)}
          sub={`${rewards.length} verified review${
            rewards.length === 1 ? "" : "s"
          }${rewards.length ? ` · avg ${money(avg)}` : ""}`}
        />
        <MiniStat
          label="Pending earnings"
          value={money(wallet.pending)}
          sub="Rewards under verification"
        />
        <MiniStat
          label="Total withdrawn"
          value={money(wallet.withdrawn)}
          sub={
            pendingWd
              ? `${pendingWd} payout${pendingWd > 1 ? "s" : ""} processing`
              : "Paid out successfully"
          }
        />
      </div>

      {/* History */}
      <div className={`${CARD} overflow-hidden`}>
        <div className="flex flex-col justify-between gap-2 border-b border-[#e5e6f1] px-4 py-3 sm:flex-row sm:items-center sm:px-5">
          <h3 className="font-heading font-bold text-[#14213d]">
            Earnings history
          </h3>
          <p className="text-xs text-[#667088]">
            {rewards.length} reward{rewards.length === 1 ? "" : "s"} ·{" "}
            {money(wallet.earned)} total
          </p>
        </div>

        {rewards.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm font-bold text-[#14213d]">No earnings yet</p>
            <p className="mt-1 text-xs text-[#667088]">
              Submit a review to earn your first reward.
            </p>
            <Link
              href="/dashboard/hotels"
              className="mt-4 inline-block rounded-lg bg-[#5b4bdb] px-4 py-2 text-xs font-bold text-white hover:bg-[#4637c2]"
            >
              Browse hotels
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-[#667088]">
                  <th className="px-4 py-2.5 sm:px-5">Date</th>
                  <th className="px-4 py-2.5">Hotel</th>
                  <th className="hidden px-4 py-2.5 text-right sm:table-cell">
                    USD
                  </th>
                  <th className="px-4 py-2.5 text-right sm:px-5">
                    {country.cur}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e6f1]">
                {rewards.map((t) => (
                  <tr key={t.id}>
                    <td className="px-4 py-3 text-xs text-[#667088] sm:px-5">
                      {new Date(t.date).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium text-[#14213d]">
                      {t.desc.replace("Review reward: ", "")}
                    </td>
                    <td className="hidden px-4 py-3 text-right text-xs tabular-nums text-[#667088] sm:table-cell">
                      {usd(t.usd ?? 0)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold tabular-nums text-[#13795b] sm:px-5">
                      +{money(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className={`${CARD} p-4 sm:p-5`}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#667088]">
        {label}
      </p>
      <p className="font-heading mt-1 text-xl font-extrabold tabular-nums text-[#14213d]">
        {value}
      </p>
      <p className="mt-0.5 text-xs text-[#667088]">{sub}</p>
    </div>
  );
}