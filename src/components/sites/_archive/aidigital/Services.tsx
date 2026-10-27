"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { zeonCapabilities } from "@/lib/zeonai/content";
import TextAnimation from "@/components/ui/staggerText";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";
import { CapabilityStage } from "./CapabilityStage";

const AUTOPLAY_MS = 5800;
const MANUAL_RESUME_MS = 10000;
const modules = zeonCapabilities.modules;

/**
 * Editorial Swiss composition: index + headline band, numbered rail,
 * light product canvas. Interaction model preserved; silhouette redesigned.
 */
export function Services() {
  const rootId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const connectorRef = useRef<SVGPathElement>(null);
  const stageColRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<gsap.core.Tween | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const manualLockRef = useRef(false);
  const activeRef = useRef(0);

  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const clearResume = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const armManual = useCallback(() => {
    manualLockRef.current = true;
    clearResume();
    resumeTimerRef.current = window.setTimeout(() => {
      manualLockRef.current = false;
      resumeTimerRef.current = null;
    }, MANUAL_RESUME_MS);
  }, [clearResume]);

  const select = useCallback(
    (idx: number, fromManual = true) => {
      if (idx < 0 || idx >= modules.length) return;
      if (fromManual) {
        /* Keep Pause sticky; only delay autoplay if not paused */
        armManual();
      }
      setActive(idx);
    },
    [armManual],
  );

  const layoutChrome = useCallback(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const connector = connectorRef.current;
    const stageCol = stageColRef.current;
    if (!nav || !indicator) return;

    const btn = nav.querySelector<HTMLElement>(
      `[data-cap-idx="${activeRef.current}"]`,
    );
    if (!btn) return;

    const navBox = nav.getBoundingClientRect();
    const btnBox = btn.getBoundingClientRect();
    const top = btnBox.top - navBox.top + nav.scrollTop;
    /* Bottom progress rule — same language as Architecture accordion */
    const barY = top + btnBox.height - 1.5;

    registerGsap();
    if (reduced) {
      gsap.set(indicator, { y: barY, opacity: 1, scaleX: 1 });
    } else {
      gsap.fromTo(
        indicator,
        { scaleX: 0.35, opacity: 0.85 },
        {
          y: barY,
          scaleX: 1,
          opacity: 1,
          duration: 0.38,
          ease: "power2.out",
          overwrite: true,
        },
      );
    }

    /* Desktop connector: rail item mid → stage chrome (SVG space) */
    if (connector && stageCol && window.matchMedia("(min-width: 1024px)").matches) {
      const stageBox = stageCol.getBoundingClientRect();
      const svg = connector.ownerSVGElement;
      if (!svg) return;
      const svgBox = svg.getBoundingClientRect();
      if (svgBox.width < 8 || svgBox.height < 8) return;

      const x1 = navBox.right - svgBox.left + 2;
      const y1 = btnBox.top + btnBox.height / 2 - svgBox.top;
      const x2 = stageBox.left - svgBox.left;
      const y2 = Math.min(
        Math.max(28, stageBox.top - svgBox.top + 36),
        svgBox.height - 28,
      );
      const cx = x1 + (x2 - x1) * 0.55;
      const d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${cx.toFixed(1)} ${y1.toFixed(1)}, ${cx.toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;

      connector.setAttribute("d", d);
      const L = Math.max(connector.getTotalLength() || 0, 1);

      if (reduced) {
        gsap.set(connector, {
          strokeDasharray: L,
          strokeDashoffset: 0,
          opacity: 0.5,
        });
      } else {
        gsap.fromTo(
          connector,
          { strokeDasharray: L, strokeDashoffset: L, opacity: 0.5 },
          {
            strokeDashoffset: 0,
            duration: 0.42,
            ease: "power2.out",
            overwrite: true,
          },
        );
      }
    }
  }, [reduced]);

  useEffect(() => {
    layoutChrome();
    const btn = navRef.current?.querySelector<HTMLElement>(
      `[data-cap-idx="${active}"]`,
    );
    btn?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, layoutChrome, reduced]);

  useEffect(() => {
    const onResize = () => layoutChrome();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [layoutChrome]);

  useEffect(() => {
    if (reduced || paused) {
      autoplayRef.current?.kill();
      autoplayRef.current = null;
      return;
    }
    registerGsap();
    const inView = () => {
      const el = sectionRef.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      return rect.bottom > vh * 0.15 && rect.top < vh * 0.85;
    };
    const tick = () => {
      if (manualLockRef.current || !inView()) return;
      select((activeRef.current + 1) % modules.length, false);
    };
    autoplayRef.current?.kill();
    autoplayRef.current = gsap.delayedCall(AUTOPLAY_MS / 1000, function loop() {
      tick();
      autoplayRef.current = gsap.delayedCall(AUTOPLAY_MS / 1000, loop);
    });
    return () => {
      autoplayRef.current?.kill();
      autoplayRef.current = null;
      clearResume();
    };
  }, [clearResume, paused, reduced, select]);

  const onNavKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      select((active + 1) % modules.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      select((active - 1 + modules.length) % modules.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
    } else if (e.key === "End") {
      e.preventDefault();
      select(modules.length - 1);
    }
  };

  const current = modules[active];

  return (
    <section
      id={zeonCapabilities.id}
      ref={sectionRef}
      className="aid-capabilities aid-obs"
      aria-labelledby={`${rootId}-title`}
      data-reduced={reduced ? "true" : undefined}
    >
      <div className="aid-container aid-obs-shell">
        {/* Intro stack — same hierarchy as Architecture */}
        <header className="aid-obs-intro">
          <h2
            id={`${rootId}-title`}
            className="aid-heading aid-obs-title text-[var(--aid-blue)]"
          >
            <TextAnimation divideBy="word">
              {zeonCapabilities.title}
            </TextAnimation>
          </h2>
          <p className="aid-obs-lead">{zeonCapabilities.lead}</p>
          {!reduced ? (
            <p className="aid-obs-hint">{zeonCapabilities.hint}</p>
          ) : null}
        </header>

        <div className="aid-obs-board">
          <svg
            className="aid-obs-connector"
            aria-hidden
            focusable="false"
          >
            <path ref={connectorRef} className="aid-obs-connector-path" d="M0 0" />
          </svg>

          <aside className="aid-obs-rail">
            <div
              ref={navRef}
              className="aid-obs-nav"
              role="tablist"
              aria-orientation="vertical"
              aria-label="Capabilities: choose an item"
              onKeyDown={onNavKey}
            >
              <span
                ref={indicatorRef}
                className="aid-obs-indicator"
                aria-hidden
              />
              {modules.map((mod, idx) => {
                const selected = idx === active;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    role="tab"
                    id={`${rootId}-tab-${mod.id}`}
                    aria-selected={selected}
                    aria-controls={`${rootId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    data-cap-idx={idx}
                    className={`aid-obs-item${selected ? " is-active" : ""}`}
                    onClick={() => select(idx)}
                  >
                    <span className="aid-obs-item-num" aria-hidden>
                      {mod.num}
                    </span>
                    <span className="aid-obs-item-title">{mod.title}</span>
                  </button>
                );
              })}
            </div>

            {!reduced ? (
              <button
                type="button"
                className="aid-obs-pause"
                aria-pressed={paused}
                onClick={() => {
                  setPaused((p) => !p);
                  if (!paused) armManual();
                }}
              >
                {paused ? "Resume" : "Pause"}
              </button>
            ) : null}
          </aside>

          <div className="aid-obs-canvas" ref={stageColRef}>
            <div
              id={`${rootId}-panel`}
              role="tabpanel"
              aria-labelledby={`${rootId}-tab-${current.id}`}
              className="aid-obs-panel"
            >
              <CapabilityStage
                key={current.id}
                kind={current.visual}
                title={current.title}
              />
              <div className="aid-obs-readout" key={`r-${current.id}`}>
                <p className="aid-obs-active-body">{current.body}</p>
                <ul className="aid-obs-bullets">
                  {current.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
