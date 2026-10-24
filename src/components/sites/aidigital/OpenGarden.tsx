"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SITE, YT_GARDEN, asset } from "./constants";
import { VideoModal } from "./VideoModal";
import TextAnimation from "@/components/ui/staggerText";
import { gsap, registerGsap, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

const collage = [
  {
    src: asset("images/open-garden.avif"),
    className:
      "absolute top-[4.37rem] left-[clamp(1.8rem,2vw,4.6rem)] z-[1] w-[min(42%,15.43rem)] rounded-2xl shadow-md",
  },
  {
    src: asset("images/open-garden2.avif"),
    className:
      "absolute top-[13.06rem] left-[-0.5rem] z-[2] w-[min(40%,15.23rem)] rounded-2xl shadow-md",
  },
  {
    src: asset("images/home-new.avif"),
    className:
      "absolute bottom-[8.06rem] left-[-1rem] z-[3] h-[14.5rem] w-[min(70%,25rem)] rounded-2xl object-cover shadow-lg",
  },
  {
    src: asset("images/open-garden-collage.avif"),
    className:
      "absolute top-[2rem] right-[clamp(0rem,2vw,2rem)] z-[2] w-[min(48%,18rem)] rounded-2xl shadow-md",
  },
  {
    src: asset("images/open-garden-5.avif"),
    className:
      "absolute right-[10%] bottom-[12rem] z-[1] w-[min(32%,12rem)] rounded-2xl shadow-sm",
  },
  {
    src: asset("images/open-garden6.avif"),
    className:
      "absolute right-[clamp(0rem,3vw,3rem)] bottom-[3rem] z-[4] w-[min(44%,16rem)] rounded-2xl shadow-lg",
  },
] as const;

export function OpenGarden() {
  const [open, setOpen] = useState(false);
  const collageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = collageRef.current;
      if (!root) return;

      gsap.from(root.querySelectorAll("[data-collage-item]"), {
        opacity: 0,
        y: 36,
        scale: 0.96,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: collageRef },
  );

  return (
    <section className="relative overflow-hidden bg-[#f9f9f9] py-16 md:py-24">
      <div className="aid-container grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div
          ref={collageRef}
          className="relative mx-auto hidden min-h-[40rem] w-full max-w-[38rem] lg:block"
        >
          {collage.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt=""
              width={400}
              height={300}
              data-collage-item
              className={`${img.className} object-cover`}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-start gap-5 lg:mx-0">
          <p className="aid-heading text-[clamp(1.25rem,2vw,1.5rem)] text-[var(--aid-blue)]">
            the open garden
            <br />
            framework
          </p>
          <h2 className="aid-heading text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-[var(--aid-blue)]">
            <TextAnimation divideBy="word">
              Philosophy That Powers It All
            </TextAnimation>
          </h2>
          <p className="text-[0.9375rem] leading-[1.5] text-[var(--aid-ink)] md:text-base">
            One belief sits underneath everything we do: media should never be
            limited by walled gardens. The Open Garden Framework keeps it that
            way — open, connected access to best-in-class technology, DSPs,
            data, inventory, and decisioning, no matter how you work with us.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={`${SITE}/open-garden-framework`}
              className="aid-btn aid-btn-lime"
            >
              Explore the Open Garden
            </a>
            <button
              type="button"
              className="aid-btn border border-[var(--aid-blue)] text-[var(--aid-blue)]"
              onClick={() => setOpen(true)}
            >
              Watch video
            </button>
          </div>

          <div className="mt-4 grid w-full grid-cols-2 gap-3 lg:hidden">
            {collage.slice(0, 4).map((img) => (
              <Image
                key={img.src}
                src={img.src}
                alt=""
                width={300}
                height={220}
                className="h-36 w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      </div>

      <VideoModal open={open} videoId={YT_GARDEN} onClose={() => setOpen(false)} />
    </section>
  );
}
