'use client';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ResetUserDetailsForm } from '@/features/Administrator/Forms/ResetUserDetails';

export const ResetUserDetails = () => {
  return (
    <>
      <TopActionsArea customStyle={{ width: '100%' }} />
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Stack direction="row">
          <Box
            mr={3}
            sx={{
              width: '50%',
              padding: { mobile: 0, tablet: '30px 0' },
            }}
          >
            <ResetUserDetailsForm />
          </Box>
        </Stack>
      </Box>
    </>
  );
};
