'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetBranches } from '@/api/general/useBranches';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useGetStatus } from '@/api/general/useStatus';
import { CreateGroupForm } from '@/features/Setup/KYC/Forms/CreateGroupForm';
import { useGetAccountOfficers } from '@/api/admin/useAccountOfficer';
import { useGetGLAccount } from '@/api/admin/useCreateGLAccount';

type Props = {
  groupId: string | null;
};

export const CreateGroup = ({ groupId }: Props) => {
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
        buttonTitle={`${isEditing ? 'Save Changes' : 'Create Group'}`}
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
        }}
      />
    </Box>
  ];

  const { branches } = useGetBranches();
  const { status } = useGetStatus();
  const { officers } = useGetAccountOfficers();
  const { bankgl } = useGetGLAccount();

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
          {branches !== undefined &&
            officers !== undefined &&
            bankgl !== undefined &&
            status !== undefined && (
              <CreateGroupForm
                branches={branches}
                officers={officers}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                groupId={groupId}
              />
            )}
        </Box>
      </Box>
    </>
  );
};
