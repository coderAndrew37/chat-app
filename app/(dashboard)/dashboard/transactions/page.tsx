"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "@/lib/use-dashboard";

const CARD =
  "rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]";

type TxType = "all" | "reward" | "withdrawal";
type TxStatus = "all" | "Credited" | "Pending" | "Paid" | "Cancelled";

export default function TransactionsPage() {
  const { state, ready, money } = useDashboard();
  const [q, setQ] = useState("");
  const [type, setType] = useState<TxType>("all");
  const [status, setStatus] = useState<TxStatus>("all");

  const rows = useMemo(() => {
    if (!state) return [];
    const needle = q.trim().toLowerCase();
    return state.tx.filter((t) => {
      if (type !== "all" && t.type !== type) return false;
      if (status !== "all" && t.status !== status) return false;
      if (needle && !`${t.desc} ${t.ref}`.toLowerCase().includes(needle))
        return false;
      return true;
    });
  }, [state, q, type, status]);

  if (!ready || !state) return null;

  const total = state.tx.length;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-extrabold text-[#14213d] sm:text-2xl">
          Transaction history
        </h2>
        <p className="mt-1 text-xs text-[#667088]">
          {total} total transaction{total === 1 ? "" : "s"}
        </p>
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by description or reference"
          className="w-full flex-1 rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TxType)}
          className="rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none sm:w-44"
        >
          <option value="all">All types</option>
          <option value="reward">Rewards</option>
          <option value="withdrawal">Withdrawals</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TxStatus)}
          className="rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none sm:w-44"
        >
          <option value="all">All statuses</option>
          <option value="Credited">Credited</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className={CARD}>
        {rows.length === 0 ? (
          <div className="px-4 py-16 text-center">
            <p className="text-sm font-bold text-[#14213d]">
              No transactions found
            </p>
            <p className="mt-1 text-xs text-[#667088]">
              {total === 0
                ? "Submit a review to get started."
                : "Try a different search or filter."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-[#667088]">
                  <th className="px-4 py-2.5 sm:px-5">Date</th>
                  <th className="px-4 py-2.5">Details</th>
                  <th className="hidden px-4 py-2.5 sm:table-cell">Reference</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5 text-right sm:px-5">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e6f1]">
                {rows.map((t) => (
                  <tr key={t.id}>
                    <td className="px-4 py-3 text-xs text-[#667088] sm:px-5">
                      {new Date(t.date).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium text-[#14213d]">
                      {t.desc}
                    </td>
                    <td className="hidden px-4 py-3 font-mono text-xs text-[#667088] sm:table-cell">
                      {t.ref}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          t.status === "Credited" || t.status === "Paid"
                            ? "bg-[#e2f6ee] text-[#13795b]"
                            : t.status === "Pending"
                              ? "bg-[#fff1d6] text-[#9a5b00]"
                              : "bg-[#fde8e6] text-[#b42318]"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-bold tabular-nums sm:px-5 ${
                        t.type === "reward" ? "text-[#13795b]" : "text-[#b42318]"
                      }`}
                    >
                      {t.type === "reward" ? "+" : "−"}
                      {money(t.amount)}
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