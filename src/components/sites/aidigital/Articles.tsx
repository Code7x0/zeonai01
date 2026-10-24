import Image from "next/image";
import { zeonCustomers } from "@/lib/zeonai/content";

export function Articles() {
  return (
    <section
      id={zeonCustomers.id}
      className="bg-[var(--aid-bg)] py-16 md:py-24"
    >
      <div className="aid-container">
        <h2 className="aid-heading mb-3 text-[clamp(2rem,4vw,3rem)] text-[var(--aid-blue)]">
          {zeonCustomers.title}
        </h2>
        <p className="mb-10 max-w-2xl text-[0.9375rem] leading-[1.45] text-[var(--aid-ink)] md:mb-12 md:text-base">
          {zeonCustomers.lead}
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {zeonCustomers.cases.map((article) => (
            <article
              key={article.title}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[var(--aid-blue-100)]">
                <Image
                  src={article.image}
                  alt=""
                  width={640}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                <div className="flex flex-wrap gap-2 text-[0.7rem] font-semibold tracking-wide text-[var(--aid-blue)] uppercase">
                  <span>Case study</span>
                  <span className="text-[var(--aid-grey)]">•</span>
                  <span>{article.category}</span>
                </div>
                <h3 className="text-lg leading-snug font-semibold text-[var(--aid-ink)] md:text-xl">
                  {article.title}
                </h3>
                <p className="text-sm text-[var(--aid-grey)]">{article.meta}</p>
                <p className="text-sm font-medium text-[var(--aid-blue)]">
                  {article.detail}
                </p>
                <div className="mt-2 flex flex-col gap-3 border-t border-black/5 pt-3 text-[0.8125rem] leading-[1.45] text-[var(--aid-ink)]">
                  <p>
                    <span className="font-semibold text-[var(--aid-blue)]">
                      The challenge.{" "}
                    </span>
                    {article.challenge}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--aid-blue)]">
                      What we deployed.{" "}
                    </span>
                    {article.deployed}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--aid-blue)]">
                      The outcome.{" "}
                    </span>
                    {article.outcome}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
