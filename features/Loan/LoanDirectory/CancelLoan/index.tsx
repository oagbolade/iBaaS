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
import { CancelLoanForm } from '@/features/Loan/Forms/CancelLoanForm';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import colors from '@/assets/colors';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint, handleRedirect } from '@/utils';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
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
}> = ({ isSubmitting, setIsSubmitting }) => {
  const searchParams = useSearchParams();
  const accountNumber = searchParams.get('accountNumber') || '';
  const customerId = searchParams.get('customerId') || '';

  return (
    <CancelLoanForm
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      accountNumber={accountNumber}
      customerID={customerId || ''}
    />
  );
};

export const CancelLoan: React.FC = () => {
  const searchParams = useSearchParams();
  const accountNumber = searchParams.get('accountNumber') || '';
  const status = searchParams.get('action') || '';
  const router = useRouter();

  const { setDirection } = useSetDirection();
  const { isTablet } = useCurrentBreakpoint();

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();

  const { loanAccDetails, isLoading: isLoadingLoanData } =
    useGetLoanAccountByLoanAccountNumber(
      encryptData(accountNumber as string) || '',
      status
    );

  const cancelAction = () => {
    handleRedirect(router, '/loan/loan-directory/');
  };

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const actionButtons: React.ReactNode[] = [
    <Box
      key="actionButtons"
      sx={{ display: 'flex' }}
      ml={{ mobile: 2, desktop: 0 }}
    >
      <ActionButton
        onClick={cancelAction}
        customStyle={{ ...cancelButton }}
        buttonTitle="Cancel"
      />

      <PrimaryIconButton
        isLoading={isLoading}
        buttonTitle="Cancel Loan"
        onClick={() => {
          triggerSubmission();
        }}
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
        <MobilePreviewContent
          isLoadingLoanData={isLoadingLoanData || false}
          data={loanAccDetails}
        />
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
              <LoanPreviewContent
                isLoadingLoanData={isLoadingLoanData || false}
                data={loanAccDetails}
              />
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
