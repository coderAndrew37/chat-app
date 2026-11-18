// lib/countries.ts
export const COUNTRIES = {
  KE: { name: "Kenya",      flag: "🇰🇪", cur: "KES", dec: 2, tz: "Africa/Nairobi",        rate: 130,  min: 500,   methods: ["M-Pesa", "Airtel Money"] },
  UG: { name: "Uganda",     flag: "🇺🇬", cur: "UGX", dec: 0, tz: "Africa/Kampala",        rate: 4300, min: 17000, methods: ["MTN Mobile Money", "Airtel Money"] },
  NG: { name: "Nigeria",    flag: "🇳🇬", cur: "NGN", dec: 2, tz: "Africa/Lagos",          rate: 1500, min: 6000,  methods: ["OPay", "PalmPay"] },
  GH: { name: "Ghana",      flag: "🇬🇭", cur: "GHS", dec: 2, tz: "Africa/Accra",          rate: 11.2, min: 45,    methods: ["MTN MoMo", "Telecel Cash", "AirtelTigo Money"] },
  TZ: { name: "Tanzania",   flag: "🇹🇿", cur: "TZS", dec: 0, tz: "Africa/Dar_es_Salaam",  rate: 2640, min: 10500, methods: ["M-Pesa", "Tigo Pesa", "Airtel Money"] },
  BW: { name: "Botswana",   flag: "🇧🇼", cur: "BWP", dec: 2, tz: "Africa/Gaborone",       rate: 13.6, min: 70,    methods: ["Orange Money", "MyZaka"] },
} as const;

export type CountryKey = keyof typeof COUNTRIES;
export const DEFAULT_RATES: Record<string, number> = {
  KES: 130, UGX: 4300, NGN: 1500, GHS: 11.2, TZS: 2640, BWP: 13.6,
};