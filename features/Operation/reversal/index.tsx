'use client';
import { useGetCurrency } from '@/api/general/useCurrency';
import { useGetCommercialBank } from '@/api/setup/useClearingBank';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { Box } from '@mui/material';
import { useState } from 'react';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ReturnCheque } from '@/features/Operation/Forms/ReturnCheques';

export const ReturnChequesContainer = () => {
  const { currencies } = useGetCurrency();
  const { commBanks } = useGetCommercialBank();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
            <ReturnCheque
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              commBanks={commBanks}
              currencies={currencies}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
