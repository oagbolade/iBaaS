'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { CreateRegionForm } from '@/features/Setup/Company/Forms/CreateRegionForm';

type Props = {
  regionId?: string;
};

export const CreateRegion = ({ regionId }: Props) => {
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
        buttonTitle={`${isEditing ? 'Save Changes' : 'Add Region'}`}
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
          <CreateRegionForm
            regionId={regionId}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </Box>
      </Box>
    </>
  );
};
