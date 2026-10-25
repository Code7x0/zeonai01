import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sites/aidigital/Footer";
import { zeonMeta, zeonPrivacy } from "@/lib/zeonai/content";

export const metadata: Metadata = {
  title: "Privacy policy | ZeonAI Labs",
  description:
    "Draft privacy policy for the ZeonAI Labs website (for legal review).",
};

export default function PrivacyPolicyPage() {
  return (
    <>
    <main className="bg-[var(--aid-bg)] pt-28 pb-20">
      <div className="aid-container max-w-3xl">
        <p className="mb-3 text-sm font-semibold tracking-wide text-[var(--aid-blue)] uppercase">
          Legal
        </p>
        <h1 className="aid-heading mb-3 text-[clamp(2.25rem,5vw,3.5rem)] text-[var(--aid-blue)]">
          {zeonPrivacy.title}
        </h1>
        <p className="mb-2 text-sm font-medium text-[var(--aid-blue)]">
          {zeonPrivacy.notice}
        </p>
        <p className="mb-10 text-sm leading-[1.5] text-[var(--aid-grey)]">
          {zeonPrivacy.disclaimer}
        </p>
        <div className="flex flex-col gap-8">
          {zeonPrivacy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-2 text-lg font-semibold text-[var(--aid-blue)]">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p
                  key={p}
                  className="mb-2 text-[0.975rem] leading-[1.55] text-[var(--aid-ink)] last:mb-0"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-12 text-sm text-[var(--aid-ink)]">
          Contact:{" "}
          <a
            href={zeonMeta.email}
            className="font-medium text-[var(--aid-blue)] underline-offset-2 hover:underline"
          >
            {zeonMeta.contactEmail}
          </a>
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex text-sm font-medium text-[var(--aid-blue)] underline-offset-2 hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    </main>
    <Footer />
    </>
  );
}
