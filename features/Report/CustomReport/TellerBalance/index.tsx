'use client';
import React from 'react';
import { MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { Box } from '@mui/material';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { FilterSection } from './FilterSection';

export const TellerBalance = () => {
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '30px', padding: '25px' }}>
        <FilterSection />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            mainTitle: 'TELLER BALANCE',
            secondaryTitle:
              'See a directory of all Teller Balance at risk on this system',
            hideFilterSection: true,
          }}
          tableConfig={{
            hasActions: false,
          }}
        />
      </Box>
    </Box>
  );
};
