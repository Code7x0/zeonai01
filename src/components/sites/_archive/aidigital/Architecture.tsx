"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
} from "react";
import { zeonArchitecture } from "@/lib/zeonai/content";
import TextAnimation from "@/components/ui/staggerText";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

/**
 * Flat isometric sheets — exploded / collapsed Y for each layer index.
 * Generous vertical spacing so layers read as suspended planes, not cubes.
 */
const LAYER_Y = [
  { yf: 0, yc: 108 },
  { yf: 78, yc: 126 },
  { yf: 156, yc: 144 },
  { yf: 234, yc: 162 },
  { yf: 312, yc: 180 },
  { yf: 390, yc: 198 },
] as const;

/** Flat rhombus (top plane only — no extruded side walls). */
const RHOMBUS = "100,120 300,24 500,120 300,216";
const RHOMBUS_PATH = "M100 120 L300 24 L500 120 L300 216 Z";

const PIN_MQ = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";
const AUTOPLAY_MS = 3400;
const MANUAL_RESUME_MS = 7000;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function Architecture() {
  const rootId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [opens, setOpens] = useState<number[]>(() => LAYER_Y.map(() => 0));

  const activeRef = useRef(active);
  const manualLockRef = useRef(false);
  const opensRef = useRef<number[]>(LAYER_Y.map(() => 0));
  const resumeTimerRef = useRef<number | null>(null);
  const autoplayRef = useRef<gsap.core.Tween | null>(null);
  const layerTlRef = useRef<gsap.core.Timeline | null>(null);
  const progressBarRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const sectionInView = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return false;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    // Any meaningful overlap with the viewport
    return rect.bottom > vh * 0.12 && rect.top < vh * 0.88;
  }, []);

  const activate = useCallback((idx: number, openPanel = true) => {
    setActive(idx);
    activeRef.current = idx;
    if (openPanel) setOpen(idx);
  }, []);

  const commitOpens = useCallback((next: number[]) => {
    const prev = opensRef.current;
    let changed = prev.length !== next.length;
    if (!changed) {
      for (let i = 0; i < next.length; i++) {
        if (Math.abs(prev[i] - next[i]) > 0.008) {
          changed = true;
          break;
        }
      }
    }
    if (!changed) return;
    opensRef.current = next;
    setOpens(next);
  }, []);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const armManualLock = useCallback(() => {
    manualLockRef.current = true;
    clearResumeTimer();
    resumeTimerRef.current = window.setTimeout(() => {
      manualLockRef.current = false;
      resumeTimerRef.current = null;
    }, MANUAL_RESUME_MS);
  }, [clearResumeTimer]);

  const selectManual = useCallback(
    (idx: number) => {
      if (typeof window !== "undefined" && window.matchMedia(PIN_MQ).matches) {
        armManualLock();
        commitOpens(LAYER_Y.map(() => 1));
      }
      activate(idx, true);
    },
    [activate, armManualLock, commitOpens],
  );

  const toggleAccordion = useCallback(
    (idx: number) => {
      if (typeof window !== "undefined" && window.matchMedia(PIN_MQ).matches) {
        armManualLock();
        commitOpens(LAYER_Y.map(() => 1));
      }
      setActive(idx);
      activeRef.current = idx;
      setOpen((prev) => (prev === idx ? null : idx));
    },
    [armManualLock, commitOpens],
  );

  /* —— Scroll explode + active index (preserved pin model) —— */
  useGSAP(
    () => {
      registerGsap();
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || reduced) {
        commitOpens(LAYER_Y.map(() => 1));
        return;
      }

      const mq = window.matchMedia(PIN_MQ);
      if (!mq.matches) {
        commitOpens(LAYER_Y.map(() => 1));
      }

      const applyProgress = (progress: number) => {
        if (!mq.matches) {
          commitOpens(LAYER_Y.map(() => 1));
          return;
        }

        const sectionRect = section.getBoundingClientRect();
        if (
          manualLockRef.current &&
          (sectionRect.bottom <= 0 || sectionRect.top >= window.innerHeight)
        ) {
          manualLockRef.current = false;
          clearResumeTimer();
          activate(0, true);
        }
        if (manualLockRef.current) return;

        const exploded = clamp01(progress / 0.85) * LAYER_Y.length;
        commitOpens(LAYER_Y.map((_, iso) => clamp01(exploded - iso)));

        const next =
          exploded <= 0
            ? 0
            : Math.min(LAYER_Y.length - 1, Math.ceil(exploded) - 1);
        if (next !== activeRef.current) activate(next, true);
      };

      const st = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
        onRefresh: (self) => applyProgress(self.progress),
      });

      const onMq = () => {
        if (!mq.matches) commitOpens(LAYER_Y.map(() => 1));
        else applyProgress(st.progress);
        ScrollTrigger.refresh();
      };
      mq.addEventListener("change", onMq);
      applyProgress(st.progress);

      return () => {
        mq.removeEventListener("change", onMq);
        st.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [activate, commitOpens, clearResumeTimer, reduced],
    },
  );

  const setProgressBar = useCallback((value: number) => {
    const bar = progressBarRef.current;
    if (bar) bar.style.transform = `scaleX(${clamp01(value)})`;
  }, []);

  /* —— Layer film timeline when active changes —— */
  useGSAP(
    () => {
      registerGsap();
      const root = stackRef.current;
      if (!root) return;

      layerTlRef.current?.kill();
      const layers = root.querySelectorAll<SVGGElement>(".aid-arch-layer");

      layers.forEach((el) => {
        const iso = Number(el.dataset.iso);
        const progress = el.querySelector<SVGPathElement>(".aid-arch-progress");
        const connector = el.querySelector<SVGPathElement>(".aid-arch-connector");
        const num = el.querySelector<SVGTextElement>(".aid-arch-layer-num");
        const callout = el.querySelector<SVGGElement>(".aid-arch-callout");
        const isOn = iso === active;

        gsap.set(el, { "--lift": isOn && !reduced ? 10 : 0 });
        if (progress) {
          const len = progress.getTotalLength() || 1;
          gsap.set(progress, {
            strokeDasharray: len,
            strokeDashoffset: isOn && !reduced ? len : isOn ? 0 : len,
            opacity: isOn ? 1 : 0,
          });
        }
        if (connector) {
          const len = connector.getTotalLength() || 1;
          gsap.set(connector, {
            strokeDasharray: len,
            strokeDashoffset: isOn && !reduced ? len : isOn ? 0 : len,
            opacity: isOn ? 1 : 0.15,
          });
        }
        if (num) {
          gsap.set(num, {
            opacity: isOn ? 1 : 0.28,
            scale: isOn ? 1 : 0.92,
            transformOrigin: "left center",
          });
        }
        if (callout) gsap.set(callout, { opacity: isOn && reduced ? 1 : 0 });
      });

      if (reduced) {
        setProgressBar(1);
        return;
      }

      const activeEl = root.querySelector<SVGGElement>(
        `.aid-arch-layer[data-iso="${active}"]`,
      );
      if (!activeEl) return;

      const progress = activeEl.querySelector<SVGPathElement>(".aid-arch-progress");
      const connector = activeEl.querySelector<SVGPathElement>(".aid-arch-connector");
      const num = activeEl.querySelector<SVGTextElement>(".aid-arch-layer-num");
      const callout = activeEl.querySelector<SVGGElement>(".aid-arch-callout");

      setProgressBar(0);
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onUpdate: () => setProgressBar(tl.progress()),
      });
      layerTlRef.current = tl;

      tl.to(activeEl, { "--lift": 14, duration: 0.45 }, 0);
      if (num) {
        tl.fromTo(
          num,
          { opacity: 0.35, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.4 },
          0.05,
        );
      }
      if (progress) {
        const len = progress.getTotalLength() || 1;
        tl.fromTo(
          progress,
          { strokeDasharray: len, strokeDashoffset: len, opacity: 1 },
          { strokeDashoffset: 0, duration: 0.85, ease: "power1.inOut" },
          0.08,
        );
      }
      if (connector) {
        const len = connector.getTotalLength() || 1;
        tl.fromTo(
          connector,
          { strokeDasharray: len, strokeDashoffset: len, opacity: 0.4 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.4 },
          0.28,
        );
      }
      if (callout) {
        tl.fromTo(
          callout,
          { opacity: 0 },
          { opacity: 1, duration: 0.35 },
          0.4,
        );
      }

      return () => {
        tl.kill();
      };
    },
    { scope: stackRef, dependencies: [active, reduced, setProgressBar] },
  );

  /* —— Idle autoplay while section overlaps the viewport —— */
  useEffect(() => {
    if (reduced) return;

    const tick = () => {
      if (manualLockRef.current || !sectionInView()) return;
      const desktopPin = window.matchMedia(PIN_MQ).matches;
      // On desktop pin, only autoplay once the stack is fully exploded —
      // scroll owns the active index during the open sequence.
      if (desktopPin) {
        const fullyOpen = opensRef.current.every((o) => o > 0.95);
        if (!fullyOpen) return;
      }
      const next = (activeRef.current + 1) % LAYER_Y.length;
      activate(next, true);
    };

    autoplayRef.current?.kill();
    autoplayRef.current = gsap.delayedCall(AUTOPLAY_MS / 1000, function loop() {
      tick();
      autoplayRef.current = gsap.delayedCall(AUTOPLAY_MS / 1000, loop);
    });

    return () => {
      autoplayRef.current?.kill();
      autoplayRef.current = null;
      clearResumeTimer();
    };
  }, [activate, clearResumeTimer, reduced, sectionInView]);

  const onLayerKey = (idx: number, e: ReactKeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectManual(idx);
    }
  };

  const layers = zeonArchitecture.layers;

  return (
    <section
      id={zeonArchitecture.id}
      ref={sectionRef}
      className="aid-architecture"
      aria-labelledby={`${rootId}-title`}
      data-platform
    >
      <div ref={trackRef} className="aid-arch-pin-track" data-pin>
        <div className="aid-arch-pin-stage">
          <div className="aid-container aid-arch-grid">
            <div className="aid-arch-intro">
              <h2
                id={`${rootId}-title`}
                className="aid-heading aid-arch-title text-[var(--aid-blue)]"
              >
                <TextAnimation divideBy="word">
                  {zeonArchitecture.title}
                </TextAnimation>
              </h2>
              <p className="aid-arch-lead">{zeonArchitecture.lead}</p>
              <p className="aid-arch-note">{zeonArchitecture.note}</p>
              {!reduced ? (
                <p className="aid-arch-hint">{zeonArchitecture.instruction}</p>
              ) : null}
            </div>

            <div className="aid-arch-diagram">
              <ArchitectureStack
                ref={stackRef}
                active={active}
                hover={hover}
                opens={opens}
                reduced={reduced}
                onSelect={selectManual}
                onHover={setHover}
                onKey={onLayerKey}
              />
            </div>

            <ul className="aid-arch-acc">
              {layers.map((layer, idx) => {
                const panelId = `${rootId}-panel-${idx}`;
                const btnId = `${rootId}-btn-${idx}`;
                const isOpen = open === idx;
                const isActive = active === idx;
                return (
                  <li
                    key={layer.num}
                    className={`aid-arch-acc-item${isActive ? " is-active" : ""}`}
                  >
                    <button
                      type="button"
                      id={btnId}
                      className="aid-arch-acc-btn"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      data-acc-btn={idx}
                      onClick={() => toggleAccordion(idx)}
                    >
                      <span className="aid-arch-acc-num">{layer.num}</span>
                      <span className="aid-arch-acc-label">{layer.title}</span>
                      <span className="aid-arch-acc-icon" aria-hidden>
                        <span />
                        <span />
                      </span>
                    </button>
                    {isActive ? (
                      <span
                        ref={progressBarRef}
                        className="aid-arch-acc-progress"
                        aria-hidden
                        style={{ transform: "scaleX(0)" }}
                      />
                    ) : null}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className="aid-arch-acc-panel"
                      hidden={!isOpen}
                    >
                      <p>{layer.body}</p>
                      <dl className="aid-arch-points">
                        {layer.points.map((point) => (
                          <div key={point.label}>
                            <dt>{point.label}</dt>
                            <dd>{point.detail}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

type StackProps = {
  active: number;
  hover: number | null;
  opens: number[];
  reduced: boolean;
  onSelect: (idx: number) => void;
  onHover: (idx: number | null) => void;
  onKey: (idx: number, e: ReactKeyboardEvent) => void;
  ref: Ref<SVGSVGElement>;
};

function ArchitectureStack({
  active,
  hover,
  opens,
  reduced,
  onSelect,
  onHover,
  onKey,
  ref,
}: StackProps) {
  const layers = zeonArchitecture.layers;
  // Paint top of stack first (06), bottom last (01)
  const order = [5, 4, 3, 2, 1, 0];

  return (
    <svg
      ref={ref}
      className="aid-arch-stack"
      viewBox="0 0 640 620"
      role="group"
      aria-label="The platform as six layers. Choose a layer to open its entry below."
      data-stack
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {order.map((iso) => {
          const layer = layers[iso];
          const y = LAYER_Y[iso];
          const isActive = active === iso;
          const isHover = hover === iso && hover !== active;
          return (
            <g
              key={layer.num}
              className={`aid-arch-layer${isActive ? " is-active" : ""}${isHover ? " is-hover" : ""}`}
              data-iso={iso}
              role="button"
              tabIndex={0}
              aria-label={`${Number(layer.num)}. ${layer.title}`}
              aria-pressed={isActive}
              style={
                {
                  "--yf": y.yf,
                  "--yc": y.yc,
                  "--o": opens[iso] ?? (reduced ? 1 : 0),
                } as CSSProperties
              }
              onClick={() => onSelect(iso)}
              onKeyDown={(e) => onKey(iso, e)}
              onMouseEnter={() => onHover(iso)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(iso)}
              onBlur={() => onHover(null)}
            >
              {/* Flat sheet — stroke outline only */}
              <polygon className="aid-arch-plane" points={RHOMBUS} />
              {/* Progress draw along the active plane */}
              <path className="aid-arch-progress" d={RHOMBUS_PATH} />
              {/* Number + connector on the left */}
              <path className="aid-arch-connector" d="M64 120 H100" />
              <text
                className="aid-arch-layer-num"
                x="18"
                y="130"
                textAnchor="start"
              >
                {layer.num}
              </text>
              {/* Title sits under the sheet — never diagonal across the face */}
              <text
                className="aid-arch-layer-label"
                x="300"
                y="246"
                textAnchor="middle"
              >
                {layer.title}
              </text>
              <g className="aid-arch-callout">
                <path d="M508 120 H534" />
                <text x="542" y="124">
                  {layer.callout}
                </text>
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
