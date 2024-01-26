'use client';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { PermissionsSection } from './PermissionsSection';
import { CreateAccountOfficer as CreateAccountOfficerForm } from '@/features/Administrator/Forms/CreateAccountOfficer';
import { TopActionsArea } from '@/components/Revamp/Shared';

export const CreateAccountOfficer = () => {
  return (
    <>
      <TopActionsArea customStyle={{ width: '100%' }} />
      <Box sx={{ padding: '0 25px' }}>
        <Stack direction="row">
          <Box
            mr={3}
            sx={{
              width: '50%',
              padding: { mobile: 6, tablet: '30px 0' },
            }}
          >
            <CreateAccountOfficerForm />
          </Box>
          <PermissionsSection />
        </Stack>
      </Box>
    </>
  );
};
