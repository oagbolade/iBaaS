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
      <Box
        sx={{
          marginTop: '60px',
          position: 'fixed',
          top: 0,
          width: 'calc(100vw - 300px)',
          zIndex: 1
        }}
      >
        <TopActionsArea actionButtons={actionButtons} />
      </Box>

      {currencies !== undefined && (
        <ChequeWithdrawal
          currencies={currencies}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      )}
    </>
  );
};
