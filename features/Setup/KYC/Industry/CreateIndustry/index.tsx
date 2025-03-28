'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useGetStatus } from '@/api/general/useStatus';
import { CreateIndustryForm } from '@/features/Setup/KYC/Forms/CreateIndustryForm';
import { useGetAllSectors } from '@/api/setup/useSector';

type Props = {
  industryId?: string;
};

export const CreateIndustry = ({ industryId }: Props) => {
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
        buttonTitle={`${isEditing ? 'Save Changes' : 'Create industry'}`}
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
        }}
      />
    </Box>
  ];

  const { status } = useGetStatus();
  const { sectors } = useGetAllSectors();

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
          {sectors !== undefined && status !== undefined && (
            <CreateIndustryForm
              industryId={industryId}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              sectors={sectors}
              status={status}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
