'use client';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useGetCurrency } from '@/api/general/useCurrency';
import { useGetCommercialBank } from '@/api/setup/useClearingBank';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { OutWard } from '@/features/Operation/Forms/Uclear';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useClearingBank, useGetZone } from '@/api/operation/useClearing';

export const UnclearContainer = () => {
  const { currencies } = useGetCurrency();
  const { commBanks } = useGetCommercialBank();
  const { clearBanks } = useClearingBank();
  const { zones } = useGetZone();

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
          {clearBanks !== undefined &&
            commBanks !== undefined &&
            currencies !== undefined &&
            zones !== undefined && (
              <OutWard
                clearBanks={clearBanks}
                commBanks={commBanks}
                currencies={currencies}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                zones={zones}
                isSubmittingForward={isSubmittingForward}
                setIsSubmittingForward={setIsSubmittingForward}
              />
            )}
        </Box>
      </Box>
    </>
  );
};
