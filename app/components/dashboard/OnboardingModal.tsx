"use client";
import { COUNTRIES, DEFAULT_RATES } from "@/lib/countries";
import { useDashboard } from "@/lib/use-dashboard";
import { toast } from "sonner";

export function OnboardingModal() {
  const { state, save, ready } = useDashboard();

  if (!ready || !state || state.profile.country) return null;

  const pick = (key: keyof typeof COUNTRIES) => {
    const c = COUNTRIES[key];
    save({
      ...state,
      profile: { ...state.profile, country: key },
      rates: { ...DEFAULT_RATES },
      minWd: c.min,
    });
    toast.success(`Welcome! Your wallet is in ${c.cur} (${c.name}).`);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="font-heading text-lg font-bold">Welcome to HotelRate</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose your country. Rewards are paid in US dollars and shown in your local
          currency.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {Object.entries(COUNTRIES).map(([key, c]) => (
            <button
              key={key}
              onClick={() => pick(key as keyof typeof COUNTRIES)}
              className="rounded-xl border p-3 text-left hover:border-indigo-500 hover:bg-indigo-50"
            >
              <span className="text-2xl">{c.flag}</span>
              <b className="mt-1 block text-sm">{c.name}</b>
              <small className="text-xs text-gray-500">
                {c.cur} · $1 = {c.rate.toLocaleString()}
              </small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}