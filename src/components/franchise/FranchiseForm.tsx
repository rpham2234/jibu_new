"use client";

export default function FranchiseForm() {
  return (
    <section className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="p-6">
          <h2 className="text-3xl font-semibold">AMF & Franchisee Inquiry Form</h2>
          <p className="text-sm opacity-90 mt-1">
            Apply to join our mission-driven network of entrepreneurs.
          </p>
        </div>

        {/* Form */}
        <form
          className="p-6 space-y-8"
          action="https://getform.io/f/ayveyjmb"
          method="POST"
          encType="multipart/form-data"
        >
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
                  <label className="block font-medium text-gray-700">{label} *</label>
                  <input
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
                <p className="font-medium text-gray-700">
                  Do you want a Franchise or an AMF? *
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Franchise", "Area Master Franchise"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 border rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition"
                    >
                      <input
                        type="radio"
                        name="franchiseType"
                        value={option}
                        required
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Resume */}
              <div className="space-y-1">
                <label className="block font-medium text-gray-700">
                  Upload Resume / CV
                </label>
                <input
                  type="file"
                  name="resume"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              {/* LinkedIn */}
              <div className="space-y-1">
                <label className="block font-medium text-gray-700">
                  Or LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Consent */}
              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  name="agree"
                  required
                  className="mt-1 accent-blue-600"
                />
                <span className="text-gray-600">
                  I confirm the information provided is true and may be used for
                  verification purposes.
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </div>

          {/* Footer Notes */}
          <div className="text-xs text-gray-500 space-y-1 pt-4">
            <p>
              * Applications without a resume/CV or LinkedIn profile will not be
              considered.
            </p>
            <p>
              * By submitting, you authorize Jibu to assess your application and
              perform any necessary checks.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
