"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { zeonDemo, zeonNav } from "@/lib/zeonai/content";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";
import { ZeonLogo } from "./ZeonLogo";

function getLenis(): Lenis | undefined {
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

/**
 * Scale-style nav: slides away on scroll down, returns on scroll up,
 * and reappears when the pointer enters the top hot-zone.
 */
export function ZeonNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hot, setHot] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    lastY.current = getLenis()?.scroll ?? window.scrollY;

    const onScroll = () => {
      const y = getLenis()?.scroll ?? window.scrollY;
      setScrolled(y >= 48);

      if (reduced || mobileOpen) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      const delta = y - lastY.current;
      // Ignore tiny jitter; require meaningful direction
      if (Math.abs(delta) < 4) return;

      if (y < 64) {
        setHidden(false);
      } else if (delta > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };

    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", onScroll);
      onScroll();
      return () => lenis.off("scroll", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced, mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const showNav = !hidden || hot || mobileOpen;

  return (
    <>
      {/* Invisible top strip — hover reveals the nav while it is tucked away */}
      <div
        className={`aid-nav-hotzone${showNav ? " is-idle" : ""}`}
        aria-hidden
        onMouseEnter={() => setHot(true)}
      />

      <header
        className={`aid-nav${scrolled ? " is-scrolled" : ""}${showNav ? " is-visible" : " is-hidden"}`}
        onMouseEnter={() => setHot(true)}
        onMouseLeave={() => setHot(false)}
      >
        <div className="aid-nav-inner">
          <div className="aid-home-container flex min-h-20 items-center justify-between gap-4 py-3">
            <Link
              href="/"
              aria-label="ZeonAI Labs home"
              className="relative z-[1] shrink-0"
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
                href={
                  zeonDemo.id === "book-a-demo"
                    ? "#book-a-demo"
                    : zeonDemo.cta.href
                }
                className="aid-btn aid-btn-blue !px-4 !py-3 text-[0.93rem] max-lg:hidden"
              >
                Book a demo
              </a>
              <button
                type="button"
                className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-[var(--aid-blue)]/20 text-[var(--aid-blue)] lg:hidden"
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
            <div className="border-t border-black/5 bg-white shadow-lg lg:hidden">
              <nav
                className="aid-home-container flex flex-col gap-1 py-4"
                aria-label="Mobile"
              >
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
        </div>
      </header>
    </>
  );
}
