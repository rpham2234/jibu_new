// app/api/apply/route.ts
import { NextRequest, NextResponse } from "next/server";

// Force Node runtime so file streams work reliably
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
    const STRAPI_TOKEN = process.env.STRAPI_TOKEN; // server-only

    if (!STRAPI_URL) {
      return NextResponse.json({ error: "Missing STRAPI_URL env" }, { status: 500 });
    }

    // Read incoming multipart form data from the client form
    const incoming = await req.formData();

    // Build Strapi multipart (v4): "data" JSON + "files.resume"
    const data = {
      name: incoming.get("name"),
      email: incoming.get("email"),
      phone: incoming.get("phone"),
      applicantLocation: incoming.get("applicantLocation"),
      linkedin: incoming.get("linkedin"),
      coverLetter: incoming.get("coverLetter"),
      consent: !!incoming.get("consent"),
      jobTitle: incoming.get("jobTitle"),
      jobLocation: incoming.get("jobLocation"),
      jobDescription: incoming.get("jobDescription"),
      jobType: incoming.get("jobType"),
    } as Record<string, any>;

    const resume = incoming.get("resume") as File | null;

    const outgoing = new FormData();
    outgoing.set("data", JSON.stringify(data));
    if (resume) {
      outgoing.append("files.resume", resume, (resume as any).name ?? "resume");
    }

    const headers: Record<string, string> = {};
    if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

    const res = await fetch(`${STRAPI_URL}/api/job-applications`, {
      method: "POST",
      headers,
      body: outgoing,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Strapi error: ${text}` }, { status: 500 });
    }

    const json = await res.json();
    return NextResponse.json({ ok: true, id: json?.data?.id ?? null });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown server error" },
      { status: 500 }
    );
  }
}

// Optional: make GET return a helpful 405 instead of a 404
export function GET() {
  return new NextResponse("Use POST", { status: 405, headers: { Allow: "POST" } });
}
