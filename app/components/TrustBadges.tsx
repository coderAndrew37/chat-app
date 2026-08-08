import { ShieldCheck, CheckCircle2 } from "lucide-react";

interface PaymentMethod {
  name: string;
  badge: string;
}

interface TrustBadgesProps {
  paymentMethods?: PaymentMethod[];
  extraText?: string;
}

export function TrustBadges({
  paymentMethods = [
    { name: "Orange Money", badge: "Instant" },
    { name: "FNB eWallet", badge: "Daily" },
    { name: "PayPal", badge: "Global" },
    { name: "MyZaka", badge: "Direct" },
  ],
  extraText,
}: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-8">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <ShieldCheck className="h-5 w-5 text-rose-500" />
        <span>Verified Payout Methods:</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {paymentMethods.map((method) => (
          <div
            key={method.name}
            className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700"
          >
            <span>{method.name}</span>
            <span className="rounded bg-gray-200 px-1 py-0.5 text-[10px] font-bold text-gray-600">
              {method.badge}
            </span>
          </div>
        ))}
      </div>
      {extraText && (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
          <CheckCircle2 className="h-4 w-4 text-rose-500" />
          <span>{extraText}</span>
        </div>
      )}
    </div>
  );
}