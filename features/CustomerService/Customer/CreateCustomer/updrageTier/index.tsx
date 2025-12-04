'use client';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useGetCurrency } from '@/api/general/useCurrency';
import { AddIcon } from '@/assets/svg';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { ChequeDeposit } from '@/features/Operation/Forms/ChequeDeposit';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { UpgradeTier } from '@/features/CustomerService/Form/CreateCustomerForms/UpgradeTier';

export const UpgradeTierContainer = () => {
  const { currencies } = useGetCurrency();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittingForward, setIsSubmittingForward] =
    useState<boolean>(false);
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const triggerSubmission = () => {
    setIsSubmittingForward(true);
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
        <UpgradeTier
          currencies={currencies}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          setIsSubmittingForward={setIsSubmittingForward}
          isSubmittingForward={isSubmittingForward}
        />
      )}
    </>
  );
};
