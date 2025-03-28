'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { AddTransactionType } from '../Form/AddTransaction';
import { PermissionsSection } from './PermissionSection';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useSetDirection } from '@/utils/hooks/useSetDirection';

type Props = {
  transactionId: string | null;
};
export const AddTransaction = ({ transactionId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();
  const searchParams = useSearchParams();
  const { setDirection } = useSetDirection();
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
        <Stack direction={setDirection()}>
          <Box
            mr={3}
            sx={{
              width: '50%',
              padding: { mobile: 0, tablet: '30px 0' }
            }}
          >
            <AddTransactionType
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              transactionId={transactionId}
            />
          </Box>
          <PermissionsSection />
        </Stack>
      </Box>
    </>
  );
};
