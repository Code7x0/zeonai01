import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import { motion } from "@/lib/motion/tokens";

const ROTATE_PHRASES = [
  "Enterprise AI, grounded in your knowledge.",
  "AI agents built for real workflows.",
  "Intelligent automation with human oversight.",
  "From enterprise knowledge to intelligent action.",
] as const;

type CountSpec = {
  el: HTMLElement;
  target: number;
  decimals: number;
  prefix: string;
  suffix: string;
};

function parseCountEl(el: HTMLElement): CountSpec | null {
  const raw = el.getAttribute("data-zn-count");
  if (raw == null || raw === "") return null;
  const target = Number(raw);
  if (!Number.isFinite(target)) return null;
  return {
    el,
    target,
    decimals: Number(el.getAttribute("data-zn-decimals") ?? "0") || 0,
    prefix: el.getAttribute("data-zn-prefix") ?? "",
    suffix: el.getAttribute("data-zn-suffix") ?? "",
  };
}

function formatCount(spec: CountSpec, value: number) {
  return `${spec.prefix}${value.toFixed(spec.decimals)}${spec.suffix}`;
}

/**
 * Page-level motion for the Stitch homepage: hero entrance, rotating line,
 * scroll reveals, and illustrative metric counters. Demo sequencing stays in stitchDemo.
 */
export function mountStitchMotion(root: HTMLElement): () => void {
  registerGsap();

  const reduced = prefersReducedMotion();
  const ctx = gsap.context(() => {
    const hero = root.querySelector<HTMLElement>(".zn-hero-cohere");
    const consoleEl = root.querySelector<HTMLElement>("#zn-hero-console");
    const rotateEl = root.querySelector<HTMLElement>("[data-zn-rotate]");

    if (reduced) {
      root.classList.add("is-motion-reduced");
      root
        .querySelectorAll<HTMLElement>("[data-zn-motion], [data-zn-reveal], [data-zn-count]")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      return;
    }

    root.classList.add("is-motion-ready");

    /* ——— Hero entrance ——— */
    if (hero) {
      const badge = hero.querySelector<HTMLElement>("[data-zn-motion='badge']");
      const headline = hero.querySelector<HTMLElement>("[data-zn-motion='headline']");
      const sub = hero.querySelector<HTMLElement>("[data-zn-motion='sub']");
      const rotate = hero.querySelector<HTMLElement>("[data-zn-motion='rotate']");
      const cta = hero.querySelector<HTMLElement>("[data-zn-motion='cta']");
      const glow = hero.querySelector<HTMLElement>(".blur-glow-botanical");

      const heroBits = [badge, headline, sub, rotate, cta, consoleEl].filter(
        (n): n is HTMLElement => Boolean(n),
      );

      gsap.set(heroBits, { opacity: 0, y: motion.distance.text });
      if (glow) gsap.set(glow, { opacity: 0, scale: 0.92 });
      if (consoleEl) gsap.set(consoleEl, { y: motion.distance.image, scale: 0.985 });

      const tl = gsap.timeline({
        defaults: { ease: motion.ease, duration: motion.duration.hero },
        delay: 0.08,
      });

      if (glow) {
        tl.to(glow, { opacity: 0.55, scale: 1, duration: 1.1, ease: motion.easeSoft }, 0);
      }
      if (badge) tl.to(badge, { opacity: 1, y: 0, duration: motion.duration.enter }, 0.12);
      if (headline) {
        tl.to(
          headline,
          { opacity: 1, y: 0, duration: motion.duration.hero },
          "-=0.45",
        );
      }
      if (sub) tl.to(sub, { opacity: 1, y: 0, duration: motion.duration.enter }, "-=0.55");
      if (rotate) {
        tl.to(rotate, { opacity: 1, y: 0, duration: motion.duration.enter }, "-=0.5");
      }
      if (cta) {
        tl.to(
          cta,
          { opacity: 1, y: 0, duration: motion.duration.enter, stagger: motion.stagger.tight },
          "-=0.45",
        );
      }
      if (consoleEl) {
        tl.to(
          consoleEl,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.05,
            ease: motion.ease,
            onComplete: () => {
              consoleEl.classList.add("is-motion-revealed");
              ScrollTrigger.refresh();
            },
          },
          "-=0.35",
        );
      }
    }

    /* ——— Rotating hero descriptor ——— */
    if (rotateEl) {
      let index = 0;
      const proxy = { i: 0 };
      const cycle = () => {
        index = (index + 1) % ROTATE_PHRASES.length;
        const next = ROTATE_PHRASES[index]!;
        gsap
          .timeline()
          .to(rotateEl, {
            y: -10,
            opacity: 0,
            filter: "blur(4px)",
            duration: motion.duration.rotate * 0.45,
            ease: motion.easeInOut,
          })
          .add(() => {
            rotateEl.textContent = next;
            proxy.i = index;
          })
          .fromTo(
            rotateEl,
            { y: 10, opacity: 0, filter: "blur(4px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: motion.duration.rotate * 0.55,
              ease: motion.ease,
            },
          );
      };
      let rotateTimer = window.setInterval(() => {
        if (!document.hidden) cycle();
      }, 4200);
      (rotateEl as HTMLElement & { __znRotateCleanup?: () => void }).__znRotateCleanup = () => {
        window.clearInterval(rotateTimer);
        rotateTimer = 0 as unknown as number;
      };
    }

    /* ——— Illustrative metric counters ——— */
    const countEls = Array.from(
      root.querySelectorAll<HTMLElement>("[data-zn-count]"),
    );
    countEls.forEach((el) => {
      const spec = parseCountEl(el);
      if (!spec) return;
      const state = { value: 0 };
      el.textContent = formatCount(spec, 0);
      ScrollTrigger.create({
        trigger: el,
        start: motion.scroll.start,
        once: true,
        onEnter: () => {
          gsap.to(state, {
            value: spec.target,
            duration: motion.duration.counter,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = formatCount(spec, state.value);
            },
            onComplete: () => {
              el.textContent = formatCount(spec, spec.target);
              el.classList.add("is-count-done");
            },
          });
        },
      });
    });

    /* ——— Section reveals (headings + a few peers — not every card) ——— */
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("section[id], .zn-logo-band"),
    ).filter((section) => !section.classList.contains("zn-hero-cohere"));

    sections.forEach((section) => {
      if (section.closest("#zn-hero-console")) return;
      /* Dashboards KPI/panels get Aeonex-style scale motion below */
      if (section.id === "dashboards" || section.id === "industries") return;

      const heading = section.querySelector<HTMLElement>(":scope h2");
      const lead = heading
        ? (heading.parentElement?.querySelector<HTMLElement>("p") ?? null)
        : section.querySelector<HTMLElement>(":scope p");
      const metricCols = section.querySelectorAll<HTMLElement>(":scope .border-l-2");
      const targets: HTMLElement[] = [];
      if (heading) targets.push(heading);
      if (lead && lead !== heading) targets.push(lead);
      metricCols.forEach((c) => targets.push(c));

      /* Product suite / industry grids: first row of cards only */
      section
        .querySelectorAll<HTMLElement>(
          ":scope .grid > .rounded-xl, :scope .grid > button.rounded-xl, :scope [data-zn-reveal]",
        )
        .forEach((c, i) => {
          if (i < 6 && !targets.includes(c)) targets.push(c);
        });

      if (!targets.length) return;

      gsap.set(targets, {
        opacity: 0,
        y: motion.distance.section,
      });

      ScrollTrigger.create({
        trigger: section,
        start: motion.scroll.start,
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: motion.duration.section,
            ease: motion.ease,
            stagger: motion.stagger.base,
            overwrite: "auto",
          });
        },
      });
    });

    /*
     * #dashboards — Aeonex “Built to Power” card motion (reverse-engineered):
     * cards start at scale(0.6) with translateX toward the row center, then
     * scrub to scale(1) / x:0 as the section scrolls into view.
     * https://aeonex.framer.website/ — Capabilities / Built to Power…
     *
     * Uses an explicit section timeline + ScrollTrigger (not per-element
     * fromTo scrub) so Lenis ↔ ST updates reliably after late layout.
     */
    const dash = root.querySelector<HTMLElement>("#dashboards");
    if (dash) {
      const shell = dash.querySelector<HTMLElement>(":scope .max-w-7xl");
      const grids = shell
        ? Array.from(shell.querySelectorAll<HTMLElement>(":scope > .grid"))
        : [];
      const kpiCards = grids[0]
        ? Array.from(grids[0].children).filter(
            (n): n is HTMLElement => n instanceof HTMLElement,
          )
        : [];
      const dashPanels = grids[1]
        ? Array.from(grids[1].children).filter(
            (n): n is HTMLElement => n instanceof HTMLElement,
          )
        : [];
      const headingBits = [
        dash.querySelector<HTMLElement>(":scope .zn-dash-title, :scope h2"),
        dash.querySelector<HTMLElement>(":scope .zn-dash-kicker"),
      ].filter((n): n is HTMLElement => Boolean(n));

      if (headingBits.length) {
        gsap.set(headingBits, { opacity: 0, y: motion.distance.section });
        ScrollTrigger.create({
          trigger: dash,
          start: motion.scroll.start,
          once: true,
          onEnter: () => {
            gsap.to(headingBits, {
              opacity: 1,
              y: 0,
              duration: motion.duration.section,
              ease: motion.ease,
              stagger: motion.stagger.tight,
              overwrite: "auto",
            });
          },
        });
      }

      const narrow = window.matchMedia("(max-width: 767px)").matches;
      const scrubEls = [...kpiCards, ...dashPanels];

      if (scrubEls.length) {
        const setRowFrom = (
          els: HTMLElement[],
          xMax: number,
          yFrom: number,
        ) => {
          const mid = (els.length - 1) / 2;
          els.forEach((el, i) => {
            const xFrom = narrow ? 0 : (mid - i) * xMax;
            gsap.set(el, {
              scale: 0.6,
              x: xFrom,
              y: yFrom,
              opacity: 1,
              transformOrigin: "50% 50%",
              force3D: true,
            });
          });
        };

        /* Aeonex uses ~360px X on ~360px cards — proportionally softer on denser grids */
        setRowFrom(kpiCards, 110, narrow ? 40 : 64);
        setRowFrom(dashPanels, 220, narrow ? 48 : 80);

        const tl = gsap.timeline({ paused: true });

        kpiCards.forEach((el, i) => {
          tl.to(
            el,
            { scale: 1, x: 0, y: 0, duration: 1, ease: "none" },
            i * 0.06,
          );
        });
        dashPanels.forEach((el, i) => {
          tl.to(
            el,
            { scale: 1, x: 0, y: 0, duration: 1, ease: "none" },
            0.2 + i * 0.1,
          );
        });

        ScrollTrigger.create({
          trigger: dash,
          start: "top 88%",
          end: "top 18%",
          scrub: 0.8,
          animation: tl,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        });
      }

      /* Architecture portal + sticky stack change page height after mount */
      const refreshDash = () => ScrollTrigger.refresh();
      requestAnimationFrame(refreshDash);
      window.setTimeout(refreshDash, 120);
      window.setTimeout(refreshDash, 700);
      window.setTimeout(refreshDash, 1600);
    }

    /* ——— Sticky nav subtle scroll state ——— */
    const header = root.querySelector<HTMLElement>("header.sticky");
    if (header) {
      ScrollTrigger.create({
        start: 24,
        onUpdate: (self) => {
          header.classList.toggle("is-scrolled", self.scroll() > 24);
        },
      });
    }

    /* ——— Architecture / industry card hover polish (CSS-owned; light GSAP tap) ——— */
    root.querySelectorAll<HTMLElement>("[data-stitch-arch], [data-stitch-ind]").forEach((btn) => {
      btn.addEventListener("pointerenter", () => {
        if (prefersReducedMotion()) return;
        gsap.to(btn, {
          y: -2,
          duration: motion.duration.micro,
          ease: motion.easeSoft,
          overwrite: "auto",
        });
      });
      btn.addEventListener("pointerleave", () => {
        gsap.to(btn, {
          y: 0,
          duration: motion.duration.micro,
          ease: motion.easeSoft,
          overwrite: "auto",
        });
      });
    });
  }, root);

  return () => {
    const rotateEl = root.querySelector<
      HTMLElement & { __znRotateCleanup?: () => void }
    >("[data-zn-rotate]");
    rotateEl?.__znRotateCleanup?.();
    ctx.revert();
    root.classList.remove("is-motion-ready", "is-motion-reduced");
  };
}
