'use client';
import { Box } from '@mui/material';
import React from 'react';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import Link from 'next/link';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { FilterSection } from './FilterSection';

export const MaturityLoan = () => {
  const ActionMenu: React.FC = () => {
    return (
      <Link href="/report/custom-report/view-report">
        <TableSingleAction actionName="View" />
      </Link>
    );
  };
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '30px', padding: '25px' }}>
        <FilterSection />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          showHeader={{
            mainTitle: 'Maturity Loan',
            secondaryTitle:
              'See a directory of all Maturity Loan Report in this system.',
            hideFilterSection: true
          }}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          ActionMenuProps={ActionMenu}
        />
      </Box>
    </Box>
  );
};
