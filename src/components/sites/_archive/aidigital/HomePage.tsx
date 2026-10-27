import { Architecture } from "./Architecture";
import { Customers } from "./customers/Customers";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { OpenGarden } from "./OpenGarden";
import { Roles } from "./roles/Roles";
import { Services } from "./Services";
import { Talk } from "./Talk";
import { Trust } from "./Trust";

/**
 * Governed-instrument homepage — product tour first, linear story, no bury theatre.
 * Narrative: claim → tour → architecture → capabilities → industries → proof → trust → demo.
 */
export function HomePage() {
  return (
    <main className="zx-main">
      <Hero />
      <Architecture />
      <Services />
      <OpenGarden />
      <Customers />
      <Trust />
      <Roles />
      <Talk />
      <Footer />
    </main>
  );
}
