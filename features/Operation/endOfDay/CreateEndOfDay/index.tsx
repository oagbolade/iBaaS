'use client';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { CreateEndOfDayForm } from '../../Forms/CreateEndofdayForm';
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

export const EndOfDayContainer = () => {
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
        buttonTitle="View Details"
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
      <CreateEndOfDayForm />
    </>
  );
};
