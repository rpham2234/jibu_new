import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type PageButtonProps = {
  per_page?: number;
  results?: number;
  currentPage?: number;
};

export default function PageButton({
  per_page = 10,
  results = 97,
  currentPage = 1,
}: PageButtonProps) {
  const totalPages = Math.ceil(results / per_page);

  // Generate page numbers (with ... where needed)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-white/10 dark:bg-transparent">
      {/* Mobile: Prev / Next only */}
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href={`?page=${currentPage - 1}`}
          className={`relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${
            currentPage === 1
              ? "pointer-events-none text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
          }`}
        >
          Previous
        </a>
        <a
          href={`?page=${currentPage + 1}`}
          className={`relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${
            currentPage === totalPages
              ? "pointer-events-none text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
          }`}
        >
          Next
        </a>
      </div>

      {/* Desktop: Full pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing{" "}
          <span className="font-medium">{(currentPage - 1) * per_page + 1}</span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * per_page, results)}
          </span>{" "}
          of <span className="font-medium">{results}</span> results
        </p>

        <nav
          aria-label="Pagination"
          className="isolate inline-flex -space-x-px rounded-md shadow-xs dark:shadow-none"
        >
          {/* Previous Button */}
          <a
            href={`?page=${currentPage - 1}`}
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:inset-ring-gray-700 dark:hover:bg-white/5 ${
              currentPage === 1 && "pointer-events-none opacity-50"
            }`}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon aria-hidden="true" className="size-5" />
          </a>

          {/* Page Numbers */}
          {pages.map((page, idx) =>
            typeof page === "number" ? (
              <a
                key={idx}
                href={`?page=${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  page === currentPage
                    ? "bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:focus-visible:outline-indigo-500"
                    : "text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 dark:text-gray-200 dark:inset-ring-gray-700 dark:hover:bg-white/5"
                }`}
              >
                {page}
              </a>
            ) : (
              <span
                key={idx}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500"
              >
                {page}
              </span>
            )
          )}

          {/* Next Button */}
          <a
            href={`?page=${currentPage + 1}`}
            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:inset-ring-gray-700 dark:hover:bg-white/5 ${
              currentPage === totalPages && "pointer-events-none opacity-50"
            }`}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon aria-hidden="true" className="size-5" />
          </a>
        </nav>
      </div>
    </div>
  );
}
