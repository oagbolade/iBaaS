'use client';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import colors from '@/assets/colors';
import { ChangePasswordForm } from '@/features/Administrator/Forms/ChangePassword';

export const ChangePassword = () => {
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
            <ChangePasswordForm />
          </Box>
          <Box
            sx={{
              padding: { mobile: 6, tablet: '30px 32px' },
              alignItems: { mobile: 'center', tablet: 'normal' },
              width: '50%',
              borderLeft: `1px solid ${colors.neutral300}`,
            }}
          >
            <LargeTitle title="Permissions" />
            <Box mt={2}>
              <RadioButtons
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
                title="Can this user Login?"
                name="status"
                value="active"
              />
            </Box>
            <Box mt={2}>
              <RadioButtons
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
                title="Allow Multiple Login?"
                name="status"
                value="active"
              />
            </Box>
            <Box mt={2}>
              <RadioButtons
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
                title="Status Locked?"
                name="status"
                value="active"
              />
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
