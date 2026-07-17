import { Metadata } from "next";
import AITrainingClient from "./AITrainingClient";
import JobSchema from "@/app/components/seo/JobSchema";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type CountryKey = "kenya" | "uganda" | "ghana";

const BASE_URL = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.NEXT_PUBLIC_BASE_URL || 
  "https://www.velloearn.co.ke";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const countryParam = typeof resolvedParams.country === "string" ? resolvedParams.country.toLowerCase() : "kenya";

  const localizedMeta: Record<CountryKey, { title: string; desc: string; locale: string }> = {
    kenya: {
      title: "AI Data Annotation Jobs Kenya M-Pesa Payment | VelloEarn",
      desc: "Join the VelloEarn AI Training track in Kenya. Earn KES 80–400 per task with instant M-Pesa withdrawals. No laptop required—work from your smartphone today.",
      locale: "en_KE"
    },
    uganda: {
      title: "RLHF Remote Jobs Uganda Apply Now MTN MoMo | VelloEarn",
      desc: "Get paid to train AI models in Uganda. Earn UGX 2,500–12,000 per task with secure MTN MoMo & Airtel Mobile Money cashout. Smartphone optimized.",
      locale: "en_UG"
    },
    ghana: {
      title: "Online Text Evaluation Jobs Ghana Daily Payout | VelloEarn",
      desc: "Discover remote AI training data side hustles in Ghana. Earn GHS 10–50 per task with instant Telecel, Vodafone, and MTN Mobile Money pathways.",
      locale: "en_GH"
    }
  };

  const activeKey = ["kenya", "uganda", "ghana"].includes(countryParam) ? (countryParam as CountryKey) : "kenya";
  const meta = localizedMeta[activeKey];
  const canonicalUrl = `${BASE_URL}/earn/ai-training?country=${activeKey}`;
  const ogImageUrl = `${BASE_URL}/earn/og-cover.png`;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      canonical: canonicalUrl,
    },
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
          alt: `${meta.title} Cover Image`,
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

// --- Fully Synchronized Server-side FAQ matrix ---

interface FaqEntry {
  question: string;
  answer: string;
}

const FAQ_DATA: Record<CountryKey, FaqEntry[]> = {
  kenya: [
    {
      question: "Is AI data annotation available in Kenya?",
      answer: "Yes — 100% available across Nairobi, Mombasa, Kisumu, and every county in between. No VPN is required to access the platform, and beyond the one-time setup fee there are no recurring registration or subscription charges."
    },
    {
      question: "How do data annotation jobs work from home in Kenya?",
      answer: "It's completely remote and flexible enough to fit around university classes (UoN, JKUAT) or other freelance work. Tasks run on laptop or smartphone, with low-data modes for Safaricom, Airtel, or Telkom networks."
    },
    {
      question: "Are these paid training jobs, and how do I get paid in Kenyan Shillings (KES)?",
      answer: "Yes — the foundational training itself is compensated. Once onboarded, earnings withdraw instantly to M-Pesa in Kenyan Shillings (KES)."
    },
    {
      question: "This sounds too good to be true — how do I know it's not a scam?",
      answer: "Fair question, and worth asking of any online earning platform. We publish real payout amounts, keep the setup fee one-time and clearly stated upfront (never hidden), and our task structure matches how legitimate global AI companies actually source human feedback — through verified micro-task platforms, not personal data requests or upfront investment schemes."
    },
    {
      question: "Do I need a degree or prior tech experience?",
      answer: "No. You need to read carefully, think clearly, and write in plain English. Most contributors have no AI or programming background at all — your everyday judgment is the actual skill being used."
    },
    {
      question: "Can I do this alongside school or a full-time job?",
      answer: "Yes. There's no fixed shift schedule — tasks stay in the queue and you complete them whenever you have time, whether that's 30 minutes between lectures or a couple of hours in the evening."
    }
  ],
  uganda: [
    {
      question: "Is AI data annotation available in Uganda?",
      answer: "Yes — fully available across Kampala, Mbarara, Gulu, and the rest of the country. No VPN is needed, and beyond the one-time setup fee there are no recurring registration charges."
    },
    {
      question: "How do data annotation jobs work from home in Uganda?",
      answer: "The work is entirely remote and flexible around lectures at Makerere or MUBS, or alongside other freelance commitments, with low-data modes for MTN and Airtel networks."
    },
    {
      question: "Are these paid training jobs, and how do I get paid in Ugandan Shillings (UGX)?",
      answer: "Yes, the initial training itself is paid. Earnings withdraw instantly to MTN Mobile Money or Airtel Money in Ugandan Shillings (UGX)."
    },
    {
      question: "This sounds too good to be true — how do I know it's not a scam?",
      answer: "A fair question for any online earning platform. We keep the setup fee one-time and clearly stated upfront, publish real payout figures, and structure tasks the way legitimate global AI companies actually source human feedback — through verified micro-task work, not personal data requests or investment schemes."
    },
    {
      question: "Do I need a degree or prior tech experience?",
      answer: "No. You need to read carefully and respond in clear English. Most contributors have no programming or AI background — your everyday judgment is the actual skill being used."
    },
    {
      question: "Can I do this alongside school or a full-time job?",
      answer: "Yes. There's no fixed shift schedule — tasks sit in the queue and you complete them whenever you have time, whether that's between lectures or in the evening."
    }
  ],
  ghana: [
    {
      question: "Is AI data annotation available in Ghana?",
      answer: "Yes — data annotation jobs are 100% available and operational across Accra, Kumasi, Tamale, Cape Coast, and all regions in Ghana. No VPN is required to access your work panel, and beyond the transparent one-time setup fee listed above, there are absolutely zero hidden recurring costs or platform registration fees."
    },
    {
      question: "How do data annotation jobs work from home in Ghana?",
      answer: "These online jobs are engineered to work completely from home or campus, offering flexible hours ideal for students at UG Legon, KNUST, or tech freelancers. Every segment functions perfectly on both a smartphone or laptop, equipped with custom low-data optimization modes to conserve your MTN or Telecel bundles."
    },
    {
      question: "Are these paid training jobs, and how do I get paid in Ghana Cedis (GHS)?",
      answer: "Yes — these are legitimate paid training jobs where your onboarding hours are fully compensated. Once tasks clear our quality parameters, you withdraw earnings directly to MTN Mobile Money (MoMo) or Telecel Cash in Ghana Cedis (GHS / ₵)."
    },
    {
      question: "This sounds too good to be true — how do I know it's not a scam?",
      answer: "That is an essential question to ask given the volume of fake online jobs in Ghana. We establish complete trust by keeping the setup fee single, transparent, and up-front. We explicitly display real earner data, and our structure exactly matches how global platforms source distributed human review—relying on tangible micro-tasks, never tracking your private keys or demanding weird investment multi-level tiers."
    },
    {
      question: "Do I need a degree or prior tech experience?",
      answer: "No degree or professional software experience is needed. The core skill is high context comprehension and writing clear English responses. Most active users across Ghana have zero engineering background."
    },
    {
      question: "Can I do this alongside school or a full-time job?",
      answer: "Absolutely. There are no mandatory shifts or strict clock-ins. The micro-task queue runs 24/7, meaning you can knock out tasks between lectures at KNUST or during your quiet evening hours at home."
    }
  ]
};

interface FaqSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }[];
}

function buildFaqSchema(entries: FaqEntry[]): FaqSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export default async function AITrainingPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const countryParam = typeof resolvedParams.country === "string" ? resolvedParams.country.toLowerCase() : "kenya";
  
  const targetGeo = ["kenya", "uganda", "ghana"].includes(countryParam)
    ? (countryParam as CountryKey)
    : "kenya";

  const jobSchemaDetails = {
    kenya: { title: "AI Data Annotation Specialist", currency: "KES", minVal: 80, maxVal: 400, countryName: "Kenya" as const },
    uganda: { title: "RLHF Remote Data Evaluator", currency: "UGX", minVal: 2500, maxVal: 12000, countryName: "Uganda" as const },
    ghana: { title: "Online Text Evaluation Contributor", currency: "GHS", minVal: 10, maxVal: 50, countryName: "Ghana" as const }
  };

  const geoSchema = jobSchemaDetails[targetGeo];
  const faqSchemaDetails = buildFaqSchema(FAQ_DATA[targetGeo]);

  return (
    <>
      <JobSchema
        title={geoSchema.title}
        description="Evaluate and rate AI-generated text responses, rewrite incorrect data outputs, and provide human feedback to optimize machine learning models via smartphone platforms."
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
      
      <AITrainingClient countryTarget={targetGeo} />
    </>
  );
}