"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import wordmark from "./data/hero-wordmark.json";

type Glyph = {
  advance: number;
  bb: { x1: number; y1: number; x2: number; y2: number };
  normal: string;
  stretched?: string;
};

type Letter = {
  ch: string;
  x: number;
  advance: number;
  stretch: boolean;
  layers: Array<"front" | "back">;
};

const glyphs = wordmark.glyphs as Record<string, Glyph>;
const letters = wordmark.letters as Letter[];
const { meta, ribbon } = wordmark;

/** Interpolate two SVG path `d` strings with identical command structure. */
function lerpPath(a: string, b: string, t: string | number): string {
  const tt = typeof t === "number" ? t : Number(t);
  const numsA = a.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? [];
  const numsB = b.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? [];
  if (numsA.length !== numsB.length || numsA.length === 0) {
    return tt < 0.5 ? a : b;
  }
  let i = 0;
  return a.replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi, () => {
    const av = Number(numsA[i]);
    const bv = Number(numsB[i]);
    i += 1;
    return String(av + (bv - av) * tt);
  });
}

/**
 * Reverse-engineered recreation of the AI Digital hero Lottie:
 * - Letter outlines from Barlow Semi Condensed Black (same family as source)
 * - Lime ribbon sandwiched between front/back letter layers (source weave)
 * - Stretchable glyphs morph their bar paths open (source E/T shape keys)
 * - Letters spread on X while the ribbon trims through (source Null/position keys)
 */
export function HeroWordmark() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ribbonPath = root.querySelector<SVGPathElement>("[data-ribbon]");
    const stretchPaths = Array.from(
      root.querySelectorAll<SVGPathElement>("[data-stretch]"),
    );
    const letterNodes = Array.from(
      root.querySelectorAll<SVGGElement>("[data-letter]"),
    );

    if (!ribbonPath) return;

    const length = ribbonPath.getTotalLength();
    ribbonPath.style.strokeDasharray = `${length}`;
    ribbonPath.style.strokeDashoffset = `${length}`;

    letterNodes.forEach((node) => {
      gsap.set(node, { x: Number(node.dataset.x ?? 0), y: 0 });
    });

    if (prefersReducedMotion()) {
      ribbonPath.style.strokeDashoffset = "0";
      return;
    }

    const duration = meta.duration;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });

      // Ribbon draw (mirrors Lottie trim end 0→1, then trim start erase)
      const drawProxy = { p: 0 };
      tl.to(
        drawProxy,
        {
          p: 1,
          duration: duration * (213 / 256),
          ease: "power1.inOut",
          onUpdate: () => {
            ribbonPath.style.strokeDashoffset = String(
              length * (1 - drawProxy.p),
            );
          },
        },
        0,
      );
      const eraseProxy = { p: 0 };
      tl.to(
        eraseProxy,
        {
          p: 1,
          duration: duration * ((243 - 113.639) / 256),
          ease: "power1.inOut",
          onUpdate: () => {
            ribbonPath.style.strokeDashoffset = String(-length * eraseProxy.p);
          },
        },
        duration * (113.639 / 256),
      );
      tl.set(ribbonPath, { strokeDashoffset: length });

      // Unique stretch slots left→right (front+back share timing per char index)
      const stretchSlots = new Map<string, SVGPathElement[]>();
      stretchPaths.forEach((path) => {
        const slot = path.dataset.slot ?? path.dataset.normal ?? "";
        const list = stretchSlots.get(slot) ?? [];
        list.push(path);
        stretchSlots.set(slot, list);
      });
      const slots = [...stretchSlots.entries()];
      slots.forEach(([, paths], index) => {
        const normal = paths[0].dataset.normal ?? "";
        const stretched = paths[0].dataset.stretched ?? "";
        if (!normal || !stretched) return;
        const proxy = { t: 0 };
        const start =
          duration *
          (0.1 + (index / Math.max(slots.length - 1, 1)) * 0.58);
        const apply = () => {
          const d = lerpPath(normal, stretched, proxy.t);
          paths.forEach((path) => path.setAttribute("d", d));
        };
        tl.to(
          proxy,
          {
            t: 1,
            duration: duration * 0.14,
            ease: "power2.inOut",
            onUpdate: apply,
          },
          start,
        );
        tl.to(
          proxy,
          {
            t: 0,
            duration: duration * 0.14,
            ease: "power2.inOut",
            onUpdate: apply,
          },
          start + duration * 0.5,
        );
      });

      // Letter spread (source pushes glyphs outward mid-cycle)
      letterNodes.forEach((node) => {
        const baseX = Number(node.dataset.x ?? 0);
        const center = meta.totalWidth / 2;
        const mid =
          baseX + Number(node.dataset.advance ?? 0) / 2 - center;
        const spread =
          Math.sign(mid || 1) *
          meta.spread *
          (0.45 + Math.abs(mid) / center);
        // Hold letters apart while bars are open (matches source position keys)
        tl.to(
          node,
          {
            x: baseX + spread,
            duration: duration * 0.22,
            ease: "power1.inOut",
          },
          duration * 0.14,
        );
        tl.to(
          node,
          {
            x: baseX,
            duration: duration * 0.22,
            ease: "power1.inOut",
          },
          duration * 0.62,
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const padX = 40;
  const viewBox = meta.viewBox;

  return (
    <div
      ref={rootRef}
      className="hero-wordmark"
      role="img"
      aria-label={meta.phrase}
    >
      <svg
        className="hero-wordmark-svg"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="aid-hero-ribbon-fade"
            gradientUnits="userSpaceOnUse"
            x1={-padX}
            y1="0"
            x2={meta.totalWidth + padX}
            y2="0"
          >
            <stop offset="0%" stopColor={meta.lime} stopOpacity="0" />
            <stop offset="6%" stopColor={meta.lime} stopOpacity="1" />
            <stop offset="94%" stopColor={meta.lime} stopOpacity="1" />
            <stop offset="100%" stopColor={meta.lime} stopOpacity="0" />
          </linearGradient>
          <filter
            id="aid-hero-ribbon-glow"
            x="-8%"
            y="-40%"
            width="116%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* BACK letters — ribbon weaves in front of these */}
        <g className="hero-letters-back">
          {letters.map((letter, index) =>
            letter.layers.includes("back") ? (
              <LetterPath
                key={`back-${letter.ch}-${index}`}
                letter={letter}
                fill={meta.color}
                layer="back"
              />
            ) : null,
          )}
        </g>

        {/* Lime ribbon (source Line layer, sandwiched in the stack) */}
        <path
          data-ribbon
          d={ribbon.d}
          fill="none"
          stroke="url(#aid-hero-ribbon-fade)"
          strokeWidth={ribbon.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#aid-hero-ribbon-glow)"
        />

        {/* FRONT letters — ribbon weaves behind these */}
        <g className="hero-letters-front">
          {letters.map((letter, index) =>
            letter.layers.includes("front") ? (
              <LetterPath
                key={`front-${letter.ch}-${index}`}
                letter={letter}
                fill={meta.color}
                layer="front"
              />
            ) : null,
          )}
        </g>
      </svg>
    </div>
  );
}

function LetterPath({
  letter,
  fill,
  layer,
}: {
  letter: Letter;
  fill: string;
  layer: "front" | "back";
}) {
  const glyph = glyphs[letter.ch];
  if (!glyph) return null;

  const stretch = letter.stretch && glyph.stretched;
  return (
    <g
      data-letter
      data-x={letter.x}
      data-advance={letter.advance}
      data-layer={layer}
    >
      <path
        d={glyph.normal}
        fill={fill}
        {...(stretch
          ? {
              "data-stretch": true,
              "data-slot": `${letter.ch}-${letter.x}`,
              "data-normal": glyph.normal,
              "data-stretched": glyph.stretched,
            }
          : {})}
      />
    </g>
  );
}
