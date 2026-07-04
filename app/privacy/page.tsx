import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.velloearn.co.ke";

export const metadata: Metadata = {
  title: "Privacy Policy — VelloEarn",
  description:
    "VelloEarn privacy policy explaining how we collect, use, and protect your personal information.",
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
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
            Privacy Policy
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
                Your privacy is important to us. This Privacy Policy explains how VelloEarn collects, uses, and protects your personal information.
              </p>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Personal identification:</strong> Name, phone number, email address</li>
              <li><strong>Account details:</strong> Username, password, and preferences</li>
              <li><strong>Payment information:</strong> Mobile money details for payouts</li>
              <li><strong>Task data:</strong> Your completed tasks, ratings, and performance metrics</li>
              <li><strong>Device information:</strong> IP address, browser type, device type, and operating system</li>
              <li><strong>Usage data:</strong> Pages visited, features used, and interaction patterns</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Create and manage your account</li>
              <li>Process your one-time activation fee and welcome bonus</li>
              <li>Assign tasks and track your earnings</li>
              <li>Process payouts to your mobile money wallet</li>
              <li>Communicate with you about your account, tasks, and earnings</li>
              <li>Improve our platform and services</li>
              <li>Monitor and ensure quality standards</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Detect and prevent fraud or abuse</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">3. Legal Basis for Processing</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We process your personal information based on:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Contractual necessity:</strong> To provide the services you requested</li>
              <li><strong>Legitimate interests:</strong> To improve our services and prevent fraud</li>
              <li><strong>Consent:</strong> For marketing communications (you can opt out anytime)</li>
              <li><strong>Legal obligations:</strong> Where required by law</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">4. How We Share Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Service providers:</strong> Payment processors (M-Pesa, MTN MoMo), hosting providers, and analytics services</li>
              <li><strong>Clients:</strong> Aggregated and anonymized task data (never personal details)</li>
              <li><strong>Law enforcement:</strong> When required by law or to protect rights</li>
              <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">5. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We retain your personal information for as long as:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Your account is active</li>
              <li>Necessary to provide our services</li>
              <li>Required by law or regulatory obligations</li>
              <li>Needed for legitimate business purposes</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you close your account, we will delete or anonymize your personal information, except where retention is legally required.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">6. Data Security</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Encryption of data in transit (SSL/TLS)</li>
              <li>Secure data storage with access controls</li>
              <li>Regular security assessments and updates</li>
              <li>Staff training on data protection</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              While we take reasonable precautions, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">7. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
              <li><strong>Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw consent:</strong> Withdraw consent for marketing communications</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              To exercise these rights, please contact us using the details below.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">8. International Data Transfers</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              VelloEarn operates primarily in Kenya, Uganda, and Ghana. We may transfer data to service providers in other countries, ensuring appropriate safeguards are in place.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors. If you become aware that a minor has provided us with personal information, please contact us.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">11. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Email: privacy@velloearn.co.ke</li>
                <li>WhatsApp: +254 107 445 114</li>
              <li>Response time: Within 24 hours</li>
            </ul>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mt-8">
              <p className="text-sm text-gray-600">
                <strong>Data Protection Officer:</strong> For privacy-specific concerns, you may contact our Data Protection Officer at privacy@velloearn.co.ke.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}