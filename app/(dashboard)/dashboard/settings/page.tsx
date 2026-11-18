"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDashboard } from "@/lib/use-dashboard";
import { COUNTRIES, type CountryKey } from "@/lib/countries";
import { KEY } from "@/lib/storage";

const CARD =
  "rounded-xl border border-[#e5e6f1] bg-white shadow-[0_1px_2px_rgba(20,33,61,0.05),0_8px_24px_-16px_rgba(20,33,61,0.25)]";

type Dash = ReturnType<typeof useDashboard>;
type FormProps = Omit<Dash, "state"> & { state: NonNullable<Dash["state"]> };

export default function SettingsPage() {
  const dash = useDashboard();
  if (!dash.ready || !dash.state) return null;
  return <SettingsForm {...dash} state={dash.state} />;
}

function SettingsForm({ state, save, country, countryKey }: FormProps) {
  const [name, setName] = useState(state.profile.name);
  const [email, setEmail] = useState(state.profile.email);
  const [phone, setPhone] = useState(state.profile.phone);
  const [savingProfile, setSavingProfile] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryKey>(
    (state.profile.country as CountryKey) || "KE"
  );
  const [switching, setSwitching] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    save({
      ...state,
      profile: {
        ...state.profile,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      },
    });
    setSavingProfile(false);
    toast.success("Profile saved.");
  };

  const switchCountry = () => {
    if (selectedCountry === countryKey) return;
    setSwitching(true);
    const next = COUNTRIES[selectedCountry];
    const prevRate = state.rates[country.cur] ?? country.rate;
    const nextRate = state.rates[next.cur] ?? next.rate;
    const factor = nextRate / prevRate;
    const p = 10 ** next.dec;
    const cv = (x: number) => Math.round(x * factor * p) / p;

    save({
      ...state,
      profile: { ...state.profile, country: selectedCountry },
      minWd: next.min,
      tx: state.tx.map((t) => ({ ...t, amount: cv(t.amount) })),
      reviews: state.reviews.map((r) => ({
        ...r,
        localAmount: cv(r.localAmount),
      })),
    });
    setSwitching(false);
    toast.success(`Switched to ${next.name}. Wallet now in ${next.cur}.`);
  };

  const resetAll = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    window.location.reload();
  };

  const previewCountry = COUNTRIES[selectedCountry];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-extrabold text-[#14213d] sm:text-2xl">
          Profile & settings
        </h2>
        <p className="mt-1 text-xs text-[#667088]">
          Manage your profile, country, and wallet preferences.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Profile */}
        <form onSubmit={saveProfile} className={`${CARD} p-4 sm:p-5`}>
          <h3 className="font-heading font-bold text-[#14213d]">Your profile</h3>
          <div className="mt-4 space-y-3.5">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#14213d]">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                autoComplete="name"
                className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#14213d]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
              />
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
                autoComplete="tel"
                className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
              />
            </div>
            <button
              type="submit"
              disabled={savingProfile}
              className="w-full rounded-lg bg-[#5b4bdb] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#4637c2] disabled:bg-[#cfd2e3]"
            >
              {savingProfile ? "Saving…" : "Save profile"}
            </button>
          </div>
        </form>

        {/* Country */}
        <div className={`${CARD} p-4 sm:p-5`}>
          <h3 className="font-heading font-bold text-[#14213d]">
            Country & currency
          </h3>
          <p className="mt-1 text-xs text-[#667088]">
            Your wallet, payout methods, and daily reset follow your country.
          </p>
          <div className="mt-4 space-y-3.5">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#14213d]">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) =>
                  setSelectedCountry(e.target.value as CountryKey)
                }
                className="w-full rounded-[10px] border border-[#cfd2e3] bg-white px-3 py-2 text-sm focus:border-[#5b4bdb] focus:outline-none focus:ring-3 focus:ring-[#eeecfd]"
              >
                {Object.entries(COUNTRIES).map(([k, c]) => (
                  <option key={k} value={k}>
                    {c.flag} {c.name} ({c.cur})
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-lg bg-[#f6f6fb] p-3 text-xs">
              <Row label="Currency" value={previewCountry.cur} />
              <Row
                label="Exchange rate"
                value={`$1 = ${previewCountry.rate.toLocaleString()}`}
              />
              <Row
                label="Minimum withdrawal"
                value={`${previewCountry.cur} ${previewCountry.min.toLocaleString()}`}
              />
              <Row
                label="Payout methods"
                value={previewCountry.methods.join(", ")}
                align="right"
              />
            </div>

            <button
              type="button"
              onClick={switchCountry}
              disabled={selectedCountry === countryKey || switching}
              className="w-full rounded-lg bg-[#5b4bdb] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#4637c2] disabled:cursor-not-allowed disabled:bg-[#cfd2e3]"
            >
              {selectedCountry === countryKey
                ? "Current country"
                : `Switch to ${previewCountry.name}`}
            </button>

            {selectedCountry !== countryKey && (
              <p className="text-[11px] text-[#9a5b00]">
                Your balance, reviews, and history will be converted at $1 ={" "}
                {previewCountry.cur} {previewCountry.rate.toLocaleString()}.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className={`${CARD} border-[#fde8e6] p-4 sm:p-5`}>
        <h3 className="font-heading font-bold text-[#14213d]">
          Reset my data
        </h3>
        <p className="mt-1 text-xs text-[#667088]">
          Permanently clears your profile, reviews, drafts, wallet, transactions,
          and daily progress from this browser.
        </p>

        {!confirmReset ? (
          <button
            onClick={() => setConfirmReset(true)}
            className="mt-3 rounded-lg bg-[#fde8e6] px-4 py-2 text-sm font-bold text-[#b42318] hover:bg-[#fbd0cc]"
          >
            Reset my data
          </button>
        ) : (
          <div className="mt-3 rounded-lg bg-[#fde8e6] p-3">
            <p className="text-sm font-bold text-[#b42318]">
              This cannot be undone. Are you sure?
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={resetAll}
                className="rounded-lg bg-[#b42318] px-4 py-2 text-sm font-bold text-white hover:bg-[#9a1f14]"
              >
                Yes, reset everything
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="rounded-lg border border-[#cfd2e3] bg-white px-4 py-2 text-sm font-bold text-[#14213d] hover:bg-[#f6f6fb]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  align = "right",
}: {
  label: string;
  value: string;
  align?: "left" | "right";
}) {
  return (
    <div className="flex justify-between gap-4 py-0.5">
      <span className="text-[#667088]">{label}</span>
      <b className={`text-[#14213d] text-${align}`}>{value}</b>
    </div>
  );
}