import type {
  Profile,
  Step,
  Feature,
  FooterSection,
  Stat,
  NavLink,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Browse", href: "#profiles" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
];

export const STATS: Stat[] = [
  { value: "33,090+", label: "Active Members" },
  { value: "2.5K+", label: "Matches Daily" },
  { value: "4.8", label: "App Rating" },
];

export const PROFILES: Profile[] = [
  {
    id: 1,
    name: "Amara",
    age: 24,
    city: "Nairobi",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=faces",
  },
  {
    id: 2,
    name: "Grace",
    age: 22,
    city: "Mombasa",
    imageUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=faces",
  },
  {
    id: 3,
    name: "Faith",
    age: 25,
    city: "Kisumu",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=faces",
  },
  {
    id: 4,
    name: "Joy",
    age: 23,
    city: "Nakuru",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop&crop=faces",
  },
  {
    id: 5,
    name: "Mercy",
    age: 26,
    city: "Eldoret",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=faces",
  },
  {
    id: 6,
    name: "Sarah",
    age: 21,
    city: "Thika",
    imageUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=faces",
  },
  {
    id: 7,
    name: "Diana",
    age: 24,
    city: "Nyeri",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=600&fit=crop&crop=faces",
  },
  {
    id: 8,
    name: "Lucy",
    age: 27,
    city: "Machakos",
    imageUrl:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop&crop=faces",
  },
  {
    id: 9,
    name: "Cynthia",
    age: 23,
    city: "Nairobi",
    imageUrl:
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400&h=600&fit=crop&crop=faces",
  },
  {
    id: 10,
    name: "Winnie",
    age: 25,
    city: "Mombasa",
    imageUrl:
      "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=400&h=600&fit=crop&crop=faces",
  },
  {
    id: 11,
    name: "Esther",
    age: 22,
    city: "Kisii",
    imageUrl:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=600&fit=crop&crop=faces",
  },
  {
    id: 12,
    name: "Pauline",
    age: 26,
    city: "Naivasha",
    imageUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=600&fit=crop&crop=faces",
  },
];

export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    number: 1,
    title: "Create Profile",
    description:
      "Sign up free in seconds. Add your best photos and tell us about yourself.",
  },
  {
    number: 2,
    title: "Browse & Match",
    description:
      "Find attractive singles near you. When you both like each other, it's a match!",
  },
  {
    number: 3,
    title: "Chat & Earn",
    description:
      "Start chatting with your matches. The more you engage, the more you earn.",
  },
];

export const FEATURES: Feature[] = [
  {
    icon: "🎯",
    title: "Smart Matching",
    description:
      "Our algorithm finds your most compatible matches based on your preferences.",
  },
  {
    icon: "💬",
    title: "Chat & Earn",
    description:
      "Get paid real money for every meaningful conversation you have.",
  },
  {
    icon: "👥",
    title: "Refer & Earn",
    description:
      "Invite friends and earn cash bonuses when they upgrade their account.",
  },
  {
    icon: "⭐",
    title: "Go Premium",
    description:
      "Unlimited swipes, see who likes you, and boost your profile visibility.",
  },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Premium", href: "/premium" },
      { label: "Safety", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Safety Tips", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
];
