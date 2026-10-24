"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { zeonDemo, zeonNav } from "@/lib/zeonai/content";
import { ZeonLogo } from "./ZeonLogo";

export function ZeonNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    >
      <div className="aid-home-container flex min-h-20 items-center justify-between gap-4 py-3">
        <Link
          href="/"
          aria-label="ZeonAI Labs home"
          className="relative z-[1001] shrink-0"
        >
          <ZeonLogo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {zeonNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2 py-2 text-[0.93rem] font-medium text-[var(--aid-blue)] xl:px-3"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={zeonDemo.id === "book-a-demo" ? "#book-a-demo" : zeonDemo.cta.href}
            className="aid-btn aid-btn-lime !px-4 !py-3 text-[0.93rem] max-lg:hidden"
          >
            Book a demo
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

      {mobileOpen ? (
        <div className="absolute top-full right-0 left-0 border-t border-black/5 bg-white shadow-lg lg:hidden">
          <nav className="aid-home-container flex flex-col gap-1 py-4" aria-label="Mobile">
            {zeonNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-[0.95rem] font-medium text-[var(--aid-blue)]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#book-a-demo"
              className="aid-btn aid-btn-lime mt-2 w-full justify-center"
              onClick={() => setMobileOpen(false)}
            >
              Book a demo
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
