"use client";

import { FormEvent, useState } from "react";
import { zeonDemo, zeonMeta } from "@/lib/zeonai/content";

export function Talk() {
  const [status, setStatus] = useState<"idle" | "ok" | "error" | "loading">(
    "idle",
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
          role: String(data.get("role") ?? ""),
          team: String(data.get("team") ?? ""),
          interest: String(data.get("interest") ?? ""),
          message: String(data.get("message") ?? ""),
          consent: data.get("consent") === "on",
        }),
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
    <section
      id={zeonDemo.id}
      className="bg-[var(--aid-bg)] pb-8 md:pb-10"
    >
      <div className="aid-container">
        <div className="rounded-2xl bg-[var(--aid-blue)] text-white">
          <div className="grid items-start gap-10 px-6 py-12 md:px-10 md:py-16 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="aid-heading max-w-[16ch] text-[clamp(2.25rem,5vw,3.5rem)] text-white">
                {zeonDemo.title}
              </h2>
              <p className="mt-4 max-w-xl text-[0.9375rem] leading-[1.5] text-white/90 md:text-base">
                {zeonDemo.body}
              </p>
              <h3 className="mt-10 text-sm font-semibold tracking-wide text-[var(--aid-lime)] uppercase">
                {zeonDemo.nextTitle}
              </h3>
              <ol className="mt-4 flex flex-col gap-4">
                {zeonDemo.nextSteps.map((step) => (
                  <li key={step.num} className="flex gap-3">
                    <span className="aid-heading text-lg text-[var(--aid-lime)]">
                      {step.num}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm leading-[1.45] text-white/85">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-white p-6 text-[var(--aid-ink)] md:p-8">
              <h3 className="text-lg font-semibold text-[var(--aid-blue)]">
                {zeonDemo.formTitle}
              </h3>
              <p className="mt-1 text-xs text-[var(--aid-grey)]">
                {zeonDemo.formNote}
              </p>

              {status === "ok" ? (
                <p className="mt-6 text-sm font-medium text-[var(--aid-blue)]">
                  Thanks — we will be in touch shortly.
                </p>
              ) : (
                <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3">
                  <label className="text-xs font-medium text-[var(--aid-blue)]">
                    Name
                    <input
                      name="name"
                      required
                      className="mt-1 w-full rounded-xl border border-black/10 bg-[var(--aid-bg)] px-3 py-2.5 text-sm outline-none focus:border-[var(--aid-blue)]"
                    />
                  </label>
                  <label className="text-xs font-medium text-[var(--aid-blue)]">
                    Work email
                    <input
                      name="email"
                      type="email"
                      required
                      className="mt-1 w-full rounded-xl border border-black/10 bg-[var(--aid-bg)] px-3 py-2.5 text-sm outline-none focus:border-[var(--aid-blue)]"
                    />
                  </label>
                  <label className="text-xs font-medium text-[var(--aid-blue)]">
                    Company
                    <input
                      name="company"
                      required
                      className="mt-1 w-full rounded-xl border border-black/10 bg-[var(--aid-bg)] px-3 py-2.5 text-sm outline-none focus:border-[var(--aid-blue)]"
                    />
                  </label>
                  <label className="text-xs font-medium text-[var(--aid-blue)]">
                    Role (optional)
                    <select
                      name="role"
                      className="mt-1 w-full rounded-xl border border-black/10 bg-[var(--aid-bg)] px-3 py-2.5 text-sm outline-none focus:border-[var(--aid-blue)]"
                      defaultValue=""
                    >
                      <option value="">Select a role</option>
                      {zeonDemo.roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs font-medium text-[var(--aid-blue)]">
                    Team / function (optional)
                    <input
                      name="team"
                      className="mt-1 w-full rounded-xl border border-black/10 bg-[var(--aid-bg)] px-3 py-2.5 text-sm outline-none focus:border-[var(--aid-blue)]"
                    />
                  </label>
                  <fieldset>
                    <legend className="text-xs font-medium text-[var(--aid-blue)]">
                      Interest
                    </legend>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {zeonDemo.interests.map((interest) => (
                        <label
                          key={interest}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="radio"
                            name="interest"
                            value={interest}
                            required
                            className="accent-[var(--aid-blue)]"
                          />
                          {interest}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="text-xs font-medium text-[var(--aid-blue)]">
                    Message
                    <textarea
                      name="message"
                      required
                      rows={3}
                      className="mt-1 w-full rounded-xl border border-black/10 bg-[var(--aid-bg)] px-3 py-2.5 text-sm outline-none focus:border-[var(--aid-blue)]"
                    />
                  </label>
                  <label className="flex items-start gap-2 text-xs leading-[1.4] text-[var(--aid-ink)]">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-0.5 accent-[var(--aid-blue)]"
                    />
                    <span>
                      I agree that ZeonAI Labs may contact me about this
                      request. See the{" "}
                      <a
                        href="/privacy-policy"
                        className="underline underline-offset-2"
                      >
                        privacy policy
                      </a>
                      .
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="aid-btn aid-btn-lime mt-2 w-fit disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending…" : zeonDemo.cta.label}
                  </button>
                  {status === "error" ? (
                    <p className="text-xs text-red-600">
                      Something went wrong. {zeonDemo.fallback}
                    </p>
                  ) : (
                    <p className="text-xs text-[var(--aid-grey)]">
                      Or email{" "}
                      <a
                        href={zeonMeta.email}
                        className="underline underline-offset-2"
                      >
                        {zeonMeta.contactEmail}
                      </a>
                      .
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
