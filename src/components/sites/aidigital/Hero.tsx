"use client";

import Image from "next/image";
import { SITE, logos } from "./constants";
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
    <section className="home-hero relative flex min-h-[100svh] flex-col justify-around bg-[var(--aid-bg)] pt-20">
      <div className="main-banner px-4 pt-5 pb-2.5">
        <div className="main-banner_content mx-auto flex max-w-[46.9rem] flex-wrap items-center justify-center gap-1 rounded-[2.5rem] bg-[var(--aid-blue-pill)] px-[0.93rem] py-[0.6rem]">
          <p className="main-banner_text text-center text-[0.93rem] leading-[1.2] font-medium text-[var(--aid-ink)]">
            The Q4 2026 Holiday Season Report is here — see where to spend and
            when.
          </p>
          <a
            href={`${SITE}/whitepapers-research/q4-2026-holiday-season-report`}
            className="main-banner_li border-b border-[var(--aid-blue)] text-[0.93rem] leading-[1.2] font-medium text-[var(--aid-blue)] transition-opacity hover:opacity-60"
          >
            Get your free copy.
          </a>
        </div>
      </div>

      <div className="aid-hero-stage mx-auto flex w-full max-w-none flex-1 flex-col items-center justify-center gap-8 px-3 py-6 md:gap-10 md:px-4 md:py-8 lg:px-5 xl:px-6">
        <div className="hero-lottie-wrap w-full max-w-none">
          <div className="hero-lottie-stage mx-auto w-full">
            <HeroLottie />
          </div>
        </div>

        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <h1 className="font-[family-name:var(--aid-font-heading)] text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-black capitalize text-[var(--aid-blue)]">
            <TextAnimation divideBy="word">
              AI-Native Media Consultancy
            </TextAnimation>
          </h1>
          <p className="max-w-[640px] text-[0.9375rem] leading-[1.45] text-[var(--aid-ink)] md:text-base md:leading-[1.5]">
            AI Digital is the harness that puts AI to work for brands and
            agencies. Strategic expertise, data, proprietary tools and the
            platforms you run on, working as one system, turning programmatic
            complexity into measurable outcomes. Results today. Lasting
            advantage tomorrow.
          </p>
        </div>
      </div>

      <div className="aid-logo-slider-wrap w-full pb-10 md:pb-14">
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
