'use client';
import React from 'react';
import { MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { Box } from '@mui/material';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { FilterSection } from './FilterSection';

export const IndividualLoan = () => {
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
            mainTitle: 'Portfolio at Risk',
            secondaryTitle:
              'See a directory of all portfolios at risk this system.',
            hideFilterSection: true,
          }}
        />
      </Box>
    </Box>
  );
};
