"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

function refreshScroll(lenis: Lenis) {
  lenis.resize();
  ScrollTrigger.refresh();
}

/**
 * Lenis owns smooth scrolling. GSAP ScrollTrigger syncs via Lenis scroll events.
 * Skipped when prefers-reduced-motion is set.
 *
 * ResizeObserver keeps Lenis/ScrollTrigger in sync when late layout (images,
 * tall sections, pin spacers) changes document height — otherwise scroll can
 * stop mid-page before the footer.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const html = document.documentElement;
    html.classList.add("lenis");
    html.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      /* Slightly snappier — deep-tech instrument feel, still smooth */
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.95,
      autoResize: true,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    let syncRaf = 0;
    const sync = () => {
      if (syncRaf) return;
      syncRaf = window.requestAnimationFrame(() => {
        syncRaf = 0;
        refreshScroll(lenis);
      });
    };

    const onResize = () => sync();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => sync());
    ro.observe(document.body);

    const onImgLoad = () => sync();
    document.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", onImgLoad, { once: true });
    });

    void document.fonts.ready.then(sync);

    // Late layout after GSAP pins / client sections mount
    const t1 = window.setTimeout(sync, 100);
    const t2 = window.setTimeout(sync, 600);
    const t3 = window.setTimeout(sync, 1500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      if (syncRaf) window.cancelAnimationFrame(syncRaf);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      gsap.ticker.remove(ticker);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      html.classList.remove("lenis");
      html.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    const id = window.requestAnimationFrame(() => {
      if (lenis) refreshScroll(lenis);
      else ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
