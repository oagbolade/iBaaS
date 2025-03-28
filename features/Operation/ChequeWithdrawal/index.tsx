'use client';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useGetCurrency } from '@/api/general/useCurrency';
import { PrimaryIconButton } from '@/components/Buttons';
import { ChequeWithdrawal } from '@/features/Operation/Forms/ChequeWithdrawal';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ActionButton } from '@/components/Revamp/Buttons';

export const ChequeWithdrawalContainer = () => {
  const { currencies } = useGetCurrency();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
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
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Box
          mr={3}
          sx={{
            width: '50%',
            padding: { mobile: 0, tablet: '30px 0' }
          }}
        >
          {currencies !== undefined && (
            <ChequeWithdrawal
              currencies={currencies}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
