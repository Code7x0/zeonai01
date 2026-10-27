"use client";

import { offices } from "./constants";
import { FlagCanada, FlagIndia, FlagUae } from "./OfficeFlags";

const FLAG_BY_ID = {
  india: FlagIndia,
  uae: FlagUae,
  canada: FlagCanada,
} as const;

/**
 * Compact three-office strip for the footer (India, UAE, Canada).
 * Book-a-demo CTAs live in Talk — not here.
 */
export function OfficesBand() {
  return (
    <section className="aid-footer-offices" aria-label="Our offices">
      <div className="aid-container">
        <p className="aid-footer-offices-label">Offices</p>
        <ul className="aid-footer-offices-grid">
          {offices.map((o) => {
            const Flag = FLAG_BY_ID[o.id];
            return (
              <li key={o.id} className="aid-footer-office">
                <div className="aid-footer-office-flag" title={o.country}>
                  <Flag />
                </div>
                <div className="aid-footer-office-copy">
                  <h3>{o.title}</h3>
                  <a href={o.map} target="_blank" rel="noopener noreferrer">
                    {o.address}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** @deprecated Use OfficesBand via Footer */
export function Team() {
  return <OfficesBand />;
}
