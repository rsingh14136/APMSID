import React from "react";
import "../../Styles/components/_pagination.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange }) {
  const createPageNumbers = () => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    // Always show first page
    pages.push(1);

    // Show dots if gap exists before current range
    if (page > 4) {
      pages.push("...");
    }

    // Pages around current page
    const start = Math.max(2, page - 2);
    const end = Math.min(totalPages - 1, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Show dots if gap exists after current range
    if (page < totalPages - 3) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  const pages = createPageNumbers();

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        <ChevronLeft />
      </button>

      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="dots">...</span>
        ) : (
          <button
            key={index}
            className={page === p ? "active" : ""}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        <ChevronRight />
      </button>
    </div>
  );
}
