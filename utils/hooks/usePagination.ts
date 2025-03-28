import { useState, useEffect } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  rowsPerPage: number;
  searchTerm: string;
  filterFunction: (item: T, searchTerm: string) => boolean;
}

export const usePagination = <T extends { [key: string]: any }>({
  data,
  rowsPerPage,
  searchTerm,
  filterFunction
}: UsePaginationProps<T>) => {
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState<T[]>([]);

  useEffect(() => {
    const filtered = data.filter((item) => filterFunction(item, searchTerm));
    setFilteredData(filtered);
    setPage(1); // Reset to first page on search
  }, [data, searchTerm]);

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalElements = filteredData.length;
  const totalPages = Math.ceil(totalElements / rowsPerPage);

  return {
    paginatedData,
    totalElements,
    totalPages,
    setPage,
    page
  };
};
