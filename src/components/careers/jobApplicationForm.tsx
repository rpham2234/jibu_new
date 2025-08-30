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

  return (
    <form
      className="max-w-2xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-md space-y-6"
      action="https://getform.io/f/your-endpoint-here" // replace with Getform/Formspree/Strapi endpoint
      method="POST"
      encType="multipart/form-data"
      onSubmit={() => setSubmitted(true)}
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
    </form>
  );
}
