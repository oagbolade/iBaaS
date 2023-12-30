import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const TablePagination = () => {
  return (
    <Stack
      sx={{
        margin: { desktop: '20px' },
        marginTop: { mobile: '10px', desktop: '20px' },
        display: 'flex',
        alignItems: 'center',
      }}
      spacing={2}
    >
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
};
