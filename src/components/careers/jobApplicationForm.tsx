// ==========================
// File: app/components/JobApplicationForm.tsx
// ==========================
"use client";

import { useState } from "react";

export default function JobApplicationForm({
  jobTitle,
  location,
  description,
  type,
}: {
  jobTitle: string;
  location?: string;
  description?: string;
  type?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Basic client-side guard: make sure a file exists
    const resumeInput = form.elements.namedItem("resume") as HTMLInputElement | null;
    const resume = resumeInput?.files?.[0];
    if (!resume) {
      setError("Please attach your resume.");
      return;
    }

    try {
      const res = await fetch(`${STRAPI_URL}/api/job-applications`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to submit application");
      }

      setSubmitted(true);
      form.reset();
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <form
      className="max-w-2xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-md space-y-6"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      {/* Header with job info */}
      <header className="space-y-1">
        <h2 className="text-2xl font-bold">Apply for {jobTitle}</h2>
        {location && <p className="text-sm text-slate-600">{location}</p>}
        {type && <p className="text-sm text-slate-600">{type}</p>}
        {description && (
          <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        )}
      </header>

      {/* Hidden inputs so backend knows the role */}
      <input type="hidden" name="jobTitle" value={jobTitle} />
      {location && <input type="hidden" name="jobLocation" value={location} />}
      {description && (
        <input type="hidden" name="jobDescription" value={description} />
      )}
      {type && <input type="hidden" name="jobType" value={type} />}

      {/* Applicant fields */}
      {[
        { label: "Full Name", name: "name" },
        { label: "Email", name: "email", type: "email" },
        { label: "Phone Number", name: "phone" },
        { label: "Current Location", name: "applicantLocation" },
      ].map(({ label, name, type = "text" }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-slate-700">
            {label} *
          </label>
          <input
            type={type}
            name={name}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      ))}

      {/* Resume / LinkedIn */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Upload Resume/CV *
        </label>
        <input
          type="file"
          name="resume"
          required
          accept=".pdf,.doc,.docx"
          className="mt-1 w-full text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Or provide LinkedIn profile URL
        </label>
        <input
          type="url"
          name="linkedin"
          placeholder="https://linkedin.com/in/username"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Cover letter */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Cover Letter
        </label>
        <textarea
          name="coverLetter"
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          placeholder="Why are you a good fit for this role?"
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consent" required className="mt-1" />
          <span>
            I confirm that the information provided is accurate and may be used
            for recruitment purposes.
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
      >
        Submit Application
      </button>

      {submitted && (
        <p className="text-sm text-green-600 pt-2">
          ✅ Your application has been submitted!
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 pt-2" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

// ==========================
// File: app/api/apply/route.ts (Next.js App Router)
// ==========================
import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy the form submission to Strapi securely.
 *
 * Expected Strapi setup (v4):
 * - Collection type: `job-application` (API UID `job-application` → endpoint `/api/job-applications`)
 *   Fields (examples):
 *     - name (Text)
 *     - email (Email)
 *     - phone (Text)
 *     - applicantLocation (Text)
 *     - linkedin (Text / URL)
 *     - coverLetter (Rich text or Text)
 *     - consent (Boolean)
 *     - jobTitle (Text)
 *     - jobLocation (Text)
 *     - jobDescription (Rich text or Text)
 *     - jobType (Text)
 *     - resume (Media, single file)
 *
 * Permissions: allow `create` for this content-type via API token
 * or temporarily for Public role if you prefer no token.
 */
export async function POST(req: NextRequest) {
  try {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL; // e.g. https://cms.example.com
    //const STRAPI_TOKEN = process.env.STRAPI_TOKEN; // Strapi API Token with create perms for job-application

    if (!STRAPI_URL) {
      return NextResponse.json(
        { error: "Missing STRAPI_URL env" },
        { status: 500 }
      );
    }

    // Read incoming multipart form data
    const incoming = await req.formData();

    // Build multipart payload compatible with Strapi's combined upload
    // https://docs.strapi.io/dev-docs/api/rest/interactive-api-explorer#create-an-entry-with-files
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
      outgoing.append("files.resume", resume, (resume as any).name ?? "resume" );
    }

    const headers: Record<string, string> = {};
    //if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

    const res = await fetch(`${STRAPI_URL}/api/job-applications`, {
      method: "POST",
      headers,
      body: outgoing,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `Strapi error: ${text}` },
        { status: 500 }
      );
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

// ==========================
// File: .env.local (example)
// ==========================
// STRAPI_URL=https://cms.your-domain.com
// STRAPI_TOKEN=your_strapi_api_token_with_create_permission

// ==========================
// Notes
// ==========================
// 1) In Strapi Admin → Settings → Users & Permissions Plugin → Roles → (If using API token, skip) Public:
//    - Enable `create` on the `job-application` content-type if you prefer tokenless submissions.
//    Using an API token via the proxy is recommended.
//
// 2) If you use a different collection UID, adjust the route `${STRAPI_URL}/api/<your-uid>`.
//
// 3) CORS: allow your Next.js site origin in Strapi (Settings → Global Settings → CORS),
//    though the proxy means the browser only talks to your Next.js domain.
//
// 4) Spam protection: you can add a hidden honeypot field (e.g., `website`) in the form and drop if filled.
//
// 5) If you later want to send notifications (Slack/Email), do it in this API route after a successful Strapi create.
