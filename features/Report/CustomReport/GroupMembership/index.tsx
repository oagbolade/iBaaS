'use client';
import React from 'react';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { Box } from '@mui/material';
import Link from 'next/link';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { FilterSection } from './FilterSection';

export const GroupMembership = () => {
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
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            mainTitle: 'Group Membership Report',
            secondaryTitle:
              'See a directory of all Group Membership Report in this system.',
            hideFilterSection: true
          }}
          ActionMenuProps={ActionMenu}
        />
      </Box>
    </Box>
  );
};
