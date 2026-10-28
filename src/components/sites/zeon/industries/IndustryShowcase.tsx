"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { indData } from "../stitch/stitchData";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import "./industry.css";

const LABELS = [
  "Mining & Heavy Operations",
  "Financial Services & Lending",
  "Construction & Property",
  "Superannuation & Asset Mgmt",
  "Public Sector & Classified",
] as const;

const N = LABELS.length;

const TAGLINES = [
  "Less paperwork between the site and the finance team.",
  "Faster underwriting with policy and custody still intact.",
  "Leases, claims, and variations held for human checkpoints.",
  "Bank files matched to members before the ledger posts.",
  "Sovereign discovery with need-to-know clearance built in.",
] as const;

function pipeLabel(step: string) {
  return step.replace(/^\d+\s*/, "");
}

function IndustryDashboard({
  index,
  swapKey,
}: {
  index: number;
  swapKey: number;
}) {
  const data = indData[index];
  if (!data) return null;
  const sector = String(index + 1).padStart(2, "0");

  return (
    <div className="zn-ind-dash is-swap" key={swapKey} aria-live="polite">
      <article className="zn-ind-primary">
        <header className="zn-ind-pane-bar">
          <span className="zn-ind-pane-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="zn-ind-pane-path">
            sector/{sector}/overview
          </span>
          <span className="zn-ind-pane-live">live</span>
        </header>

        <div className="zn-ind-primary-main">
          <p className="zn-ind-primary-eyebrow">
            $ open --workspace regulated
          </p>
          <h3 className="zn-ind-primary-title">{data.title}</h3>
          <p className="zn-ind-primary-tag">{TAGLINES[index] ?? data.desc}</p>

          <div className="zn-ind-pipe-board" aria-label="Pipeline stages">
            {data.pipeline.map((step, i) => (
              <div key={step} className="zn-ind-pipe-node">
                {i > 0 ? <span className="zn-ind-pipe-link" aria-hidden /> : null}
                <div className={`zn-ind-pipe-box${i === 0 ? " is-live" : ""}`}>
                  <span className="zn-ind-pipe-idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="zn-ind-pipe-name">{pipeLabel(step)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="zn-ind-primary-foot">
          <span>Runs on AI Workspace — Agent Hub</span>
          <span className="zn-ind-primary-cursor" aria-hidden />
        </footer>
      </article>

      <div className="zn-ind-panels">
        {data.cards.map((card, i) => (
          <article key={card.title} className="zn-ind-panel">
            <header className="zn-ind-pane-bar">
              <span className="zn-ind-pane-path">
                agent/AG-{String(i + 1).padStart(2, "0")}
              </span>
              <span className="zn-ind-pane-live">
                {i === 0 ? "running" : i < 3 ? "ready" : "idle"}
              </span>
            </header>
            <div className="zn-ind-panel-body">
              <h4 className="zn-ind-panel-title">{card.title}</h4>
              <p className="zn-ind-panel-desc">{card.desc}</p>
            </div>
            <footer className="zn-ind-panel-foot">
              <span>$ agent-hub attach</span>
              <span className="zn-ind-panel-prompt" aria-hidden>
                ▍
              </span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}

type LenisLike = {
  scroll: number;
  resize?: () => void;
  on: (event: "scroll", handler: () => void) => void;
  off: (event: "scroll", handler: () => void) => void;
  scrollTo: (
    target: HTMLElement | number,
    opts?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
      easing?: (t: number) => number;
    },
  ) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function isDesktop() {
  return !window.matchMedia("(max-width: 1023px)").matches;
}

/**
 * 04 · Regulated sectors — reference layout (feature + 2×2) as white terminal dashboards.
 * Desktop stay-window scrolls all 5; mobile click-swap.
 */
export function IndustryShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [swapKey, setSwapKey] = useState(0);
  const activeRef = useRef(0);
  const clickingRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncFromScroll = () => {
      if (clickingRef.current || !isDesktop()) return;

      const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
      const scrollY = lenis?.scroll ?? window.scrollY;
      const trackTop = track.getBoundingClientRect().top + scrollY;
      const range = Math.max(1, track.offsetHeight - window.innerHeight);
      const scrolled = clamp(scrollY - trackTop, 0, range);
      const next = clamp(Math.floor(scrolled / range * N + 1e-4), 0, N - 1);

      if (next === activeRef.current) return;
      activeRef.current = next;
      setActive(next);
      setSwapKey((k) => k + 1);
    };

    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    const refreshLenis = () => lenis?.resize?.();
    refreshLenis();
    const t1 = window.setTimeout(refreshLenis, 120);
    const t2 = window.setTimeout(refreshLenis, 700);

    window.addEventListener("scroll", syncFromScroll, { passive: true });
    lenis?.on("scroll", syncFromScroll);
    syncFromScroll();

    const ro = new ResizeObserver(() => {
      refreshLenis();
      syncFromScroll();
    });
    ro.observe(track);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", syncFromScroll);
      lenis?.off("scroll", syncFromScroll);
      ro.disconnect();
    };
  }, []);

  const onLabelClick = (index: number) => {
    activeRef.current = index;
    setActive(index);
    setSwapKey((k) => k + 1);

    if (!isDesktop()) {
      labelRefs.current[index]?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    clickingRef.current = true;
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    const scrollY = lenis?.scroll ?? window.scrollY;
    const range = Math.max(1, track.offsetHeight - window.innerHeight);
    const targetY =
      track.getBoundingClientRect().top +
      scrollY +
      ((index + 0.35) / N) * range;

    const reduced = prefersReducedMotion();
    if (lenis && !reduced) {
      lenis.scrollTo(targetY, {
        duration: 0.95,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: reduced ? "auto" : "smooth",
      });
    }

    window.setTimeout(() => {
      clickingRef.current = false;
    }, 1100);
  };

  return (
    <section className="zn-ind" aria-labelledby="zn-ind-heading">
      <div
        ref={trackRef}
        className="zn-ind-track"
        style={{ "--ind-n": N } as CSSProperties}
      >
        <div className="zn-ind-pin">
          <header className="zn-ind-intro">
            <p className="zn-ind-kicker">04 · Regulated sectors</p>
            <h2 id="zn-ind-heading" className="zn-ind-title">
              Workspaces across regulated industries
            </h2>
            <p className="zn-ind-lead">
              Pre-configured agent portfolios and deterministic pipelines
              tailored for mission-critical audit regimes across both private
              and sovereign deployments.
            </p>
          </header>

          <div
            className="zn-ind-tabs"
            role="tablist"
            aria-label="Industry sectors"
          >
            {LABELS.map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active === i}
                id={`zn-ind-tab-${i}`}
                aria-controls="zn-ind-dash-panel"
                ref={(node) => {
                  labelRefs.current[i] = node;
                }}
                className={`zn-ind-tab${active === i ? " is-active" : ""}`}
                onClick={() => onLabelClick(i)}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            id="zn-ind-dash-panel"
            role="tabpanel"
            aria-labelledby={`zn-ind-tab-${active}`}
          >
            <IndustryDashboard index={active} swapKey={swapKey} />
          </div>
        </div>
      </div>
    </section>
  );
}
