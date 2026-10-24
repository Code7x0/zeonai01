"use client";

import Image from "next/image";
import { useState } from "react";
import { asset, offices } from "./constants";
import {
  zeonDemo,
  zeonIndustries,
  zeonRoles,
} from "@/lib/zeonai/content";
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
  const [activeSector, setActiveSector] = useState(0);
  const sector = zeonIndustries.sectors[activeSector];

  return (
    <section
      id={zeonIndustries.id}
      className="bg-white py-16 md:py-24"
    >
      <div className="aid-container">
        <h2 className="aid-heading mb-4 max-w-[22ch] text-[clamp(2rem,4vw,3.5rem)] text-[var(--aid-blue)]">
          <TextAnimation divideBy="word">
            {zeonIndustries.title}
          </TextAnimation>
        </h2>
        <p className="mb-10 max-w-2xl text-[0.9375rem] leading-[1.45] text-[var(--aid-ink)] md:mb-14 md:text-base">
          {zeonIndustries.lead}
        </p>

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
              Office hubs
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
              <StatsCounter value={50} suffix="+" className="aid-heading" />
            </p>
            <p className="text-sm font-medium text-[var(--aid-ink)]">
              Agents in portfolio
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
              <StatsCounter value={6} className="aid-heading" />
            </p>
            <p className="text-sm font-medium text-[var(--aid-ink)]">
              Sectors
            </p>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {zeonIndustries.sectors.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setActiveSector(i)}
              className={`rounded-full px-3 py-1.5 text-left text-xs font-medium transition ${
                i === activeSector
                  ? "bg-[var(--aid-blue)] text-white"
                  : "border border-black/10 bg-[var(--aid-bg)] text-[var(--aid-blue)] hover:border-[var(--aid-blue)]/30"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <article className="mb-12 rounded-2xl border border-black/5 bg-[var(--aid-bg)] p-6 md:p-8">
          <h3 className="text-xl font-semibold text-[var(--aid-blue)]">
            {sector.title}
          </h3>
          <p className="mt-2 max-w-3xl text-[0.9375rem] leading-[1.45] text-[var(--aid-ink)]">
            {sector.body}
          </p>
          <p className="mt-3 text-xs font-semibold tracking-wide text-[var(--aid-grey)] uppercase">
            Runs on {sector.runsOn}
          </p>
          <ol className="mt-4 flex flex-wrap gap-2">
            {sector.steps.map((step, i) => (
              <li
                key={step}
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[var(--aid-blue)]"
              >
                {i + 1}. {step}
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {sector.agents.map((agent) => (
              <div
                key={agent.name}
                className="rounded-xl border border-black/5 bg-white p-4"
              >
                <h4 className="text-sm font-semibold text-[var(--aid-blue)]">
                  {agent.name}
                </h4>
                <p className="mt-1 text-[0.8125rem] leading-[1.45] text-[var(--aid-ink)]">
                  {agent.detail}
                </p>
              </div>
            ))}
          </div>
        </article>

        <div
          id={zeonRoles.id}
          className="mb-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12"
        >
          <div>
            <h3 className="aid-heading mb-3 text-[clamp(1.5rem,3vw,2.25rem)] text-[var(--aid-blue)]">
              {zeonRoles.title}
            </h3>
            <p className="mb-6 text-[0.9375rem] leading-[1.45] text-[var(--aid-ink)]">
              {zeonRoles.lead}
            </p>
            <ul className="flex flex-col gap-2">
              {zeonRoles.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-xl border border-black/5 bg-[var(--aid-bg)] px-4 py-3 text-sm font-medium text-[var(--aid-blue)]"
                >
                  {role}
                </li>
              ))}
            </ul>
            <a
              href={`#${zeonDemo.id}`}
              className="mt-4 inline-flex text-sm font-medium text-[var(--aid-blue)] underline-offset-2 hover:underline"
            >
              {zeonRoles.customCta}
            </a>
          </div>
          <div className="rounded-2xl border border-black/5 bg-[var(--aid-bg)] p-6">
            <p className="text-sm font-semibold text-[var(--aid-blue)]">
              {zeonRoles.sample.summary}
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {zeonRoles.sample.modules.map((m) => (
                <li
                  key={m.name}
                  className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-xs"
                >
                  <span className="font-medium text-[var(--aid-ink)]">
                    {m.name}
                  </span>
                  <span
                    className={
                      m.status === "Included"
                        ? "text-[var(--aid-blue)]"
                        : "text-[var(--aid-grey)]"
                    }
                  >
                    {m.status}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs font-semibold tracking-wide text-[var(--aid-grey)] uppercase">
              Agents set up for this role
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {zeonRoles.sample.agents.map((a) => (
                <li
                  key={a}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--aid-blue)]"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
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
                Book a demo
              </h3>
              <p className="mb-6 text-[0.9375rem] leading-[1.5] text-white/90">
                {zeonDemo.body}
              </p>
              <a href={zeonDemo.cta.href} className="aid-btn aid-btn-lime">
                {zeonDemo.cta.label}
              </a>
            </div>

            <div className="rounded-[1.25rem] border border-black/8 bg-[var(--aid-bg)] p-8 md:p-10">
              <h3 className="aid-heading mb-4 text-[clamp(1.5rem,2.5vw,2rem)] text-[var(--aid-blue)]">
                Customers
              </h3>
              <p className="mb-6 text-[0.9375rem] leading-[1.5] text-[var(--aid-ink)]">
                Real deployments across lending, finance and media, with the
                results each one delivered.
              </p>
              <a href="#customers" className="aid-btn aid-btn-blue">
                View case studies
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
