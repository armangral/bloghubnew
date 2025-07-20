"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPageNumbers?: boolean;
  maxVisible?: number;
  size?: "small" | "default" | "large";
  className?: string;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPageNumbers = true,
  maxVisible = 5,
  size = "default", // 'small' | 'default' | 'large'
  className = "",
}: PaginationProps) => {
  // Calculate the range of page numbers to display
  const getPageRange = () => {
    const range = [];
    const halfVisible = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - halfVisible);
    const end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if we're near the end
    if (end === totalPages) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "h-8 w-8 text-sm";
      case "large":
        return "h-12 w-12 text-lg";
      default:
        return "h-10 w-10 text-base";
    }
  };

  // Base button classes
  const baseButtonClasses = `
      flex items-center justify-center
      rounded-lg transition-colors duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
      ${getSizeClasses()}
    `;

  // Page number button classes
  const pageButtonClasses = `
      ${baseButtonClasses}
      hover:bg-blue-100
      focus:outline-none focus:ring-2 focus:ring-blue-200
    `;

  // Active page button classes
  const activePageButtonClasses = `
      ${baseButtonClasses}
      bg-blue-900 text-white
      hover:bg-blue-800
      focus:outline-none focus:ring-2 focus:ring-blue-800
    `;

  // Navigation button classes
  const navButtonClasses = `
      ${baseButtonClasses}
      text-blue-500 hover:text-blue-700 hover:bg-blue-100
      focus:outline-none focus:ring-2 focus:ring-blue-200
    `;

  return (
    <nav
      className={`flex items-center justify-center space-x-2 ${className}`}
      aria-label="Pagination"
    >
      {/* First Page Button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={navButtonClasses}
          aria-label="Go to first page"
        >
          <ChevronsLeft className="w-5 h-5" />
        </button>
      )}

      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={navButtonClasses}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {showPageNumbers && (
        <>
          {getPageRange().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={
                pageNum === currentPage
                  ? activePageButtonClasses
                  : pageButtonClasses
              }
              aria-label={`Go to page ${pageNum}`}
              aria-current={pageNum === currentPage ? "page" : undefined}
            >
              {pageNum}
            </button>
          ))}
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={navButtonClasses}
        aria-label="Go to next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Last Page Button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={navButtonClasses}
          aria-label="Go to last page"
        >
          <ChevronsRight className="w-5 h-5" />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
