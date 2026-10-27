"use client";

import { useEffect, useState } from "react";
import type Lenis from "lenis";
import { zeonMeta } from "@/lib/zeonai/content";
import { BrandLogo } from "./BrandLogo";

const links = [
  { href: "#platform", label: "Platform" },
  { href: "#architecture", label: "Architecture" },
  { href: "#products", label: "Capabilities" },
  { href: "#industries", label: "Industries" },
  { href: "#trust", label: "Governance" },
] as const;

function getLenis(): Lenis | undefined {
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const sync = () => setOn((getLenis()?.scroll ?? window.scrollY) > 12);
    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", sync);
      sync();
      return () => lenis.off("scroll", sync);
    }
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => window.removeEventListener("scroll", sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`zn-nav-shell${on ? " is-on" : ""}`}>
      <div className="zn-nav">
        <a href="/" className="zn-brand" aria-label="ZeonAI Labs home">
          <BrandLogo priority />
        </a>
        <nav className="zn-links" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#book-a-demo" className="zn-btn zn-btn-solid zn-nav-cta">
          Book a demo
        </a>
        <button
          type="button"
          className="zn-burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
      {open ? (
        <div className="zn-drawer">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#book-a-demo"
            className="zn-btn zn-btn-solid"
            onClick={() => setOpen(false)}
          >
            Book a demo
          </a>
          <a href={zeonMeta.email} onClick={() => setOpen(false)}>
            Contact
          </a>
        </div>
      ) : null}
    </header>
  );
}
