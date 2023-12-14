'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MuiTableContainer } from '@/components/Table';

export const IncomeAssuranceReport = () => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '70px',
      }}
    >
      <TopOverViewSection useBackButton />
      <Box
        sx={{
          padding: '25px',
          width: '100%',
        }}
      >
        <Box sx={{ marginTop: '20px', marginBottom: '30px' }}>
          <FilterSection />
        </Box>
        <MuiTableContainer
          tableConfig={{
            hasActions: false,
          }}
          showHeader={{
            mainTitle: 'Income Assurance Report',
            secondaryTitle:
              'See a directory of all Income Assurance Report in this system.',
          }}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          hideFilterSection
        />
      </Box>
    </Box>
  );
};
