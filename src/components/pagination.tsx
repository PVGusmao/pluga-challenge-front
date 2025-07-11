import { useMainContext } from "@/contexts/main-context";
import React from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination() {
  const { page, setPage, apps } = useMainContext();

  const totalPages = Math.ceil(apps.length / 12) || 1

  if (totalPages <= 1) return null

  return (
    <div className={`text-center`}>
      <div className="join">
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}
        >
          <FiChevronLeft className="size-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((actual) => (
          <button
            key={`page-${actual}`}
            onClick={() => setPage(actual)}
            className={`join-item btn ${actual === page ? "btn-active" : ""}`}
          >
            {actual}
          </button>
        ))}

        <button
          onClick={() => setPage(Math.min(page + 1, totalPages))}
          className={`join-item btn ${page === totalPages ? "btn-disabled" : ""}`}
        >
          <FiChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
} 