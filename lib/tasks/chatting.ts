export type ChattingScenario = {
  slug: string;
  name: string;
  brief: string;
  pay: number; // USD
  estMinutes: number;
  minReplies: number;
  customerMessages: { id: string; text: string }[];
};

const RAW: ChattingScenario[] = [
  {
    slug: "refund-request-polite",
    name: "Refund request — polite customer",
    brief:
      "A customer politely requests a refund for a delayed order. Respond with empathy, clarify policy, offer a solution.",
    pay: 2.5,
    estMinutes: 6,
    minReplies: 2,
    customerMessages: [
      {
        id: "c1",
        text: "Hi, I ordered a blender two weeks ago and it still hasn't arrived. I'd like a refund please.",
      },
    ],
  },
  {
    slug: "delivery-delay-frustrated",
    name: "Delivery delay — frustrated customer",
    brief:
      "Order is 3 days late and the customer is visibly frustrated. De-escalate, apologise clearly, offer a specific remedy.",
    pay: 3.0,
    estMinutes: 8,
    minReplies: 3,
    customerMessages: [
      {
        id: "c1",
        text: "This is the THIRD time I'm messaging about my order. Nobody is helping me. Where is my package?",
      },
    ],
  },
  {
    slug: "account-reset",
    name: "Account reset — technical issue",
    brief:
      "Customer can't log in. Walk them through account recovery without exposing security details. Test that your instructions are clear enough to follow.",
    pay: 2.2,
    estMinutes: 5,
    minReplies: 2,
    customerMessages: [
      {
        id: "c1",
        text: "I changed my phone and now I can't log in. It says it sent a code but I'm not getting any SMS.",
      },
    ],
  },
  {
    slug: "product-question-presales",
    name: "Product question — pre-sales",
    brief:
      "Customer is comparing two product options before buying. Ask clarifying questions, don't oversell, recommend based on need.",
    pay: 1.8,
    estMinutes: 4,
    minReplies: 2,
    customerMessages: [
      {
        id: "c1",
        text: "Hi, I'm deciding between the 6-litre and the 10-litre air fryer. We're a family of four. What would you recommend?",
      },
    ],
  },
  {
    slug: "angry-review-escalation",
    name: "Angry review — escalation",
    brief:
      "A customer left a 1-star review publicly and is now messaging you privately. Acknowledge, take ownership, offer a concrete resolution path.",
    pay: 3.5,
    estMinutes: 8,
    minReplies: 3,
    customerMessages: [
      {
        id: "c1",
        text: "I left you a one-star review because your support is useless. Do you even care?",
      },
    ],
  },
];

export const CHATTING_SCENARIOS = RAW;
export const chattingBySlug = (slug: string) =>
  CHATTING_SCENARIOS.find((c) => c.slug === slug);