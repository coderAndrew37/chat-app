import { VELLOEARN_REGISTER_URL } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section className="py-16 sm:py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Reviews are open right now.
            </h2>
            <p className="text-gray-400 text-sm max-w-md">
              New hotel tasks drop daily. Sign up free, pick your first review, and get paid
              to M-Pesa today.
            </p>
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <a
              href={VELLOEARN_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-white hover:bg-gray-100 text-gray-900 font-bold px-6 py-3.5 rounded-lg transition-colors text-sm"
            >
              Start reviewing
            </a>
            <p className="text-[11px] text-gray-500 text-center mt-2">
              Free to join · M-Pesa payouts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}