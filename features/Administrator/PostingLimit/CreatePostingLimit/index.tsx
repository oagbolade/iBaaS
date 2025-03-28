'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { CreatePostingLimit as CreatePostingLimitForm } from '@/features/Administrator/Forms/CreatePostingLimit';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetRoles } from '@/api/admin/useRole';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useGetParams } from '@/utils/hooks/useGetParams';

export const CreatePostingLimit = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();
  const isEditing = useGetParams('isEditing') || '';

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const actionButtons: any = [
    <Box ml={{ mobile: 12, desktop: 0 }}>
      <PrimaryIconButton
        isLoading={isLoading}
        onClick={triggerSubmission}
        buttonTitle={`${isEditing ? 'Save Changes' : 'Create Posting Limit'}`}
        type="submit"
        customStyle={{
          ...submitButton,
          width: { mobile: '80px', desktop: '136px' }
        }}
      />
    </Box>
  ];

  const { branches } = useGetBranches();
  const { roles } = useGetRoles();

  return (
    <>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <Box sx={{ padding: '0 25px' }}>
        <Box
          mr={3}
          sx={{
            width: '50%',
            padding: { mobile: 2, tablet: '30px 0' }
          }}
        >
          {branches !== undefined && roles !== undefined && (
            <CreatePostingLimitForm
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              branches={branches}
              roles={roles}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
