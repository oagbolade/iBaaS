'use client';
import { Box } from '@mui/material';
import React from 'react';
import { CreatePostingLimit as CreatePostingLimitForm } from '@/features/Administrator/Forms/CreatePostingLimit';
import { TopActionsArea } from '@/components/Revamp/Shared';

export const CreatePostingLimit = () => {
  return (
    <>
      <TopActionsArea customStyle={{ width: '100%' }} />
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
