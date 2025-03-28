'use client';

import React from 'react';
import { Box } from '@mui/material';
import { CashWithDrawal } from '@/features/Operation/Forms/CashWithdrawal';
import { FormSkeleton } from '@/components/Loaders';
import { useGetCurrency } from '@/api/general/useCurrency';

export const CashWithDrawalContainer = () => {

  const { currencies, isLoading: isCurrencyLoading } = useGetCurrency();

  if (isCurrencyLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return <CashWithDrawal currencies={currencies} />;

};
