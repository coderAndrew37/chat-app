"use client";

import { useState } from "react";
import { Calculator, Smartphone } from "lucide-react";

interface PayoutEstimatorProps {
  currency: string;
  exchangeRate: number; // relative to base (e.g., 1 USD = 3700 UGX)
  mobileMoneyProviders: string[];
}

export function PayoutEstimator({ currency, exchangeRate, mobileMoneyProviders }: PayoutEstimatorProps) {
  const [earnedAmount, setEarnedAmount] = useState<number>(10000);

  // For display, we just show the amount in local currency.
  const converted = earnedAmount * exchangeRate;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
      <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
        <Calculator className="h-6 w-6 text-emerald-500" />
        Payout Estimator
      </h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        See how much you can earn and how fast you get paid.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Your earnings (in {currency})
          </label>
          <input
            type="number"
            value={earnedAmount}
            onChange={(e) => setEarnedAmount(Number(e.target.value))}
            className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            min={0}
            step={1000}
          />
        </div>

        <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            You will receive: <span className="font-bold">{currency} {earnedAmount.toLocaleString()}</span>
          </p>
          <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-400">
            💸 Transfers to {mobileMoneyProviders.join(" or ")} are instant and free.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-white/10">
          <Smartphone className="h-5 w-5 text-indigo-500" />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            Withdraw directly to your mobile money wallet with one click.
          </span>
        </div>
      </div>
    </div>
  );
}