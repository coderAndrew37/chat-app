import { ShieldCheck, CheckCircle2 } from "lucide-react";

interface PaymentMethod {
  name: string;
  icon: string | React.ReactNode;
}

interface TrustBadgesProps {
  paymentMethods?: PaymentMethod[];
  extraText?: string;
}

export function TrustBadges({
  paymentMethods = [
    { name: "Orange Money", icon: "📱" },
    { name: "FNB eWallet", icon: "🏦" },
    { name: "PayPal", icon: "💳" },
    { name: "M‑Pesa / Airtel", icon: "📲" },
  ],
  extraText,
}: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <div className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300">
        <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <span>Trusted Payouts</span>
      </div>
      {paymentMethods.map((method) => (
        <div key={method.name} className="flex items-center gap-2">
          <span className="text-lg">{method.icon}</span>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {method.name}
          </span>
        </div>
      ))}
      {extraText && (
        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>{extraText}</span>
        </div>
      )}
    </div>
  );
}