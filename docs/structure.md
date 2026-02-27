chat254/
├── page.tsx ← Next.js page entry (drop into app/)
├── types/
│ ├── index.ts ← Shared TypeScript interfaces
│ └── schemas.ts ← Zod schemas + inferred types
├── data/
│ └── index.ts ← All static data (profiles, steps, features, etc.)
└── components/
├── index.ts ← Barrel exports
├── HomePage.tsx ← Root orchestrator, manages modal state
├── Navbar.tsx ← Sticky nav, mobile hamburger menu
├── Hero.tsx ← Hero with stats, dual CTAs, app download banner
├── ProfilesGrid.tsx ← 12-profile grid with hover "Chat Now" reveal
├── HowItWorks.tsx ← 3-step process section
├── Features.tsx ← 4-feature cards grid
├── CTABanner.tsx ← Rose gradient CTA section
├── Footer.tsx ← 4-column footer with links
├── LoginModal.tsx ← Login modal + Zod + Sonner
└── RegisterModal.tsx ← Register modal + Zod + Sonner
