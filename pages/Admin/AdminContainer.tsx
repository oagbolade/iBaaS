import Box from '@mui/material/Box';
import { MainSection, SearchSection } from '@/components/Shared';

export const AdminContainer = () => {
  return (
    <Box>
      <MainSection />
      <SearchSection tableTitle='View All Users' searchTitle='Search users' />
    </Box>
  );
};
