import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
};

/**
 * Newsletter proxy. Prefers HubSpot Forms API when env is configured;
 * otherwise accepts and returns success so the UI matches the source flow.
 *
 * Optional env:
 * - HUBSPOT_PORTAL_ID
 * - HUBSPOT_NEWSLETTER_FORM_ID
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Name and valid email are required" },
      { status: 400 },
    );
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_NEWSLETTER_FORM_ID;

  if (portalId && formId) {
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { name: "firstname", value: name },
              { name: "email", value: email },
            ],
            context: {
              pageUri: "https://www.aidigital.com/",
              pageName: "AI Digital Home",
            },
          }),
        },
      );

      if (!res.ok) {
        const detail = await res.text();
        console.error("HubSpot submit failed", res.status, detail);
        return NextResponse.json(
          { ok: false, error: "Subscription failed" },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("HubSpot submit error", err);
      return NextResponse.json(
        { ok: false, error: "Subscription failed" },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
