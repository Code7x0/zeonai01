import { Architecture } from "./Architecture";
import { Articles } from "./Articles";
import { Elevate } from "./Elevate";
import { Hero } from "./Hero";
import { OpenGarden } from "./OpenGarden";
import { Services } from "./Services";
import { Talk } from "./Talk";
import { Team } from "./Team";

export function HomePage() {
  return (
    <main>
      <Hero />
      <Elevate />
      <Architecture />
      <Services />
      <OpenGarden />
      <Team />
      <Articles />
      <Talk />
    </main>
  );
}
