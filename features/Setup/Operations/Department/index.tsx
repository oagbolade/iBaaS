'use client';
import { PrimaryIconButton } from '@/components/Buttons';
import { Box } from '@mui/material';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { FilterSection } from './FilterSection';
import { ActionMenu, MuiTableContainer } from '@/components/Table';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import Link from 'next/link';
import React from 'react';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { TableSingleAction } from '@/components/Revamp/TableV2';

export interface IOptions {
  buttonTitle: string;
  link?: string;
  onClick?: () => void;
}

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/setup/operations/add-department">
      <PrimaryIconButton
        buttonTitle="Add Department"
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

const ActionMenuProps: React.FC = () => {
  return (
    <Link href="/setup/operations/add-bank?isEditing=true">
      {' '}
      <TableSingleAction actionName="Edit" />
    </Link>
  );
};

export const DepartmentTable = () => {
  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px', marginTop: '10px' }}>
        <FilterSection />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            hideFilterSection: true,
            mainTitle: 'Department',
            secondaryTitle:
              'See a directory of all departments setup in this system.'
          }}
          ActionMenuProps={ActionMenuProps}
        />
      </Box>
    </Box>
  );
};
