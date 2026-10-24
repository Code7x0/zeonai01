"use client";

import { FormEvent, useState } from "react";
import { footerColumns } from "./constants";
import { zeonMeta } from "@/lib/zeonai/content";

export function Footer() {
  const [status, setStatus] = useState<"idle" | "ok" | "error" | "loading">(
    "idle",
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-[#0b0b18] pt-16 pb-8 text-white">
      <div className="aid-container">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-[family-name:var(--aid-font-heading)] text-sm font-bold tracking-wide text-white uppercase">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/70 transition hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-4 font-[family-name:var(--aid-font-heading)] text-sm font-bold tracking-wide text-white uppercase">
                Social
              </h3>
              <ul className="flex flex-col gap-2.5">
                {zeonMeta.social.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 md:p-8">
            <h3 className="aid-heading mb-4 text-2xl text-white normal-case md:text-[1.75rem]">
              Stay in touch with ZeonAI Labs
            </h3>
            {status === "ok" ? (
              <p className="text-sm text-[var(--aid-lime)]">
                Thank you for your subscription!
              </p>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <label className="sr-only" htmlFor="aid-name">
                  Your full name
                </label>
                <input
                  id="aid-name"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--aid-lime)]"
                />
                <label className="sr-only" htmlFor="aid-email">
                  Your email address
                </label>
                <input
                  id="aid-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email address"
                  className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[var(--aid-lime)]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="aid-btn aid-btn-lime mt-1 w-fit disabled:opacity-60"
                >
                  {status === "loading" ? "Please wait..." : "Subscribe"}
                </button>
                {status === "error" ? (
                  <p className="text-xs text-red-300">
                    Oops! Something went wrong while submitting the form.
                  </p>
                ) : null}
                <p className="text-xs text-white/50">
                  By clicking “Subscribe” I agree that ZeonAI Labs may contact
                  me. See the{" "}
                  <a
                    href="/privacy-policy"
                    className="underline underline-offset-2"
                  >
                    privacy policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 ZeonAI Labs Private Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="/terms" className="hover:text-white">
              Terms
            </a>
            <a href="/privacy-policy" className="hover:text-white">
              Privacy policy
            </a>
            <a href={zeonMeta.email} className="hover:text-white">
              {zeonMeta.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
