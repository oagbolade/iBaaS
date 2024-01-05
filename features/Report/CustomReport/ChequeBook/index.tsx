'use client';
import React from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';

export const ChequeBookStatus = () => {
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '30px', padding: '25px' }}>
        <FilterSection />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          tableConfig={{ hasActions: false }}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            mainTitle: 'Chequebook Status',
            secondaryTitle: 'See a directory of all chequebooks  this system.',
            hideFilterSection: true,
          }}
        />
      </Box>
    </Box>
  );
};
