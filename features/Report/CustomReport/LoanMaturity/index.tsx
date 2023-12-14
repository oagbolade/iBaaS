'use client';
import { Box } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';

export const LoanMaturity = () => {
  const ActionMenu: React.FC = () => {
    return (
      <Link href="/report/custom-report/view-report">
        <TableSingleAction actionName="View" />
      </Link>
    );
  };
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
          showHeader={{
            mainTitle: 'Maturity Loan',
            secondaryTitle:
              'See a directory of all Maturity Loan Report in this system.',
            hideFilterSection: true,
          }}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          ActionMenuProps={ActionMenu}
        />
      </Box>
    </Box>
  );
};
