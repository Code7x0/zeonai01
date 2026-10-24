export const SITE = "https://www.aidigital.com";

export const asset = (path: string) => `/sites/aidigital/${path}`;

export const logos = [
  { src: asset("logos/nut.avif"), alt: "nutpods", height: 40 },
  { src: asset("logos/av.avif"), alt: "Austin Williams", height: 40 },
  { src: asset("logos/swarovski.avif"), alt: "Swarovski", height: 40 },
  { src: asset("logos/true.avif"), alt: "TrueCar", height: 40 },
  { src: asset("logos/yamana.avif"), alt: "Yamaha", height: 40 },
  { src: asset("logos/mediagistic.png"), alt: "Mediagistic", height: 40 },
  { src: asset("logos/airbnb.avif"), alt: "Airbnb", height: 40 },
  { src: asset("logos/mars.avif"), alt: "Mars", height: 40 },
  { src: asset("logos/sa.avif"), alt: "SA", height: 40 },
] as const;

export const services = [
  {
    num: "01",
    title: "Media Orchestration",
    href: `${SITE}/capabilities/programmatic`,
    image: asset("images/service-media.svg"),
    body: "Full-funnel campaign management with round-the-clock coverage and zero platform bias — we activate wherever performance takes us, not where a partnership pushes us.",
    bullets: [
      "150+ data partners for audience and targeting depth",
      "Always-on optimization, real-time visibility via Elevate",
      "DSP-agnostic activation rooted in the Open Garden Framework",
    ],
  },
  {
    num: "02",
    title: "Smart Supply",
    href: `${SITE}/smart-supply`,
    image: asset("images/service-smart.svg"),
    body: "Quality inventory and real-time AI SPO, cutting CPM bloat and misaligned algorithms so every dollar reaches premium, fraud-free placements.",
    bullets: [
      "AI-driven supply orchestration and AI SPO",
      "Continuous AI-based bid and route optimization",
      "Built on transparency standards, including ARTF alignment",
    ],
  },
  {
    num: "03",
    title: "AI Digital Labs",
    href: `${SITE}/ai-labs`,
    image: asset("images/service-labs.svg"),
    body: "Turning AI ambition into action. From upskilling your team to shipping tools they'll actually use, AI Labs is hands-on AI transformation, not theory.",
    bullets: [
      "Ready-to-use AI tools for agencies and brands",
      "AI Creative Studio for AI-powered creative production",
      "Team training, strategic AI consulting, and implementation support",
    ],
  },
] as const;

export const articles = [
  {
    href: `${SITE}/resources/blog/html5-banner-ads-what-they-are-and-how-to-build-them`,
    image: asset("articles/html5-banners.webp"),
    category: "Rich Media",
    title: "HTML5 banner ads: What they are and how to build them",
    date: "October 23, 2026",
    read: "9 min read",
  },
  {
    href: `${SITE}/resources/blog/banner-ad-design-best-practices-what-makes-a-high-performing-display-ad`,
    image: asset("articles/banner-design.webp"),
    category: "Display",
    title:
      "Banner Ad Design Best Practices: What Makes a High-Performing Display Ad",
    date: "October 22, 2026",
    read: "11 min read",
  },
  {
    href: `${SITE}/resources/blog/first-touch-vs-last-touch-attribution-what-each-model-actually-measures`,
    image: asset("articles/attribution.webp"),
    category: "Attribution",
    title:
      "First-Touch vs Last-Touch Attribution: What Each Model Actually Measures",
    date: "October 21, 2026",
    read: "10 min read",
  },
] as const;

export const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "Our Story & Values", href: "/" },
      { label: "News & PR", href: `${SITE}/resources/news-pr` },
      { label: "Resources", href: `${SITE}/resources/all-resources` },
      { label: "Life at AI Digital", href: `${SITE}/life-at-ai-digital` },
      { label: "Open Roles", href: `${SITE}/open-roles` },
      { label: "Get in Touch", href: `${SITE}/contact` },
    ],
  },
  {
    title: "Our offerings",
    links: [
      { label: "Elevate", href: `${SITE}/elevate` },
      { label: "AI Digital Labs", href: `${SITE}/ai-labs` },
      { label: "Smart Supply", href: `${SITE}/smart-supply` },
      { label: "AI Creative Studio", href: `${SITE}/ai-creative-studio` },
      { label: "Open Garden", href: `${SITE}/open-garden-framework` },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Political", href: `${SITE}/industry/political` },
      { label: "Agriculture", href: `${SITE}/industry/agriculture` },
      { label: "Finance & Banking", href: `${SITE}/industry/financial` },
      { label: "Higher Education", href: `${SITE}/industry/education` },
      { label: "Travel & Tourism", href: `${SITE}/industry/travel-tourism` },
      { label: "Auto & Dealerships", href: `${SITE}/industry/auto-dealership` },
      { label: "COOP", href: `${SITE}/industry/co-op` },
      { label: "B2B", href: `${SITE}/industry/b2b` },
      { label: "Pharma & Healthcare", href: `${SITE}/industry/pharma` },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "Programmatic", href: `${SITE}/capabilities/programmatic` },
      {
        label: "Premium CTV",
        href: `${SITE}/capabilities/premium-ctv-solutions`,
      },
      {
        label: "Live Sports",
        href: `${SITE}/capabilities/live-sports-advertising`,
      },
      {
        label: "Streaming Audio",
        href: `${SITE}/capabilities/streaming-audio`,
      },
      { label: "Digital OOH", href: `${SITE}/capabilities/digital-ooh` },
      {
        label: "Rich Media",
        href: `${SITE}/capabilities/rich-media-advertising`,
      },
      {
        label: "High Impact Units",
        href: `${SITE}/capabilities/high-impact-units`,
      },
      { label: "Search & Social", href: `${SITE}/capabilities/search-social` },
    ],
  },
] as const;

export const offices = [
  {
    title: "Miami Office",
    address: "382 NE 191st St Miami, Florida 33179, US",
    map: "https://maps.app.goo.gl/mHha423pxfGPfVpY8",
  },
  {
    title: "Belgrade Office",
    address: "Cara Nikolaja II 11 11118, Belgrade (Vračar) Serbia",
    map: "https://maps.app.goo.gl/mHha423pxfGPfVpY8",
  },
  {
    title: "Cyprus Office",
    address: "Themistokli Dervi 17 –19, The City House 106, Nicosia, Cyprus",
    map: "https://maps.app.goo.gl/mHha423pxfGPfVpY8",
  },
] as const;

export const YT_ELEVATE = "bhr8LWEhEVo";
export const YT_GARDEN = "S4fbLN6wjoQ";
