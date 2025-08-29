"use client";

import { useMemo, useState } from "react";

// ------------------------------------------------------------
// Job type
// ------------------------------------------------------------
export type Job = {
  id: string;
  title: string;
  department: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  location: string;
  url: string;
};

// ------------------------------------------------------------
// Demo data — replace with CMS/ATS feed
// ------------------------------------------------------------
const JOBS: Job[] = [
  { id: "1", title: "Senior Frontend Engineer", department: "Engineering", type: "Full-time", location: "Remote (US)", url: "#" },
  { id: "2", title: "Product Designer", department: "Design", type: "Full-time", location: "New York, NY", url: "#" },
  { id: "3", title: "Technical Writer", department: "Marketing", type: "Contract", location: "Remote", url: "#" },
  { id: "4", title: "Data Analyst (Intern)", department: "Data", type: "Internship", location: "Austin, TX", url: "#" },
];

// ------------------------------------------------------------
// Utilities
// ------------------------------------------------------------
const uniq = (arr: string[]) => Array.from(new Set(arr)).sort();

function useJobFilters(jobs: Job[]) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [type, setType] = useState<string>("All");
  const [location, setLocation] = useState<string>("All");

  const facets = useMemo(() => {
    return {
      categories: ["All", ...uniq(jobs.map((j) => j.department))],
      types: ["All", ...uniq(jobs.map((j) => j.type))],
      locations: ["All", ...uniq(jobs.map((j) => j.location))],
    };
  }, [jobs]);

  const filtered = useMemo(() => {
    let list = jobs;

    if (category !== "All") list = list.filter((j) => j.department === category);
    if (type !== "All") list = list.filter((j) => j.type === type);
    if (location !== "All") list = list.filter((j) => j.location === location);

    if (q.trim()) {
      const words = q.toLowerCase().split(/\s+/).filter(Boolean);
      list = list.filter((j) =>
        words.every((w) =>
          [j.title, j.department, j.type, j.location]
            .join(" ")
            .toLowerCase()
            .includes(w)
        )
      );
    }

    return list;
  }, [jobs, q, category, type, location]);

  const reset = () => {
    setQ("");
    setCategory("All");
    setType("All");
    setLocation("All");
  };

  return { q, setQ, category, setCategory, type, setType, location, setLocation, facets, filtered, reset } as const;
}

// ------------------------------------------------------------
// Page Component (mobile-first rendering)
// ------------------------------------------------------------
export default function OpenPositionsPage() {
  const { q, setQ, category, setCategory, type, setType, location, setLocation, facets, filtered, reset } = useJobFilters(JOBS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <main className="min-h-screen p-4 sm:p-10">
      <section className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-6 shadow-md sm:p-8" aria-labelledby="open-positions-heading">
        <div className="mb-6">
          <h1 id="open-positions-heading" className="text-2xl font-bold tracking-tight sm:text-4xl">
            Open Positions
          </h1>
          <p className="mt-1 text-sm text-slate-600">Browse our current openings and use the filters to find your fit.</p>
        </div>

        {/* Mobile controls */}
        <div className="sm:hidden">
          <div className="flex items-center gap-2">
            <input
              placeholder="Search titles, teams, locations…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button
              onClick={() => setMobileFiltersOpen((v) => !v)}
              className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
            >
              Filters
            </button>
          </div>

          {mobileFiltersOpen && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
                {facets.categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
                {facets.types.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
                {facets.locations.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              <button onClick={() => { reset(); setMobileFiltersOpen(false); }} className="rounded-lg border px-3 py-2 text-sm font-medium text-slate-700">
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Desktop controls */}
        <div className="mb-6 hidden gap-3 sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <input
              placeholder="Search titles, teams, locations…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
              {facets.categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
              {facets.types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
              {facets.locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <button onClick={reset} className="rounded-lg border px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Reset
          </button>
        </div>

        {/* Mobile list (cards) */}
        <div className="sm:hidden space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-lg border border-slate-200 p-4 text-center text-slate-500">
              No positions match your filters.
            </div>
          )}
          {filtered.map((job) => (
            <div key={job.id} className="rounded-lg border border-slate-200 p-4">
              <div className="font-medium text-slate-900">{job.title}</div>
              <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{job.department}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{job.type}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{job.location}</span>
              </div>
              <a href={`/careers/${job.id}`} className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Apply
              </a>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-slate-200 sm:block">
          <table className="min-w-full table-auto text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-medium">Position Title</th>
                <th className="px-6 py-3 font-medium">Role Type</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 text-right font-medium"> </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">No positions match your filters.</td>
                </tr>
              )}
              {filtered.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{job.title}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{job.department}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{job.type}</td>
                  <td className="px-6 py-4 text-slate-700">{job.location}</td>
                  <td className="px-6 py-4 text-right">
                    <a href={`/careers/${job.id}`} className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50">
                      Apply
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div className="mt-4 text-right text-xs text-slate-500">
          Showing <span className="font-medium text-slate-700">{filtered.length}</span> of {JOBS.length} positions
        </div>
      </section>
    </main>
  );
}
