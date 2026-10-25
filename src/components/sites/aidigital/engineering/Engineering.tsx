"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { zeonEngineering } from "@/lib/zeonai/content";
import { gsap, registerGsap, useGSAP } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";
import { AccessVisual } from "./AccessVisual";
import { AuditVisual } from "./AuditVisual";
import { DelegationVisual } from "./DelegationVisual";
import { DocConfigVisual } from "./DocConfigVisual";
import { PipelineVisual } from "./PipelineVisual";
import { RulesVisual } from "./RulesVisual";

const pieces = zeonEngineering.pieces;
type PieceNum = (typeof pieces)[number]["num"];

const visuals: Record<PieceNum, ReactNode> = {
  "01": <PipelineVisual />,
  "02": <DocConfigVisual />,
  "03": <RulesVisual />,
  "04": <AccessVisual />,
  "05": <DelegationVisual />,
  "06": <AuditVisual />,
};

/** Wide stack for pipeline; alternating splits for the rest. */
function chapterLayout(index: number): "wide" | "split" | "split-flip" {
  if (index === 0) return "wide";
  return index % 2 === 1 ? "split-flip" : "split";
}

/**
 * Section 03 — premium engineering storytelling.
 * Product-led editorial chapters; Scale craft, ZeonAI identity.
 */
export function Engineering() {
  const titleId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [activeNum, setActiveNum] = useState<PieceNum>(pieces[0].num);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const chapters = [
      ...root.querySelectorAll<HTMLElement>(".aid-eng-chapter"),
    ];
    if (!chapters.length) return;

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target;
        const num = top?.getAttribute("data-eng-num") as PieceNum | null;
        if (num && pieces.some((p) => p.num === num)) setActiveNum(num);
      },
      { root: null, threshold: [0.25, 0.45, 0.65], rootMargin: "-18% 0px -35% 0px" },
    );
    chapters.forEach((c) => chapterObserver.observe(c));

    return () => chapterObserver.disconnect();
  }, []);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      if (!root || reduced) return;

      const overview = root.querySelectorAll("[data-eng-overview-item]");
      const overviewLines = root.querySelectorAll("[data-eng-overview-line]");
      gsap.from(overview, {
        opacity: 0,
        y: 14,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.querySelector(".aid-eng-overview"),
          start: "top 82%",
          once: true,
        },
      });
      overviewLines.forEach((line) => {
        const el = line as SVGPathElement;
        const len = typeof el.getTotalLength === "function" ? el.getTotalLength() : 0;
        if (!len) return;
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 0.65,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: root.querySelector(".aid-eng-overview"),
            start: "top 78%",
            once: true,
          },
        });
      });

      root.querySelectorAll<HTMLElement>(".aid-eng-chapter").forEach((chapter) => {
        const stages = chapter.querySelectorAll("[data-eng-stage]");
        const lines = chapter.querySelectorAll("[data-eng-line]");
        gsap.from(chapter.querySelectorAll(".aid-eng-chapter-copy > *"), {
          opacity: 0,
          y: 16,
          stagger: 0.06,
          duration: 0.48,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 78%",
            once: true,
          },
        });
        gsap.from(stages, {
          opacity: 0,
          y: 10,
          stagger: 0.045,
          duration: 0.42,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 72%",
            once: true,
          },
        });
        lines.forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: 0.48,
              ease: "power1.out",
              scrollTrigger: {
                trigger: chapter,
                start: "top 70%",
                once: true,
              },
            },
          );
        });
      });
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  return (
    <section
      id={zeonEngineering.id}
      ref={rootRef}
      className="aid-eng"
      aria-labelledby={titleId}
    >
      <div className="aid-container">
        <header className="aid-eng-intro">
          <p className="aid-eng-eyebrow">{zeonEngineering.eyebrow}</p>
          <h2 id={titleId} className="aid-heading aid-eng-title">
            {zeonEngineering.title}
          </h2>
          <p className="aid-eng-lead">{zeonEngineering.lead}</p>
        </header>

        <nav className="aid-eng-overview" aria-label="Architecture overview">
          <ol className="aid-eng-overview-list">
            {pieces.map((piece, i) => (
              <li key={piece.num} data-eng-overview-item>
                {i > 0 ? (
                  <svg
                    className="aid-eng-overview-connector"
                    viewBox="0 0 40 2"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M0 1 H40"
                      data-eng-overview-line
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                ) : null}
                <a
                  className={`aid-eng-overview-link${activeNum === piece.num ? " is-active" : ""}`}
                  href={`#eng-${piece.num}`}
                >
                  <span className="aid-eng-overview-num">{piece.num}</span>
                  <span className="aid-eng-overview-label">{piece.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <p className="aid-eng-overview-caption">
            A document moves through these six pieces in order.
          </p>
        </nav>

        <div className="aid-eng-chapters">
          {pieces.map((piece, i) => {
            const layout = chapterLayout(i);
            return (
              <article
                key={piece.num}
                id={`eng-${piece.num}`}
                data-eng-num={piece.num}
                className={`aid-eng-chapter aid-eng-chapter--${layout}`}
              >
                <div className="aid-eng-chapter-copy">
                  <p className="aid-eng-chapter-index">
                    {piece.num} / 06
                    <span className="aid-eng-chapter-label"> · {piece.label}</span>
                  </p>
                  <h3 className="aid-heading aid-eng-chapter-title">{piece.title}</h3>
                  <p className="aid-eng-chapter-body">{piece.body}</p>
                </div>
                <div className="aid-eng-chapter-visual">{visuals[piece.num]}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
