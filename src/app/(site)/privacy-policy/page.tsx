import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sites/zeon/Footer";
import { zeonMeta, zeonPrivacy } from "@/lib/zeonai/content";

export const metadata: Metadata = {
  title: "Privacy policy | ZeonAI Labs",
  description:
    "Draft privacy policy for the ZeonAI Labs website (for legal review).",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="bg-paper px-6 py-16 text-text-ink lg:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-terracotta">
            Legal
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal tracking-tight">
            {zeonPrivacy.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            {zeonPrivacy.notice}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-faint">
            {zeonPrivacy.disclaimer}
          </p>
          <div className="mt-8 grid gap-6">
            {zeonPrivacy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-2 text-base font-semibold">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p) => (
                  <p
                    key={p}
                    className="mb-2 text-sm leading-relaxed text-text-muted"
                  >
                    {p}
                  </p>
                ))}
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
