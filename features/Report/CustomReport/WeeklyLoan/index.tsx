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

export const WeeklyLoan = () => {
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '30px', padding: '13px' }}>
        <FilterSection />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            mainTitle: 'Weekly Loan Repayment',
            secondaryTitle:
              'See a directory of all Weekly Loan Repayments Report in this system.',
            hideFilterSection: true
          }}
          ActionMenuProps={ActionMenu}
        />
      </Box>
    </Box>
  );
};
