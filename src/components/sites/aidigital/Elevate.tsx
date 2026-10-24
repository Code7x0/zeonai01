"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  zeonWorkspaceProducts,
  type ZeonWorkspaceProduct,
} from "@/lib/zeonai/content";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";
import { WorkspaceProductPreview } from "./WorkspaceProductPreview";
import { CastRenderCenter } from "./CastRenderCenter";

/* DOM order: L→R rows so tablet 2-col auto-flow stays Ask|Agent, App|Dash, Flow|Contract */
const ORBIT_ORDER = ["tl", "tr", "ml", "mr", "bl", "br"] as const;

export function Elevate() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const reduced = usePrefersReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const openProduct = useCallback((product: ZeonWorkspaceProduct) => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setOpenId(product.id);
  }, []);

  const closeProduct = useCallback(() => {
    setOpenId(null);
    requestAnimationFrame(() => {
      lastFocusRef.current?.focus?.();
    });
  }, []);

  const active = zeonWorkspaceProducts.products.find((p) => p.id === openId);

  useEffect(() => {
    if (!openId) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeProduct();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [openId, closeProduct]);

  const onStagePointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    stage.style.setProperty("--ws-px", x.toFixed(3));
    stage.style.setProperty("--ws-py", y.toFixed(3));
  };

  const onStageLeave = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--ws-px", "0");
    stage.style.setProperty("--ws-py", "0");
  };

  const onDialogKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !active) return;
    const root = e.currentTarget;
    const focusables = [
      ...root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const productsByOrbit = ORBIT_ORDER.map(
    (orbit) =>
      zeonWorkspaceProducts.products.find((p) => p.orbit === orbit)!,
  );

  return (
    <section
      id={zeonWorkspaceProducts.id}
      ref={sectionRef}
      className={`section-home-elevate aid-ws relative overflow-hidden py-16 md:py-24 lg:py-28${reduced ? " aid-ws--reduced" : ""}`}
    >
      <div className="aid-ws-bg" aria-hidden>
        <CastRenderCenter />
      </div>
      <div className="aid-ws-bg-veil" aria-hidden />

      <div className="aid-home-container relative z-10">
        <div
          ref={stageRef}
          className="aid-ws-stage"
          data-hovered={hoveredId ?? undefined}
          onPointerMove={onStagePointer}
          onPointerLeave={onStageLeave}
        >
          <div className="aid-ws-center">
            <p className="aid-ws-eyebrow">
              {zeonWorkspaceProducts.eyebrow}
            </p>
            <h2 className="aid-heading aid-ws-title">
              {zeonWorkspaceProducts.title}
            </h2>
            <p className="aid-ws-lead">{zeonWorkspaceProducts.lead}</p>
          </div>

          {productsByOrbit.map((product) => {
            const isHovered = hoveredId === product.id;
            const isDimmed = Boolean(hoveredId) && !isHovered;
            return (
              <button
                key={product.id}
                type="button"
                className={`aid-ws-card aid-ws-card--${product.orbit}${isHovered ? " is-hot" : ""}${isDimmed ? " is-dim" : ""}`}
                aria-haspopup="dialog"
                aria-expanded={openId === product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(product.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => openProduct(product)}
              >
                <WorkspaceProductPreview
                  kind={product.visual}
                  title={product.title}
                />
                <span className="aid-ws-card-copy">
                  <span className="aid-ws-card-title">{product.title}</span>
                  <span className="aid-ws-card-body">{product.body}</span>
                </span>
                <span className="aid-ws-card-cue">
                  Open capability
                  <span aria-hidden> →</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {active ? (
        <div
          className="aid-ws-overlay"
          role="presentation"
          onClick={closeProduct}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="aid-ws-panel"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onDialogKeyDown}
          >
            <button
              ref={closeRef}
              type="button"
              className="aid-ws-panel-close"
              aria-label={`Close ${active.title}`}
              onClick={closeProduct}
            >
              <span aria-hidden>×</span>
            </button>
            <WorkspaceProductPreview
              kind={active.visual}
              title={active.title}
              large
            />
            <p className="mt-5 mb-2 text-xs font-semibold tracking-wide text-[var(--aid-blue)] uppercase">
              {zeonWorkspaceProducts.eyebrow}
            </p>
            <h3
              id={titleId}
              className="aid-heading mb-3 text-[clamp(1.5rem,3vw,2.15rem)] text-[var(--aid-blue)]"
            >
              {active.title}
            </h3>
            <p className="mb-4 text-[0.9375rem] leading-[1.55] text-white/75 md:text-base">
              {active.detail}
            </p>
            <ul className="aid-ws-panel-list">
              {active.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <a
              href="#book-a-demo"
              className="aid-btn aid-btn-blue mt-6 inline-flex"
            >
              Book a demo
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
