'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { CreateBank } from '../Form/AddBank';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';

type Props = {
  bankId: string | null;
};
export const AddBank = ({ bankId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const actionButtons: Array<React.ReactNode> = [
    <Box ml={{ mobile: 12, desktop: 0 }}>
      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle={`${isEditing ? 'Save Changes' : 'Submit'}`}
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
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
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Box
          mr={3}
          sx={{
            width: '50%',
            padding: { mobile: 0, tablet: '30px 0' }
          }}
        >
          <CreateBank
            bankId={bankId}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </Box>
      </Box>
    </>
  );
};
