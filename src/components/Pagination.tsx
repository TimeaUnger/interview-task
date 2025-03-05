import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  queryTotalPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  queryTotalPages,
}) => {

  const buttonBaseClasses = "px-2 py-1 text-xs rounded bg-blue-500 text-white transition duration-300";
  const disabledClasses = "bg-gray-400 cursor-not-allowed";
  const activeClasses = "hover:bg-blue-600 cursor-pointer";

  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`${buttonBaseClasses} ${currentPage === 1 ? disabledClasses : activeClasses}`}
      >
        Previous
      </button>

      <span className="text-xs font-medium text-gray-700">
        Page {currentPage} of {queryTotalPages || totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === (queryTotalPages || totalPages)}
        className={`${buttonBaseClasses} ${currentPage === (queryTotalPages || totalPages) ? disabledClasses : activeClasses}`}
      >
        Next
      </button>
    </div>

  );
};

export default Pagination;
