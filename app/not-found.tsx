"use client"
import Link from "next/link";

// export const metadata = {
//   title: "Page not found — Chat254",
// };

export default function NotFound() {
  return (
    <main
      style={{
        fontFamily: "'Sora', sans-serif",
        minHeight: "100dvh",
        background: "linear-gradient(135deg, #fff7f7 0%, #ffffff 50%, #fff1f2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Google Font loader — works in Server Components */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&display=swap');`}</style>

      {/* Decorative circles */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "-160px",
          right: "-160px",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #fecdd3 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: "-100px",
          left: "-100px",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #fed7aa 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "520px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Big 404 */}
        <div
          style={{
            fontSize: "clamp(6rem, 20vw, 9rem)",
            fontWeight: 800,
            lineHeight: 1,
            background: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "0.25rem",
            userSelect: "none",
          }}
        >
          404
        </div>

        {/* Decorative divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.75rem",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #fecdd3)" }} />
          <span style={{ fontSize: "1.4rem" }}>🗺️</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #fecdd3)" }} />
        </div>

        <h1
          style={{
            fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
            fontWeight: 800,
            color: "#111827",
            marginBottom: "0.9rem",
            lineHeight: 1.25,
          }}
        >
          This page took a wrong turn
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "#6b7280",
            lineHeight: 1.7,
            marginBottom: "2.25rem",
            maxWidth: "400px",
            margin: "0 auto 2.25rem",
          }}
        >
          The link might be broken, the page moved, or it never existed.
          Either way, your earning opportunity is still very much here.
        </p>

        {/* CTA cards row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          {[
            { emoji: "🏠", label: "Go home", href: "/" },
            { emoji: "💬", label: "Start chatting", href: "/earn/chatting" },
            { emoji: "🤖", label: "Train AI", href: "/earn/ai-training" },
            { emoji: "🌍", label: "Teach Swahili", href: "/earn/swahili-teaching" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.85rem 1rem",
                background: "#ffffff",
                border: "1.5px solid #fce7e7",
                borderRadius: "16px",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#374151",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s, box-shadow 0.2s",
                boxShadow: "0 2px 8px rgba(244,63,94,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#f43f5e";
                (e.currentTarget as HTMLAnchorElement).style.color = "#f43f5e";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#fce7e7";
                (e.currentTarget as HTMLAnchorElement).style.color = "#374151";
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{item.emoji}</span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* WhatsApp nudge */}
        <a
          href="https://wa.me/254700000000?text=Hi%2C%20I%20need%20some%20help%20with%20Chat254."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.85rem",
            color: "#6b7280",
            textDecoration: "none",
          }}
        >
          <svg width="16" height="16" fill="#25D366" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Still lost? Message us on WhatsApp
        </a>
      </div>
    </main>
  );
}