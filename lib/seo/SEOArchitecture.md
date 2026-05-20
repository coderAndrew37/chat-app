# VelloEarn SEO Architecture

## What this system does

Every page, title, description, structured data block, and sitemap entry is derived from
two source-of-truth arrays in `lib/seo/keyword-matrix.ts`:

```
MARKETS   →  Kenya / Uganda / Ghana  (+ cities, payment methods, currencies)
JOB_TYPES →  Chatting / AI Training / Surveys / Swahili / Academic Writing / Forex
```

Add a new country or job type in those arrays and the entire SEO surface
(sitemap, metadata, structured data, internal links) updates automatically.

---

## File map

```
lib/seo/
  keyword-matrix.ts   ← Single source of truth: markets, cities, job types
  metadata.ts         ← generateMetadata() factories for every page type

app/
  layout.tsx                          ← Global OG tags, Organization schema, WebSite schema
  sitemap.ts                          ← Dynamic sitemap (auto-generates all URLs)
  robots.ts                           ← Robots.txt

  earn/
    [country]/
      page.tsx                        ← /earn/kenya  /earn/uganda  /earn/ghana
      [city]/
        page.tsx                      ← /earn/kenya/nairobi  /earn/ghana/accra  etc.
    [jobSlug]/
      page.tsx                        ← /earn/chatting  /earn/ai-training  etc.
      [country]/
        page.tsx                      ← /earn/chatting/kenya  /earn/surveys/uganda  etc.
```

---

## Page count at launch

| Page type               | Count                   | Example URL                        |
|-------------------------|-------------------------|------------------------------------|
| Country pages           | 3                       | /earn/kenya                        |
| City pages              | 18                      | /earn/kenya/nairobi                |
| Job-type root pages     | 6                       | /earn/chatting                     |
| Job × country pages     | 18                      | /earn/chatting/kenya               |
| Blog posts              | 6+                      | /blog/mpesa-payments               |
| **Total indexed**       | **~51+ pages**          |                                    |

---

## Keyword targets per page type

### Country pages (`/earn/[country]`)
- `online jobs [country]`
- `work from home [country]`
- `earn from phone [country]`
- `[payment method] online jobs`
- `legit online jobs [country] no experience`

### City pages (`/earn/[country]/[city]`)
- `online jobs [city]`
- `work from home [city]`
- `remote jobs [city] [country]`
- `earn money online [city]`

### Job × country pages (`/earn/[job]/[country]`)
**These are the highest-intent pages — someone searching
"AI training jobs Kenya" or "paid surveys Uganda MTN MoMo" is ready to apply.**
- `[job type] jobs [country]`
- `[job type] jobs [country] [payment]`
- `online [job type] [country]`
- `earn from [job type] [country]`
- `legit [job type] jobs [country]`

---

## Structured data (JSON-LD) injected

| Schema type       | Where                              |
|-------------------|------------------------------------|
| Organization      | layout.tsx (all pages)             |
| WebSite           | layout.tsx (all pages)             |
| BreadcrumbList    | country, city, job×country pages   |
| FAQPage           | country, city, job×country pages   |
| JobPosting        | country, job×country pages         |

---

## Internal linking strategy

Every page links to:
- Parent country page
- Sibling city pages (from city pages)
- All job types in the same country
- Other countries (cross-market)
- Related blog posts

This creates a tight link graph so Google can discover and rank the full tree fast.

---

## Priority action checklist

### Week 1 — Technical foundation
- [ ] Deploy with `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` env var
- [ ] Verify sitemap renders at `/sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Add `GOOGLE_SITE_VERIFICATION` env var with your GSC verification code
- [ ] Create `public/og-image.jpg` (1200×630) — your most important brand asset for CTR
- [ ] Generate favicon set at realfavicongenerator.net, place in `/public`

### Week 1 — Content
- [ ] Write `/earn/[jobSlug]` root pages (6 pages) — 800–1200 words each with FAQs
- [ ] Write `/blog/mpesa-payments` — "How M-Pesa payouts work at VelloEarn"
- [ ] Write `/blog/scale-your-team` — "How to build a team and multiply earnings"
- [ ] Add real testimonials with first names and city attribution (trust signals)

### Week 2 — On-page signals
- [ ] Add real earning numbers to testimonials (KES amounts with dates)
- [ ] Add author bylines to blog posts (`Person` schema with name + bio)
- [ ] Add `datePublished` + `dateModified` to blog post JSON-LD
- [ ] Compress all images — use Next.js `<Image>` with explicit width/height

### Ongoing — Link acquisition (most important ranking factor)
- [ ] Get listed on: Tuko.co.ke, Nation.Africa, Standard Media (press releases)
- [ ] Get listed on: Jobberman Ghana, BrighterMonday Uganda, MyJobMag Kenya
- [ ] Guest posts on Kenyan/Ugandan/Ghanaian personal finance blogs
- [ ] Answer questions on Quora, Reddit r/Kenya, r/digitalnomad mentioning the site
- [ ] Partner with campus ambassadors to get .ac.ke backlinks

---

## Adding a new market (e.g. Nigeria)

1. Open `lib/seo/keyword-matrix.ts`
2. Add to `MARKETS`:
```ts
{
  country: "Nigeria",
  countryCode: "ng",
  slug: "nigeria",
  currency: "NGN",
  payment: "Opay / Bank Transfer",
  paymentSlug: "opay",
  mobileOperator: "MTN Nigeria",
  topEarning: "₦ 450,000",
  avgEarning: "₦ 200,000",
  locale: "en-NG",
  cities: [
    { name: "Lagos",   slug: "lagos"   },
    { name: "Abuja",   slug: "abuja"   },
    { name: "Kano",    slug: "kano"    },
    { name: "Port Harcourt", slug: "port-harcourt" },
  ],
},
```
3. Run `next build` — 10+ new pages are created automatically.

---

## Adding a new job type (e.g. "Virtual Assistant")

1. Open `lib/seo/keyword-matrix.ts`
2. Add to `JOB_TYPES`:
```ts
{
  slug: "virtual-assistant",
  title: "Virtual Assistant",
  shortTitle: "virtual assistant",
  icon: "🗂️",
  tagline: "Help international businesses run from your phone.",
  description: "Email management, scheduling, research, and admin tasks for global clients.",
  badge: "Growing fast",
  searchVolumeTier: "high",
},
```
3. Add a matching page at `/earn/virtual-assistant` (root job page)
4. All `/earn/virtual-assistant/[country]` pages generate automatically.