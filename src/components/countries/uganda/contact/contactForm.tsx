'use client';

import React, { useState } from 'react';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? '';
const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN; // optional (prefer server-side proxy)

type ContactFormProps = {
  countryCode?: string; // e.g., "US"
};

export default function ContactForm({ countryCode = 'UG' }: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitted(false);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData.entries());

    // Basic client validation
    if (!fields.name || !fields.email || !fields.subject) {
      setError('Please fill in name, email, and subject.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${STRAPI_URL}/${countryCode.toLowerCase()}-contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
        },
        body: JSON.stringify({
          data: {
            contact: {
              name: fields.name,
              email: fields.email,
              subject: fields.subject,
              message: fields.message || '',
          }
          },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to submit contact message.');
      }

      setSubmitted(true);
      form.reset();
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-16 xl:px-48">
      <div className="mx-auto max-w-7xl">
        {/* Two-column grid for desktop, single-column for mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT: Text */}
          <div className="text-left">
            <p className="text-2xl font-semibold text-gray-900">
              Send us your requests or inquiries and we will get back to you within 24 hours.
            </p>
          </div>

          {/* RIGHT: Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            <textarea
              name="message"
              placeholder="Message (Optional)"
              rows={4}
              className="w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />

            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-[#005499] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting…' : 'Submit'}
            </button>

            {submitted && (
              <p className="text-sm text-green-600">✅ Your message has been sent!</p>
            )}
            {error && (
              <p className="text-sm text-red-600" role="alert">{error}</p>
            )}
          </form>

        </div>
      </div>
    </div>
  );
}
