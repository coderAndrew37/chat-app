import Link from "next/link";
import { FOOTER_SECTIONS } from "@/data";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-white mb-3">VelloEarn</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Kenya&apos;s most rewarding dating platform. Find genuine
              connections and earn rewards along the way.
            </p>
          </div>

          {/* Footer sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-rose-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © 2026 VelloEarn. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-rose-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-rose-400 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
