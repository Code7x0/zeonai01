import Image from "next/image";

const logos = [
  { src: "/sites/zeonai/logos/fujitsu.png", alt: "Fujitsu" },
  {
    src: "/sites/zeonai/logos/national-capital-district-commission.png",
    alt: "National Capital District Commission",
  },
  { src: "/sites/zeonai/logos/indian-air-force.png", alt: "Indian Air Force" },
  { src: "/sites/zeonai/logos/aidea-labs.png", alt: "aiDea Labs" },
  {
    src: "/sites/zeonai/logos/aditya-birla-hindalco.png",
    alt: "Aditya Birla Hindalco",
  },
  {
    src: "/sites/zeonai/logos/mahanadi-coalfields.png",
    alt: "Mahanadi Coalfields",
  },
  {
    src: "/sites/zeonai/logos/quantum-lending-solutions.png",
    alt: "Quantum Lending Solutions",
  },
  {
    src: "/sites/zeonai/logos/la-trobe-financial.png",
    alt: "La Trobe Financial",
  },
] as const;

export function Logos() {
  return (
    <section className="zn-logos" aria-label="Trusted organisations">
      <div className="zn-wrap">
        <p>Trusted by leading organisations worldwide</p>
        <div className="zn-logos-row">
          {logos.map((l) => (
            <Image
              key={l.alt}
              src={l.src}
              alt={l.alt}
              width={140}
              height={36}
            />
          ))}
        </div>
        <div className="zn-signal">
          <div>
            <strong>50+</strong>
            <span>agents in portfolio</span>
          </div>
          <div>
            <strong>6</strong>
            <span>platform layers</span>
          </div>
          <div>
            <strong>Audit</strong>
            <span>built in, not bolted on</span>
          </div>
        </div>
      </div>
    </section>
  );
}
