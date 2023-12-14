'use client';
import React from 'react';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { Box } from '@mui/material';
import Link from 'next/link';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { FilterSection } from './FilterSection';
import { ActionMenu } from '@/features/Report/CustomReport/StandingInstructions';

export const TellerPosting = () => {
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <Box sx={{ width: '1300px' }}>
        <TopOverViewSection useBackButton />
      </Box>
      <Box sx={{ marginTop: '30px', padding: '25px' }}>
        <FilterSection />
      </Box>
      <Box sx={{ width: '100%', padding: '25px' }}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            mainTitle: 'Teller Posting',
            secondaryTitle:
              'See a directory of all teller posting in this system.',
            hideFilterSection: true,
          }}
          ActionMenuProps={ActionMenu}
        />
      </Box>
    </Box>
  );
};
