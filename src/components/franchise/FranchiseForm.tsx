"use client";

import React, { useState } from "react";

export default function FranchiseForm() {
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  // STRAPI_URL should be like: https://your-domain.strapiapp.com
  // We'll post to `${STRAPI_URL}/franchisee-forms`
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");
    setSubmitting(true);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Build scalar fields exactly as they exist in your Strapi model
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

    // Grab resume file
    const resumeFile = formData.get("resume") as File | null;
    let resumeId: number | null = null;

    try {
      // STEP 1: upload file (Strapi v4 upload endpoint)
      if (resumeFile && resumeFile.size > 0) {
        const uploadFD = new FormData();
        uploadFD.append("files", resumeFile, resumeFile.name);

        const uploadRes = await fetch(`${STRAPI_URL}/upload`, {
          method: "POST",
          // headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}` }, // if needed
          body: uploadFD,
        });
        if (!uploadRes.ok) throw new Error(`Upload failed: ${await uploadRes.text()}`);

        const uploaded = await uploadRes.json(); // [{ id, url, ... }]
        resumeId = uploaded?.[0]?.id ?? null;
        if (!resumeId) throw new Error("Upload returned no file id.");
      }

      // STEP 2: create the entry and link the file id under the "Resume" field
      const createRes = await fetch(`${STRAPI_URL}/franchisee-forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ...(process.env.NEXT_PUBLIC_STRAPI_TOKEN
          //   ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}` }
          //   : {}),
        },
        body: JSON.stringify({
          data: {
            ...data,
            // IMPORTANT: use the exact attribute name from Strapi (case-sensitive)
            Resume: resumeId, // single-media expects a single numeric id
          },
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json().catch(async () => ({ error: await createRes.text() }));
        setStatus(`Failed: ${JSON.stringify(err)}`);
      } else {
        setStatus("Application submitted!");
        formEl.reset();
      }
    } catch (error: any) {
      setStatus(`Error: ${error.message || "Network error"}`);
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
    <section className="w-full flex flex-col md:flex-row min-h-screen">
      {/* Left Column: Heading & Info */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          AMF &amp; Franchisee Inquiry Form
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Apply to join our mission-driven network of entrepreneurs. We are looking for dedicated partners to help us bring affordable, safe drinking water to communities.
        </p>
        <div className="hidden md:block">
          {/* Optional: Add some trust indicators or extra text here if needed later */}
          <div className="flex gap-4">
            <div className="h-1 w-20 bg-blue-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right Column: Form Section */}
      <div className="w-full md:w-1/2 bg-[#005499] flex items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          <form className="p-6 md:p-8 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">

            {/* Status Message - Top */}
            {status && (
              <div className={`p-4 rounded-lg text-sm ${status.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {status}
              </div>
            )}

            {/* Personal Info */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Full Name", name: "name" },
                  { label: "Email Address", name: "email", type: "email" },
                  { label: "Phone Number", name: "phone" },
                  { label: "Preferred Setup Location", name: "location" },
                  { label: "Country", name: "country" },
                ].map(({ label, name, type = "text" }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
                      {label} *
                    </label>
                    <input
                      id={name}
                      type={type}
                      name={name}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Franchise Type */}
            <div>
              <p className="block text-sm font-semibold text-gray-700 mb-2">Do you want a Franchise or an AMF? *</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Franchise", "Area Master Franchise"].map((option) => (
                  <label
                    key={option}
                    className="relative flex items-center justify-center border-2 border-gray-200 rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group"
                  >
                    <input type="radio" name="franchiseType" value={option} required className="sr-only peer" />
                    <span className="text-gray-600 font-medium peer-checked:text-blue-700 z-10">{option}</span>
                    {/* Active state border via CSS or just rely on peer-checked styling if using Tailwind forms plugin, but explicit border logic: */}
                    <div className="absolute inset-0 border-2 border-transparent peer-checked:border-blue-600 rounded-lg pointer-events-none" />
                  </label>
                ))}
              </div>
            </div>

            {/* Upload & LinkedIn */}
            <div className="space-y-4">
              <div>
                <label htmlFor="resume" className="block text-sm font-semibold text-gray-700 mb-1">
                  Upload Resume / CV <span className="text-gray-400 font-normal">(PDF, DOC)</span>
                </label>
                <input
                  id="resume"
                  type="file"
                  name="resume"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-700 mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  id="linkedin"
                  type="url"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input id="agree" type="checkbox" name="agree" required className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="agree" className="text-sm text-gray-600">
                I confirm the information provided is true.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#005499] text-white font-bold py-3.5 rounded-lg hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md transform active:scale-[0.98]"
            >
              {submitting ? "Submitting Application..." : "Submit Application"}
            </button>

            {/* Footer Notes */}
            <div className="text-xs text-center text-gray-400">
              * Applications without a resume or LinkedIn will not be considered.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
