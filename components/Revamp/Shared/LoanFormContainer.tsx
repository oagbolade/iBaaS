'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { CreateLoanUnderwritingForm } from '@/features/Loan/Forms/LoanUnderwritingForm';
import { ActionButton } from '@/components/Revamp/Buttons';
import {
  useGetAllLoansProduct,
  useGetAllLoansPurpose,
  useGetAllLoanRepaymentTypes,
  useGetAllLoanSources,
  useGetAllLoanCollaterals
} from '@/api/loans/useCreditFacility';
import { useGetBranches } from '@/api/general/useBranches';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { handleRedirect } from '@/utils';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const LoanFormContainer = () => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();
  const router = useRouter();
  const { loans } = useGetAllLoansProduct();
  const { loanPurpose } = useGetAllLoansPurpose();
  const { repaymentTypes } = useGetAllLoanRepaymentTypes();
  const { branches } = useGetBranches();
  const { loansources } = useGetAllLoanSources();
  const { collaterals } = useGetAllLoanCollaterals();

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const cancelLoan = () => {
    handleRedirect(router, '/loan/loan-directory/');
  };

  const actionButtons: any = [
    <Box ml={{ mobile: 2, desktop: 0 }} sx={{ display: 'flex' }}>
      <ActionButton
        onClick={cancelLoan}
        customStyle={{ ...cancelButton }}
        buttonTitle="Cancel"
      />

      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle="Submit"
        customStyle={{ ...submitButton }}
        onClick={triggerSubmission}
      />
    </Box>
  ];

  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box
        sx={{
          padding: { mobile: '0 5px', desktop: '0 25px' },
          width: '100%'
        }}
      >
        {loans !== undefined &&
          branches !== undefined &&
          repaymentTypes !== undefined &&
          loanPurpose !== undefined &&
          loansources !== undefined &&
          collaterals !== undefined && (
            <CreateLoanUnderwritingForm
              loans={loans}
              branches={branches}
              loansPurpose={loanPurpose}
              repaymentTypes={repaymentTypes}
              collaterals={collaterals}
              loansources={loansources}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          )}
      </Box>
    </Box>
  );
};
