"use client";

interface InstallationPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function InstallationPagination({
  page,
  totalPages,
  onPageChange,
}: InstallationPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:px-6">
      <button
        disabled={page === 1}
        onClick={() =>
          onPageChange(Math.max(1, page - 1))
        }
        className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        Previous
      </button>

      <div className="flex max-w-full items-center gap-2 overflow-x-auto pb-1">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() =>
              onPageChange(pageNumber)
            }
            className={`flex h-10 min-w-10 shrink-0 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
              page === pageNumber
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() =>
          onPageChange(
            Math.min(totalPages, page + 1)
          )
        }
        className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        Next
      </button>
    </div>
  );
}