"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SITE, YT_ELEVATE, asset } from "./constants";
import { VideoModal } from "./VideoModal";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

export function Elevate() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorOn, setCursorOn] = useState(false);

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

      return () => {
        pin.kill();
      };
    },
    { scope: sectionRef },
  );

  const onMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(max-width: 991px)").matches) return;
    const el = cursorRef.current;
    if (!el) return;
    gsap.to(el, {
      left: e.clientX,
      top: e.clientY,
      duration: 0.12,
      ease: "power2.out",
      overwrite: true,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="section-home-elevate relative flex min-h-[100svh] items-center overflow-hidden bg-black py-16 md:py-24 max-lg:cursor-auto lg:cursor-none"
      style={{
        backgroundImage:
          "linear-gradient(270deg,#00000073,#6e6e6e00 13%,#b2b5f412 29%,#000),linear-gradient(#000,#000 10%,#707299 38%,#b2b5f4 53%,#000 87%,#000)",
      }}
      onMouseEnter={() => setCursorOn(true)}
      onMouseLeave={() => setCursorOn(false)}
      onMouseMove={onMove}
    >
      <div
        ref={cursorRef}
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-[9999] hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--aid-lime)] text-[var(--aid-blue)] shadow-lg transition-opacity duration-200 lg:flex ${cursorOn ? "opacity-100" : "opacity-0"}`}
      >
        <Image
          src={asset("icons/play.svg")}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7"
        />
      </div>

      <div className="aid-home-container relative z-10 grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-8">
        <div
          className="flex max-w-xl flex-col items-start gap-5 text-white"
          data-elevate-reveal
        >
          <h2 className="aid-heading text-[clamp(3rem,8vw,4.5rem)] text-white">
            Elevate
          </h2>
          <h3
            className="aid-heading max-w-[18ch] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-white"
            data-elevate-reveal
          >
            The AI Engine Behind Everything
          </h3>
          <p
            className="max-w-[34rem] text-[0.9375rem] leading-[1.45] text-white/95 md:text-base"
            data-elevate-reveal
          >
            AI-powered marketing platform connecting the entire digital
            landscape, turning fragmented data into control, strategy, and
            measurable business results.
            <br />
            <br />
            From complexity to clarity. In minutes.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2" data-elevate-reveal>
            <a href={`${SITE}/elevate`} className="aid-btn aid-btn-lime lg:cursor-none">
              Explore Elevate
              <Image
                src={asset("icons/arrow-up-left.svg")}
                alt=""
                width={14}
                height={14}
                className="rotate-90"
              />
            </a>
            <button
              type="button"
              className="aid-btn aid-btn-outline-white lg:cursor-none"
              onClick={() => setOpen(true)}
            >
              <Image
                src={asset("icons/play.svg")}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5"
              />
              Play video
            </button>
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
          data-elevate-reveal
        >
          <button
            type="button"
            className="block w-full lg:cursor-none"
            onClick={() => setOpen(true)}
            aria-label="Play Elevate video"
          >
            <Image
              src={asset("images/elevate.gif")}
              alt="Elevate platform"
              width={1422}
              height={1126}
              unoptimized
              className="h-auto w-full object-contain"
              priority={false}
            />
          </button>
        </div>
      </div>

      <VideoModal
        open={open}
        videoId={YT_ELEVATE}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
