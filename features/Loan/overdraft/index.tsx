'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import { SetOverDraft as SetOverDraftForm } from './SetOverDraft';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { ActionButton } from '@/components/Revamp/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { useGetAccountDetails } from '@/api/customer-service/useCustomer';
import { useGetBranches } from '@/api/general/useBranches';
import { handleRedirect } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import { encryptData } from '@/utils/encryptData';

export const SetOverDraft = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const accountNumber: string = searchParams.get('accountNumber') || '';

  const { isLoading } = useGlobalLoadingState();
  const { branches } = useGetBranches();

  const { accDetailsResults, isLoading: areAccoutDetailsLoading } =
    useGetAccountDetails(encryptData(accountNumber) as string);

  if (accountNumber && areAccoutDetailsLoading) {
    return (
      <Box>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const cancelButtonRouter = () => {
    handleRedirect(router, '/loan/overdrafts/');
  };

  const actionButtons: Array<React.ReactNode> = [
    <Box ml={{ mobile: 2, desktop: 0 }} sx={{ display: 'flex' }}>
      <ActionButton
        onClick={cancelButtonRouter}
        customStyle={{ ...cancelButton }}
        buttonTitle="Cancel"
      />

      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle="Submit"
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '80px', desktop: '171' },
          fontSize: { mobile: '12px' }
        }}
      />
    </Box>
  ];

  return (
    <Box>
      <Box sx={{ width: '100%', padding: '0 13px' }}>
        <TopActionsArea
          customStyle={{ width: '100%' }}
          actionButtons={actionButtons}
        />
      </Box>
      <Box sx={{ padding: '0 25px' }}>
        <Box>
          {branches && (
            <SetOverDraftForm
              branches={branches}
              setIsSubmitting={setIsSubmitting}
              accountNumber={accountNumber}
              isSubmitting={isSubmitting}
              accDetailsResults={accDetailsResults}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
