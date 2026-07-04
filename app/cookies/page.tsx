import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.velloearn.co.ke";

export const metadata: Metadata = {
  title: "Cookie Policy — VelloEarn",
  description:
    "VelloEarn cookie policy explaining how we use cookies and similar technologies to improve your experience.",
  alternates: {
    canonical: `${BASE_URL}/cookies`,
  },
};

export default function CookiesPage() {
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
            Cookie Policy
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
                This Cookie Policy explains how VelloEarn uses cookies and similar technologies to improve your experience.
              </p>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They help us provide you with a better experience by remembering your preferences, analyzing site traffic, and enabling certain functionality.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              VelloEarn uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Essential cookies:</strong> Required for the platform to function properly. These enable basic features like navigation, authentication, and session management.</li>
              <li><strong>Performance cookies:</strong> Help us understand how users interact with the platform, so we can improve performance and user experience.</li>
              <li><strong>Functional cookies:</strong> Remember your preferences and settings, such as your language preference or login details.</li>
              <li><strong>Analytics cookies:</strong> Collect anonymous information about how visitors use our platform, which helps us improve and optimize our services.</li>
            </ul>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">3. Types of Cookies We Use</h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-200">Cookie Type</th>
                    <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-200">Purpose</th>
                    <th className="p-3 text-left font-semibold text-gray-700 border-b border-gray-200">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b border-gray-100 text-gray-600">session_id</td>
                    <td className="p-3 border-b border-gray-100 text-gray-600">Maintains your session while logged in</td>
                    <td className="p-3 border-b border-gray-100 text-gray-600">Session</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-100 text-gray-600">preferences</td>
                    <td className="p-3 border-b border-gray-100 text-gray-600">Stores your preferences and settings</td>
                    <td className="p-3 border-b border-gray-100 text-gray-600">1 year</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-100 text-gray-600">_ga</td>
                    <td className="p-3 border-b border-gray-100 text-gray-600">Google Analytics - distinguishes users</td>
                    <td className="p-3 border-b border-gray-100 text-gray-600">2 years</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-100 text-gray-600">_gid</td>
                    <td className="p-3 border-b border-gray-100 text-gray-600">Google Analytics - distinguishes users</td>
                    <td className="p-3 border-b border-gray-100 text-gray-600">24 hours</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-600">_gat</td>
                    <td className="p-3 text-gray-600">Google Analytics - throttles request rate</td>
                    <td className="p-3 text-gray-600">1 minute</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may also use third-party cookies from service providers such as:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Google Analytics:</strong> For analyzing site traffic and user behavior</li>
              <li><strong>Sanity.io:</strong> For content management and delivery</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              These third parties have their own privacy policies and cookie practices. We do not control these cookies.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">5. Managing Your Cookie Preferences</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can manage or disable cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>View what cookies are stored on your device</li>
              <li>Delete all cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Set preferences for different types of cookies</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              Please note that disabling essential cookies may affect the functionality of the platform.
            </p>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Browser Instructions</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
              </ul>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">6. Updates to This Policy</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. Please check this page periodically for updates.
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 mt-10 mb-4">7. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Email: support@velloearn.co.ke</li>
               <li>WhatsApp: +254 107 445 114</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}