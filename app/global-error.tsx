"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error reporting service here
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Something went wrong — Chat254</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: 'Sora', sans-serif;
            background: #fff7f7;
            min-height: 100dvh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          /* Animated blobs */
          .blob {
            position: fixed;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.18;
            pointer-events: none;
          }
          .blob-1 {
            width: 500px; height: 500px;
            background: #f43f5e;
            top: -120px; right: -120px;
            animation: drift 12s ease-in-out infinite alternate;
          }
          .blob-2 {
            width: 360px; height: 360px;
            background: #fb923c;
            bottom: -80px; left: -80px;
            animation: drift 16s ease-in-out infinite alternate-reverse;
          }
          @keyframes drift {
            from { transform: translate(0, 0) scale(1); }
            to   { transform: translate(30px, 20px) scale(1.08); }
          }

          /* Noise grain overlay */
          body::after {
            content: '';
            position: fixed;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
            pointer-events: none;
            z-index: 0;
          }

          .card {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 3rem 2.5rem;
            max-width: 480px;
            width: calc(100% - 2rem);
            background: rgba(255,255,255,0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(244,63,94,0.12);
            border-radius: 28px;
            box-shadow: 0 8px 64px rgba(244,63,94,0.10);
            animation: rise 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
          }
          @keyframes rise {
            from { opacity: 0; transform: translateY(24px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }

          .icon-wrap {
            width: 80px; height: 80px;
            margin: 0 auto 1.5rem;
            background: linear-gradient(135deg, #fce7e7, #fff1f2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.2rem;
            border: 2px solid rgba(244,63,94,0.12);
            animation: wobble 3s ease-in-out infinite;
          }
          @keyframes wobble {
            0%, 100% { transform: rotate(-4deg); }
            50%       { transform: rotate(4deg); }
          }

          h1 {
            font-size: 1.65rem;
            font-weight: 800;
            color: #111;
            line-height: 1.25;
            margin-bottom: 0.75rem;
          }
          h1 span { color: #f43f5e; }

          p {
            font-size: 0.95rem;
            color: #6b7280;
            line-height: 1.65;
            margin-bottom: 1.75rem;
          }

          .actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .btn-primary {
            background: #f43f5e;
            color: #fff;
            border: none;
            border-radius: 999px;
            padding: 0.9rem 2rem;
            font-family: inherit;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s, transform 0.15s;
            box-shadow: 0 6px 24px rgba(244,63,94,0.28);
          }
          .btn-primary:hover  { background: #e11d48; transform: scale(1.03); }
          .btn-primary:active { transform: scale(0.97); }

          .btn-ghost {
            background: transparent;
            color: #6b7280;
            border: 1.5px solid #e5e7eb;
            border-radius: 999px;
            padding: 0.85rem 2rem;
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: border-color 0.2s, color 0.2s, transform 0.15s;
            text-decoration: none;
            display: inline-block;
          }
          .btn-ghost:hover  { border-color: #f43f5e; color: #f43f5e; transform: scale(1.02); }
          .btn-ghost:active { transform: scale(0.97); }

          .digest {
            margin-top: 1.5rem;
            font-size: 0.72rem;
            color: #d1d5db;
            font-family: monospace;
            letter-spacing: 0.04em;
          }
        `}</style>
      </head>
      <body>
        <div className="blob blob-1" />
        <div className="blob blob-2" />

        <div className="card">
          <div className="icon-wrap">⚡</div>

          <h1>Something went <span>sideways</span></h1>

          <p>
            Our system hit an unexpected snag. This isn&apos;t on you —
            our team is on it. Try again in a moment, or head back home
            while we sort things out.
          </p>

          <div className="actions">
            <button className="btn-primary" onClick={reset}>
              Try again →
            </button>
            <Link className="btn-ghost" href="/">
              Back to Chat254
            </Link>
          </div>

          {error.digest && (
            <p className="digest">Error ref: {error.digest}</p>
          )}
        </div>
      </body>
    </html>
  );
}