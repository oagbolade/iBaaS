'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { CreateTownForm } from '@/features/Setup/Company/Forms/CreateTownForm';
import { useGetAllStates } from '@/api/general/useGeography';

type Props = {
  townId?: string | null;
};

export const CreateTown = ({ townId }: Props) => {
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
        buttonTitle={`${isEditing ? 'Save Changes' : 'Add Town'}`}
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
        }}
      />
    </Box>
  ];

  const { states } = useGetAllStates();

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
          {states !== undefined && (
            <CreateTownForm
              townId={townId}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              states={states}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
