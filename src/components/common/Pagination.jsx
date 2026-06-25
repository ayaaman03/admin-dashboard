import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Reusable Pagination control.
 * Shows a compact window of page numbers around the current page,
 * plus prev/next buttons. Pure presentational — parent owns the page state.
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build a small window of page numbers, e.g. [1, '...', 4, 5, 6, '...', 10]
  const pages = [];
  const windowSize = 1;
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - windowSize && i <= currentPage + windowSize)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>

      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={`ellipsis-${idx}`} style={{ padding: '0 6px', color: 'var(--color-text-muted)' }}>
            …
          </span>
        ) : (
          <button
            key={p}
            className={p === currentPage ? 'active' : ''}
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>
    </nav>
  );
}

export default Pagination;
