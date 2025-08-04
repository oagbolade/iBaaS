'use client';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ActionButton } from '@/components/Revamp/Buttons';
import { PrimaryIconButton } from '@/components/Buttons';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { TerminateLoanForm } from '@/features/Loan/Forms/TerminateLoanForm';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import colors from '@/assets/colors';
import { useCurrentBreakpoint, handleRedirect } from '@/utils';
import LoanPreviewContent from '@/features/Loan/LoanDirectory/LoanPreviewContent';
import { useGetLoanAccountByLoanAccountNumber } from '@/api/loans/useCreditFacility';
import { encryptData } from '@/utils/encryptData';

const MobilePreviewContent: React.FC<{
  data?: any;
  isLoadingLoanData: boolean;
}> = ({ data, isLoadingLoanData }) => {
  return (
    <MobileModalContainer
      ShowPreview={
        <LoanPreviewContent isLoadingLoanData={isLoadingLoanData} data={data} />
      }
    />
  );
};

const FormFields: React.FC<{
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  loanDetails: any;
}> = ({ isSubmitting, setIsSubmitting, loanDetails }) => {
  const searchParams = useSearchParams();
  const accountNumber = searchParams.get('accountNumber') || '';
  const settlementAccount = searchParams.get('settlementAccount');

  return (
    <TerminateLoanForm
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      accountNumber={accountNumber}
      settlementacct1={settlementAccount || ''}
      loanDetails={loanDetails}
    />
  );
};

export const TerminateLoan = () => {
  const searchParams = useSearchParams();
  const accountNumber = searchParams.get('accountNumber') || '';

  const router = useRouter();

  const { setDirection } = useSetDirection();
  const { isTablet } = useCurrentBreakpoint();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const cancelAction = () => {
    handleRedirect(router, '/loan/loan-directory/');
  };

  const { data, isLoading: isLoadingLoanData } =
    useGetLoanAccountByLoanAccountNumber(
      encryptData(accountNumber as string) || ''
    );

  const actionButtons:  React.ReactNode[] = [
    <Box ml={{ mobile: 2, desktop: 0 }} sx={{ display: 'flex' }}>
      <ActionButton
        onClick={cancelAction}
        customStyle={{ ...cancelButton }}
        buttonTitle="Cancel"
      />

      <PrimaryIconButton
        isLoading={isLoading}
        onClick={() => {
          triggerSubmission();
        }}
        buttonTitle="Liquidate Loan"
        customStyle={{ ...submitButton }}
      />
    </Box>
  ];

  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box
        data-testid="loading-skeleton"
        sx={{
          padding: { mobile: '0 5px', desktop: '0 25px' },
          width: '100%'
        }}
      >
        <MobilePreviewContent
          isLoadingLoanData={isLoadingLoanData || false}
          data={data}
        />
        <Stack direction={setDirection()}>
          <Box
            sx={{
              width: { mobile: '100%', desktop: '500px' },
              padding: '32px'
            }}
          >
            <FormFields
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              loanDetails={data}
            />
          </Box>

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
            <LoanPreviewContent
              isLoadingLoanData={isLoadingLoanData || false}
              data={data}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
