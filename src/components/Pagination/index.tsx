import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number
  onChangePage: Function
}
const Pagination = ({ currentPage, onChangePage }: PaginationProps) => {

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event: any) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      forcePage={currentPage - 1}
      renderOnZeroPageCount={() => null}
    />
  );
};

export default Pagination;
