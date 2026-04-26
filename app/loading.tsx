export default function Loading() {
  return (
    <div
      style={{
        fontFamily: "'Sora', sans-serif",
        minHeight: "100dvh",
        background: "#fff7f7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800&display=swap');

        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244,63,94,0.4); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 14px rgba(244,63,94,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(244,63,94,0); }
        }
        @keyframes drift-blob {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(24px,16px) scale(1.06); }
        }
        @keyframes mpesa-in {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            #fce7e7 0px,
            #fff1f2 200px,
            #fce7e7 400px
          );
          background-size: 600px 100%;
          animation: shimmer 1.6s infinite linear;
          border-radius: 10px;
        }

        .blob-bg {
          position: fixed;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.15;
          pointer-events: none;
          animation: drift-blob 10s ease-in-out infinite alternate;
        }

        /* M-Pesa notification rows */
        .mpesa-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: mpesa-in 0.5s ease both;
        }
      `}</style>

      {/* Background blobs */}
      <div
        className="blob-bg"
        style={{ width: 440, height: 440, background: "#f43f5e", top: -120, right: -120 }}
      />
      <div
        className="blob-bg"
        style={{
          width: 320,
          height: 320,
          background: "#fb923c",
          bottom: -80,
          left: -80,
          animationDirection: "alternate-reverse",
          animationDuration: "14s",
        }}
      />

      {/* Logo mark + pulse ring */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f43f5e, #fb923c)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.8rem",
          animation: "pulse-ring 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite",
          boxShadow: "0 4px 20px rgba(244,63,94,0.3)",
        }}
      >
        💬
      </div>

      {/* Skeleton card — mirrors the hero section shape */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)",
          borderRadius: 24,
          border: "1px solid rgba(244,63,94,0.1)",
          padding: "1.75rem",
          boxShadow: "0 4px 40px rgba(244,63,94,0.08)",
        }}
      >
        {/* Pill */}
        <div className="shimmer" style={{ width: 160, height: 24, marginBottom: "1.25rem" }} />

        {/* Heading lines */}
        <div className="shimmer" style={{ width: "90%", height: 28, marginBottom: "0.6rem" }} />
        <div className="shimmer" style={{ width: "70%", height: 28, marginBottom: "1.25rem" }} />

        {/* Body text */}
        <div className="shimmer" style={{ width: "100%", height: 16, marginBottom: "0.5rem" }} />
        <div className="shimmer" style={{ width: "85%", height: 16, marginBottom: "0.5rem" }} />
        <div className="shimmer" style={{ width: "60%", height: 16, marginBottom: "1.75rem" }} />

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <div className="shimmer" style={{ flex: 1, height: 52, borderRadius: 999 }} />
          <div className="shimmer" style={{ flex: 1, height: 52, borderRadius: 999 }} />
        </div>
      </div>

      {/* Skeleton earning cards */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.7)",
              borderRadius: 18,
              border: "1px solid rgba(244,63,94,0.08)",
              padding: "1.1rem",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {/* Icon placeholder */}
            <div className="shimmer" style={{ width: 36, height: 36, borderRadius: 10, marginBottom: "0.75rem" }} />
            <div className="shimmer" style={{ width: "80%", height: 14, marginBottom: "0.4rem" }} />
            <div className="shimmer" style={{ width: "60%", height: 12 }} />
          </div>
        ))}
      </div>

      {/* Animated "incoming M-Pesa" notifications */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        {[
          { delay: "0s", amount: "+KES 2,400", name: "Wanjiru M." },
          { delay: "0.4s", amount: "+KES 1,800", name: "Brian K." },
          { delay: "0.8s", amount: "+KES 3,200", name: "Akinyi O." },
        ].map((n) => (
          <div
            key={n.name}
            className="mpesa-row"
            style={{ animationDelay: n.delay }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#dcfce7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                flexShrink: 0,
              }}
            >
              💸
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#374151",
                }}
              >
                {n.name}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                M-Pesa received
              </div>
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 800,
                color: "#16a34a",
              }}
            >
              {n.amount}
            </div>
          </div>
        ))}
      </div>

      {/* Label */}
      <p
        style={{
          fontSize: "0.8rem",
          color: "#d1d5db",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Loading VelloEarn…
      </p>
    </div>
  );
}