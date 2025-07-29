"use client";
import { useState } from "react";

export default function FranchiseForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    country: "",
    franchiseType: "Franchise",
    resume: null,
    linkedin: "",
    agree: false,
  });

  return (
    <form className="max-w-2xl mx-auto p-6 bg-white shadow rounded space-y-6">
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
            required
            className="mt-1 w-full px-3 py-2 bg-gray-100 rounded"
            value={formData[name as keyof typeof formData] as string}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [name]: e.target.value }))
            }
          />
        </div>
      ))}

      {/* Radio */}
      <div>
        <p className="font-medium">Do you want a Franchise or an AMF? *</p>
        <div className="flex items-center gap-4 mt-2">
          {["Franchise", "Area Master Franchise"].map((option) => (
            <label key={option} className="flex items-center gap-1">
              <input
                type="radio"
                value={option}
                checked={formData.franchiseType === option}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    franchiseType: e.target.value,
                  }))
                }
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Resume */}
      <div>
        <label className="block font-medium">Upload current Resume/CV here</label>
        <input
          type="file"
          className="mt-1"
          //Onchange logic here
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block font-medium">Or Provide LinkedIn profile URL</label>
        <input
          type="url"
          className="mt-1 w-full px-3 py-2 bg-gray-100 rounded"
          value={formData.linkedin}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, linkedin: e.target.value }))
          }
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            required
            checked={formData.agree}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, agree: e.target.checked }))
            }
          />
          <span>
            I agree that the information given is true and may be used for verification.
          </span>
        </label>
      </div>

      {/* Submit */}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>

      {/* Footer Notes */}
      <div className="text-xs text-gray-600 space-y-2 pt-4">
        <p>
          *IMPORTANT NOTE: Upload a resume/CV or provide a LinkedIn profile. Applications without one will not be considered.
        </p>
        <p>
          *By submitting, you authorize Jibu to assess your application and perform any checks required.
        </p>
      </div>
    </form>
  );
}
