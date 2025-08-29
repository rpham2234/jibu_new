"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

// ------------------------------------------------------------
// Demo data — replace with your CMS/ATS feed (Greenhouse/Lever/etc)
// ------------------------------------------------------------
export type Job = {
  id: string;
  title: string;
  department: string; // aka category
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  location: string;
  url: string; // external apply link
};

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
  const [sort, setSort] = useState<"title_asc" | "title_desc">("title_asc");

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

    list = [...list].sort((a, b) => {
      const dir = sort === "title_asc" ? 1 : -1;
      return a.title.localeCompare(b.title) * dir;
    });

    return list;
  }, [jobs, q, category, type, location, sort]);

  const reset = () => {
    setQ("");
    setCategory("All");
    setType("All");
    setLocation("All");
    setSort("title_asc");
  };

  return {
    q,
    setQ,
    category,
    setCategory,
    type,
    setType,
    location,
    setLocation,
    sort,
    setSort,
    facets,
    filtered,
    reset,
  } as const;
}

// ------------------------------------------------------------
// Page Component (mobile-first rendering)
// ------------------------------------------------------------
export default function OpenPositionsPage() {
  const {
    q,
    setQ,
    category,
    setCategory,
    type,
    setType,
    location,
    setLocation,
    sort,
    setSort,
    facets,
    filtered,
    reset,
  } = useJobFilters(JOBS);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <main className="min-h-screen  p-4 sm:p-10">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-5 shadow-xl sm:p-8"
        aria-labelledby="open-positions-heading"
      >
        <div className="mb-4 sm:mb-8">
          <h1 id="open-positions-heading" className="text-2xl font-bold tracking-tight sm:text-4xl">
            Open Positions
          </h1>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Browse our current openings and use the filters to find your fit.
          </p>
        </div>

        {/* --------------------------------------------- */}
        {/* Mobile controls */}
        {/* --------------------------------------------- */}
        <div className="sm:hidden">
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="m-search">Search</label>
            <input
              id="m-search"
              placeholder="Search titles, teams, locations…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
            <button
              onClick={() => setMobileFiltersOpen((v) => !v)}
              className="shrink-0 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
              aria-expanded={mobileFiltersOpen}
              aria-controls="mobile-filters"
            >
              Filters
            </button>
          </div>

          {/* Location pills (horizontal scroll) */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
            {facets.locations.map((l) => (
              <button
                key={l}
                onClick={() => setLocation(l)}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs ${
                  location === l
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
                aria-pressed={location === l}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Collapsible panel with the rest of the filters */}
          {mobileFiltersOpen && (
            <div id="mobile-filters" className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1 block text-xs uppercase tracking-wide text-slate-500">Category</span>
                <select
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Filter by job category"
                >
                  {facets.categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <span className="mb-1 block text-xs uppercase tracking-wide text-slate-500">Type</span>
                <select
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  aria-label="Filter by job type"
                >
                  {facets.types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <span className="mb-1 block text-xs uppercase tracking-wide text-slate-500">Sort</span>
                <select
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                >
                  <option value="title_asc">A → Z</option>
                  <option value="title_desc">Z → A</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => { reset(); setMobileFiltersOpen(false); }}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --------------------------------------------- */}
        {/* Desktop controls */}
        {/* --------------------------------------------- */}
        <div className="mb-4 hidden gap-3 sm:mb-6 sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            <label className="sr-only" htmlFor="search">Search</label>
            <input
              id="search"
              placeholder="Search titles, teams, locations…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full max-w-xs rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />

            {/* Category */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-slate-500">Category</span>
              <select
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Filter by job category"
              >
                {facets.categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-slate-500">Type</span>
              <select
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                value={type}
                onChange={(e) => setType(e.target.value)}
                aria-label="Filter by job type"
              >
                {facets.types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-slate-500">Location</span>
              <select
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Filter by location"
              >
                {facets.locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort + Reset */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="sr-only">Sort</label>
            <select
              id="sort"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
            >
              <option value="title_asc">Sort: A → Z</option>
              <option value="title_desc">Sort: Z → A</option>
            </select>
            <button
              onClick={reset}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>

        {/* --------------------------------------------- */}
        {/* Mobile list (cards) */}
        {/* --------------------------------------------- */}
        <div className="sm:hidden space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-xl border border-slate-200 p-4 text-center text-slate-500">
              No positions match your filters.
            </div>
          )}
          {filtered.map((job) => (
            <div key={job.id} className="rounded-xl border border-slate-200 p-4">
              <div className="font-medium text-slate-900">{job.title}</div>
              <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-600">
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{job.department}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{job.type}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{job.location}</span>
              </div>
              <a
                href={job.url}
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Apply
              </a>
            </div>
          ))}
        </div>

        {/* --------------------------------------------- */}
        {/* Desktop table */}
        {/* --------------------------------------------- */}
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 sm:block">
          <table className="min-w-full table-auto text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Position Title</th>
                <th scope="col" className="px-6 py-3 font-medium">Role Type</th>
                <th scope="col" className="px-6 py-3 font-medium">Location</th>
                <th scope="col" className="px-6 py-3 text-right font-medium"> </th>
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
                    <a
                      href={job.url}
                      className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
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
      </motion.section>
    </main>
  );
}
