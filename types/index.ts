export interface Profile {
  id: number;
  name: string;
  age: number;
  city: string;
  imageUrl: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

export interface Stat {
  value: string;
  label: string;
}

// Define this once
export interface ApplicationFormData {
  name: string;
  whatsapp: string;
}