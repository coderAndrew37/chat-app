// src/data/hotels.ts

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  imageUrl: string;
  stars: number;
  reviewPayKES: number;
  reviewType: "Photo + text" | "Text only" | "Video walkthrough";
  estMinutes: number;
}

// Real hotels — these are the kinds of properties reviewers evaluate.
// Payouts reflect actual task complexity, not inflated marketing numbers.
export const HOTELS: Hotel[] = [
  {
    id: "serena-nairobi",
    name: "Nairobi Serena Hotel",
    city: "Nairobi",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=800&fit=crop&q=80",
    stars: 5,
    reviewPayKES: 450,
    reviewType: "Photo + text",
    estMinutes: 15,
  },
  {
    id: "tribe-hotel",
    name: "Tribe Hotel",
    city: "Nairobi",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=800&fit=crop&q=80",
    stars: 5,
    reviewPayKES: 500,
    reviewType: "Video walkthrough",
    estMinutes: 25,
  },
  {
    id: "diani-backpackers",
    name: "Diani Backpackers",
    city: "Diani",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=800&fit=crop&q=80",
    stars: 3,
    reviewPayKES: 250,
    reviewType: "Text only",
    estMinutes: 10,
  },
  {
    id: "sarova-white-sands",
    name: "Sarova Whitesands",
    city: "Mombasa",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=800&fit=crop&q=80",
    stars: 5,
    reviewPayKES: 550,
    reviewType: "Photo + text",
    estMinutes: 20,
  },
  {
    id: "fairmont-mara",
    name: "Fairmont Mara Safari Club",
    city: "Maasai Mara",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=800&fit=crop&q=80",
    stars: 5,
    reviewPayKES: 700,
    reviewType: "Video walkthrough",
    estMinutes: 30,
  },
  {
    id: "hilton-garden-nairobi",
    name: "Hilton Garden Inn",
    city: "Nairobi",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=800&fit=crop&q=80",
    stars: 4,
    reviewPayKES: 350,
    reviewType: "Photo + text",
    estMinutes: 15,
  },
  {
    id: "kilaguni-lodge",
    name: "Kilaguni Serena Lodge",
    city: "Tsavo West",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=800&fit=crop&q=80",
    stars: 4,
    reviewPayKES: 400,
    reviewType: "Text only",
    estMinutes: 12,
  },
  {
    id: "hemingways-watamu",
    name: "Hemingways Watamu",
    city: "Watamu",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=800&fit=crop&q=80",
    stars: 5,
    reviewPayKES: 600,
    reviewType: "Photo + text",
    estMinutes: 20,
  },
  {
    id: "acacia-nakuru",
    name: "Sarova Lion Hill Lodge",
    city: "Lake Nakuru",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=600&h=800&fit=crop&q=80",
    stars: 4,
    reviewPayKES: 380,
    reviewType: "Text only",
    estMinutes: 12,
  },
  {
    id: "giraffe-manor",
    name: "Giraffe Manor",
    city: "Nairobi",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=800&fit=crop&q=80",
    stars: 5,
    reviewPayKES: 800,
    reviewType: "Video walkthrough",
    estMinutes: 35,
  },
  {
    id: "fig-tree-camp",
    name: "The Fig Tree Camp",
    city: "Maasai Mara",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&h=800&fit=crop&q=80",
    stars: 4,
    reviewPayKES: 450,
    reviewType: "Photo + text",
    estMinutes: 18,
  },
  {
    id: "ocean-village",
    name: "The Ocean Village",
    city: "Malindi",
    country: "Kenya",
    imageUrl:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=800&fit=crop&q=80",
    stars: 4,
    reviewPayKES: 320,
    reviewType: "Text only",
    estMinutes: 10,
  },
];