import { useState } from 'react';

export const usePagination = () => {
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (nextPage) => {
    if (currentPage > 0 && currentPage <= totalPages) {
      setCurrentPage(nextPage);
    }
  };

  return {
    totalPages,
    currentPage,
    setTotalPages,
    handleChangePage,
  };
};
