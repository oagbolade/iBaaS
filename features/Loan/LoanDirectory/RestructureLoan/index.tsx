'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Stack } from '@mui/material';
import { PreviewContentLoanDetailProductDetails } from '../PreviewLoan';
import { submitButton, cancelButton } from './styles';
import { ActionButton } from '@/components/Revamp/Buttons';
import { PrimaryIconButton } from '@/components/Buttons';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { RestructureLoanForm } from '@/features/Loan/Forms';
import { FormSkeleton } from '@/components/Loaders';
import {
  useGetLoanAccountByLoanAccountNumber,
  useGetLoansProductDetailCode,
  useGetAllLoanRepaymentTypes,
  useGetAllLoanSources,
  useGetAllLoanCollaterals
} from '@/api/loans/useCreditFacility';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint, handleRedirect } from '@/utils';
import colors from '@/assets/colors';
import { encryptData } from '@/utils/encryptData';
import { IProductDetails } from '@/schemas/schema-values/loan';

const FormFields: React.FC<{
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  loanAccDetails: any;
}> = ({ isSubmitting, setIsSubmitting, loanAccDetails }) => {
  const searchParams = useSearchParams();
  const accountNumber = searchParams.get('accountNumber') || '';

  const { repaymentTypes } = useGetAllLoanRepaymentTypes();
  const { loansources } = useGetAllLoanSources();
  const { collaterals } = useGetAllLoanCollaterals();

  return (
    <RestructureLoanForm
      repaymentTypes={repaymentTypes}
      collaterals={collaterals}
      loansources={loansources}
      isSubmitting={isSubmitting}
      customerID={loanAccDetails?.customerid || ''}
      setIsSubmitting={setIsSubmitting}
      accountNumber={accountNumber}
      settlementacct1={loanAccDetails?.settlementacct1 || ''}
      loanDetails={loanAccDetails}
    />
  );
};

export const RestructureLoan = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();
  const { setDirection } = useSetDirection();
  const { isTablet } = useCurrentBreakpoint();

  const searchParams = useSearchParams();
  const accountNumber = searchParams.get('accountNumber') || '';
  const productCode = searchParams.get('productCode') || '';

  const { data: loanAccDetails } = useGetLoanAccountByLoanAccountNumber(
    encryptData(accountNumber as string) || ''
  );



  // console.log(loanAccDetails, 'loanAccDetails');

  const { loanProducts } = useGetLoansProductDetailCode(
    encryptData(productCode as string) || ''
  );

  if (accountNumber && isLoading) {
    return (
      <Box>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const cancelAction = () => {
    handleRedirect(router, '/loan/loan-directory/');
  };

  const actionButtons: any = [
    <Box ml={{ mobile: 2, desktop: 0 }} sx={{ display: 'flex' }}>
      <ActionButton
        onClick={cancelAction}
        customStyle={{ ...cancelButton }}
        buttonTitle="Cancel"
      />

      <PrimaryIconButton
        isLoading={isLoading}
        onClick={triggerSubmission}
        buttonTitle="Restructure Loan"
        customStyle={{ ...submitButton }}
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
        <Stack direction={setDirection()}>
          <Box
            sx={{
              width: { mobile: '100%', desktop: '624px' },
              padding: '32px'
            }}
          >
            <FormFields
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              loanAccDetails={loanAccDetails}
            />
          </Box>
          {isTablet && (
            <Box
              sx={{
                width: '477px',
                padding: '32px',
                gap: '24px',
                borderLeft: `1px solid ${colors.neutral300}`,
                background: `${colors.neutral100}`,
                display: {
                  tablet: 'block',
                  mobile: 'none'
                }
              }}
            >
              <LargeTitle title="Preview" />
              <Box mt={3} />
              <PreviewContentLoanDetailProductDetails
                loanDetails={loanAccDetails}
                loanProduct={loanProducts as IProductDetails}
              />
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
