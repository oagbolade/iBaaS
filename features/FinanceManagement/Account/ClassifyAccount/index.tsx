'use client';
import { Box } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ClassifyAccount as ClassifyAccountForm } from '@/features/Administrator/Forms/ClassifyAccount';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const ClassifyAccount = () => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();
  const searchParams = useSearchParams();
  const accountNumber: string = searchParams.get('accountNumber') || '';

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const actionButtons: Array<React.ReactNode> = [
    <Box ml={0}>
      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle="Classify Account"
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
    <>
      
        <TopActionsArea
          customStyle={{ width: '100%' }}
          actionButtons={actionButtons}
        />
      
      <Box sx={{ padding: '0 25px' }}>
        <Box
          mr={{ mobile: 0, desktop: 3 }}
          sx={{
            width: { mobile: '100%', desktop: '50%' },
            padding: { mobile: 2, tablet: '30px 0' }
          }}
        >
          <ClassifyAccountForm
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            accountNumber={accountNumber}
          />
        </Box>
      </Box>
    </>
  );
};
