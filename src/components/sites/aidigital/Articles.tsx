import Image from "next/image";
import { articles } from "./constants";

export function Articles() {
  return (
    <section className="bg-[var(--aid-bg)] py-16 md:py-24">
      <div className="aid-container">
        <h2 className="aid-heading mb-10 text-[clamp(2rem,4vw,3rem)] text-[var(--aid-blue)] md:mb-12">
          Latest articles
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <a
              key={article.href}
              href={article.href}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[var(--aid-blue-100)]">
                <Image
                  src={article.image}
                  alt=""
                  width={640}
                  height={400}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                <div className="flex flex-wrap gap-2 text-[0.7rem] font-semibold tracking-wide text-[var(--aid-blue)] uppercase">
                  <span>Blog</span>
                  <span className="text-[var(--aid-grey)]">•</span>
                  <span>{article.category}</span>
                </div>
                <h3 className="text-lg leading-snug font-semibold text-[var(--aid-ink)] md:text-xl">
                  {article.title}
                </h3>
                <p className="mt-auto pt-2 text-sm text-[var(--aid-grey)]">
                  {article.date}
                  <span className="mx-1.5">•</span>
                  {article.read}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
