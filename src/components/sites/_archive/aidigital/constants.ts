import {
  zeonCapabilities,
  zeonCustomers,
  zeonFooterColumns,
  zeonOffices,
} from "@/lib/zeonai/content";

/** External marketing site (unused for ZeonAI CTAs). */
export const SITE = "https://zeonai-website-preview.vercel.app";

export const asset = (path: string) => `/sites/aidigital/${path}`;

export const zeonAsset = (path: string) => `/sites/zeonai/${path}`;

/**
 * Hero logo strip — verified from https://www.zeonai.com/
 * “Trusted by Leading Organizations Worldwide” (customers).
 * Animation / LogoSlider styling is unchanged; data only.
 */
export const logos = [
  {
    src: zeonAsset("logos/fujitsu.png"),
    alt: "Fujitsu",
    height: 40,
    relationship: "customer" as const,
    source:
      "https://www.zeonai.com/ — Trusted by Leading Organizations Worldwide",
  },
  {
    src: zeonAsset("logos/national-capital-district-commission.png"),
    alt: "National Capital District Commission",
    height: 40,
    relationship: "customer" as const,
    source:
      "https://www.zeonai.com/ — Trusted by Leading Organizations Worldwide",
  },
  {
    src: zeonAsset("logos/indian-air-force.png"),
    alt: "Indian Air Force",
    height: 40,
    relationship: "customer" as const,
    source:
      "https://www.zeonai.com/ — Trusted by Leading Organizations Worldwide",
  },
  {
    src: zeonAsset("logos/aidea-labs.png"),
    alt: "aiDea Labs",
    height: 40,
    relationship: "customer" as const,
    source:
      "https://www.zeonai.com/ — Trusted by Leading Organizations Worldwide",
  },
  {
    src: zeonAsset("logos/aditya-birla-hindalco.png"),
    alt: "Aditya Birla Hindalco",
    height: 40,
    relationship: "customer" as const,
    source:
      "https://www.zeonai.com/ — Trusted by Leading Organizations Worldwide",
  },
  {
    src: zeonAsset("logos/mahanadi-coalfields.png"),
    alt: "Mahanadi Coalfields Limited (MCL)",
    height: 40,
    relationship: "customer" as const,
    source:
      "https://www.zeonai.com/ — Trusted by Leading Organizations Worldwide",
  },
  {
    src: zeonAsset("logos/quantum-lending-solutions.png"),
    alt: "Quantum Lending Solutions",
    height: 40,
    relationship: "customer" as const,
    source:
      "https://www.zeonai.com/ — Trusted by Leading Organizations Worldwide",
  },
  {
    src: zeonAsset("logos/la-trobe-financial.png"),
    alt: "La Trobe Financial",
    height: 40,
    relationship: "customer" as const,
    source:
      "https://www.zeonai.com/ — Trusted by Leading Organizations Worldwide",
  },
] as const;

export const services = zeonCapabilities.modules;

export const articles = zeonCustomers.cases.map((c) => ({
  href: c.href,
  image: c.image,
  category: c.category,
  title: c.title,
  date: c.meta,
  read: c.detail,
}));

export const footerColumns = zeonFooterColumns;

export const offices = zeonOffices;

export const YT_ELEVATE = "bhr8LWEhEVo";
export const YT_GARDEN = "S4fbLN6wjoQ";
