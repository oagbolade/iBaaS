'use client';
import React from 'react';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { Box } from '@mui/material';
import Link from 'next/link';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { FilterSection } from './FilterSection';

export const ActionMenu: React.FC = () => {
  return (
    <Link href="/report/custom-report/view-report">
      <TableSingleAction actionName="View" />
    </Link>
  );
};

export const DrillDown = () => {
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <Box sx={{ width: '1300px' }}>
        <TopOverViewSection useBackButton />
      </Box>
      <Box sx={{ marginTop: '30px', padding: '25px' }}>
        <FilterSection />
      </Box>
      <Box sx={{ padding: '20px', width: '100%' }}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            mainTitle: 'Drill Down GL',
            secondaryTitle:
              'See a directory of all Drill Down GL Report in this system.',
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
