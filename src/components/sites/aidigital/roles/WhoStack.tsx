"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { ScrollTrigger } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

function getLenis(): Lenis | undefined {
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function clamp01(n: number) {
  return clamp(n, 0, 1);
}

function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

const HOLD_VH = 0.7;

/**
 * Bury underlay as the next panel covers it.
 * Opacity goes fully to 0 so nothing (esp. Governance blue) peeks through.
 * Scroll back restores smoothly via the same progress.
 */
function bury(eased: number) {
  const t = clamp01(eased);
  return {
    scale: 1 - t * 0.04,
    y: t * -0.7,
    opacity: 1 - t,
    brightness: 1 - t * 0.12,
    blur: t * 1.5,
  };
}

function applyBury(
  el: HTMLElement,
  state: ReturnType<typeof bury> | null,
  yMode: "px" | "vh",
  extraYpx = 0,
) {
  if (!state || state.opacity >= 0.995) {
    el.style.opacity = "1";
    el.style.filter = "none";
    el.style.transform = extraYpx ? `translate3d(0, ${extraYpx}px, 0)` : "none";
    el.style.visibility = "visible";
    el.style.pointerEvents = "";
    return;
  }

  el.style.transformOrigin = "50% 0%";
  const y =
    yMode === "px"
      ? `${(extraYpx + (state.y / 100) * (window.innerHeight || 1)).toFixed(1)}px`
      : `${state.y.toFixed(2)}vh`;
  el.style.transform = `translate3d(0, ${y}, 0) scale(${state.scale.toFixed(4)})`;
  el.style.opacity = state.opacity.toFixed(3);
  el.style.filter = `brightness(${state.brightness.toFixed(3)}) blur(${state.blur.toFixed(2)}px)`;
  el.style.visibility = state.opacity < 0.02 ? "hidden" : "visible";
  el.style.pointerEvents = state.opacity < 0.15 ? "none" : "";
}

/**
 * Stack: Who covers Governance (Governance disappears).
 * Book a demo covers Who (Who disappears; Governance stays gone).
 * Scroll up restores each layer smoothly.
 */
export function WhoStack({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rise = root.querySelector<HTMLElement>(".aid-trust-rise");
    const panel = rise?.querySelector<HTMLElement>(".aid-trust-panel");
    const runway = root.querySelector<HTMLElement>(".aid-gov-runway");
    const whoChapter = root.querySelector<HTMLElement>(".aid-who-chapter");
    const afterWho = root.querySelector<HTMLElement>(".aid-after-who");
    const demo = root.querySelector<HTMLElement>(".aid-demo");
    const who =
      root.querySelector<HTMLElement>("#who") ??
      whoChapter?.querySelector<HTMLElement>("section");
    const rolesPanel = who?.querySelector<HTMLElement>(".aid-roles-panel");

    if (!rise || !panel || !runway || !whoChapter || !who) return;

    let maxShift = 0;

    const measure = () => {
      const vh = window.innerHeight || 1;
      const prev = panel.style.transform;
      panel.style.transform = "none";
      const contentH = panel.scrollHeight;
      panel.style.transform = prev;

      maxShift = Math.max(0, contentH - vh);
      runway.style.height = `${Math.round(maxShift + vh * HOLD_VH)}px`;
      root.style.setProperty("--gov-max-shift", `${maxShift}px`);
    };

    const clearAll = () => {
      panel.style.transform = "";
      for (const el of [rise, who, rolesPanel]) {
        if (!el) continue;
        el.style.opacity = "";
        el.style.filter = "";
        el.style.transform = "";
        el.style.visibility = "";
        el.style.pointerEvents = "";
        el.style.transformOrigin = "";
      }
    };

    const sync = () => {
      const vh = window.innerHeight || 1;

      if (reduced) {
        clearAll();
        root.style.setProperty("--who-cover", "0");
        root.style.setProperty("--who-settle", "1");
        root.style.setProperty("--after-cover", "0");
        root.style.setProperty("--gov-shift", "0");
        who.classList.add("is-settled");
        demo?.classList.add("is-settled");
        return;
      }

      const runwayTop = runway.getBoundingClientRect().top;
      const shift = clamp(vh - runwayTop, 0, maxShift);
      root.style.setProperty("--gov-shift", shift.toFixed(1));

      const chapterTop = whoChapter.getBoundingClientRect().top;
      const whoCover = clamp01(1 - chapterTop / vh);

      const coverEl = demo ?? afterWho;
      const afterTop = coverEl
        ? coverEl.getBoundingClientRect().top
        : vh + 1;
      const afterCover = coverEl ? clamp01(1 - afterTop / vh) : 0;

      // Once Demo starts covering, keep Governance fully gone (no blue peek)
      const govHide = smoothstep(Math.max(whoCover, afterCover));
      const whoHide = smoothstep(afterCover);

      const govBury = bury(govHide);
      const whoBury = bury(whoHide);

      // Scrub Governance content inside the sticky frame
      panel.style.transform = `translate3d(0, ${(-shift).toFixed(1)}px, 0)`;

      // Bury the entire sticky blue frame (not just inner panel) so blue never peeks
      applyBury(rise, govHide <= 0.01 ? null : govBury, "vh");

      // Bury Who as Demo covers — whole section, so nothing shows through
      applyBury(who, whoHide <= 0.01 ? null : whoBury, "vh");
      if (rolesPanel && whoHide <= 0.01) {
        rolesPanel.style.opacity = "";
        rolesPanel.style.filter = "";
        rolesPanel.style.transform = "";
        rolesPanel.style.visibility = "";
      }

      const whoTop = who.getBoundingClientRect().top;
      const settle =
        whoTop >= vh * 0.45
          ? 0
          : whoTop <= 1
            ? 1
            : clamp01(1 - whoTop / (vh * 0.45));

      root.style.setProperty("--who-cover", whoCover.toFixed(3));
      root.style.setProperty("--who-settle", settle.toFixed(3));
      root.style.setProperty("--after-cover", afterCover.toFixed(3));
      who.classList.toggle("is-settled", settle >= 0.98 && whoHide < 0.5);

      if (afterWho) {
        afterWho.style.setProperty("--after-cover", afterCover.toFixed(3));
      }
      if (demo) {
        const s = afterCover.toFixed(3);
        demo.style.setProperty("--after-cover", s);
        demo
          .querySelector<HTMLElement>(".aid-demo-panel")
          ?.style.setProperty("--after-cover", s);
        demo
          .querySelector<HTMLElement>(".aid-demo-shell")
          ?.style.setProperty("--after-cover", s);
        demo.classList.toggle("is-settled", afterCover >= 0.98);
      }
    };

    measure();
    sync();

    const onResize = () => {
      measure();
      sync();
      ScrollTrigger.refresh();
      getLenis()?.resize();
    };

    const refresh = window.setTimeout(() => {
      measure();
      sync();
      ScrollTrigger.refresh();
      getLenis()?.resize();
    }, 200);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => onResize())
        : null;
    ro?.observe(panel);

    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", sync);
      window.addEventListener("resize", onResize, { passive: true });
      return () => {
        window.clearTimeout(refresh);
        lenis.off("scroll", sync);
        window.removeEventListener("resize", onResize);
        ro?.disconnect();
        clearAll();
      };
    }

    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.clearTimeout(refresh);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      clearAll();
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="aid-who-stack">
      {children}
    </div>
  );
}
