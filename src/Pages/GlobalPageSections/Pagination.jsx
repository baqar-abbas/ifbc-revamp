/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Define the range of pages to display in pagination
  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // Calculate the range of pagination links based on the current page and total pages
  const getPageRange = () => {
    const maxPagesToShow = 7; // Change this value to adjust the number of pagination links shown
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPagesToShow) {
      const halfPagesToShow = Math.floor(maxPagesToShow / 2);
      startPage = Math.max(currentPage - halfPagesToShow, 1);
      endPage = startPage + maxPagesToShow - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }
    }

    return range(startPage, endPage);
  };

  // Render pagination links
  const pages = getPageRange();
  return (
    totalPages > 1 && (
      <nav
        className="isolate inline-flex rounded-md shadow-sm justify-center gap-1"
        aria-label="Pagination"
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className={`relative inline-flex items-center rounded-l-md px-2 py-2 font-extrabold text-custom-dark-blue hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`relative inline-flex items-center ${
              page === currentPage
                ? "z-10 bg-custom-orange text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            } px-4 py-2 text-sm font-semibold rounded`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-custom-dark-blue font-extrabold hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    )
  );
};

export default Pagination;
