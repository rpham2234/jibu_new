"use client";

export default function FranchiseForm() {
  return (
    <form
      className="max-w-2xl mx-auto p-6 bg-white shadow rounded space-y-6"
      action="https://getform.io/f/ayveyjmb"
      method="POST"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold">AMF and Franchisee Inquiry Form</h2>

      {/* Inputs */}
      {[
        { label: "Your name", name: "name" },
        { label: "Your email", name: "email", type: "email" },
        { label: "Phone Number", name: "phone" },
        { label: "Location you want to set up in", name: "location" },
        { label: "Country", name: "country" },
      ].map(({ label, name, type = "text" }) => (
        <div key={name}>
          <label className="block font-medium">{label} *</label>
          <input
            type={type}
            name={name}
            required
            className="mt-1 w-full px-3 py-2 bg-gray-100 rounded"
          />
        </div>
      ))}

      {/* Radio */}
      <div>
        <p className="font-medium">Do you want a Franchise or an AMF? *</p>
        <div className="flex items-center gap-4 mt-2">
          {["Franchise", "Area Master Franchise"].map((option) => (
            <label key={option} className="flex items-center gap-1">
              <input type="radio" name="franchiseType" value={option} required />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Resume */}
      <div>
        <label className="block font-medium">Upload current Resume/CV here</label>
        <input type="file" name="resume" className="mt-1" accept=".pdf,.doc,.docx" />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block font-medium">Or Provide LinkedIn profile URL</label>
        <input
          type="url"
          name="linkedin"
          className="mt-1 w-full px-3 py-2 bg-gray-100 rounded"
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="agree" required />
          <span>
            I agree that the information given is true and may be used for verification.
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {/* Footer Notes */}
      <div className="text-xs text-gray-600 space-y-2 pt-4">
        <p>
          *IMPORTANT NOTE: Upload a resume/CV or provide a LinkedIn profile.
          Applications without one will not be considered.
        </p>
        <p>
          *By submitting, you authorize Jibu to assess your application and
          perform any checks required.
        </p>
      </div>
    </form>
  );
}
