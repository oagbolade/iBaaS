'use client';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { PermissionsSection } from './PermissionsSection';
import { CreateRole as CreateRoleForm } from '@/features/Administrator/Forms/CreateRole';
import { TopActionsArea } from '@/components/Revamp/Shared';

export const CreateRole = () => {
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
            <CreateRoleForm />
          </Box>
          <PermissionsSection />
        </Stack>
      </Box>
    </>
  );
};
