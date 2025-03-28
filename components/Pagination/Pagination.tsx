import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type Props = {
  count?: number;
  handlePageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  page?: number;
};

export const TablePagination = ({ count, handlePageChange, page }: Props) => {
  return (
    <Stack
      sx={{
        margin: { desktop: '20px' },
        marginTop: { mobile: '10px', desktop: '20px' },
        display: 'flex',
        alignItems: 'center'
      }}
      spacing={2}
    >
      <Pagination
      data-testid="table-pagination"
        count={count}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={handlePageChange}
      />
    </Stack>
  );
};
