import { Engineering } from "./engineering/Engineering";
import { Industries } from "./industries/Industries";

/**
 * Section 03 Engineering → 04 Industries.
 * Customers (05), Governance (06), then Who are you? follow in HomePage.
 */
export function OpenGarden() {
  return (
    <>
      <Engineering />
      <Industries />
    </>
  );
}
