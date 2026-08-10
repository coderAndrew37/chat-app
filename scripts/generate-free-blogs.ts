import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import OpenAI from "openai";
import { createClient } from "@sanity/client";

// Verify Keys
const groqKey = process.env.GROQ_API_KEY || "";
if (!groqKey) throw new Error("❌ GROQ_API_KEY missing in .env.local");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID!;
if (!projectId) throw new Error("❌ SANITY_PROJECT_ID missing in .env.local");

// Initialize Clients
const sanity = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
});

const groq = new OpenAI({
  apiKey: groqKey,
  baseURL: "https://api.groq.com/openai/v1",
});

export interface TargetTopic {
  country: string;
  countryCode: string;
  paymentMethods: string;
  topic: string;
  category: string;
  keywords: string[];
}

// Queue containing remaining items starting from #48 to #93
const fullBatchQueue: TargetTopic[] = [
  // Index 47 -> Item 48
  {
    country: "Tanzania",
    countryCode: "TZ",
    paymentMethods: "M-Pesa, Tigo Pesa, Airtel Money",
    topic: "How to Teach Swahili to Tourists Visiting Zanzibar and Serengeti",
    category: "Online Teaching & Tutoring",
    keywords: ["teach swahili tourists zanzibar", "swahili tutor serengeti", "make money teaching swahili tanzania"],
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    paymentMethods: "M-Pesa, Tigo Pesa, NMB Bank",
    topic: "Best Online Platforms to Offer Swahili Classes in Tanzania",
    category: "Online Teaching & Tutoring",
    keywords: ["swahili tutoring platforms tanzania", "teach kiswahili online tanzania", "earn money teaching swahili Dar es Salaam"],
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    paymentMethods: "M-Pesa, Bank Wire, Halopesa",
    topic: "Setting Your Rates for Kiswahili Tutoring in Dar es Salaam",
    category: "Freelance Rates & Business Strategy",
    keywords: ["swahili tutor hourly rates tanzania", "how much to charge swahili lessons", "kiswahili tutoring business tanzania"],
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    paymentMethods: "M-Pesa, Tigo Pesa, CRDB Bank",
    topic: "Creating Beginner Kiswahili Curriculum for Expatriates in Tanzania",
    category: "Curriculum & Course Design",
    keywords: ["swahili lesson plan beginners", "teach expats swahili tanzania", "kiswahili curriculum guide"],
  },
  {
    country: "Uganda",
    countryCode: "UG",
    paymentMethods: "MTN Mobile Money, Airtel Money",
    topic: "Monetizing Swahili Language Skills as a Ugandan Freelancer",
    category: "Online Teaching & Tutoring",
    keywords: ["teach swahili uganda", "earn money swahili uganda", "mtn mobile money swahili tutoring"],
  },
  {
    country: "Uganda",
    countryCode: "UG",
    paymentMethods: "MTN Mobile Money, Airtel Money, Bank Transfer",
    topic: "Teaching Kiswahili Online to Regional Business Professionals in East Africa",
    category: "Corporate Language Training",
    keywords: ["business swahili lessons uganda", "corporate swahili tutor kampala", "regional swahili training"],
  },
  {
    country: "Rwanda",
    countryCode: "RW",
    paymentMethods: "MTN Mobile Money Rwanda, Airtel Money",
    topic: "How to Offer Kiswahili Lessons in Kigali to Expats and NGOs",
    category: "Online Teaching & Tutoring",
    keywords: ["teach swahili kigali", "swahili tutor rwanda", "swahili for ngo workers rwanda"],
  },
  {
    country: "DRC",
    countryCode: "CD",
    paymentMethods: "M-Pesa DRC, Airtel Money, Orange Money",
    topic: "Teaching Conversational Kingwana/Swahili to International Workers in DRC",
    category: "Online Teaching & Tutoring",
    keywords: ["teach swahili drc", "kingwana tutor goma", "swahili lessons congo"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Pesalink, Equity Bank",
    topic: "How to Market Your Swahili Teaching Business on Instagram and TikTok",
    category: "Marketing & Student Acquisition",
    keywords: ["market swahili classes social media", "get swahili students instagram", "tiktok swahili teacher kenya"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, PayPal, Wise",
    topic: "Teaching Swahili via Zoom vs Preply: Which Pays Better in Kenya?",
    category: "Online Teaching & Tutoring",
    keywords: ["zoom swahili tutoring kenya", "preply swahili teacher kenya", "italki vs direct students swahili"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Pesalink",
    topic: "How to Structure Medical Swahili Courses for International Volunteers",
    category: "Specialized Swahili Training",
    keywords: ["medical swahili course kenya", "teach doctors swahili kenya", "volunteer swahili training"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Bank Transfer",
    topic: "Building an Automated Swahili Learning E-Book or Digital Mini-Course",
    category: "Passive Income & Digital Products",
    keywords: ["sell swahili course online", "swahili ebook passive income", "digital swahili products kenya"],
  },
  {
    country: "Global / Diaspora",
    countryCode: "US",
    paymentMethods: "M-Pesa Global, Wise, Remitly",
    topic: "Teaching Swahili to Second-Generation African Diaspora Children",
    category: "Diaspora & Cultural Education",
    keywords: ["teach diaspora kids swahili", "swahili lessons for heritage learners", "online swahili kids teacher"],
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    paymentMethods: "M-Pesa, Tigo Pesa",
    topic: "How to Conduct Group Kiswahili Workshops for Safari Tour Guides",
    category: "Corporate Language Training",
    keywords: ["swahili training tourism tanzania", "safari guide swahili course", "group swahili lessons Dar"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Equity Bank",
    topic: "Overcoming Common Tech and Payment Setup Challenges for Kenyan Tutors",
    category: "Freelance Rates & Business Strategy",
    keywords: ["receive international payment swahili tutor", "wise mpesa swahili teacher", "paypal mpesa swahili tutoring"],
  },
  {
    country: "Uganda",
    countryCode: "UG",
    paymentMethods: "MTN Mobile Money, Airtel Money",
    topic: "Teaching Conversational Swahili for Cross-Border Traders in East Africa",
    category: "Corporate Language Training",
    keywords: ["cross border swahili trade", "business kiswahili uganda", "swahili tutor border trade"],
  },
  {
    country: "Rwanda",
    countryCode: "RW",
    paymentMethods: "MTN Mobile Money Rwanda",
    topic: "A Complete Guide to Swahili Pronunciation and Phonetics for English Speakers",
    category: "Curriculum & Course Design",
    keywords: ["swahili pronunciation guide", "teach swahili phonetics", "swahili sounds for beginners"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Bank Transfer",
    topic: "How to Draft a Professional Contract for Private Swahili Lessons",
    category: "Freelance Rates & Business Strategy",
    keywords: ["swahili tutoring contract kenya", "private tutor agreement template", "cancellation policy swahili tutor"],
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    paymentMethods: "M-Pesa, CRDB Bank",
    topic: "Teaching Advanced Kiswahili Grammar and Literature to Academic Researchers",
    category: "Specialized Swahili Training",
    keywords: ["advanced swahili grammar tutor", "swahili literature for researchers", "academic kiswahili tanzania"],
  },
  {
    country: "Global / Diaspora",
    countryCode: "UK",
    paymentMethods: "Wise, WorldRemit, M-Pesa",
    topic: "How to Get Certified as an International Kiswahili Instructor",
    category: "Career & Skill Development",
    keywords: ["swahili teaching certification", "certified kiswahili instructor", "how to become certified swahili teacher"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Airtel Money",
    topic: "Using Flashcards and Anki to Accelerate Vocabulary Building for Swahili Students",
    category: "Curriculum & Course Design",
    keywords: ["anki swahili flashcards", "swahili vocabulary methods", "tech tools swahili teaching"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Wise",
    topic: "How to Build a High-Converting Landing Page for Your Private Swahili Coaching",
    category: "Marketing & Student Acquisition",
    keywords: ["swahili tutor website", "landing page swahili course", "get private swahili clients"],
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    paymentMethods: "M-Pesa, Tigo Pesa",
    topic: "Essential Swahili Cultural Etiquette Every Foreign Student Must Learn First",
    category: "Curriculum & Course Design",
    keywords: ["swahili cultural etiquette", "teaching swahili customs", "shikamoo and respectful swahili"],
  },
  {
    country: "Uganda",
    countryCode: "UG",
    paymentMethods: "MTN Mobile Money, Bank Wire",
    topic: "How to Partner with Local Universities to Offer Conversational Swahili Clubs",
    category: "Marketing & Student Acquisition",
    keywords: ["swahili club kampala", "university swahili tutoring uganda", "swahili conversational group"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, PayPal",
    topic: "Retaining Language Students: How to Keep Swahili Learners Engaged Month After Month",
    category: "Online Teaching & Tutoring",
    keywords: ["student retention language teaching", "keep swahili students engaged", "long term language tutoring"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Bank Transfer",
    topic: "Teaching Swahili Proverbs (Misemo & Methali) to Intermediate and Advanced Learners",
    category: "Specialized Swahili Training",
    keywords: ["swahili methali teaching", "misemo ya kiswahili course", "advanced swahili proverbs"],
  },
  {
    country: "Rwanda",
    countryCode: "RW",
    paymentMethods: "MTN Mobile Money Rwanda",
    topic: "How to Use Audio Lessons and Podcasts to Teach Kiswahili Remotely",
    category: "Curriculum & Course Design",
    keywords: ["swahili podcast lessons", "audio swahili course", "teach swahili listening skills"],
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    paymentMethods: "M-Pesa, NMB Bank",
    topic: "Creating Swahili Immersion Trips and Cultural Retreats for Foreign Learners",
    category: "Passive Income & Digital Products",
    keywords: ["swahili immersion retreat zanzibar", "cultural swahili trip tanzania", "swahili language tourism"],
  },
  {
    country: "Global / Diaspora",
    countryCode: "CA",
    paymentMethods: "Wise, Remitly, M-Pesa",
    topic: "How to Scale From 1-on-1 Swahili Tutoring to Cohort-Based Group Classes",
    category: "Freelance Rates & Business Strategy",
    keywords: ["cohort swahili course", "group swahili tutoring business", "scale language teaching income"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Wise",
    topic: "Teaching Swahili for Diplomatic Personnel and Embassy Staff in Nairobi",
    category: "Corporate Language Training",
    keywords: ["swahili for diplomats nairobi", "embassy swahili training", "corporate language tutor nairobi"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Pesalink",
    topic: "How to Offer Swahili Proofreading and Subtitling Services alongside Teaching",
    category: "Career & Skill Development",
    keywords: ["swahili subtitling jobs", "swahili proofreading freelance", "swahili language translation kenya"],
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    paymentMethods: "M-Pesa, Airtel Money",
    topic: "Top 10 Free Resources Every Kiswahili Teacher Should Include in Their Syllabus",
    category: "Curriculum & Course Design",
    keywords: ["free swahili teaching materials", "swahili teacher syllabus tools", "kiswahili learning resources"],
  },
  {
    country: "Uganda",
    countryCode: "UG",
    paymentMethods: "MTN Mobile Money, Airtel Money",
    topic: "How to Collect Testimonials and Video Reviews from Your Swahili Students",
    category: "Marketing & Student Acquisition",
    keywords: ["language teacher reviews", "swahili student testimonials", "build social proof tutoring"],
  },
  {
    country: "DRC",
    countryCode: "CD",
    paymentMethods: "M-Pesa DRC, Bank Wire",
    topic: "Teaching Swahili to Humanitarian Responders in Eastern Congo",
    category: "Specialized Swahili Training",
    keywords: ["swahili for aid workers congo", "humanitarian swahili course goma", "practical swahili drc"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, PayPal, Wise",
    topic: "How to Deal with Last-Minute Cancellations and Unpaid Invoices as a Swahili Tutor",
    category: "Freelance Rates & Business Strategy",
    keywords: ["tutor cancellation policy", "unpaid tutoring invoices kenya", "freelance tutor business rules"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Bank Transfer",
    topic: "Combining Swahili Culture, Cooking, and Music into Your Online Lessons",
    category: "Curriculum & Course Design",
    keywords: ["swahili culture lessons", "interactive swahili classes", "fun swahili teaching methods"],
  },
  {
    country: "Global / Diaspora",
    countryCode: "US",
    paymentMethods: "Wise, PayPal, M-Pesa",
    topic: "How to Self-Publish Your Own Swahili Learning Workbook on Amazon KDP",
    category: "Passive Income & Digital Products",
    keywords: ["publish swahili workbook amazon kdp", "sell swahili books online", "swahili author self publishing"],
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    paymentMethods: "M-Pesa, Tigo Pesa",
    topic: "Navigating Swahili Dialects: Teaching Standard Kiunguja vs Regional Variations",
    category: "Curriculum & Course Design",
    keywords: ["swahili dialectskiunguja", "teaching standard swahili", "zanzibar vs coastal swahili"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Pesalink",
    topic: "How to Conduct Effective Placement Tests for New Swahili Students",
    category: "Online Teaching & Tutoring",
    keywords: ["swahili placement test", "assess student swahili level", "swahili diagnostic assessment"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Wise",
    topic: "Building a Youtube Channel Focused on Bite-Sized Swahili Language Tips",
    category: "Marketing & Student Acquisition",
    keywords: ["youtube swahili teacher", "learn swahili youtube channel", "monetize swahili content youtube"],
  },
  {
    country: "Rwanda",
    countryCode: "RW",
    paymentMethods: "MTN Mobile Money Rwanda",
    topic: "How to Teach Swahili Noun Classes (Ngeli) Without Confusing Beginners",
    category: "Curriculum & Course Design",
    keywords: ["swahili ngeli easy guide", "teach swahili noun classes", "kiswahili grammar simplified"],
  },
  {
    country: "Uganda",
    countryCode: "UG",
    paymentMethods: "MTN Mobile Money, Airtel Money",
    topic: "Creating Homework and Practice Worksheets for Online Swahili Students",
    category: "Curriculum & Course Design",
    keywords: ["swahili practice worksheets", "swahili homework generator", "online language assignments"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Bank Transfer",
    topic: "Tax and Business Registration Basics for Independent Tutors in Kenya",
    category: "Freelance Rates & Business Strategy",
    keywords: ["kra pin tutor income", "register tutoring business kenya", "freelance tax kenya"],
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    paymentMethods: "M-Pesa, CRDB Bank",
    topic: "Teaching Business Email Writing and Formal Correspondence in Swahili",
    category: "Corporate Language Training",
    keywords: ["formal swahili email writing", "business kiswahili correspondence", "swahili professional communication"],
  },
  {
    country: "Global / Diaspora",
    countryCode: "EU",
    paymentMethods: "Wise, PayPal, M-Pesa",
    topic: "How to Use AI Tools (ChatGPT, Claude) to Build Custom Lesson Plans for Swahili",
    category: "Career & Skill Development",
    keywords: ["ai tools language teacher", "chatgpt swahili lesson plan", "prompts for swahili tutors"],
  },
  {
    country: "Kenya",
    countryCode: "KE",
    paymentMethods: "M-Pesa, Pesalink, Equity Bank",
    topic: "The Ultimate Checklist for Starting a Full-Time Swahili Teaching Career in East Africa",
    category: "Career & Skill Development",
    keywords: ["full time swahili teacher guide", "swahili career roadmap", "start teaching swahili today"],
  },
];

// Helper: Format JSON content array into Portable Text Blocks
function formatPortableText(blocks: { style?: string; text: string }[]) {
  return blocks.map((block) => ({
    _type: "block",
    _key: Math.random().toString(36).substring(2, 9),
    style: block.style || "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: Math.random().toString(36).substring(2, 9),
        text: block.text,
        marks: [],
      },
    ],
  }));
}

// Sanity Reference Helper
async function getOrCreateRef(type: string, name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const existing = await sanity.fetch(
    `*[_type == $type && (name == $name || title == $name)][0]._id`,
    { type, name }
  );

  if (existing) return existing;

  const created = await sanity.create({
    _type: type,
    name: name,
    title: name,
    slug: { _type: "slug", current: slug },
  });

  return created._id;
}

// Delay helper to prevent burst rate limits
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generate and post comprehensive Swahili teaching blogs
 */
async function generateAndPostBlog(target: TargetTopic, index: number, total: number) {
  console.log(`\n[${index + 1}/${total}] 🤖 Generating Swahili Blog for ${target.country}: "${target.topic}"...`);

  const prompt = `
  You are a top-tier SEO copywriter, linguist, and online monetization specialist in East Africa.
  Write a comprehensive, highly detailed, in-depth search-optimized blog post (minimum 1,200 words equivalent depth) about teaching Kiswahili to foreigners/expats/online learners.

  Topic: "${target.topic}"
  Category: "${target.category}"
  Target Region/City: ${target.country}
  Primary Payment Methods: ${target.paymentMethods}
  Target Keywords to naturally incorporate: ${target.keywords.join(", ")}

  Provide deep, practical advice including pricing strategies (hourly USD/KES/TZS rates), platforms (iTalki, Preply, PixChat, DeniChat, local networks), curriculum outline for beginners ("Wazungu"), local cultural nuances, and receiving international payments via M-Pesa / Mobile Money / Bank Transfer.

  Return strictly valid JSON matching this schema:
  {
    "title": "Clear, catchy, keyword-rich headline",
    "seoTitle": "Max 60 chars meta title containing primary keyword",
    "excerpt": "Max 150 chars meta description summarizing the post",
    "tags": ["Tag1", "Tag2", "Tag3"],
    "content": [
      { "style": "h2", "text": "1. Introduction & The Surging Global Demand for Kiswahili" },
      { "style": "normal", "text": "In-depth opening introducing the local market context..." },
      { "style": "h2", "text": "2. Why Foreigners ('Wazungu') & Expats Are Eager to Learn Kiswahili" },
      { "style": "normal", "text": "Comprehensive analysis of tourist, researcher, diplomat, and business demand..." },
      { "style": "h2", "text": "3. Step-by-Step Guide to Teaching Kiswahili in ${target.country}" },
      { "style": "normal", "text": "Actionable steps on setting up lessons, lesson plans, and platforms..." },
      { "style": "h2", "text": "4. Top Teaching Platforms & Local Networks (Online & In-Person)" },
      { "style": "normal", "text": "Detailed breakdown of platforms including Preply, iTalki, PixChat, DeniChat, and direct local referrals..." },
      { "style": "h2", "text": "5. Pricing Your Lessons & Withdrawing Earnings via ${target.paymentMethods}" },
      { "style": "normal", "text": "Specific pricing models (e.g. $10-$30/hr) and how to convert payments to local mobile money..." },
      { "style": "h2", "text": "6. Essential Tips for Success and Student Retention" },
      { "style": "normal", "text": "Key teaching tools, engagement tactics, and avoiding platform scams..." }
    ]
  }
  `;

  try {
    // Switched to llama-3.1-8b-instant to stay clear of daily token limits
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a JSON generator. Output strictly raw valid JSON. Do not include markdown code block backticks.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    const rawJson = response.choices[0]?.message?.content;
    if (!rawJson) throw new Error("Empty response from Groq.");

    const data = JSON.parse(rawJson);

    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const authorId = await getOrCreateRef("author", "Swahili Tech & Career Hub");
    const categoryId = await getOrCreateRef("category", target.category);
    const tagIds = await Promise.all(
      (data.tags || target.keywords).map((t: string) => getOrCreateRef("tag", t))
    );

    const doc = {
      _type: "post",
      title: data.title,
      seoTitle: data.seoTitle,
      slug: { _type: "slug", current: slug },
      excerpt: data.excerpt,
      author: { _type: "reference", _ref: authorId },
      category: { _type: "reference", _ref: categoryId },
      tags: tagIds.map((id) => ({
        _type: "reference",
        _ref: id,
        _key: Math.random().toString(36).substring(2, 9),
      })),
      publishedAt: new Date().toISOString(),
      featured: false,
      body: formatPortableText(data.content),
    };

    const created = await sanity.create(doc);
    console.log(`✅ [PUBLISHED]: ${created.title}`);
  } catch (err: any) {
    console.error(`❌ [FAILED] ${target.country} - "${target.topic}":`, err.message || err);
  }
}

// MAIN EXECUTION FUNCTION
async function runBatch() {
  const TOTAL_TOPICS = 93;
  const START_INDEX = 47; // Topic #48

  console.log(`🚀 Resuming batch execution at index ${START_INDEX + 1} of ${TOTAL_TOPICS}...`);

  for (let i = 0; i < fullBatchQueue.length; i++) {
    const currentIndex = START_INDEX + i;
    await generateAndPostBlog(fullBatchQueue[i], currentIndex, TOTAL_TOPICS);
    
    // 2-second rate-limit protection delay
    await sleep(2000);
  }

  console.log("\n🎉 All remaining posts generated and published successfully!");
}

runBatch();