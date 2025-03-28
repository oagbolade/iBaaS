/* eslint-disable import/no-cycle */

'use client';

import React from 'react';
import { Box } from '@mui/material';
import { CashDeposit } from '@/features/Operation/Forms/CashDeposit';
import { useGetCurrency } from '@/api/general/useCurrency';
import { FormSkeleton } from '@/components/Loaders';

export const CashDepositContainer = () => {
  const { currencies, isLoading } = useGetCurrency();

  if (isLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return <CashDeposit currencies={currencies} />;
};
