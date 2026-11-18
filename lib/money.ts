import { COUNTRIES, type CountryKey } from "./countries";

export function formatMoney(amount: number, key: CountryKey) {
  const { cur, dec } = COUNTRIES[key];
  const n = Number(amount);
  const fraction = Number.isInteger(n) ? 0 : dec;
  return `${cur} ${n.toLocaleString("en-KE", {
    minimumFractionDigits: fraction,
    maximumFractionDigits: dec,
  })}`;
}

export function formatUsd(amount: number) {
  return `$${Number(amount).toFixed(2)}`;
}

export const localAmount = (usd: number, rate: number, dec: number) => {
  const f = 10 ** dec;
  return Math.round(usd * rate * f) / f;
};