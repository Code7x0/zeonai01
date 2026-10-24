"use client";

import Image from "next/image";
import { useRef } from "react";
import { services } from "./constants";
import TextAnimation from "@/components/ui/staggerText";
import { gsap, registerGsap, useGSAP } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

export function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      if (!root) return;

      gsap.from(root.querySelectorAll("[data-service-card]"), {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="bg-[var(--aid-blue-100)] py-16 md:py-24 lg:py-28"
    >
      <div className="aid-container">
        <h2 className="aid-heading mb-10 text-[clamp(2rem,4vw,3.5rem)] text-[var(--aid-blue)] md:mb-14">
          <TextAnimation divideBy="word">our services</TextAnimation>
        </h2>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {services.map((service) => (
            <article
              key={service.num}
              data-service-card
              className="flex flex-col gap-5 rounded-[1.5rem] bg-transparent"
            >
              <div className="overflow-hidden rounded-[1.5rem] bg-white/60">
                <Image
                  src={service.image}
                  alt=""
                  width={524}
                  height={364}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-[family-name:var(--aid-font-heading)] text-sm font-bold text-[var(--aid-blue)]">
                  {service.num}
                </p>
                <h3 className="aid-heading text-[clamp(1.5rem,2.5vw,2rem)] normal-case text-[var(--aid-blue)] md:uppercase">
                  {service.title}
                </h3>
                <p className="text-[0.9375rem] leading-[1.45] text-[var(--aid-ink)]">
                  {service.body}
                </p>
                <ul className="mt-1 flex flex-col gap-2 text-[0.875rem] leading-[1.4] text-[var(--aid-ink)]">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--aid-blue)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={service.href}
                  className="mt-2 inline-flex items-center gap-2 text-[0.93rem] font-medium text-[var(--aid-blue)] underline-offset-4 hover:underline"
                >
                  Learn more
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
