'use client';
import { Box } from '@mui/material';
import React from 'react';
import { CreateGLAccount as CreateGLAccountForm } from '@/features/Administrator/Forms/CreateGLAccount';
import { TopActionsArea } from '@/components/Revamp/Shared';

export const CreateGLAccount = () => {
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
          <CreateGLAccountForm />
        </Box>
      </Box>
    </>
  );
};
