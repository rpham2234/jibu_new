'use client';

export default function ContactForm() {
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
          <form action="#" method="POST" className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-md bg-gray-100 px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
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
              className="rounded-md bg-[#005499] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Submit
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
