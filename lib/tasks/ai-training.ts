export type AIRankTask = {
  kind: "rank";
  slug: string;
  name: string;
  prompt: string;
  responseA: string;
  responseB: string;
  pay: number; // USD
  estMinutes: number;
};

export type AILabelTask = {
  kind: "label";
  slug: string;
  name: string;
  items: { id: string; text: string }[];
  pay: number; // USD
  estMinutes: number;
};

export type AITrainingTask = AIRankTask | AILabelTask;

const RAW: AITrainingTask[] = [
  {
    kind: "rank",
    slug: "response-quality-cooking",
    name: "Response quality — cooking",
    prompt: "How do I keep pasta from sticking together when cooking?",
    responseA:
      "Add a tablespoon of oil to the boiling water. The oil coats the pasta and prevents sticking, which is the standard method used by chefs worldwide.",
    responseB:
      "Stir the pasta in the first two minutes after adding it to the water, and reserve a cup of the starchy cooking water before draining. Both help prevent sticking.",
    pay: 1.5,
    estMinutes: 4,
  },
  {
    kind: "rank",
    slug: "factual-accuracy-history",
    name: "Factual accuracy — history",
    prompt: "When did Kenya gain independence and from whom?",
    responseA:
      "Kenya gained independence on 12 December 1963 from the United Kingdom, with Jomo Kenyatta as the first Prime Minister.",
    responseB:
      "Kenya became independent on 1 June 1963, from British colonial rule, after the Mau Mau uprising led by Jomo Kenyatta.",
    pay: 1.8,
    estMinutes: 4,
  },
  {
    kind: "rank",
    slug: "tone-customer-reply",
    name: "Tone comparison — customer reply",
    prompt:
      "Write a short reply to a customer who complained about a delayed order.",
    responseA:
      "We apologize for the delay. Your order is delayed due to high volume. Please wait for further updates.",
    responseB:
      "I'm really sorry your order hasn't arrived yet — that's frustrating. I've checked and it's expected tomorrow. I'll message you personally once it's dispatched.",
    pay: 1.2,
    estMinutes: 3,
  },
  {
    kind: "label",
    slug: "short-facts",
    name: "Short factual statements",
    items: [
      { id: "i1", text: "Nairobi is the capital of Kenya." },
      { id: "i2", text: "The Great Wall of China is visible from space with the naked eye." },
      { id: "i3", text: "Mount Kilimanjaro is the highest mountain in Africa." },
      { id: "i4", text: "Water boils at 90°C at sea level." },
      { id: "i5", text: "M-Pesa was launched in Kenya in 2007." },
    ],
    pay: 1.4,
    estMinutes: 5,
  },
  {
    kind: "label",
    slug: "grammar-corrections",
    name: "Grammar corrections",
    items: [
      { id: "i1", text: "Their going to the market tomorrow." },
      { id: "i2", text: "She don't like coffee." },
      { id: "i3", text: "The childrens are playing outside." },
      { id: "i4", text: "I have went to Mombasa twice." },
      { id: "i5", text: "He is more taller than his brother." },
    ],
    pay: 1.3,
    estMinutes: 4,
  },
  {
    kind: "label",
    slug: "sentiment-tags",
    name: "Sentiment tags",
    items: [
      { id: "i1", text: "Absolutely loved the service — will order again." },
      { id: "i2", text: "Delivery was fine but the packaging was damaged." },
      { id: "i3", text: "Terrible experience. Never coming back." },
      { id: "i4", text: "It works as expected. Nothing special." },
      { id: "i5", text: "The staff were super friendly and helpful!" },
    ],
    pay: 1.0,
    estMinutes: 3,
  },
];

export const AI_TRAINING_TASKS = RAW;
export const aiTrainingBySlug = (slug: string) =>
  AI_TRAINING_TASKS.find((t) => t.slug === slug);