import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sites/zeon/Footer";
import { zeonMeta, zeonTerms } from "@/lib/zeonai/content";

export const metadata: Metadata = {
  title: "Terms | ZeonAI Labs",
  description: "Website terms for ZeonAI Labs (draft for legal review).",
};

export default function TermsPage() {
  return (
    <>
      <main className="bg-paper px-6 py-16 text-text-ink lg:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-terracotta">
            Legal
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal tracking-tight">
            {zeonTerms.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            {zeonTerms.notice}
          </p>
          <div className="mt-8 grid gap-6">
            {zeonTerms.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-2 text-base font-semibold">
                  {section.heading}
                </h2>
                <p className="text-sm leading-relaxed text-text-muted">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
          <p className="mt-8 text-sm">
            Contact:{" "}
            <a className="text-terracotta hover:underline" href={zeonMeta.email}>
              {zeonMeta.contactEmail}
            </a>
          </p>
          <p className="mt-4 text-sm">
            <Link className="text-terracotta hover:underline" href="/">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
