// lib/hotels.ts
export type Hotel = {
  name: string;
  slug: string;
  city: string;
  flag: string;
  pay: number; // USD
  img: string;
  desc: string;
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Files in public/assets are named "hotel 1.webp" … "hotel 41.webp"
const img = (n: number) => `assets/hotel ${n}.webp`;

const RAW: Omit<Hotel, "slug">[] = [
  // ── 1–15 ────────────────────────────────────────────────────────────────
  {
    name: "Royal Garden Hotel",
    city: "London, UK",
    flag: "🇬🇧",
    pay: 8.2,
    img: img(1),
    desc: "Elegant dining room with white-linen tables and warm lighting.",
  },
  {
    name: "Villa Bellavista",
    city: "Amalfi, Italy",
    flag: "🇮🇹",
    pay: 5.6,
    img: img(2),
    desc: "Sea-view suite with plush bedding and a calm, airy feel.",
  },
  {
    name: "The Grand Palm",
    city: "Miami, USA",
    flag: "🇺🇸",
    pay: 15.5,
    img: img(3),
    desc: "Glass-fronted city tower glowing at dusk.",
  },
  {
    name: "Desert Pearl Retreat",
    city: "Dubai, UAE",
    flag: "🇦🇪",
    pay: 17.5,
    img: img(4),
    desc: "Landscaped courtyard, lagoon pool and modern design.",
  },
  {
    name: "Oasis Crown Lodge",
    city: "Abu Dhabi, UAE",
    flag: "🇦🇪",
    pay: 5.0,
    img: img(5),
    desc: "Grand suite with vaulted ceilings and crystal chandeliers.",
  },
  {
    name: "Riviera Palace",
    city: "Nice, France",
    flag: "🇫🇷",
    pay: 9.2,
    img: img(6),
    desc: "Belle-époque terraces wrapped around a glowing pool.",
  },
  {
    name: "Seychelles Palm Court",
    city: "Mahé, Seychelles",
    flag: "🇸🇨",
    pay: 4.8,
    img: img(7),
    desc: "Beachfront resort with palms and sun loungers on soft sand.",
  },
  {
    name: "The Mariner",
    city: "Sydney, Australia",
    flag: "🇦🇺",
    pay: 10.4,
    img: img(8),
    desc: "Modern city hotel with a resort-style pool.",
  },
  {
    name: "Vineyard House Lodge",
    city: "Napa, USA",
    flag: "🇺🇸",
    pay: 4.0,
    img: img(9),
    desc: "Light-filled dining room with a seasonal menu.",
  },
  {
    name: "Casa del Sol",
    city: "Barcelona, Spain",
    flag: "🇪🇸",
    pay: 13.0,
    img: img(10),
    desc: "Courtyard-style lounge under woven rattan lighting.",
  },
  {
    name: "Tahoe Crest Retreat",
    city: "Lake Tahoe, USA",
    flag: "🇺🇸",
    pay: 7.8,
    img: img(11),
    desc: "Warm timber lounge and dining with a relaxed mood.",
  },
  {
    name: "Jebel Vista Lodge",
    city: "Ras Al Khaimah, UAE",
    flag: "🇦🇪",
    pay: 14.5,
    img: img(12),
    desc: "Panoramic dining with sweeping views of the skyline.",
  },
  {
    name: "Ubud Jungle Retreat",
    city: "Bali, Indonesia",
    flag: "🇮🇩",
    pay: 13.8,
    img: img(13),
    desc: "Tropical-garden restaurant with natural textures.",
  },
  {
    name: "Red Rock Haven",
    city: "Sedona, USA",
    flag: "🇺🇸",
    pay: 14.5,
    img: img(14),
    desc: "Terracotta-toned resort with a cascading water feature.",
  },
  {
    name: "Pacific Palm Lodge",
    city: "Maui, USA",
    flag: "🇺🇸",
    pay: 13.5,
    img: img(15),
    desc: "Thatched pool deck, palms and ocean breezes.",
  },

  // ── 16–20: intentionally shuffled (matches original data.js) ────────────
  {
    name: "Alpine Haus",
    city: "Zermatt, Switzerland",
    flag: "🇨🇭",
    pay: 14.6,
    img: img(18),
    desc: "Spacious suite with ornate décor and a cosy lounge.",
  },
  {
    name: "Lakeside Haven",
    city: "Como, Italy",
    flag: "🇮🇹",
    pay: 14.1,
    img: img(19),
    desc: "Bright, airy room with blue accents and a fruit welcome.",
  },
  {
    name: "Maldives Lagoon Villas",
    city: "Malé, Maldives",
    flag: "🇲🇻",
    pay: 6.8,
    img: img(20),
    desc: "Vast resort with lagoon-style pools and a lazy river.",
  },
  {
    name: "Andaman Sands Resort",
    city: "Phuket, Thailand",
    flag: "🇹🇭",
    pay: 13.2,
    img: img(16),
    desc: "Beachfront resort on white sand with a calm lagoon.",
  },
  {
    name: "Hajar Coast Lodge",
    city: "Fujairah, UAE",
    flag: "🇦🇪",
    pay: 19.0,
    img: img(17),
    desc: "Balconied rooms around a palm-lined pool.",
  },

  // ── 21–23: point at existing reused images ──────────────────────────────
  {
    name: "Majestic Ocean Palace",
    city: "Maldives",
    flag: "🇲🇻",
    pay: 18.4,
    img: img(41),
    desc: "Overwater luxury villas with private decks overlooking crystal-clear waters.",
  },
  {
    name: "The Royal Kensington",
    city: "Edinburgh, Scotland",
    flag: "🇬🇧",
    pay: 19.2,
    img: img(18),
    desc: "Elegant heritage suites featuring classic furnishings and beautiful garden views.",
  },
  {
    name: "Grand Sapphire Resort",
    city: "Abu Dhabi, UAE",
    flag: "🇦🇪",
    pay: 20.0,
    img: img(32),
    desc: "Lavish beachfront property with an infinity pool and stunning sunset views.",
  },

  // ── 24–44: sequential 21 → 41 (matches original data.js) ────────────────
  {
    name: "Azure Bay Resort",
    city: "Santorini, Greece",
    flag: "🇬🇷",
    pay: 12.4,
    img: img(21),
    desc: "Whitewashed suites overlooking the deep blue Aegean Sea.",
  },
  {
    name: "Maple Crown Hotel",
    city: "Toronto, Canada",
    flag: "🇨🇦",
    pay: 8.6,
    img: img(22),
    desc: "Contemporary rooms with floor-to-ceiling city views.",
  },
  {
    name: "Kyoto Blossom Inn",
    city: "Kyoto, Japan",
    flag: "🇯🇵",
    pay: 6.4,
    img: img(23),
    desc: "Traditional Japanese interiors with a peaceful garden courtyard.",
  },
  {
    name: "Cape Azure Lodge",
    city: "Cape Town, South Africa",
    flag: "🇿🇦",
    pay: 15.8,
    img: img(24),
    desc: "Luxury coastal retreat with mountain views and an infinity pool.",
  },
  {
    name: "Coral Sands Retreat",
    city: "Fiji, Fiji",
    flag: "🇫🇯",
    pay: 9.4,
    img: img(25),
    desc: "Tropical beachfront villas surrounded by turquoise waters.",
  },
  {
    name: "Nordic Grand Hotel",
    city: "Oslo, Norway",
    flag: "🇳🇴",
    pay: 17.2,
    img: img(26),
    desc: "Minimalist interiors with panoramic views of the waterfront.",
  },
  {
    name: "Golden Dune Resort",
    city: "Marrakech, Morocco",
    flag: "🇲🇦",
    pay: 11.6,
    img: img(27),
    desc: "Ornate Moroccan architecture surrounding a tranquil courtyard pool.",
  },
  {
    name: "Emerald Heights",
    city: "Vancouver, Canada",
    flag: "🇨🇦",
    pay: 7.2,
    img: img(28),
    desc: "Modern mountain-view accommodation with elegant wooden finishes.",
  },
  {
    name: "Lotus Grand Palace",
    city: "Bangkok, Thailand",
    flag: "🇹🇭",
    pay: 18.5,
    img: img(29),
    desc: "Elegant city retreat featuring rooftop dining and a skyline pool.",
  },
  {
    name: "Silver Moon Resort",
    city: "Queenstown, New Zealand",
    flag: "🇳🇿",
    pay: 13.6,
    img: img(30),
    desc: "Lakeside accommodation with dramatic mountain scenery.",
  },
  {
    name: "Palm Royale Suites",
    city: "Doha, Qatar",
    flag: "🇶🇦",
    pay: 16.4,
    img: img(31),
    desc: "Spacious luxury suites with marble interiors and landscaped gardens.",
  },
  {
    name: "Blue Horizon Hotel",
    city: "Rio de Janeiro, Brazil",
    flag: "🇧🇷",
    pay: 5.8,
    img: img(32),
    desc: "Ocean-facing balconies overlooking a lively beachfront promenade.",
  },
  {
    name: "Imperial Sakura Hotel",
    city: "Tokyo, Japan",
    flag: "🇯🇵",
    pay: 19.2,
    img: img(33),
    desc: "Sophisticated guest rooms with panoramic views of the city skyline.",
  },
  {
    name: "Savannah Pearl Lodge",
    city: "Nairobi, Kenya",
    flag: "🇰🇪",
    pay: 10.8,
    img: img(34),
    desc: "Serene garden setting with stylish rooms and an outdoor dining terrace.",
  },
  {
    name: "Atlantic Breeze Resort",
    city: "Lisbon, Portugal",
    flag: "🇵🇹",
    pay: 14.8,
    img: img(35),
    desc: "Coastal-inspired interiors with a sunlit terrace overlooking the ocean.",
  },
  {
    name: "Crystal Peak Lodge",
    city: "Banff, Canada",
    flag: "🇨🇦",
    pay: 20.0,
    img: img(36),
    desc: "Rustic luxury suites featuring fireplaces and breathtaking alpine views.",
  },
  {
    name: "Royal Lotus Retreat",
    city: "Colombo, Sri Lanka",
    flag: "🇱🇰",
    pay: 6.8,
    img: img(37),
    desc: "Palm-fringed swimming pool beside elegant rooms with tropical décor.",
  },
  {
    name: "Sunset Boulevard Inn",
    city: "Los Angeles, USA",
    flag: "🇺🇸",
    pay: 9.8,
    img: img(38),
    desc: "Boutique accommodation with a stylish rooftop lounge and city views.",
  },
  {
    name: "Pearl of Zanzibar",
    city: "Zanzibar, Tanzania",
    flag: "🇹🇿",
    pay: 5.4,
    img: img(39),
    desc: "Swahili-inspired beachfront villas with ocean-view dining spaces.",
  },
  {
    name: "Crown Imperial Resort",
    city: "Istanbul, Turkey",
    flag: "🇹🇷",
    pay: 18.8,
    img: img(40),
    desc: "Grand architectural interiors with luxurious suites and elegant furnishings.",
  },
  {
    name: "The Imperial Azure",
    city: "Bora Bora, French Polynesia",
    flag: "🇵🇫",
    pay: 19.6,
    img: img(41),
    desc: "Exclusive overwater villas with private infinity pools and breathtaking lagoon views.",
  },
];

export const HOTELS: Hotel[] = RAW.map((h) => ({ ...h, slug: slugify(h.name) }));

export const bySlug = (slug: string) => HOTELS.find((h) => h.slug === slug);

export const starsFor = (slug: string) => {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return 3 + (Math.abs(h) % 3);
};

export const imgSrc = (path: string) =>
  encodeURI("/" + path.replace(/^\/+/, ""));