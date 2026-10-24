import { VELLOEARN_REGISTER_URL, whatsappNumber } from "@/lib/constants";

const STEPS = [
  {
    number: "01",
    title: "Sign up and verify",
    body: "Create your account, verify your phone. Free to join — no CV, no interview. You're active in under 2 minutes.",
  },
  {
    number: "02",
    title: "Pick a hotel to review",
    body: "Browse open hotel tasks with clear payouts. Each listing shows exactly what's expected — photos, text, or video.",
  },
  {
    number: "03",
    title: "Submit and get paid",
    body: "Complete the review, submit through the portal. Approved tasks pay to M-Pesa instantly. No minimum, no waiting.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-rose-500 font-semibold text-xs uppercase tracking-wider mb-2">
            How it works
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Three steps from signup to M-Pesa
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
          {STEPS.map((step) => (
            <div key={step.number}>
              <div className="text-rose-500 font-extrabold text-2xl mb-3">{step.number}</div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a
            href={VELLOEARN_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
          >
            Create your account
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi%20VelloEarn,%20I%20want%20to%20learn%20more%20about%20hotel%20review%20tasks.`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 font-medium text-sm transition-colors"
          >
            Questions? Message us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}