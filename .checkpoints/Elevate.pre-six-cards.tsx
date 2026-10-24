"use client";

import Image from "next/image";
import { useRef } from "react";
import { asset } from "./constants";
import { zeonPlatform } from "@/lib/zeonai/content";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

export function Elevate() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;
      if (window.matchMedia("(max-width: 991px)").matches) return;

      const pin = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=55%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      gsap.fromTo(
        section.querySelectorAll("[data-elevate-reveal]"),
        { opacity: 0.35, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 20%",
            scrub: true,
          },
        },
      );

      const lenis = (
        window as unknown as { __lenis?: { resize: () => void } }
      ).__lenis;
      requestAnimationFrame(() => {
        lenis?.resize();
        ScrollTrigger.refresh();
      });

      return () => {
        pin.kill();
        requestAnimationFrame(() => {
          lenis?.resize();
          ScrollTrigger.refresh();
        });
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="section-home-elevate relative flex min-h-[100svh] cursor-default items-center overflow-hidden bg-black py-16 md:py-24"
      style={{
        backgroundImage:
          "linear-gradient(270deg,#00000073,#6e6e6e00 13%,#b2b5f412 29%,#000),linear-gradient(#000,#000 10%,#707299 38%,#b2b5f4 53%,#000 87%,#000)",
      }}
    >
      <div className="aid-home-container relative z-10 grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-8">
        <div
          className="flex max-w-xl flex-col items-start gap-5 text-white"
          data-elevate-reveal
        >
          <p className="text-sm font-semibold tracking-wide text-[var(--aid-lime)] uppercase">
            {zeonPlatform.eyebrow}
          </p>
          <h2 className="aid-heading max-w-[18ch] text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-white">
            {zeonPlatform.title}
          </h2>
          <p
            className="max-w-[34rem] text-[0.9375rem] leading-[1.45] text-white/95 md:text-base"
            data-elevate-reveal
          >
            {zeonPlatform.body}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2" data-elevate-reveal>
            <a
              href={zeonPlatform.ctaPrimary.href}
              className="aid-btn aid-btn-lime cursor-pointer"
            >
              {zeonPlatform.ctaPrimary.label}
              <Image
                src={asset("icons/arrow-up-left.svg")}
                alt=""
                width={14}
                height={14}
                className="rotate-90"
              />
            </a>
            <a
              href={zeonPlatform.ctaSecondary.href}
              className="aid-btn aid-btn-outline-white cursor-pointer"
            >
              {zeonPlatform.ctaSecondary.label}
            </a>
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
          data-elevate-reveal
        >
          <Image
            src={asset("images/elevate.gif")}
            alt="ZeonAI platform"
            width={1422}
            height={1126}
            unoptimized
            className="h-auto w-full object-contain"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
