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
}

// Portable Text Formatter
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

async function generateAndPostBlog(target: TargetTopic, index: number, total: number) {
  console.log(`\n[${index + 1}/${total}] 🤖 Generating for ${target.country}: "${target.topic}"...`);

  const prompt = `
  You are an expert SEO copywriter specializing in African gig economy, online jobs, and micro-tasks.
  Write a comprehensive, engaging, search-optimized blog post tailored specifically for workers in ${target.country}.

  Topic: "${target.topic}"
  Primary Payment Methods to feature: ${target.paymentMethods}

  Return strictly valid JSON matching this schema:
  {
    "title": "Clear, engaging headline",
    "seoTitle": "Max 60 chars meta title",
    "excerpt": "Max 150 chars meta description",
    "tags": ["Tag1", "Tag2", "Tag3"],
    "content": [
      { "style": "h2", "text": "Introduction & Local Context in ${target.country}" },
      { "style": "normal", "text": "Detailed informative paragraph..." },
      { "style": "h2", "text": "Top Platforms & Strategies for ${target.topic}" },
      { "style": "normal", "text": "Detailed actionable steps..." },
      { "style": "h2", "text": "How to Withdraw Earnings via ${target.paymentMethods}" },
      { "style": "normal", "text": "Step-by-step local payment guide..." },
      { "style": "h2", "text": "Essential Tips to Avoid Scams" },
      { "style": "normal", "text": "Practical safety advice..." }
    ]
  }
  `;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a JSON generator. Output strictly raw valid JSON.",
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

    const authorId = await getOrCreateRef("author", "VelloEarn Editorial");
    const categoryId = await getOrCreateRef("category", target.category);
    const tagIds = await Promise.all(
      (data.tags || [target.country]).map((t: string) => getOrCreateRef("tag", t))
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

// --- 120 UNIQUE TOPICS QUEUE (20 PER COUNTRY) ---
const fullBatchQueue: TargetTopic[] = [
  // ================= GHANA (20) =================
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Telecel Cash, Vodafone Cash", category: "Online Jobs Ghana", topic: "Legit Online Jobs for Legon & KNUST University Students in Ghana" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Telecel Cash", category: "Online Jobs Ghana", topic: "Best Paid Survey Websites in Ghana That Payout via MTN Mobile Money" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Bank Transfer", category: "Online Jobs Ghana", topic: "How to Start Freelance Copywriting in Accra with Zero Experience" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Telecel Cash", category: "Online Jobs Ghana", topic: "Top Data Entry Remote Jobs in Kumasi Paying Daily via Mobile Money" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo", category: "Online Jobs Ghana", topic: "Micro-task Apps That Pay Ghanaians Money for Testing Sites" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Telecel Cash", category: "Online Jobs Ghana", topic: "How to Become a Virtual Assistant in Takoradi Working for Foreign Clients" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo", category: "Online Jobs Ghana", topic: "Genuine Audio Transcription Jobs in Ghana for Fast Typists" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Telecel Cash", category: "Online Jobs Ghana", topic: "High Paying Remote Graphic Design Freelancing in Tema & Spintex" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo", category: "Online Jobs Ghana", topic: "Earn Money Online in Cape Coast Doing Social Media Management" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Telecel Cash", category: "Online Jobs Ghana", topic: "Online Tutoring Jobs in Ghana: Teach English & Math Online" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo", category: "Online Jobs Ghana", topic: "How to Monetize a WhatsApp Status in Ghana with Local Affiliate Offers" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Telecel Cash", category: "Online Jobs Ghana", topic: "Best Smartphone Apps to Make Money Online in Ghana Without Investment" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo", category: "Online Jobs Ghana", topic: "Proofreading & Editing Remote Jobs for Ghanaian Graduates" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Telecel Cash", category: "Online Jobs Ghana", topic: "How to Sell Digital Products in Ghana using Paystack & Mobile Money" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo", category: "Online Jobs Ghana", topic: "Work-From-Home Customer Support Representative Opportunities in Ghana" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Telecel Cash", category: "Online Jobs Ghana", topic: "Canva Freelancing Jobs in Ghana: Earn Money Designing Social Assets" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo", category: "Online Jobs Ghana", topic: "How to Avoid Online Job Scams in Ghana: Red Flags to Watch For" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Telecel Cash", category: "Online Jobs Ghana", topic: "Daily Withdrawal Remote Micro Jobs for High School Graduates in Sunyani" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo", category: "Online Jobs Ghana", topic: "Remote AI Data Annotation Jobs Available for Workers in Ghana" },
  { country: "Ghana", countryCode: "GH", paymentMethods: "MTN MoMo, Telecel Cash", category: "Online Jobs Ghana", topic: "Complete Guide to Cashing Out Foreign Freelance Earnings via MTN MoMo" },

  // ================= UGANDA (20) =================
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Uganda", topic: "Legit Online Jobs in Kampala That Pay Daily via MTN MoMo" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Uganda", topic: "Best Online Hustles for Makerere & Kyambogo University Students" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "Airtel Money, MTN Mobile Money", category: "Online Jobs Uganda", topic: "Top Paying Online Survey Platforms Working in Uganda" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Uganda", topic: "How to Get Remote Data Entry Jobs in Mbarara & Jinja" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money", category: "Online Jobs Uganda", topic: "Freelance Content Writing Jobs in Uganda for Beginners" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Uganda", topic: "Micro-task Micro-job Websites That Pay Ugandans via Mobile Money" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "Airtel Money, MTN Mobile Money", category: "Online Jobs Uganda", topic: "How to Work as a Virtual Assistant from Gulu & Entebbe" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Uganda", topic: "Online English Teaching Jobs in Uganda with Weekly Pay" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money", category: "Online Jobs Uganda", topic: "Smartphone Remote Jobs in Uganda: Earn Money with Your Phone" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Uganda", topic: "Audio Transcription Jobs for Ugandans with Fast Typing Speed" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money", category: "Online Jobs Uganda", topic: "How to Monetize TikTok & Instagram Accounts in Kampala" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Uganda", topic: "Affiliate Marketing Guide for Ugandans: Earn Commissions Daily" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "Airtel Money, MTN Mobile Money", category: "Online Jobs Uganda", topic: "Canva Design Freelancing in Uganda: Simple Graphics for Local Clients" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money", category: "Online Jobs Uganda", topic: "Remote Customer Care & Chat Agent Jobs for Ugandans" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Uganda", topic: "AI Training & Data Labeling Micro-Tasks in Uganda" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money", category: "Online Jobs Uganda", topic: "Website Usability Testing Jobs for Ugandans" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Uganda", topic: "How to Safely Receive Upwork & Fiverr Money in Uganda via Mobile Money" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "Airtel Money", category: "Online Jobs Uganda", topic: "Weekend Online Side Hustles for Full-Time Workers in Kampala" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Uganda", topic: "Online Proofreading & Copyediting Jobs for Ugandan Teachers" },
  { country: "Uganda", countryCode: "UG", paymentMethods: "MTN Mobile Money", category: "Online Jobs Uganda", topic: "How to Spot and Avoid Online Fraud & Scam Work in Uganda" },

  // ================= TANZANIA (20) =================
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Tigo Pesa, Airtel Money", category: "Online Jobs Tanzania", topic: "Jinsi ya Kutengeneza Pesa Mtandaoni Dar es Salaam kwa Kujibu Tafiti" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Tigo Pesa", category: "Online Jobs Tanzania", topic: "Kazi za Mtandaoni kwa Wanafunzi wa Chuo Kikuu Cha Dar es Salaam (UDSM)" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Tigo Pesa, Airtel Money", category: "Online Jobs Tanzania", topic: "Njia za Uhakika za Kupata Hela Mtandaoni Arusha na Mwanza" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa", category: "Online Jobs Tanzania", topic: "Kazi za Data Entry Mtandaoni Tanzania Zinazolipa kwa M-Pesa" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Tigo Pesa", category: "Online Jobs Tanzania", topic: "Jinsi ya Kuwa Freelance Writer Tanzania na Kupata Wateja wa Nje" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Airtel Money", category: "Online Jobs Tanzania", topic: "App za Simu Zinazolipa Pesa za Kitanzania Bila Wekeza Chochote" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Tigo Pesa", category: "Online Jobs Tanzania", topic: "Kazi za Kutafsiri Lugha ya Kiswahili Mtandaoni kwa Kompyuta au Simu" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa", category: "Online Jobs Tanzania", topic: "Jinsi ya Kuwa Virtual Assistant Ukiwa Dodoma au Zanzibar" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Tigo Pesa", category: "Online Jobs Tanzania", topic: "Kazi za Social Media Manager Tanzania: Ongeza Kipato kwa Simu" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa", category: "Online Jobs Tanzania", topic: "Kazi za Micro-tasks na Testing za Website Zinazolipa Watanzania" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Tigo Pesa", category: "Online Jobs Tanzania", topic: "Jinsi ya Kuanza Affiliate Marketing Tanzania na Kuingiza Pesa Mfukoni" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa", category: "Online Jobs Tanzania", topic: "Graphic Design za Canva: Pata Wateja na Ulipwe kwa Tigo Pesa" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Tigo Pesa", category: "Online Jobs Tanzania", topic: "Kazi za Kutfundisha Kiswahili Mtandaoni kwa Wageni" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa", category: "Online Jobs Tanzania", topic: "Jinsi ya Kutengeneza Pesa kwa WhatsApp Status Tanzania" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Tigo Pesa", category: "Online Jobs Tanzania", topic: "Kazi za AI Training na Labeling za Data kwa Watanzania" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa", category: "Online Jobs Tanzania", topic: "Kazi za Remote Customer Support Zinazopatikana Tanzania" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Tigo Pesa", category: "Online Jobs Tanzania", topic: "Jinsi ya Kutoa Hela ya Fiverr na Upwork Kwenda M-Pesa Tanzania" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa", category: "Online Jobs Tanzania", topic: "Kazi za Proofreading za Vitabu na Makala Mtandaoni Tanzania" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa, Tigo Pesa", category: "Online Jobs Tanzania", topic: "Tahadhari: Jinsi ya Kuepuka Utapeli wa Kazi za Mtandaoni Tanzania" },
  { country: "Tanzania", countryCode: "TZ", paymentMethods: "Vodacom M-Pesa", category: "Online Jobs Tanzania", topic: "Miradi ya Weekend ya Mtandaoni kwa Wafanyakazi wa Maofisini Dar" },

  // ================= ZAMBIA (20) =================
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Zambia", topic: "Best Online Jobs in Lusaka That Pay via MTN Mobile Money" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Zambia", topic: "Legit Online Hustles for UNZA & CBU University Students in Zambia" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "Airtel Money, MTN Mobile Money", category: "Online Jobs Zambia", topic: "Top Paid Online Survey Websites Available for Zambians" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Zambia", topic: "Data Entry Remote Jobs in Ndola & Kitwe with Weekly Payouts" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money", category: "Online Jobs Zambia", topic: "How to Get Started as a Freelance Article Writer in Zambia" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Zambia", topic: "Smartphone Micro-task Apps to Earn Kwacha Online in Zambia" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "Airtel Money, MTN Mobile Money", category: "Online Jobs Zambia", topic: "Virtual Assistant Remote Work Opportunities for Zambian Jobseekers" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money", category: "Online Jobs Zambia", topic: "Online English Tutoring Jobs for Zambian Graduates" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Zambia", topic: "Audio Transcription Jobs in Zambia: Earn Money Typing at Home" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money", category: "Online Jobs Zambia", topic: "Social Media Freelancing Jobs for Youth in Livingstone & Kabwe" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Zambia", topic: "How to Earn Money with Affiliate Marketing in Zambia" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "Airtel Money", category: "Online Jobs Zambia", topic: "Canva Graphic Design Side Hustles for Zambian Creatives" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Zambia", topic: "Website Testing Remote Jobs Open to Zambian Residents" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money", category: "Online Jobs Zambia", topic: "Proofreading & Editing Freelance Opportunities in Lusaka" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Zambia", topic: "AI Annotation & Dataset Training Jobs for Zambians" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "Airtel Money, MTN Mobile Money", category: "Online Jobs Zambia", topic: "Remote Customer Representative Jobs for Zambians with Good Communication" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money", category: "Online Jobs Zambia", topic: "Monetizing WhatsApp Groups & Statuses in Zambia" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Zambia", topic: "How to Safely Withdraw Upwork & Payoneer Money to MTN MoMo in Zambia" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money", category: "Online Jobs Zambia", topic: "Weekend Work-From-Home Jobs in Zambia for Part-Time Income" },
  { country: "Zambia", countryCode: "ZM", paymentMethods: "MTN Mobile Money, Airtel Money", category: "Online Jobs Zambia", topic: "How to Identify Online Job Scams in Zambia: Complete Safety Guide" },

  // ================= NIGERIA (20) =================
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Palmpay, Bank Transfer", category: "Online Jobs Nigeria", topic: "Legit Online Jobs in Lagos That Pay Daily to OPay or Palmpay" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Palmpay, Bank Transfer", category: "Online Jobs Nigeria", topic: "High Paying Online Side Hustles for UNILAG, OAU & UI Students" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Bank Transfer", category: "Online Jobs Nigeria", topic: "Highest Paying Survey Websites That Accept Nigerian Users" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Palmpay", category: "Online Jobs Nigeria", topic: "Remote Data Entry Jobs in Abuja & Port Harcourt for Beginners" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "Bank Transfer, OPay", category: "Online Jobs Nigeria", topic: "How to Start Copywriting in Nigeria & Earn in Dollars" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Palmpay", category: "Online Jobs Nigeria", topic: "Micro-task Micro-job Platforms paying Nigerians in Naira" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "Bank Transfer, OPay", category: "Online Jobs Nigeria", topic: "Virtual Assistant Jobs in Nigeria for International Clients" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Palmpay", category: "Online Jobs Nigeria", topic: "Online Tutoring Platforms Hiring Nigerian Tutors" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "Bank Transfer, OPay", category: "Online Jobs Nigeria", topic: "Audio Transcription Remote Jobs for Fast Typists in Nigeria" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Palmpay", category: "Online Jobs Nigeria", topic: "Graphic Design Freelancing in Ibadan & Enugu using Canva and Photoshop" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "Bank Transfer, OPay", category: "Online Jobs Nigeria", topic: "Affiliate Marketing Complete Guide for Nigerian Youth" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Palmpay", category: "Online Jobs Nigeria", topic: "Social Media Management Jobs for Nigerian Creatives" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "Bank Transfer, OPay", category: "Online Jobs Nigeria", topic: "How to Earn Money Testing Mobile Apps & Websites in Nigeria" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Palmpay", category: "Online Jobs Nigeria", topic: "Proofreading & Editing Remote Freelancing for Nigerian Graduates" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "Bank Transfer, OPay", category: "Online Jobs Nigeria", topic: "AI Training & Data Annotation Jobs for Nigerians" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Palmpay", category: "Online Jobs Nigeria", topic: "Remote Customer Support & Live Chat Jobs for Nigerians" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Bank Transfer", category: "Online Jobs Nigeria", topic: "How to Sell Ebooks & Digital Products in Nigeria via Selar" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Palmpay", category: "Online Jobs Nigeria", topic: "Monetizing WhatsApp Television & Statuses in Nigeria" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "Bank Transfer, OPay", category: "Online Jobs Nigeria", topic: "How to Withdraw Paypal, Upwork & Geegpay Funds directly to Nigerian Banks" },
  { country: "Nigeria", countryCode: "NG", paymentMethods: "OPay, Palmpay", category: "Online Jobs Nigeria", topic: "How to Avoid Telegram & WhatsApp Online Job Scams in Nigeria" },

  // ================= CAMEROON (20) =================
  { country: "Cameroon", countryCode: "CM", paymentMethods: "Orange Money, MTN Mobile Money", category: "Online Jobs Cameroon", topic: "How to Earn Money Online in Douala & Yaoundé with Orange Money" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "MTN Mobile Money, Orange Money", category: "Online Jobs Cameroon", topic: "Legit Online Side Hustles for University Students in Buea & Bamenda" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "Orange Money, MTN Mobile Money", category: "Online Jobs Cameroon", topic: "Best Online Survey Sites That Work in Cameroon and Pay via Mobile Money" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "MTN Mobile Money, Orange Money", category: "Online Jobs Cameroon", topic: "Data Entry Remote Work Opportunities in Bafoussam & Garoua" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "Orange Money", category: "Online Jobs Cameroon", topic: "Bilingual Freelance Content Writing Jobs in Cameroon (English & French)" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "MTN Mobile Money, Orange Money", category: "Online Jobs Cameroon", topic: "Micro-task Apps That Pay Cameroonians via MTN Mobile Money" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "Orange Money, MTN Mobile Money", category: "Online Jobs Cameroon", topic: "Virtual Assistant Remote Jobs for Bilingual Workers in Cameroon" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "MTN Mobile Money", category: "Online Jobs Cameroon", topic: "Online English & French Tutoring Jobs for Cameroonian Teachers" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "Orange Money, MTN Mobile Money", category: "Online Jobs Cameroon", topic: "Audio & Video Transcription Jobs for Workers in Cameroon" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "MTN Mobile Money, Orange Money", category: "Online Jobs Cameroon", topic: "Remote Graphic Design & Canva Freelancing in Cameroon" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "Orange Money", category: "Online Jobs Cameroon", topic: "Social Media Management Jobs for Cameroonian Youth" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "MTN Mobile Money, Orange Money", category: "Online Jobs Cameroon", topic: "Affiliate Marketing Complete Beginner Guide for Cameroon" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "Orange Money, MTN Mobile Money", category: "Online Jobs Cameroon", topic: "Website & App Usability Testing Jobs in Cameroon" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "MTN Mobile Money", category: "Online Jobs Cameroon", topic: "Translation Jobs online: English to French Translation Freelancing" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "Orange Money, MTN Mobile Money", category: "Online Jobs Cameroon", topic: "AI Data Labeling & Annotation Remote Tasks for Cameroonians" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "MTN Mobile Money, Orange Money", category: "Online Jobs Cameroon", topic: "Customer Support Chat Jobs Available for Cameroonian Residents" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "Orange Money", category: "Online Jobs Cameroon", topic: "How to Earn Money on WhatsApp Status in Cameroon" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "MTN Mobile Money, Orange Money", category: "Online Jobs Cameroon", topic: "Selling Digital Downloads & Courses Online in Cameroon" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "Orange Money, MTN Mobile Money", category: "Online Jobs Cameroon", topic: "How to Safely Receive Upwork & Foreign Freelance Pay in Cameroon" },
  { country: "Cameroon", countryCode: "CM", paymentMethods: "MTN Mobile Money, Orange Money", category: "Online Jobs Cameroon", topic: "How to Identify Fake Work-From-Home Job Scams in Cameroon" },
];

async function runBatch() {
  console.log(`🚀 Starting Generation of 120 SEO-Optimized Articles via Groq...\n`);
  
  for (let i = 0; i < fullBatchQueue.length; i++) {
    await generateAndPostBlog(fullBatchQueue[i], i, fullBatchQueue.length);
    // 1.5-second rate limit pause between generations
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  console.log("\n🎉 ALL 120 ARTICLES SUCCESSFULLY CREATED AND PUBLISHED TO SANITY!");
}

runBatch();