'use client';

import { Box } from '@mui/material';
import { FundsTransfer } from '../Forms/FundsTransfer';
import { FormSkeleton } from '@/components/Loaders';
import { useGetCommercialBank } from '@/api/setup/useClearingBank';
import { useGetCurrency } from '@/api/general/useCurrency';

export const FundsTransferContainer = () => {
  const { currencies, isLoading: isCurrencyLoading } = useGetCurrency();
  const { commBanks, isLoading: isAllBankLoading } = useGetCommercialBank();

  if (isCurrencyLoading && isAllBankLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return <FundsTransfer commBanks={commBanks} currencies={currencies} />;
};
