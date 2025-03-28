'use client';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useGetCurrency } from '@/api/general/useCurrency';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { InWard } from '@/features/Operation/Forms/Clearing';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useGetCommercialBank } from '@/api/setup/useClearingBank';

export const ClearContainer = () => {
  const { currencies } = useGetCurrency();
  const { commBanks } = useGetCommercialBank();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittingForward, setIsSubmittingForward] =
    useState<boolean>(false);
  const triggerSubmission = () => {
    setIsSubmitting(true);
  };
  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        buttonTitle="Submit"
        customStyle={{ ...submitButton }}
        onClick={triggerSubmission}
      />
    </Box>
  ];
  return (
    <>
      <TopActionsArea actionButtons={actionButtons} />
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Box
          mr={3}
          sx={{
            width: '50%',
            padding: { mobile: 0, tablet: '30px 0' }
          }}
        >
          {commBanks !== undefined && currencies !== undefined && (
            <InWard
              commBanks={commBanks}
              currencies={currencies}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              setIsSubmittingForward={setIsSubmittingForward}
              isSubmittingForward={isSubmittingForward}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
