"use client";

import React, { useState } from "react";

export default function FranchiseForm() {
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  // STRAPI_URL should be like: https://your-domain.strapiapp.com
  // We'll post to `${STRAPI_URL}/api/franchisee-forms`
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");
    setSubmitting(true);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Build multipart body per Strapi v4 rules:
    // - scalar fields must be under "data[...]" keys
    // - file fields must be under "files.<fieldName>"
    const payload = new FormData();

    // Map your input names 1:1 to Strapi fields
    // (these names match the inputs below)
    const data = {
      Name: String(formData.get("name") || ""),
      Email: String(formData.get("email") || ""),
      Phone: String(formData.get("phone") || ""),
      SetupLocation: String(formData.get("location") || ""),
      Country: String(formData.get("country") || ""),
      AMF: String(formData.get("franchiseType") || ""), // "Franchise" | "Area Master Franchise"
      LinkedIn: String(formData.get("linkedin") || ""),
      confirmationAccepted: !!formData.get("true"),
    };

    // Append scalars as data[...]
    Object.entries(data).forEach(([key, value]) => {
      // Booleans should be stringified for FormData
      payload.append(`data[${key}]`, typeof value === "boolean" ? String(value) : value);
    });

    // Append file if present
    const resumeFile = formData.get("resume");
    if (resumeFile instanceof File && resumeFile.size > 0) {
      payload.append("files.resume", resumeFile);
    }

    try {
      const res = await fetch(`${STRAPI_URL}/franchisee-forms`, {
        method: "POST",
        // If you're using a public role with "create" allowed, no headers needed.
        // If using an API token, uncomment below:
        // headers: {
        //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        // },
        body: payload,
      });

      if (!res.ok) {
        const err = await safeJson(res);
        setStatus(`❌ Failed: ${JSON.stringify(err)}`);
      } else {
        setStatus("✅ Application submitted!");
        formEl.reset();
      }
    } catch (error) {
      setStatus("❌ Network error");
    } finally {
      setSubmitting(false);
    }
  };

  // Helper to avoid JSON parse errors on non-JSON responses
  async function safeJson(res: Response) {
    try {
      return await res.json();
    } catch {
      const text = await res.text();
      return { status: res.status, message: text };
    }
  }

  return (
    <section className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="p-6">
          <h2 className="text-3xl font-semibold">AMF &amp; Franchisee Inquiry Form</h2>
          <p className="text-sm opacity-90 mt-1">
            Apply to join our mission-driven network of entrepreneurs.
          </p>
        </div>

        {/* Form */}
        <form className="p-6 space-y-8" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Responsive two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column: Personal Info */}
            <div className="space-y-6">
              {[
                { label: "Full Name", name: "name" },
                { label: "Email Address", name: "email", type: "email" },
                { label: "Phone Number", name: "phone" },
                { label: "Preferred Setup Location", name: "location" },
                { label: "Country", name: "country" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name} className="space-y-1">
                  <label htmlFor={name} className="block font-medium text-gray-700">
                    {label} *
                  </label>
                  <input
                    id={name}
                    type={type}
                    name={name}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
              ))}
            </div>

            {/* Right column: Options & Uploads */}
            <div className="space-y-6">
              {/* Radio */}
              <div>
                <p className="font-medium text-gray-700">Do you want a Franchise or an AMF? *</p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Franchise", "Area Master Franchise"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 border rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition"
                    >
                      <input type="radio" name="franchiseType" value={option} required />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Resume */}
              <div className="space-y-1">
                <label htmlFor="resume" className="block font-medium text-gray-700">
                  Upload Resume / CV
                </label>
                <input
                  id="resume"
                  type="file"
                  name="resume"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              {/* LinkedIn */}
              <div className="space-y-1">
                <label htmlFor="linkedin" className="block font-medium text-gray-700">
                  Or LinkedIn Profile URL
                </label>
                <input
                  id="linkedin"
                  type="url"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Consent */}
              <div className="flex items-start gap-2 text-sm">
                <input id="agree" type="checkbox" name="agree" required className="mt-1 accent-blue-600" />
                <label htmlFor="agree" className="text-gray-600">
                  I confirm the information provided is true and may be used for verification purposes.
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
          </div>

          {/* Status Message */}
          {status && <p className="text-sm mt-3">{status}</p>}

          {/* Footer Notes */}
          <div className="text-xs text-gray-500 space-y-1 pt-4">
            <p>* Applications without a resume/CV or LinkedIn profile will not be considered.</p>
            <p>* By submitting, you authorize Jibu to assess your application and perform any necessary checks.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
