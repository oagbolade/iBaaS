'use client';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { PermissionsSection } from './PermissionsSection';
import { CreateUserForm } from '@/features/Administrator/Forms/CreateUser';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useSetDirection } from '@/utils/useSetDirection';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>,
];

export const CreateUser = () => {
  const { setDirection } = useSetDirection();

  return (
    <>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Stack direction={setDirection()}>
          <Box
            mr={3}
            sx={{
              width: '50%',
              padding: { mobile: 0, tablet: '30px 0' },
            }}
          >
            <CreateUserForm />
          </Box>
          <PermissionsSection />
        </Stack>
      </Box>
    </>
  );
};
