import { SITE } from "./constants";

export function Talk() {
  return (
    <section className="bg-[var(--aid-bg)] pb-8 md:pb-10">
      <div className="aid-container">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-[var(--aid-blue)] px-6 py-16 text-center md:gap-8 md:px-10 md:py-[5.5rem]">
          <h2 className="aid-heading max-w-[16ch] text-[clamp(2.25rem,5vw,3.5rem)] text-white">
            Let’s talk programmatic!
          </h2>
          <p className="max-w-xl text-[0.9375rem] leading-[1.5] text-white/90 md:text-base">
            Whether you want to collaborate, join the team, or just geek out –
            drop us a line!
          </p>
          <a href={`${SITE}/contact`} className="aid-btn aid-btn-lime">
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
