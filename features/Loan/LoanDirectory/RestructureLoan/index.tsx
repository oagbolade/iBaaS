'use client';
import React from 'react';
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
  accountNumber: string;
  settlementAccount: string;
  productCode: string;
  branchCode: string;
  customerID: string;
}> = ({
  isSubmitting,
  setIsSubmitting,
  loanAccDetails,
  accountNumber,
  settlementAccount,
  productCode,
  branchCode,
  customerID
}) => {
  const { repaymentTypes } = useGetAllLoanRepaymentTypes();
  const { loansources } = useGetAllLoanSources();
  const { collaterals } = useGetAllLoanCollaterals();

  return (
    <RestructureLoanForm
      repaymentTypes={repaymentTypes}
      collaterals={collaterals}
      loansources={loansources}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      loanDetails={loanAccDetails}
      accountNumber={accountNumber}
      settlementAccount={settlementAccount}
      productCode={productCode}
      branchCode={branchCode}
      customerID={customerID}
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
  const settlementAccount = searchParams.get('settlementAccount') || '';
  const productCode = searchParams.get('productCode') || '';
  const status = searchParams.get('action') || '';
  const branchCode = searchParams.get('branchCode') || '';
  const customerID = searchParams.get('customerID') || '';

  const { loanAccDetails, isLoading: loadingData } =
    useGetLoanAccountByLoanAccountNumber(
      encryptData(accountNumber as string) || '',
      status
    );

  const { loanProducts } = useGetLoansProductDetailCode(
    encryptData(productCode as string) || ''
  );

  if (loadingData) {
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
        type="submit"
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
              width: { mobile: '100%', desktop: '55%' },
              padding: '32px'
            }}
          >
            <FormFields
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              loanAccDetails={loanAccDetails}
              accountNumber={accountNumber}
              settlementAccount={settlementAccount}
              productCode={productCode}
              branchCode={branchCode}
              customerID={customerID}
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
