export function calculatePages(totalRows: number): number {
  const rowsPerPage = 10;
  return Math.ceil(totalRows / rowsPerPage);
}
