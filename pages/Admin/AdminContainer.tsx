import Box from '@mui/material/Box';
import { MainSection, SearchSection } from '@/components/Shared';
import { MuiTableContainer } from '@/components/Table';

export const AdminContainer = () => {
  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
      }}
    >
      <MainSection />
      <SearchSection tableTitle="View All Users" searchTitle="Search users" />
      <MuiTableContainer columns={[]} />
    </Box>
  );
};
