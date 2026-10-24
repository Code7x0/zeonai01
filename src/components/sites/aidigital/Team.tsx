"use client";

import Image from "next/image";
import { SITE, asset, offices } from "./constants";
import StatsCounter from "@/components/ui/stats-counter";
import TextAnimation from "@/components/ui/staggerText";

const flags = [
  asset("images/team-bg.avif"),
  asset("images/office-miami.png"),
  asset("images/office-belgrade.png"),
  asset("images/office-cyprus.avif"),
  asset("images/team-flag-a.avif"),
  asset("images/team-flag-b.avif"),
  asset("images/flags/f01.avif"),
  asset("images/flags/f02.avif"),
  asset("images/flags/f03.avif"),
  asset("images/flags/f04.avif"),
  asset("images/flags/f05.avif"),
  asset("images/flags/f06.png"),
  asset("images/flags/f07.png"),
  asset("images/flags/f08.png"),
  asset("images/flags/f09.png"),
  asset("images/flags/f10.png"),
  asset("images/flags/f11.png"),
  asset("images/flags/f12.png"),
  asset("images/flags/f13.avif"),
  asset("images/flags/f14.avif"),
  asset("images/flags/f15.avif"),
  asset("images/flags/f16.avif"),
  asset("images/flags/f17.avif"),
  asset("images/flags/f18.png"),
  asset("images/flags/f19.png"),
  asset("images/flags/f20.png"),
];

export function Team() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="aid-container">
        <h2 className="aid-heading mb-10 max-w-[18ch] text-[clamp(2rem,4vw,3.5rem)] text-[var(--aid-blue)] md:mb-14">
          <TextAnimation divideBy="word">
            a global team built for impact
          </TextAnimation>
        </h2>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-[var(--aid-bg)] p-5">
                <Image
                  src={asset("icons/building.svg")}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="aid-heading text-3xl text-[var(--aid-blue)] md:text-4xl">
                  <StatsCounter value={3} className="aid-heading" />
                </p>
                <p className="text-sm font-medium text-[var(--aid-ink)]">
                  Office Hubs
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-[var(--aid-bg)] p-5">
                <Image
                  src={asset("icons/users.svg")}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="aid-heading text-3xl text-[var(--aid-blue)] md:text-4xl">
                  <StatsCounter value={650} suffix="+" className="aid-heading" />
                </p>
                <p className="text-sm font-medium text-[var(--aid-ink)]">
                  Employees
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-[var(--aid-bg)] p-5">
                <Image
                  src={asset("icons/earth.svg")}
                  alt=""
                  width={28}
                  height={28}
                />
                <p className="aid-heading text-3xl text-[var(--aid-blue)] md:text-4xl">
                  Global
                </p>
                <p className="text-sm font-medium text-[var(--aid-ink)]">Team</p>
              </div>
              <div className="flex flex-col justify-center gap-2 rounded-2xl border border-black/5 bg-[var(--aid-blue)] p-5 text-white sm:col-span-3 lg:col-span-1">
                <p className="aid-heading text-2xl">Fully Remote</p>
                <p className="text-sm text-white/85">
                  Distributed talent across time zones for always-on delivery.
                </p>
              </div>
            </div>

            <div className="team-mosaic grid grid-cols-6 gap-1.5 sm:grid-cols-9 sm:gap-2">
              {flags.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className={`overflow-hidden rounded-md bg-[var(--aid-blue-100)] ${
                    i % 7 === 0
                      ? "col-span-2 row-span-2 aspect-square"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    width={200}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {offices.map((o) => (
                <div key={o.title}>
                  <h3 className="mb-1 text-sm font-semibold text-[var(--aid-blue)]">
                    {o.title}
                  </h3>
                  <a
                    href={o.map}
                    className="text-xs leading-snug text-[var(--aid-ink)] underline-offset-2 hover:underline"
                  >
                    {o.address}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[1.25rem] bg-[var(--aid-blue)] p-8 text-white md:p-10">
              <h3 className="aid-heading mb-4 text-[clamp(1.75rem,3vw,2.25rem)] text-white">
                Join us
              </h3>
              <p className="mb-6 text-[0.9375rem] leading-[1.5] text-white/90">
                Want to work at the intersection of AI and media? This is where
                you do it. The culture of kindness and innovation waits for you!
              </p>
              <a href={`${SITE}/open-roles`} className="aid-btn aid-btn-lime">
                Open Roles
              </a>
            </div>

            <div className="rounded-[1.25rem] border border-black/8 bg-[var(--aid-bg)] p-8 md:p-10">
              <h3 className="aid-heading mb-4 text-[clamp(1.5rem,2.5vw,2rem)] text-[var(--aid-blue)]">
                Resources
              </h3>
              <p className="mb-6 text-[0.9375rem] leading-[1.5] text-[var(--aid-ink)]">
                Original research, case studies, and media POVs from AI Digital
                experts. For the ideas that drive how we work, and what we do.
              </p>
              <a
                href={`${SITE}/resources/whitepapers-research`}
                className="aid-btn aid-btn-blue"
              >
                Explore Insights
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
