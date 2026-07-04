import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.velloearn.co.ke";

export const metadata: Metadata = {
  title: "Terms of Service — VelloEarn",
  description:
    "VelloEarn terms of service governing the use of our platform, account activation, payments, and user obligations.",
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-rose-50 via-white to-pink-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Last updated: {new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-600">
                By using VelloEarn, you agree to these Terms of Service. Please read them carefully.
              </p>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By accessing or using the VelloEarn platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">2. Account Registration</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To use VelloEarn, you must create an account and complete the one-time activation process. You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">3. Activation Fee</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              VelloEarn charges a one-time KES 550 account setup fee. This fee unlocks your dashboard and access to earning tasks. Key points:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>The KES 550 fee is non-refundable after activation</li>
              <li>A KES 200 welcome bonus is credited immediately after activation</li>
              <li>There are no monthly fees, withdrawal fees, or hidden charges</li>
              <li>Any request for additional payment is fraudulent and should be reported</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">4. User Obligations</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              As a VelloEarn user, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Complete tasks honestly and to the best of your ability</li>
              <li>Not engage in fraudulent, deceptive, or manipulative behavior</li>
              <li>Not attempt to game the system or submit low-quality work</li>
              <li>Respect the confidentiality of task content and client information</li>
              <li>Comply with all quality assurance checks and guidelines</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">5. Payments and Withdrawals</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Earnings from completed tasks accumulate in your dashboard. You may request withdrawal at any time:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Payments are made directly to your registered mobile money wallet</li>
              <li>M-Pesa (Kenya), MTN MoMo, and Airtel Money (Uganda), MTN MoMo and Vodafone Cash (Ghana)</li>
              <li>No minimum withdrawal threshold</li>
              <li>No withdrawal fees</li>
              <li>Most payments are processed within 30 minutes</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">6. Task Quality and Standards</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              VelloEarn maintains quality standards to ensure client satisfaction. Users whose work consistently falls below quality thresholds may:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Receive feedback and guidance to improve</li>
              <li>Have their account suspended or terminated</li>
              <li>Forfeit earnings from low-quality submissions</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content on the VelloEarn platform, including text, graphics, logos, and software, is the property of VelloEarn and protected by copyright laws. Users may not reproduce, distribute, or create derivative works without explicit permission.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">8. Privacy and Data Protection</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect and process personal data in accordance with our Privacy Policy. By using VelloEarn, you consent to our data practices as described in the Privacy Policy.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">9. Termination</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              VelloEarn reserves the right to suspend or terminate accounts that violate these terms. Users may terminate their account at any time by contacting support.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">10. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The platform is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the platform will be uninterrupted or error-free. Earnings potential varies and is not guaranteed.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To the fullest extent permitted by law, VelloEarn shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We reserve the right to update these terms at any time. Changes will be posted on this page with an updated date. Continued use of the platform constitutes acceptance of updated terms.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">13. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              For questions about these terms, contact us at:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Email: support@velloearn.co.ke</li>
              <li>WhatsApp: +254 107 445 114</li>
              <li>Response time: Within 24 hours</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}