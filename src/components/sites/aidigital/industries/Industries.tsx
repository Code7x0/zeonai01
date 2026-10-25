"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type Lenis from "lenis";
import { zeonIndustries } from "@/lib/zeonai/content";
import {
  gsap,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";
import { AgentVisual } from "./AgentVisual";
import { SectorSteps } from "./SectorSteps";

const sectors = zeonIndustries.sectors;
const LAST = sectors.length - 1;

function getLenis(): Lenis | undefined {
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

/**
 * Section 04 — scroll-pinned industry portfolio (after Engineering).
 * Lenis + ScrollTrigger advance sectors 01→06 while the stage is pinned.
 */
export function Industries() {
  const titleId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const lockRef = useRef(false);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const sector = sectors[active];

  const applyActive = useCallback((idx: number) => {
    const next = Math.max(0, Math.min(LAST, idx));
    if (next === activeRef.current) return;
    activeRef.current = next;
    setActive(next);
  }, []);

  const moveIndicator = useCallback(() => {
    const list = tablistRef.current;
    const ind = indicatorRef.current;
    if (!list || !ind) return;
    const btn = list.querySelector<HTMLElement>(
      `[data-ind-idx="${activeRef.current}"]`,
    );
    if (!btn) return;
    const listBox = list.getBoundingClientRect();
    const btnBox = btn.getBoundingClientRect();
    const x = btnBox.left - listBox.left + list.scrollLeft;
    const w = btnBox.width;

    registerGsap();
    if (reduced) {
      gsap.set(ind, { x, width: w, opacity: 1 });
    } else {
      gsap.to(ind, {
        x,
        width: w,
        opacity: 1,
        duration: 0.32,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [reduced]);

  useEffect(() => {
    moveIndicator();
    const btn = tablistRef.current?.querySelector<HTMLElement>(
      `[data-ind-idx="${active}"]`,
    );
    btn?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, moveIndicator, reduced]);

  useEffect(() => {
    const onResize = () => moveIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [moveIndicator]);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) return;

      gsap.from(root.querySelectorAll("[data-ind-intro]"), {
        opacity: reduced ? 1 : 0,
        y: reduced ? 0 : 16,
        stagger: 0.06,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
        },
      });

      if (reduced) return;

      const mm = gsap.matchMedia();
      /* Pin from tablet up so sector scrub isn't desktop-only */
      mm.add("(min-width: 700px)", () => {
        const st = ScrollTrigger.create({
          id: "industries-pin",
          trigger: root,
          start: "top top",
          end: () =>
            `+=${Math.round(window.innerHeight * sectors.length * 0.72)}`,
          pin: stage,
          pinSpacing: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,
          onUpdate: (self) => {
            if (lockRef.current) return;
            const idx =
              self.progress >= 0.995
                ? LAST
                : Math.round(self.progress * LAST);
            applyActive(idx);
          },
          snap: {
            snapTo: 1 / LAST,
            duration: { min: 0.12, max: 0.35 },
            delay: 0.02,
            ease: "power1.inOut",
          },
        });
        stRef.current = st;
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          getLenis()?.resize();
        });

        return () => {
          st.kill();
          stRef.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reduced, applyActive] },
  );

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    registerGsap();
    if (reduced) {
      gsap.set(panel.querySelectorAll("[data-ind-fade]"), {
        opacity: 1,
        y: 0,
      });
      return;
    }
    const items = panel.querySelectorAll("[data-ind-fade]");
    gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.36,
        stagger: 0.04,
        ease: "power2.out",
        overwrite: true,
      },
    );
  }, [active, reduced]);

  const scrollToSector = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(LAST, idx));
      applyActive(next);
      const st = stRef.current;
      if (!st || reduced) return;

      lockRef.current = true;
      const progress = LAST === 0 ? 0 : next / LAST;
      const y = st.start + (st.end - st.start) * progress;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(y, { duration: 0.95, offset: 0 });
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      window.setTimeout(() => {
        lockRef.current = false;
      }, 1100);
    },
    [applyActive, reduced],
  );

  const select = (idx: number) => {
    if (stRef.current && !reduced) scrollToSector(idx);
    else applyActive(idx);
  };

  const onTabKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = Math.min(LAST, active + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = Math.max(0, active - 1);
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = LAST;
    } else {
      return;
    }
    e.preventDefault();
    select(next);
    requestAnimationFrame(() => {
      tablistRef.current
        ?.querySelector<HTMLElement>(`[data-ind-idx="${next}"]`)
        ?.focus();
    });
  };

  const progressLabel = `${String(active + 1).padStart(2, "0")} / ${String(sectors.length).padStart(2, "0")}`;

  return (
    <section
      ref={rootRef}
      id={zeonIndustries.id}
      className="aid-ind"
      aria-labelledby={titleId}
    >
      <div ref={stageRef} className="aid-ind-stage">
        <div className="aid-container aid-ind-inner">
          <header className="aid-ind-intro">
            <div className="aid-ind-intro-row" data-ind-intro>
              <p className="aid-ind-eyebrow">{zeonIndustries.eyebrow}</p>
              <p className="aid-ind-progress" aria-live="polite">
                {progressLabel}
              </p>
            </div>
            <h2
              id={titleId}
              className="aid-heading aid-ind-title"
              data-ind-intro
            >
              {zeonIndustries.title}
            </h2>
            <p className="aid-ind-lead" data-ind-intro>
              {zeonIndustries.lead}
            </p>
          </header>

          <div className="aid-ind-divider" aria-hidden data-ind-intro />

          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Industry sectors"
            className="aid-ind-tabs"
            onKeyDown={onTabKey}
          >
            <span
              ref={indicatorRef}
              className="aid-ind-tab-indicator"
              aria-hidden
            />
            {sectors.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`tab-${s.id}`}
                  data-ind-idx={i}
                  aria-selected={selected}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={`aid-ind-tab${selected ? " is-active" : ""}`}
                  onClick={() => select(i)}
                >
                  {s.title}
                </button>
              );
            })}
          </div>

          <div
            ref={panelRef}
            role="tabpanel"
            id={`panel-${sector.id}`}
            aria-labelledby={`tab-${sector.id}`}
            className="aid-ind-bento"
          >
            <article className="aid-ind-lead-panel" data-ind-fade>
              <p className="aid-ind-sector-kicker">Sector focus</p>
              <h3 className="aid-ind-sector-title">{sector.title}</h3>
              <p className="aid-ind-sector-body">{sector.body}</p>
              <SectorSteps steps={sector.steps} />
              <p className="aid-ind-runs">Runs on {sector.runsOn}</p>
            </article>

            <ul className="aid-ind-tiles">
              {sector.agents.map((agent) => (
                <li key={agent.name} className="aid-ind-tile" data-ind-fade>
                  <div className="aid-ind-tile-viz">
                    <AgentVisual kind={agent.visual} label={agent.name} />
                  </div>
                  <div className="aid-ind-tile-copy">
                    <h4>{agent.name}</h4>
                    <p>{agent.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ol className="aid-ind-dots" aria-hidden>
            {sectors.map((s, i) => (
              <li key={s.id} className={i === active ? "is-active" : ""} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
