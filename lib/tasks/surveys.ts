export type Survey = {
  slug: string;
  name: string;
  topic: string;
  pay: number; // USD
  estMinutes: number;
  questions: { id: string; q: string; options: string[] }[];
};

const RAW: Survey[] = [
  {
    slug: "brand-awareness-consumer-goods",
    name: "Brand awareness — consumer goods",
    topic: "Retail",
    pay: 1.2,
    estMinutes: 5,
    questions: [
      {
        id: "q1",
        q: "Which of these brands have you seen advertised in the last 30 days?",
        options: ["Unilever", "P&G", "Bidco", "Brookside", "None of these"],
      },
      {
        id: "q2",
        q: "Where did you most recently see a consumer goods ad?",
        options: ["TV", "Social media", "Billboard", "Radio", "In-store"],
      },
      {
        id: "q3",
        q: "How often do you buy household cleaning products?",
        options: ["Weekly", "Monthly", "Quarterly", "Rarely"],
      },
    ],
  },
  {
    slug: "mobile-money-habits",
    name: "Mobile money habits",
    topic: "Fintech",
    pay: 0.9,
    estMinutes: 4,
    questions: [
      {
        id: "q1",
        q: "Which mobile money service do you use most?",
        options: ["M-Pesa", "Airtel Money", "T-Kash", "Other"],
      },
      {
        id: "q2",
        q: "How often do you send money to other people?",
        options: ["Daily", "Weekly", "Monthly", "Rarely"],
      },
      {
        id: "q3",
        q: "What is your biggest frustration with mobile money?",
        options: [
          "Transaction fees",
          "Network issues",
          "Failed transactions",
          "Agent availability",
        ],
      },
    ],
  },
  {
    slug: "streaming-preferences",
    name: "Streaming preferences",
    topic: "Media",
    pay: 1.5,
    estMinutes: 6,
    questions: [
      {
        id: "q1",
        q: "Which streaming services do you subscribe to?",
        options: ["Netflix", "Showmax", "Prime Video", "Disney+", "None"],
      },
      {
        id: "q2",
        q: "How many hours per week do you watch streaming content?",
        options: ["<2", "2–5", "5–10", "10+"],
      },
      {
        id: "q3",
        q: "What would make you switch providers?",
        options: ["Lower price", "Better content", "Local shows", "Better app"],
      },
      {
        id: "q4",
        q: "Do you share subscriptions with family?",
        options: ["Yes", "No", "Sometimes"],
      },
    ],
  },
  {
    slug: "ecommerce-checkout",
    name: "E-commerce checkout experience",
    topic: "Retail",
    pay: 1.0,
    estMinutes: 4,
    questions: [
      {
        id: "q1",
        q: "What stops you from completing an online purchase?",
        options: [
          "Delivery fees",
          "Trust in seller",
          "Complex checkout",
          "Payment methods",
          "Nothing",
        ],
      },
      {
        id: "q2",
        q: "Which payment method do you prefer online?",
        options: ["M-Pesa", "Card", "Cash on delivery", "Bank transfer"],
      },
      {
        id: "q3",
        q: "How often do you abandon a checkout?",
        options: ["Always", "Often", "Sometimes", "Never"],
      },
    ],
  },
  {
    slug: "grocery-shopping",
    name: "Grocery shopping patterns",
    topic: "Retail",
    pay: 1.3,
    estMinutes: 5,
    questions: [
      {
        id: "q1",
        q: "Where do you buy most of your groceries?",
        options: ["Supermarket", "Local market", "Small shops", "Online"],
      },
      {
        id: "q2",
        q: "How often do you shop?",
        options: ["Daily", "Weekly", "Bi-weekly", "Monthly"],
      },
      {
        id: "q3",
        q: "What matters most to you?",
        options: ["Price", "Freshness", "Convenience", "Brand"],
      },
      {
        id: "q4",
        q: "Do you use loyalty programs?",
        options: ["Yes, regularly", "Sometimes", "No"],
      },
    ],
  },
  {
    slug: "ride-hailing-satisfaction",
    name: "Ride-hailing satisfaction",
    topic: "Transport",
    pay: 0.8,
    estMinutes: 3,
    questions: [
      {
        id: "q1",
        q: "Which ride-hailing apps do you use?",
        options: ["Uber", "Bolt", "Little", "None"],
      },
      {
        id: "q2",
        q: "How often do you use them?",
        options: ["Daily", "Weekly", "Monthly", "Rarely"],
      },
      {
        id: "q3",
        q: "What's your biggest complaint?",
        options: ["Pricing", "Wait times", "Driver conduct", "App bugs"],
      },
    ],
  },
];

export const SURVEYS = RAW;
export const surveyBySlug = (slug: string) =>
  SURVEYS.find((s) => s.slug === slug);