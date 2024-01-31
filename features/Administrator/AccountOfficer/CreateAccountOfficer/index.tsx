'use client';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { PermissionsSection } from './PermissionsSection';
import { CreateAccountOfficer as CreateAccountOfficerForm } from '@/features/Administrator/Forms/CreateAccountOfficer';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useSetDirection } from '@/utils/useSetDirection';

export const CreateAccountOfficer = () => {
  const { setDirection } = useSetDirection();

  return (
    <>
      <TopActionsArea customStyle={{ width: '100%' }} />
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Stack direction={setDirection()}>
          <Box
            mr={3}
            sx={{
              width: '50%',
              padding: { mobile: 0, tablet: '30px 0' },
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
