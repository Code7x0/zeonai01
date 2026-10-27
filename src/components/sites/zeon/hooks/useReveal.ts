"use client";

import { useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

/**
 * GSAP scroll reveals for `.zn-reveal` nodes.
 * Critically-damped feel (Apple: no bounce on entrance); stagger siblings.
 */
export function useReveal(root: React.RefObject<HTMLElement | null>) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current) return;

    if (reduced) {
      root.current.querySelectorAll(".zn-reveal").forEach((node) => {
        (node as HTMLElement).style.opacity = "1";
        (node as HTMLElement).style.transform = "none";
      });
      return;
    }

    registerGsap();
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLElement>(
        root.current!.querySelectorAll(".zn-reveal"),
      );

      nodes.forEach((node, i) => {
        const siblings = node.parentElement
          ? Array.from(node.parentElement.children).filter((el) =>
              el.classList.contains("zn-reveal"),
            )
          : [];
        const staggerIndex = Math.max(0, siblings.indexOf(node));

        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay: siblings.length > 1 ? staggerIndex * 0.06 : 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 90%",
              once: true,
            },
            overwrite: "auto",
          },
        );

        // silence unused
        void i;
      });
    }, root);

    const sync = () => ScrollTrigger.refresh();
    const t = window.setTimeout(sync, 400);

    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [reduced, root]);
}
