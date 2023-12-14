'use client';
import React from 'react';
import { Box, Button } from '@mui/material';
import { TableSingleAction } from '@/components/Table';
import { LoanContainer } from '@/features/Loan/LoanContainer';
import { useLoansModalToggle } from '@/utils/useLoansModalToggle';

export const OverDrafts = () => {
  const { openToastMessage, toggleModal } = useLoansModalToggle();
  const ActionMenuProps: React.FC = () => {
    return (
      <Button onClick={() => toggleModal('toast')}>
        <TableSingleAction actionName="Set Overdraft" />
      </Button>
    );
  };

  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '60px',
      }}
    >
      <LoanContainer
        toastMessage={{
          body: 'New overdraft limit has been set for [Account-name] ',
          title: 'Overdraft Set',
          open: openToastMessage,
        }}
        showHeader={{
          mainTitle: 'Overdrafts',
          secondaryTitle: 'Set overdraft limit for all your customers',
        }}
        TableActionItems={ActionMenuProps}
      />
    </Box>
  );
};
