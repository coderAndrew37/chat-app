// app/earn/hotel-reviews/page.tsx
import { Metadata } from "next";
import HotelReviewsClient from "@/app/earn/hotel-reviews/page.client";
import JobSchema from "@/app/components/seo/JobSchema";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type CountryKey = "kenya" | "uganda" | "ghana";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://www.velloearn.co.ke";

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const countryParam =
    typeof resolvedParams.country === "string"
      ? resolvedParams.country.toLowerCase()
      : "kenya";

  const localizedMeta: Record<CountryKey, { title: string; desc: string; locale: string }> = {
    kenya: {
      title: "Paid Hotel Review Jobs in Kenya — Earn M-Pesa Per Review | VelloEarn",
      desc: "Get paid to review hotels, lodges, and resorts in Kenya. Earn KES 250–800 per approved review, paid instantly to M-Pesa. Free to join, no experience needed.",
      locale: "en_KE",
    },
    uganda: {
      title: "Paid Hotel Review Jobs in Uganda — Earn MTN MoMo Per Review | VelloEarn",
      desc: "Earn UGX 8,000–28,000 per hotel review across Uganda. Paid directly to MTN MoMo or Airtel Money. Free to join, no experience needed.",
      locale: "en_UG",
    },
    ghana: {
      title: "Paid Hotel Review Jobs in Ghana — Earn Mobile Money Per Review | VelloEarn",
      desc: "Get paid to review hotels and lodges across Ghana. Earn GHS 30–100 per approved review, paid straight to MTN MoMo or Telecel Cash. Free to join.",
      locale: "en_GH",
    },
  };

  const activeKey = (["kenya", "uganda", "ghana"].includes(countryParam)
    ? countryParam
    : "kenya") as CountryKey;
  const meta = localizedMeta[activeKey];
  const canonicalUrl = `${BASE_URL}/earn/hotel-reviews?country=${activeKey}`;
  const ogImageUrl = `${BASE_URL}/og-cover.png`;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: meta.title,
      description: meta.desc,
      url: canonicalUrl,
      siteName: "VelloEarn",
      type: "website",
      locale: meta.locale,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "VelloEarn — Paid Hotel Review Tasks",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.desc,
      images: [ogImageUrl],
    },
  };
}

// ─── Server-side FAQ data (mirrors client GEO_CONTENT objections) ────────────

interface FaqEntry {
  question: string;
  answer: string;
}

const FAQ_DATA: Record<CountryKey, FaqEntry[]> = {
  kenya: [
    {
      question: "How much do paid hotel reviews pay in Kenya?",
      answer:
        "Most hotel review tasks on VelloEarn pay between KES 250 and KES 800 per approved review, depending on the property's rating tier and the review type (text-only, photo + text, or full video walkthrough). Payouts are shown upfront on every listing before you claim a task.",
    },
    {
      question: "Are hotel review jobs in Kenya legit?",
      answer:
        "Fair question. We publish real payout amounts, never ask for personal financial data, and payments clear directly to M-Pesa once a review is approved. Our task structure matches how legitimate global hospitality and tourism research companies source human property feedback — through verified, submitted reviews, not upfront investment schemes.",
    },
    {
      question: "Do I need to physically visit the hotel to review it?",
      answer:
        "It depends on the task. Photo and video review tasks require a visit — useful if you're already travelling in that region. Text-only tasks can be based on public information and online listings, which is why they're the lowest-friction entry point for new reviewers.",
    },
    {
      question: "How quickly does M-Pesa payout after a review is approved?",
      answer:
        "Approved reviews trigger instant withdrawal access in your dashboard. Once you hit withdraw, M-Pesa payments typically land within 5–30 minutes depending on Safaricom's network load. There's no minimum balance and no waiting for a monthly payroll cycle.",
    },
    {
      question: "Can I review the same hotel more than once?",
      answer:
        "No. Each hotel task is a single-claim assignment — once a review is submitted and approved for a property, that task closes. New hotels (and sometimes re-opened tasks after a property refresh) are added to the queue daily.",
    },
    {
      question: "What does a good hotel review actually look like?",
      answer:
        "Honest, specific, and useful to a future guest. Good reviews mention what worked (cleanliness, staff responsiveness, room noise levels), what didn't, and one or two details that only a real reviewer would catch. Quality reviewers don't write marketing copy — they write what a friend would want to know.",
    },
  ],
  uganda: [
    {
      question: "How much do paid hotel reviews pay in Uganda?",
      answer:
        "Most hotel review tasks pay between UGX 8,000 and UGX 28,000 per approved review, depending on the property tier and review type. Payouts are shown upfront on every listing before you claim.",
    },
    {
      question: "Are hotel review jobs in Uganda legit?",
      answer:
        "Yes — we publish real payout figures, never request financial data, and payments clear to MTN MoMo or Airtel Money once a review is approved. Our task structure matches how legitimate global research companies source human feedback through verified submitted reviews.",
    },
    {
      question: "Do I need to visit the hotel in person?",
      answer:
        "Photo and video review tasks require a visit. Text-only tasks can be based on public listings, making them the lowest-friction way to start earning.",
    },
    {
      question: "How quickly does Mobile Money payout after a review is approved?",
      answer:
        "Approved reviews trigger instant withdrawal. Mobile Money payments typically land within 5–30 minutes. No minimum balance, no monthly payroll delay.",
    },
    {
      question: "Can I review hotels outside my city?",
      answer:
        "Text-only tasks can be completed for any property in Uganda. Photo and video tasks require an actual visit, so they're best suited to reviewers already travelling or living nearby.",
    },
    {
      question: "What makes a good hotel review?",
      answer:
        "Specific, honest, and useful. Mention what worked, what didn't, and details a real visitor would care about. Quality reviewers write for future guests, not for marketing.",
    },
  ],
  ghana: [
    {
      question: "How much do paid hotel reviews pay in Ghana?",
      answer:
        "Most hotel review tasks pay between GHS 30 and GHS 100 per approved review, depending on property tier and review type. Payouts are shown upfront on every listing.",
    },
    {
      question: "Are hotel review jobs in Ghana legit?",
      answer:
        "Yes — we publish real payout figures, never request financial data, and payments clear to MTN MoMo or Telecel Cash once approved. Our task structure matches how legitimate global research companies source verified human feedback.",
    },
    {
      question: "Do I need to visit the hotel in person?",
      answer:
        "Photo and video review tasks require a visit. Text-only tasks can be completed from public information, making them the easiest entry point for new reviewers.",
    },
    {
      question: "How quickly does Mobile Money payout after approval?",
      answer:
        "Approved reviews trigger instant withdrawal. Payments typically clear to MoMo or Telecel Cash within 5–30 minutes. No minimum withdrawal, no monthly cycle.",
    },
    {
      question: "Can I review hotels outside my region?",
      answer:
        "Text-only tasks work for any Ghanaian property. Photo and video reviews require an actual visit, ideal for reviewers already travelling.",
    },
    {
      question: "What makes a good hotel review?",
      answer:
        "Honest, specific, and useful. Mention what worked, what didn't, and details a real guest would care about. Reviewers write for future visitors — not for marketing copy.",
    },
  ],
};

function buildFaqSchema(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function HotelReviewsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const countryParam =
    typeof resolvedParams.country === "string"
      ? resolvedParams.country.toLowerCase()
      : "kenya";

  const targetGeo: CountryKey = (["kenya", "uganda", "ghana"].includes(countryParam)
    ? countryParam
    : "kenya") as CountryKey;

  const jobSchemaDetails = {
    kenya: {
      title: "Hotel Review Specialist — Remote Kenya",
      currency: "KES",
      minVal: 250,
      maxVal: 800,
      countryName: "Kenya" as const,
    },
    uganda: {
      title: "Hotel Review Specialist — Remote Uganda",
      currency: "UGX",
      minVal: 8000,
      maxVal: 28000,
      countryName: "Uganda" as const,
    },
    ghana: {
      title: "Hotel Review Specialist — Remote Ghana",
      currency: "GHS",
      minVal: 30,
      maxVal: 100,
      countryName: "Ghana" as const,
    },
  };

  const geoSchema = jobSchemaDetails[targetGeo];
  const faqSchemaDetails = buildFaqSchema(FAQ_DATA[targetGeo]);

  return (
    <>
      <JobSchema
        title={geoSchema.title}
        description="Complete paid hotel review tasks — submit honest written reviews, photo reviews, or video walkthroughs for real hotels, lodges, and resorts. Payouts clear instantly to local mobile money wallets. No experience needed."
        currency={geoSchema.currency}
        minSalary={geoSchema.minVal}
        maxSalary={geoSchema.maxVal}
        countryName={geoSchema.countryName}
        baseUrl={BASE_URL}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaDetails) }}
      />
      <HotelReviewsClient countryTarget={targetGeo} />
    </>
  );
}