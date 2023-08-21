import React from 'react';
import './Pagination.css';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Generate an array of page numbers to display in the pagination
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-center my-4">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 cursor-pointer ${
              currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
