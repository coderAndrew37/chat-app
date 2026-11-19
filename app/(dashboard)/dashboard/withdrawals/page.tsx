// app/dashboard/withdrawals/page.tsx
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDashboard } from "@/lib/use-dashboard";
import { dashboardStore } from "@/lib/store";
import type { Tx } from "@/lib/storage";
import { VELLOEARN_REGISTER_URL } from "@/lib/constants";

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
  const { state, ready, wallet, country, money, isActivated } = useDashboard();

  const [method, setMethod] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [showActivation, setShowActivation] = useState(false);
  const [pendingData, setPendingData] = useState<{
    amt: number;
    cleaned: string;
  } | null>(null);
  const [phoneInitialized, setPhoneInitialized] = useState(false);

  // Prefill phone from profile once, so the field reflects the saved number
  // without snapping back when the user clears it.
  useEffect(() => {
    if (!ready || !state || phoneInitialized) return;
    if (state.profile.phone) setPhone(state.profile.phone);
    setPhoneInitialized(true);
  }, [ready, state, phoneInitialized]);

  if (!ready || !state) return null;

  const activeMethod = method || country.methods[0];
  const withdrawals = state.tx.filter((t) => t.type === "withdrawal");
  const canWithdraw = wallet.avail >= country.min;

  /**
   * Writes the withdrawal row. Uses patchState so it never overwrites
   * concurrent updates (e.g. activation flag set in the modal flow).
   */
  const processWithdrawal = (
    amt: number,
    cleaned: string,
    opts?: { silent?: boolean; activate?: boolean },
  ) => {
    const normalizedPhone = cleaned.startsWith("0")
      ? "+" + cleaned.slice(1)
      : cleaned.startsWith("+")
        ? cleaned
        : "+" + cleaned;

    dashboardStore.patchState((s) => ({
      ...s,
      profile: {
        ...s.profile,
        phone: normalizedPhone,
        ...(opts?.activate ? { accountActivated: true } : {}),
      },
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
        ...s.tx,
      ],
    }));

    setAmount("");
    if (!opts?.silent) {
      toast.success("Withdrawal request received. Processing shortly.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const errs: string[] = [];
    const amt = parseFloat(amount);
    const cleaned = phone.replace(/[\s()-]/g, "");

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

    if (!isActivated) {
      setPendingData({ amt, cleaned });
      setShowActivation(true);
      return;
    }

    processWithdrawal(amt, cleaned);
  };

  const cancel = (id: string) => {
    const t = state.tx.find((x) => x.id === id);
    if (!t || t.status !== "Pending") return;
    dashboardStore.patchState((s) => ({
      ...s,
      tx: s.tx.map((x) =>
        x.id === id ? { ...x, status: "Cancelled" as const } : x,
      ),
    }));
    toast.success("Withdrawal cancelled. Funds returned.");
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-extrabold text-[#14213d] sm:text-2xl">
          Withdrawals
        </h2>
        <p className="mt-1 text-xs text-[#667088]">
          Available: <b className="text-[#14213d]">{money(wallet.avail)}</b> ·{" "}
          Minimum: <b className="text-[#14213d]">{money(country.min)}</b>
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <WithdrawalForm
          method={activeMethod}
          setMethod={setMethod}
          phone={phone}
          setPhone={setPhone}
          amount={amount}
          setAmount={setAmount}
          errors={errors}
          canWithdraw={canWithdraw}
          isActivated={isActivated}
          maxAmount={wallet.avail}
          minAmount={country.min}
          currency={country.cur}
          methods={[...country.methods]}
          money={money}
          onSubmit={handleSubmit}
        />

        <WithdrawalHistory
          withdrawals={withdrawals}
          phone={state.profile.phone}
          money={money}
          onCancel={cancel}
        />
      </div>

      {showActivation && pendingData && (
        <ActivationModal
          onClose={() => {
            setShowActivation(false);
            setPendingData(null);
          }}
          onActivated={() => {
            const { amt, cleaned } = pendingData;
            setShowActivation(false);
            setPendingData(null);
            // One atomic patch: activates + records the withdrawal,
            // avoids the "activated but withdrawal lost" race.
            processWithdrawal(amt, cleaned, { silent: true, activate: true });
            toast.success("Account activated. Withdrawal submitted.");
          }}
        />
      )}
    </div>
  );
}

// ─── Withdrawal form (always visible) ───────────────────────────────────────

function WithdrawalForm({
  method,
  setMethod,
  phone,
  setPhone,
  amount,
  setAmount,
  errors,
  canWithdraw,
  maxAmount,
  minAmount,
  currency,
  methods,
  money,
  onSubmit,
}: {
  method: string;
  setMethod: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  amount: string;
  setAmount: (v: string) => void;
  errors: string[];
  canWithdraw: boolean;
  isActivated: boolean;
  maxAmount: number;
  minAmount: number;
  currency: string;
  methods: string[];
  money: (n: number) => string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className={`${CARD} p-4 sm:p-5`}>
      <h3 className="font-heading font-bold text-[#14213d]">
        Request withdrawal
      </h3>
      <form onSubmit={onSubmit} className="mt-4 space-y-3.5">
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#14213d]">
            Payout method
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
          >
            {methods.map((m) => (
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0712 345 678"
            className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-[#14213d]">
            Amount ({currency})
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={minAmount}
              step="1"
              placeholder={`${minAmount}`}
              className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 pr-20 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
            />
            <button
              type="button"
              onClick={() => setAmount(String(Math.floor(maxAmount)))}
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
          disabled={!canWithdraw}
          className="w-full rounded-lg bg-[#5b4bdb] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4637c2] disabled:cursor-not-allowed disabled:bg-[#cfd2e3]"
        >
          Withdraw now
        </button>

        {!canWithdraw && (
          <p className="text-center text-[11px] text-[#9a5b00]">
            You need{" "}
            {money(minAmount - maxAmount > 0 ? minAmount - maxAmount : 0)}{" "}
            more to reach the minimum.
          </p>
        )}
      
      </form>
    </div>
  );
}

// ─── Activation modal ───────────────────────────────────────────────────────

function ActivationModal({
  onClose,
  onActivated,
}: {
  onClose: () => void;
  onActivated: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#14213d]/50 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="activation-title"
        aria-describedby="activation-desc"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#eeecfd]">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-[#5b4bdb]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 1 1 8 0v4" />
          </svg>
        </div>

        <h2
          id="activation-title"
          className="font-heading mt-4 text-center text-lg font-extrabold text-[#14213d]"
        >
          Activate to withdraw
        </h2>
        <p
          id="activation-desc"
          className="mt-2 text-center text-sm leading-relaxed text-[#667088]"
        >
          Your earnings are safe and waiting. Create and activate a VelloEarn
          account to unlock withdrawals — it&apos;s free and takes under a
          minute.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <a
            href={VELLOEARN_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-lg bg-[#5b4bdb] px-4 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-[#4637c2]"
          >
            Activate account →
          </a>
          <button
            type="button"
            onClick={onActivated}
            className="w-full rounded-lg border border-[#e5e6f1] bg-white px-4 py-2.5 text-sm font-bold text-[#14213d] transition-colors hover:border-[#5b4bdb] hover:text-[#5b4bdb]"
          >
            I&apos;ve already activated my account
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 text-xs font-semibold text-[#667088] transition-colors hover:text-[#14213d]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Withdrawal history ─────────────────────────────────────────────────────

function WithdrawalHistory({
  withdrawals,
  phone,
  money,
  onCancel,
}: {
  withdrawals: Tx[];
  phone: string;
  money: (n: number) => string;
  onCancel: (id: string) => void;
}) {
  return (
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
                    To {t.desc.replace(" withdrawal", "")} {maskPhone(phone)}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  {t.status === "Pending" && (
                    <>
                      <span className="inline-block rounded-full bg-[#fff1d6] px-2 py-0.5 text-[10px] font-bold text-[#9a5b00]">
                        Pending
                      </span>
                      <button
                        onClick={() => onCancel(t.id)}
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
  );
}