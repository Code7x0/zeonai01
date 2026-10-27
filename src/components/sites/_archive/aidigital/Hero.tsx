"use client";

import Image from "next/image";
import { logos } from "./constants";
import { zeonPlatform } from "@/lib/zeonai/content";
import LogoSlider from "@/components/ui/logo-slider";
import { CapabilityTour } from "./CapabilityTour";

/**
 * Split instrument hero: claim column + live capability console.
 * Brand is the display signal; product UI is the imagery.
 */
export function Hero() {
  const logoNodes = [...logos, ...logos].map((logo, i) => (
    <Image
      key={`${logo.alt}-${i}`}
      src={logo.src}
      alt={logo.alt}
      width={160}
      height={40}
      className="!h-9 !w-auto !object-contain !grayscale-0 !brightness-100"
    />
  ));

  return (
    <section className="zx-hero" aria-labelledby="zx-hero-title">
      <div className="zx-hero-split">
        <div className="zx-hero-intro">
          <p className="zx-hero-brand">ZeonAI</p>
          <h1 id="zx-hero-title" className="zx-hero-title">
            {zeonPlatform.title}
          </h1>
          <p className="zx-hero-body">{zeonPlatform.body}</p>
          <div className="zx-hero-actions">
            <a
              href={zeonPlatform.ctaPrimary.href}
              className="zx-btn zx-btn-primary"
            >
              {zeonPlatform.ctaPrimary.label}
            </a>
            <a
              href={zeonPlatform.ctaSecondary.href}
              className="zx-btn zx-btn-ghost"
            >
              {zeonPlatform.ctaSecondary.label}
              <span aria-hidden> →</span>
            </a>
          </div>
        </div>

        <div className="zx-hero-tour">
          <CapabilityTour />
        </div>
      </div>

      <div className="zx-hero-proof">
        <p className="zx-hero-proof-label">
          Trusted by leading organisations worldwide
        </p>
        <LogoSlider
          logos={logoNodes}
          speed={40}
          showBlur
          className="zx-logo-slider"
        />
      </div>
    </section>
  );
}
