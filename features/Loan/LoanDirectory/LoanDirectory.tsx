'use client';
import React from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { PrimaryIconButton } from '@/components/Buttons/PrimaryIconButton';
import { ActionMenu, MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';

/* Certain statuses can view loans, see visibility mapper below */
const visibilityMapper = {
  active: ['all'],
  matured: ['View Loan'],
  rejected: ['View Loan', 'Reapply'],
};

const options = [
  { buttonTitle: 'View Loan', link: '/loan/loan-directory/view-loan' },
  { buttonTitle: 'Cancel Loan', link: '/loan/loan-directory/cancel-loan' },
  {
    buttonTitle: 'Restructure Loan',
    link: '/loan/loan-directory/restructure-loan',
  },
  { buttonTitle: 'Partial Pay', link: '/loan/loan-directory/partial-pay' },
  {
    buttonTitle: 'Terminate Loan',
    link: '/loan/loan-directory/terminate-loan',
  },
];

const ActionMenuProps: React.FC = () => {
  return <ActionMenu options={options} useDefault={false} />;
};
export const LoanDirectory = () => {
  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '80px',
      }}
    >
      <Box
        mb={3}
        mr={{ mobile: 3, tablet: 0 }}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Link href="/loan/loan-directory/loan-underwriting">
          <PrimaryIconButton
            customStyle={{
              width: '245px',
              height: '48px',
              variant: 'contained',
            }}
            buttonTitle="Create Loan Underwriting"
          />
        </Link>
      </Box>
      <FilterSection />
      <Box sx={{ width: '100%' }}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          ActionMenuProps={ActionMenuProps}
        />
      </Box>
    </Box>
  );
};
