'use client';
import React from 'react';
import { Box } from '@mui/material';
import { TopActionsArea, LoanDetails } from '@/components/Revamp/Shared';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { ChevronDown } from '@/assets/svg';
import colors from '@/assets/colors';

const options = [
  'Cancel Loan',
  'Restructure Loan',
  'Partial Pay',
  'Terminate Loan',
];

const ActionButton = () => (
  <ActionButtonWithPopper
    options={options}
    customStyle={{
      borderRadius: '6px',
      border: `1px solid ${colors.activeBlue400}`,
      backgroundColor: `${colors.white}`,
    }}
    icon={
      <ChevronDown
        color={`${colors.primaryBlue400}`}
        props={{ width: '24px', height: '24px' }}
      />
    }
    iconPosition="end"
    buttonTitle="Actions"
  />
);

const actionButtons: any = [
  <Box  ml={{ mobile: 98, tablet: 0, desktop: 0 }}>
    <ActionButton />
  </Box>,
];

export const ViewLoan = () => {
  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box
        sx={{
          padding: '0 25px',
          width: '100%',
        }}
      >
        <Box>
          <LoanDetails />
        </Box>
      </Box>
    </Box>
  );
};
