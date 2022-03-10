import React from "react";
import { Pagination } from "react-bootstrap";

import "./CustomPagination.css";

const CustomPagination = (props) => {
  const { postsPerPage, totalPosts, paginate, currentPage } = props;
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination className="px-4">
      {pageNumbers &&
        pageNumbers?.map((number, index) => {
          if (number !== 0) {
            return (
              <Pagination.Item
                onClick={() => paginate(number)}
                key={number}
                active={currentPage === number && true}
              >
                {number}
              </Pagination.Item>
            );
          }
        })}
    </Pagination>
  );
};

export default CustomPagination;
