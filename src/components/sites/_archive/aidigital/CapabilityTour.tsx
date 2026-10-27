"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  zeonWorkspaceProducts,
  type ZeonWorkspaceProduct,
} from "@/lib/zeonai/content";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";
import { CapabilityStage } from "./CapabilityStage";

const products = zeonWorkspaceProducts.products;
const AUTOPLAY_MS = 5600;

/**
 * Hero capability tour — tabbed product states with live sample UI.
 * Readable without interaction; autoplay pauses on manual selection / reduced motion.
 */
export function CapabilityTour() {
  const rootId = useId();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeRef = useRef(0);
  const manualRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const select = useCallback((idx: number, fromManual = false) => {
    if (idx < 0 || idx >= products.length) return;
    if (fromManual) manualRef.current = true;
    setActive(idx);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const tick = () => {
      if (manualRef.current) {
        manualRef.current = false;
      }
      const next = (activeRef.current + 1) % products.length;
      setActive(next);
    };
    timerRef.current = window.setInterval(tick, AUTOPLAY_MS);
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [reduced, paused, active]);

  const onTabKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const last = products.length - 1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select((active + 1) % products.length, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(active === 0 ? last : active - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      select(last, true);
    }
  };

  const product = products[active] as ZeonWorkspaceProduct;

  return (
    <div className="zx-tour" id="overview">
      <div className="zx-tour-chrome">
        <div
          className="zx-tour-tabs"
          role="tablist"
          aria-label="AI Workspace capabilities"
          onKeyDown={onTabKey}
        >
          {products.map((p, i) => {
            const selected = i === active;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`${rootId}-tab-${p.id}`}
                aria-selected={selected}
                aria-controls={`${rootId}-panel-${p.id}`}
                tabIndex={selected ? 0 : -1}
                className={`zx-tour-tab${selected ? " is-active" : ""}`}
                onClick={() => select(i, true)}
              >
                {p.title}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="zx-tour-pause"
          aria-pressed={paused}
          aria-label={paused ? "Play the capability tour" : "Pause the capability tour"}
          onClick={() => setPaused((v) => !v)}
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>

      <div
        className="zx-tour-stage"
        role="tabpanel"
        id={`${rootId}-panel-${product.id}`}
        aria-labelledby={`${rootId}-tab-${product.id}`}
      >
        <div className="zx-tour-copy">
          <h2 className="zx-tour-title">{product.title}</h2>
          <p className="zx-tour-body">{product.detail}</p>
          <ul className="zx-tour-bullets">
            {product.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="zx-tour-visual" data-ui>
          <CapabilityStage kind={product.visual} title={product.title} />
        </div>
      </div>

      <div className="zx-tour-progress" aria-hidden>
        <span
          key={`${product.id}-${paused}`}
          className={`zx-tour-progress-bar${paused || reduced ? " is-static" : ""}`}
          style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
        />
      </div>
    </div>
  );
}
