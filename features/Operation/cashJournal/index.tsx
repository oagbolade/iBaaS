'use client';

import { Box } from '@mui/material';
import { useGetCurrency } from '@/api/general/useCurrency';
import { useGetCommercialBank } from '@/api/setup/useClearingBank';
import { FormSkeleton } from '@/components/Loaders';
import { CashJournal } from '@/features/Operation/Forms/CashJournal';

export const CashJournalContainer = () => {
  const { currencies, isLoading: isCurrencyLoading } = useGetCurrency();
  const { commBanks, isLoading: isAllBankLoading } = useGetCommercialBank();

  if (isCurrencyLoading || isAllBankLoading && currencies !== undefined) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

    if (currencies !== undefined) {
      return (
        <CashJournal commBanks={commBanks} currencies={currencies} />
      );
    };
  };
