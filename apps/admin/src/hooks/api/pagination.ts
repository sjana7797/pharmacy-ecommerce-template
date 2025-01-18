import { useState } from "react";

export type PaginationLimit = 10 | 20 | 50;

export const usePagination = () => {
  // local states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<PaginationLimit>(10);

  // handlers
  const setLimitHandler = (limit: PaginationLimit) => {
    setLimit(limit);
  };

  // page handlers
  const nextPageHandler = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const prevPageHandler = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return {
    page,
    limit,
    setLimitHandler,
    prevPageHandler,
    nextPageHandler,
  };
};
