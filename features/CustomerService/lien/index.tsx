'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  ActionMenu,
  MuiTableContainer,
  TableSingleAction,
} from '@/components/Table';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import { TopActionsArea } from '@/components/Revamp/Shared';
import {
  submitButton,
  cancelButton,
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { FilterSection } from './FilterSection';
import Link from 'next/link';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/customer-service/add-lien">
      <PrimaryIconButton
        buttonTitle="Add Lien"
        customStyle={{ ...submitButton }}
      />
    </Link>
    ,
  </Box>,
];
const ActionMenuProps: React.FC = () => {
  return (
    <Link href="/customer-service/release-lien">
      <TableSingleAction actionName="Release Lien" />
    </Link>
  );
};

export const LienContainer = () => {
  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '15px' }}>
        <FilterSection />
      </Box>
      <Box mt={2} sx={{ padding: '15px', width: '97%' }}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            mainTitle: 'Lien Overview',
            secondaryTitle: 'See a directory of all accounts on this system.',
            hideFilterSection: true,
          }}
          ActionMenuProps={ActionMenuProps}
        />
      </Box>
    </Box>
  );
};
