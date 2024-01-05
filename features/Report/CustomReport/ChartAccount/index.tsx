'use client';
import React from 'react';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { Box } from '@mui/material';
import { PageTitle } from '@/components/Typography';
import { buttonStyle } from './style';
import {
  LargeFormMultiSelectField,
  TextInput,
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { Account } from '@/constants/Loan/selectOptions';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { FilterSection } from './FilterSection';

export const ChartAccount = () => {
  const { setWidth } = useCurrentBreakpoint();
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
      <Box sx={{ padding: '25px', marginTop: '20px' }}>
        <FilterSection />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          tableConfig={{ hasActions: false }}
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            mainTitle: 'Chart of Account',
            secondaryTitle:
              'See a directory of all Charts of Account on this system.',
            hideFilterSection: true,
          }}
          ActionMenuProps={ActionMenu}
        />
      </Box>
    </Box>
  );
};
