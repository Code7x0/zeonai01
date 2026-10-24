"use client";

import Image from "next/image";
import { logos } from "./constants";
import { zeonPlatform } from "@/lib/zeonai/content";
import LogoSlider from "@/components/ui/logo-slider";
import TextAnimation from "@/components/ui/staggerText";
import { HeroLottie } from "./HeroLottie";

export function Hero() {
  const logoNodes = [...logos, ...logos].map((logo, i) => (
    <Image
      key={`${logo.alt}-${i}`}
      src={logo.src}
      alt={logo.alt}
      width={160}
      height={40}
      className="!h-10 !w-auto !object-contain !grayscale-0 !brightness-100"
    />
  ));

  return (
    <section className="home-hero relative bg-[var(--aid-bg)]">
      {/* First viewport: Lottie + copy only (match aidigital hero hierarchy) */}
      <div className="flex min-h-[100svh] flex-col justify-center pt-20">
        <div className="aid-hero-stage mx-auto flex w-full max-w-none flex-col items-center justify-center gap-0 px-3 py-6 md:px-4 md:py-8 lg:px-5 xl:px-6">
          <div className="hero-lottie-wrap w-full max-w-none">
            <div className="hero-lottie-stage mx-auto w-full">
              <HeroLottie />
            </div>
          </div>

          <div className="mx-auto -mt-6 flex max-w-[720px] flex-col items-center gap-4 text-center md:-mt-10 md:gap-5">
            <h1 className="font-[family-name:var(--aid-font-heading)] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-black text-[var(--aid-blue)] normal-case">
              <TextAnimation divideBy="word">
                {zeonPlatform.title}
              </TextAnimation>
            </h1>
            <span
              aria-hidden
              className="h-1 w-16 rounded-full bg-[var(--aid-blue)]"
            />
            <p className="max-w-[640px] text-[0.9375rem] leading-[1.45] text-[var(--aid-ink)] md:text-base md:leading-[1.5]">
              {zeonPlatform.body}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <a
                href={zeonPlatform.ctaPrimary.href}
                className="aid-btn aid-btn-lime"
              >
                {zeonPlatform.ctaPrimary.label}
              </a>
              <a
                href={zeonPlatform.ctaSecondary.href}
                className="aid-btn aid-btn-outline"
              >
                {zeonPlatform.ctaSecondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Logo strip below the fold — not competing for first-viewport space */}
      <div className="aid-logo-slider-wrap w-full pt-12 pb-12 md:pt-16 md:pb-16">
        <LogoSlider
          logos={logoNodes}
          speed={40}
          showBlur
          className="aid-vu-logo-slider"
        />
      </div>
    </section>
  );
}
