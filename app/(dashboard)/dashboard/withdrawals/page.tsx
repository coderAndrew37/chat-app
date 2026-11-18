"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDashboard } from "@/lib/use-dashboard";

const CARD =
  "rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]";

const generateRef = (prefix: string) =>
  prefix +
  Date.now().toString(36).toUpperCase().slice(-5) +
  Array.from(
    { length: 4 },
    () =>
      "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)],
  ).join("");

const maskPhone = (p: string) =>
  p.length >= 8 ? "+" + p.slice(0, 5) + "****" + p.slice(-3) : p;

export default function WithdrawalsPage() {
  const { state, ready, save, wallet, country, money } = useDashboard();

  const [method, setMethod] = useState("");
  const [phone, setPhone] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  if (!ready || !state) return null;

  const phoneValue = phone ?? state.profile.phone ?? "";
  const activeMethod = method || country.methods[0];
  const withdrawals = state.tx.filter((t) => t.type === "withdrawal");
  const canWithdraw = wallet.avail >= country.min;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    const errs: string[] = [];
    const amt = parseFloat(amount);
    const cleaned = phoneValue.replace(/[\s()-]/g, "");

    if (cleaned.length < 8) errs.push("Enter a valid mobile money number.");
    if (!(amt > 0)) errs.push("Enter the amount to withdraw.");
    else if (amt < country.min)
      errs.push(`Minimum withdrawal is ${money(country.min)}.`);
    else if (amt > wallet.avail)
      errs.push(`You can withdraw up to ${money(wallet.avail)}.`);

    if (errs.length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    const normalizedPhone = cleaned.startsWith("0")
      ? "+" + cleaned.slice(1)
      : cleaned.startsWith("+")
        ? cleaned
        : "+" + cleaned;

    save({
      ...state,
      profile: { ...state.profile, phone: normalizedPhone },
      tx: [
        {
          id: crypto.randomUUID(),
          ref: generateRef("WD"),
          type: "withdrawal",
          desc: `${activeMethod} withdrawal`,
          amount: amt,
          status: "Pending",
          date: new Date().toISOString(),
        },
        ...state.tx,
      ],
    });

    setAmount("");
    setSubmitting(false);
    toast.success("Withdrawal request received. Processing shortly.");
  };

  const cancel = (id: string) => {
    const t = state.tx.find((x) => x.id === id);
    if (!t || t.status !== "Pending") return;
    save({
      ...state,
      tx: state.tx.map((x) =>
        x.id === id ? { ...x, status: "Cancelled" as const } : x,
      ),
    });
    toast.success("Withdrawal cancelled. Funds returned.");
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-extrabold text-[#14213d] sm:text-2xl">
          Withdrawals
        </h2>
        <p className="mt-1 text-xs text-[#667088]">
          Available: <b className="text-[#14213d]">{money(wallet.avail)}</b> ·
          Minimum: <b className="text-[#14213d]">{money(country.min)}</b>
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        {/* Form */}
        <div className={`${CARD} p-4 sm:p-5`}>
          <h3 className="font-heading font-bold text-[#14213d]">
            Request withdrawal
          </h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#14213d]">
                Payout method
              </label>
              <select
                value={activeMethod}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
              >
                {country.methods.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-[#14213d]">
                Mobile money number
              </label>
              <input
                type="tel"
                value={phoneValue}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712 345 678"
                className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-[#14213d]">
                Amount ({country.cur})
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={country.min}
                  step="1"
                  placeholder={`${country.min}`}
                  className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 pr-20 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
                />
                <button
                  type="button"
                  onClick={() => setAmount(String(Math.floor(wallet.avail)))}
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-[#eeecfd] px-2 py-1 text-[11px] font-bold text-[#4637c2] hover:bg-[#ddd9fb]"
                >
                  Max
                </button>
              </div>
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
              disabled={!canWithdraw || submitting}
              className="w-full rounded-lg bg-[#5b4bdb] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#4637c2] disabled:cursor-not-allowed disabled:bg-[#cfd2e3]"
            >
              {submitting ? "Processing…" : "Request withdrawal"}
            </button>

            {!canWithdraw && (
              <p className="text-center text-[11px] text-[#9a5b00]">
                You need {money(country.min - wallet.avail)} more to reach the
                minimum.
              </p>
            )}
          </form>
        </div>

        {/* List */}
        <div className={CARD}>
          <div className="border-b border-[#e5e6f1] px-4 py-3 sm:px-5">
            <h3 className="font-heading font-bold text-[#14213d]">
              Your requests
            </h3>
          </div>
          {withdrawals.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-sm font-bold text-[#14213d]">
                No withdrawal requests yet
              </p>
              <p className="mt-1 text-xs text-[#667088]">
                Your requests will appear here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#e5e6f1]">
              {withdrawals.map((t) => (
                <li key={t.id} className="p-4 sm:px-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold tabular-nums text-[#14213d]">
                        −{money(t.amount)}
                      </p>
                      <p className="mt-0.5 text-xs text-[#667088]">
                        {new Date(t.date).toLocaleDateString("en-KE", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        · {t.ref}
                      </p>
                      <p className="mt-0.5 text-xs text-[#667088]">
                        To {t.desc.replace(" withdrawal", "")}{" "}
                        {maskPhone(state.profile.phone)}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      {t.status === "Pending" && (
                        <>
                          <span className="inline-block rounded-full bg-[#fff1d6] px-2 py-0.5 text-[10px] font-bold text-[#9a5b00]">
                            Pending
                          </span>
                          <button
                            onClick={() => cancel(t.id)}
                            className="mt-2 block w-full rounded-md border border-[#e5e6f1] bg-white px-2 py-1 text-[11px] font-semibold text-[#14213d] hover:border-[#b42318] hover:text-[#b42318]"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {t.status === "Paid" && (
                        <span className="inline-block rounded-full bg-[#e2f6ee] px-2 py-0.5 text-[10px] font-bold text-[#13795b]">
                          Paid
                        </span>
                      )}
                      {t.status === "Cancelled" && (
                        <span className="inline-block rounded-full bg-[#f6f6fb] px-2 py-0.5 text-[10px] font-bold text-[#667088]">
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}