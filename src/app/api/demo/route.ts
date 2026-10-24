import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  team?: string;
  interest?: string;
  message?: string;
  consent?: boolean;
};

/**
 * Demo request intake. Accepts and acknowledges submissions so the UI matches
 * the ZeonAI source flow. Wire to CRM later via env when available.
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
  const company = (body.company ?? "").trim();
  const interest = (body.interest ?? "").trim();
  const message = (body.message ?? "").trim();

  if (
    !name ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !company ||
    !interest ||
    !message ||
    !body.consent
  ) {
    return NextResponse.json(
      { ok: false, error: "Required fields missing" },
      { status: 400 },
    );
  }

  console.info("[demo-request]", {
    name,
    email,
    company,
    role: body.role,
    team: body.team,
    interest,
  });

  return NextResponse.json({ ok: true });
}
