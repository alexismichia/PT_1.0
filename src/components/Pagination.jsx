import React from 'react';

const Pagination = ({ pageInfo, onPageChange }) => {
  const handleNextPage = () => {
    if (pageInfo && pageInfo.next) {
      const nextPageNumber = pageInfo.next.page;
      onPageChange(nextPageNumber);
    }
  };

  const handlePrevPage = () => {
    if (pageInfo && pageInfo.prev) {
      const prevPageNumber = pageInfo.prev.page;
      onPageChange(prevPageNumber);
    }
  };

  
};

export default Pagination;
