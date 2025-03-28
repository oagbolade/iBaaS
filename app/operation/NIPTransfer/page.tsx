'use client';

import { Box } from '@mui/material';
import { useGetCurrency } from '@/api/general/useCurrency';
import { useGetCommercialBank } from '@/api/setup/useClearingBank';
import { FormSkeleton } from '@/components/Loaders';
import { NIPTransfer } from '@/features/Operation/Forms/NIPTransfer';

export default function NIPTransfers() {
  const { currencies, isLoading: isCurrencyLoading } = useGetCurrency();
  const { commBanks, isLoading: isAllBankLoading } = useGetCommercialBank();

  if (isCurrencyLoading && isAllBankLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return <NIPTransfer commBanks={commBanks} currencies={currencies} />;
}
