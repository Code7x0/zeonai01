import { Architecture } from "./Architecture";
import { Customers } from "./customers/Customers";
import { Elevate } from "./Elevate";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { OpenGarden } from "./OpenGarden";
import { Roles } from "./roles/Roles";
import { WhoStack } from "./roles/WhoStack";
import { Services } from "./Services";
import { Talk } from "./Talk";
import { Trust } from "./Trust";

export function HomePage() {
  return (
    <main>
      <Hero />
      <Elevate />
      <Architecture />
      <Services />
      <OpenGarden />
      <Customers />
      <WhoStack>
        <Trust />
        <div className="aid-gov-runway" aria-hidden="true" />
        <div className="aid-who-chapter">
          <Roles />
        </div>
        {/* Book a demo stacks over Who (Scale-style); footer offices follow */}
        <div className="aid-after-who">
          <Talk />
          <Footer />
        </div>
      </WhoStack>
    </main>
  );
}
