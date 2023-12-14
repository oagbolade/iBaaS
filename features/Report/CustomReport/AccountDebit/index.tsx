'use client';
import React from 'react';
import { MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { Box } from '@mui/material';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { FilterSection } from '@/features/Report/CustomReport/ChartAccount/FilterSection';

export const AccountDebit = () => {
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <Box sx={{ width: '1300px' }}>
        <TopOverViewSection useBackButton />
      </Box>{' '}
      <Box sx={{ padding: '25px', marginTop: '20px' }}>
        <FilterSection />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          tableConfig={{ hasActions: false }}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            mainTitle: 'Account in Debit',
            secondaryTitle:
              'See a directory of all Account in Debit Report in this system.',
            hideFilterSection: true,
          }}
        />
      </Box>
    </Box>
  );
};
