'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Stack } from '@mui/material';
import { AddCheque } from '../Form/AddCheque';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { useCurrentBreakpoint } from '@/utils';
import { useGetGLAccount } from '@/api/admin/useCreateGLAccount';

type Props = {
  chequeId: string | null;
};
export const CreateChequeBook = ({ chequeId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isMobile } = useCurrentBreakpoint();

  const { isLoading } = useGlobalLoadingState();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const triggerSubmission = () => {
    setIsSubmitting(true);
  };
  const { bankgl } = useGetGLAccount();

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
          {Array.isArray(bankgl) && bankgl.length > 0 && (
            <AddCheque
              setIsSubmitting={setIsSubmitting}
              isSubmitting={isSubmitting}
              chequeId={chequeId}
              bankgl={bankgl}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
