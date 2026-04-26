// ─── Save as: app/blog/mpesa-payments/page.tsx ───────────────────────────────

import { whatsappNumber } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How M-Pesa Payments Work for Remote Workers | VelloEarn",
  description:
    "A clear breakdown of how M-Pesa integrations work for online earning platforms in Kenya. How money moves, how long it takes, and what to expect.",
  keywords: ["M-Pesa online payments Kenya", "M-Pesa remote work payout", "how M-Pesa works online earnings"],
};

export default function MpesaPaymentsPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="pt-20 pb-10 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 mb-8 transition">
            ← VelloEarn
          </Link>
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            How M-Pesa Payments Work for Remote Workers
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            If you&apos;re earning online and your money is going to M-Pesa, here&apos;s exactly how the pipeline works — from your dashboard to your phone.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 prose prose-gray max-w-none">
          <div className="space-y-8">
            {[
              {
                heading: "What is an M-Pesa API integration?",
                body: "Platforms like VelloEarn connect directly to Safaricom&apos;s M-Pesa Daraja API. This is the official business-to-customer (B2C) payment pipeline. When you request a payout, the platform makes an API call that moves money from their business account directly to your personal M-Pesa. There&apos;s no manual transfer — it&apos;s automated.",
              },
              {
                heading: "How fast does money arrive?",
                body: "Most B2C M-Pesa transfers complete in under two minutes. In rare cases (high network traffic, Safaricom downtime), it can take up to 30 minutes. If you&apos;ve waited more than an hour, the transaction usually failed and your balance remains in your platform account — not lost.",
              },
              {
                heading: "Are there fees?",
                body: "The platform absorbs the M-Pesa transaction fees on their end — you receive what your dashboard shows. You don&apos;t pay withdrawal fees. However, if you then send that money from your M-Pesa to someone else, standard Safaricom P2P charges apply.",
              },
              {
                heading: "How does VelloEarn handle payouts?",
                body: "VelloEarn uses direct M-Pesa B2C integration. When you hit the withdraw button in your dashboard, the request goes through instantly. Your registered phone number receives the funds — no bank account needed, no waiting period.",
              },
            ].map((section) => (
              <div key={section.heading} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: section.body }} />
              </div>
            ))}
          </div>

          <div className="mt-10 bg-rose-50 rounded-2xl p-6 border border-rose-100 text-center">
            <p className="text-rose-700 font-semibold mb-3">Ready to earn?</p>
            <Link
            // link to whatsapp
              href={`https://wa.me/${whatsappNumber}?text=Hi%20VelloEarn%2C%20I%27m%20interested%20in%20joining%20your%20platform.%20Please%20send%20me%20more%20information.`}
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:scale-105"
            >
              Apply to join VelloEarn
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}