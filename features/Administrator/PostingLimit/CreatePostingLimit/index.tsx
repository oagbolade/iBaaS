'use client';
import { Box } from '@mui/material';
import React from 'react';
import { CreatePostingLimit as CreatePostingLimitForm } from '@/features/Administrator/Forms/CreatePostingLimit';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Create Posting Limit" customStyle={{ ...submitButton }} />
  </Box>,
];

export const CreatePostingLimit = () => {
  return (
    <>
      <TopActionsArea customStyle={{ width: '100%' }} actionButtons={actionButtons} />
      <Box sx={{ padding: '0 25px' }}>
        <Box
          mr={3}
          sx={{
            width: '50%',
            padding: { mobile: 6, tablet: '30px 0' },
          }}
        >
          <CreatePostingLimitForm />
        </Box>
      </Box>
    </>
  );
};
