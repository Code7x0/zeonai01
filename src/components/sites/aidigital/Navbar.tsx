"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE, asset } from "./constants";
import { Logo } from "./Logo";

type MegaLink = {
  label: string;
  href: string;
  desc?: string;
  icon?: string;
};

type MegaColumn = {
  title: string;
  links: MegaLink[];
};

type NavItem =
  | { label: string; href: string }
  | {
      label: string;
      columns: MegaColumn[];
      featured?: {
        title: string;
        href: string;
        image?: string;
        meta?: string;
      }[];
    };

const navItems: NavItem[] = [
  {
    label: "Who we are",
    columns: [
      {
        title: "Company",
        links: [
          {
            label: "Our Story & Values",
            href: "/",
            icon: asset("icons/frame-logo.svg"),
          },
          {
            label: "News & PR",
            href: `${SITE}/resources/news-pr`,
            icon: asset("icons/news.svg"),
          },
          {
            label: "Life at AI Digital",
            href: `${SITE}/life-at-ai-digital`,
            icon: asset("icons/life.svg"),
          },
          {
            label: "Open Roles",
            href: `${SITE}/open-roles`,
            icon: asset("icons/open-roles.svg"),
          },
        ],
      },
    ],
    featured: [
      {
        title: "AI Digital Named to Fortune's Best Workplaces in Advertising & Marketing™ 2026 List",
        href: `${SITE}/resources/news-pr`,
        image: asset("articles/state-of-ai.webp"),
        meta: "Company News · Sep 30, 2026",
      },
      {
        title: "Publishers threaten to cut Google off as ad supply falls 40%",
        href: `${SITE}/resources/news-pr`,
        meta: "Company News · Jul 24, 2026",
      },
    ],
  },
  {
    label: "What we do",
    columns: [
      {
        title: "Framework",
        links: [
          {
            label: "Open Garden Framework",
            href: `${SITE}/open-garden-framework`,
            desc: "Open, connected media without walled gardens",
          },
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
          {
            label: "Search & Social",
            href: `${SITE}/capabilities/search-social`,
          },
        ],
      },
      {
        title: "Industries",
        links: [
          { label: "Political", href: `${SITE}/industry/political` },
          { label: "Agriculture", href: `${SITE}/industry/agriculture` },
          { label: "Finance & Banking", href: `${SITE}/industry/financial` },
          { label: "Higher Education", href: `${SITE}/industry/education` },
          {
            label: "Travel & Tourism",
            href: `${SITE}/industry/travel-tourism`,
          },
          {
            label: "Auto & Dealerships",
            href: `${SITE}/industry/auto-dealership`,
          },
          { label: "COOP", href: `${SITE}/industry/co-op` },
          { label: "B2B", href: `${SITE}/industry/b2b` },
          { label: "Pharma & Healthcare", href: `${SITE}/industry/pharma` },
        ],
      },
    ],
  },
  { label: "Elevate", href: `${SITE}/elevate` },
  { label: "AI Labs", href: `${SITE}/ai-labs` },
  { label: "Smart Supply", href: `${SITE}/smart-supply` },
  {
    label: "Resources",
    columns: [
      {
        title: "Explore",
        links: [
          {
            label: "All Resources",
            href: `${SITE}/resources/all-resources`,
          },
          { label: "Blog", href: `${SITE}/resources/blog` },
          { label: "Case Studies", href: `${SITE}/resources/case-studies` },
          {
            label: "White Papers & Research",
            href: `${SITE}/resources/whitepapers-research`,
          },
          { label: "Webinars", href: `${SITE}/resources/webinars` },
          { label: "Podcasts", href: `${SITE}/resources/podcasts` },
          { label: "Newsletters", href: `${SITE}/resources/newsletters` },
          { label: "News & PR", href: `${SITE}/resources/news-pr` },
        ],
      },
    ],
    featured: [
      {
        title: "The Q4 2026 Holiday Season Report is here — see where to spend and when.",
        href: `${SITE}/whitepapers-research/q4-2026-holiday-season-report`,
        image: asset("articles/holiday-report.png"),
        meta: "White Paper",
      },
      {
        title: "HTML5 banner ads: What they are and how to build them",
        href: `${SITE}/resources/blog/html5-banner-ads-what-they-are-and-how-to-build-them`,
        image: asset("articles/html5-banners.webp"),
        meta: "Blog · Oct 23, 2026",
      },
    ],
  },
  {
    label: "Join us",
    columns: [
      {
        title: "Careers",
        links: [
          {
            label: "Open Roles",
            href: `${SITE}/open-roles`,
            icon: asset("icons/open-roles.svg"),
            desc: "Join the intersection of AI and media",
          },
          {
            label: "Life at AI Digital",
            href: `${SITE}/life-at-ai-digital`,
            icon: asset("icons/life.svg"),
            desc: "Culture of kindness and innovation",
          },
          {
            label: "Get in Touch",
            href: `${SITE}/contact`,
            icon: asset("icons/contact.svg"),
          },
        ],
      },
    ],
  },
];

function isMega(
  item: NavItem,
): item is Extract<NavItem, { columns: MegaColumn[] }> {
  return "columns" in item;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 180);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={
        scrolled
          ? "fixed top-0 right-0 left-0 z-[1000] min-h-20 border-b border-black/5 bg-[var(--aid-bg)] transition-all"
          : "fixed top-0 right-0 left-0 z-[1000] min-h-20 bg-[var(--aid-bg)] transition-all"
      }
      onMouseLeave={() => setActive(null)}
    >
      <div className="aid-home-container flex min-h-20 items-center justify-between gap-4 py-3">
        <Link
          href="/"
          aria-label="home"
          className="relative z-[1001] shrink-0 text-[var(--aid-blue)]"
        >
          <Logo className="h-[18px] w-[117px] md:h-[22px] md:w-[143px]" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {navItems.map((item) =>
            isMega(item) ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActive(item.label)}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-2 py-2 text-[0.93rem] font-medium text-[var(--aid-blue)] xl:px-3"
                  aria-expanded={active === item.label}
                >
                  {item.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden>
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="px-2 py-2 text-[0.93rem] font-medium text-[var(--aid-blue)] xl:px-3"
                onMouseEnter={() => setActive(null)}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`${SITE}/contact`}
            className="aid-btn aid-btn-lime !px-4 !py-3 text-[0.93rem] max-lg:hidden"
          >
            Contact us
          </a>
          <button
            type="button"
            className="relative z-[1001] flex h-10 w-10 items-center justify-center rounded-full border border-[var(--aid-blue)]/20 text-[var(--aid-blue)] lg:hidden"
            aria-label="menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 bg-current transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 bg-current transition ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 bg-current transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Desktop mega panels */}
      {navItems.map((item) => {
        if (!isMega(item) || active !== item.label) return null;
        const cols = item.columns.length;
        return (
          <div
            key={`panel-${item.label}`}
            className="absolute top-full right-0 left-0 hidden border-t border-black/5 bg-white shadow-[0_24px_60px_rgba(38,38,58,0.12)] lg:block"
            onMouseEnter={() => setActive(item.label)}
          >
            <div className="aid-home-container grid gap-8 py-8 lg:grid-cols-[1.4fr_1fr]">
              <div
                className={`grid gap-8 ${cols >= 3 ? "sm:grid-cols-3" : cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}
              >
                {item.columns.map((col) => (
                  <div key={col.title}>
                    <p className="mb-3 text-xs font-semibold tracking-wide text-[var(--aid-grey)] uppercase">
                      {col.title}
                    </p>
                    <ul className="flex flex-col gap-1">
                      {col.links.map((link) => {
                        const inner = (
                          <>
                            {link.icon ? (
                              <Image
                                src={link.icon}
                                alt=""
                                width={28}
                                height={28}
                                className="mt-0.5 h-7 w-7 object-contain"
                              />
                            ) : null}
                            <span>
                              <span className="block text-sm font-semibold text-[var(--aid-blue)]">
                                {link.label}
                              </span>
                              {link.desc ? (
                                <span className="mt-0.5 block text-xs text-[var(--aid-ink)]/70">
                                  {link.desc}
                                </span>
                              ) : null}
                            </span>
                          </>
                        );
                        const className =
                          "group flex items-start gap-3 rounded-xl px-2 py-2.5 transition hover:bg-[var(--aid-blue-100)]";
                        return (
                          <li key={link.label}>
                            {link.href === "/" ? (
                              <Link href="/" className={className}>
                                {inner}
                              </Link>
                            ) : (
                              <a href={link.href} className={className}>
                                {inner}
                              </a>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {item.featured?.length ? (
                <div className="flex flex-col gap-3 border-l border-black/5 pl-0 lg:pl-8">
                  <p className="mb-1 text-xs font-semibold tracking-wide text-[var(--aid-grey)] uppercase">
                    Featured
                  </p>
                  {item.featured.map((card) => (
                    <a
                      key={card.title}
                      href={card.href}
                      className="flex gap-3 rounded-xl border border-black/5 bg-[var(--aid-bg)] p-3 transition hover:border-[var(--aid-blue)]/20"
                    >
                      {card.image ? (
                        <Image
                          src={card.image}
                          alt=""
                          width={96}
                          height={64}
                          className="h-16 w-24 shrink-0 rounded-lg object-cover"
                        />
                      ) : null}
                      <span className="min-w-0">
                        {card.meta ? (
                          <span className="mb-1 block text-[0.65rem] font-semibold tracking-wide text-[var(--aid-blue)] uppercase">
                            {card.meta}
                          </span>
                        ) : null}
                        <span className="line-clamp-3 text-sm font-medium text-[var(--aid-ink)]">
                          {card.title}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 top-20 z-[999] overflow-y-auto bg-[#f9f9f9] px-5 py-6 lg:hidden">
          <div className="mx-auto flex max-w-lg flex-col gap-2">
            {navItems.map((item) =>
              isMega(item) ? (
                <div key={item.label} className="border-b border-black/5 pb-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-2 text-left text-lg font-semibold text-[var(--aid-blue)]"
                    onClick={() =>
                      setMobileSection((s) =>
                        s === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <span aria-hidden>
                      {mobileSection === item.label ? "−" : "+"}
                    </span>
                  </button>
                  {mobileSection === item.label ? (
                    <div className="flex flex-col gap-4 pb-2 pl-1">
                      {item.columns.map((col) => (
                        <div key={col.title}>
                          <p className="mb-2 text-xs font-semibold tracking-wide text-[var(--aid-grey)] uppercase">
                            {col.title}
                          </p>
                          <ul className="flex flex-col gap-2">
                            {col.links.map((link) => (
                              <li key={link.label}>
                                <a
                                  href={link.href}
                                  className="text-[var(--aid-ink)]"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="border-b border-black/5 py-3 text-lg font-semibold text-[var(--aid-blue)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ),
            )}
            <a
              href={`${SITE}/contact`}
              className="aid-btn aid-btn-lime mt-4 w-full"
            >
              Contact us
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
