// ==========================
// File: app/components/JobApplicationForm.tsx
// ==========================
"use client";

import { Link } from "lucide-react";
import React, { useState } from "react";
import BackLink from "../subcomponents/BackButton";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN; // if you use one

function normalizeUrl(u?: string) {
  if (!u) return "";
  return u.startsWith("http") ? u : `${STRAPI_URL}${u}`;
}

export default function JobApplicationForm({
  jobTitle,
  location,
  description,
  fullDescription,
  type,
}: {
  jobTitle: string;
  location?: string;
  description?: string;
  fullDescription?: string;
  type?: string;
}) {
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // STRAPI_URL should be like: https://your-domain.strapiapp.com
  // We'll post to `${STRAPI_URL}/api/job-applications`
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); setSubmitted(false);

    

    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());

    const resume = (form.elements.namedItem("resume") as HTMLInputElement)?.files?.[0];
    if (!resume) { setError("Please attach your resume."); return; }

    try {
        // 1) Upload the file to /api/upload
        const fileFD = new FormData();
        fileFD.append("files", resume, resume.name ?? "resume");
        const upRes = await fetch(`${STRAPI_URL}/upload`, {
        method: "POST",
        body: fileFD,
        headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
        });
        if (!upRes.ok) throw new Error(await upRes.text());
        const uploaded = await upRes.json(); // [{ id, url, ... }]
        const fileId = uploaded?.[0]?.id;
        if (!fileId) throw new Error("Upload succeeded but no file id returned.");

        // 2) Create the job-application and link the file id
        const createRes = await fetch(`${STRAPI_URL}/job-applications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
        },
        body: JSON.stringify({
            data: {
            name: fields.name,
            email: fields.email,
            phone: fields.phone,
            applicantLocation: fields.applicantLocation,
            linkedin: fields.linkedin || null,
            coverLetter: fields.coverLetter || null,
            consent: Boolean(fields.consent),
            jobTitle,
            jobLocation: location ?? null,
            jobDescription: description ?? null,
            jobType: type ?? null,
            resume: fileId, // single-media expects a single id
            },
        }),
        });
        if (!createRes.ok) throw new Error(await createRes.text());

        setSubmitted(true);
        form.reset();
    } catch (err: any) {
        setError(err?.message ?? "Something went wrong. Please try again.");
    }
    }


  // Helper to avoid JSON parse errors on non-JSON responses
  async function safeJson(res: Response) {
    try {
      return await res.json();
    } catch {
      const text = await res.text();
      return { status: res.status, message: text } as any;
    }
  }
  function formatErr(err: any) {
    if (!err) return "Unknown error";
    if (typeof err === "string") return err;
    if (err.error) return JSON.stringify(err.error);
    if (err.message) return err.message;
    return JSON.stringify(err);
  }

  return (
    <form
      className="max-w-2xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-md space-y-6"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      {/* Header with job info */}
      <header className="space-y-1">
        <BackLink />
        <h2 className="text-2xl font-bold">Apply for {jobTitle}</h2>
        {location && <p className="text-sm text-slate-600">{location}</p>}
        {type && <p className="text-sm text-slate-600">{type}</p>}
        {description && (
          <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        )}
        {fullDescription && (
        <a
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            href={normalizeUrl(fullDescription)}
            target="_blank"
            rel="noopener noreferrer"
        >
            Full Job Description
        </a>)}
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
          <input id="consent" type="checkbox" name="consent" required className="mt-1" />
          <span>
            I confirm that the information provided is accurate and may be used
            for recruitment purposes.
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting…" : "Submit Application"}
      </button>

      {submitted && (
        <p className="text-sm text-green-600 pt-2">
          ✅ Your application has been submitted!
        </p>
      )}

      {status && (
        <p className="text-sm pt-2" role="status">
          {status}
        </p>
      )}
    </form>
  );
}

// ==========================
// File: .env.local (example)
// ==========================
// NEXT_PUBLIC_STRAPI_URL=https://cms.your-domain.com
// NEXT_PUBLIC_STRAPI_TOKEN=your_public_or_pat_token_if_used

// ==========================
// Strapi setup notes
// ==========================
// * Content-Type: `job-application` (pluralized route → /api/job-applications)
//   Fields: name, email, phone, applicantLocation, linkedin, coverLetter, consent (boolean),
//           jobTitle, jobLocation, jobDescription, jobType, resume (media)
// * If you use a token, create an API Token with `create` permission for the content-type and
//   allow your site domain in CORS. If you don’t want a public token in the client, proxy via
//   a Next.js Route Handler and keep the token server-side.
