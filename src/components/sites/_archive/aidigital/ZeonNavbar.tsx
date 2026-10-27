"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type Lenis from "lenis";
import { zeonDemo, zeonNav } from "@/lib/zeonai/content";
import { ZeonLogo } from "./ZeonLogo";

function getLenis(): Lenis | undefined {
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

/**
 * Quiet sticky nav — always available, hairline surface, no hide-on-scroll theatre.
 */
export function ZeonNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = getLenis()?.scroll ?? window.scrollY;
      setScrolled(y >= 12);
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
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className={`zx-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="zx-nav-inner">
        <Link
          href="/"
          aria-label="ZeonAI Labs home"
          className="zx-nav-logo"
        >
          <ZeonLogo />
        </Link>

        <nav className="zx-nav-links" aria-label="Main">
          {zeonNav.map((item) => (
            <a key={item.href} href={item.href} className="zx-nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="zx-nav-actions">
          <a
            href={
              zeonDemo.id === "book-a-demo" ? "#book-a-demo" : zeonDemo.cta.href
            }
            className="zx-btn zx-btn-primary zx-nav-cta"
          >
            Book a demo
          </a>
          <button
            type="button"
            className="zx-nav-menu"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span
              className={`zx-nav-burger${mobileOpen ? " is-open" : ""}`}
              aria-hidden
            />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="zx-nav-drawer">
          <nav aria-label="Mobile" className="zx-nav-drawer-nav">
            {zeonNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="zx-nav-drawer-link"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#book-a-demo"
              className="zx-btn zx-btn-primary"
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
