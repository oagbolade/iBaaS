'use client';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ChangePasswordForm } from '@/features/Administrator/Forms/ChangePasswords';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { useGetDepartments } from '@/api/general/useDepartments';
import { FormSkeleton } from '@/components/Loaders';
import { useGetRoles } from '@/api/admin/useRole';

type Props = {
  userid?: string;
  fullname?: string;
};

export const ChangePassword = ({ userid, fullname }: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();

  const { roles } = useGetRoles();
  const { departments } = useGetDepartments();

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const actionButtons: Array<React.ReactNode> = [
    <Box ml={{ mobile: 12, desktop: 0 }}>
      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle="Save Changes"
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
        }}
      />
    </Box>
  ];

  if (isLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Stack direction="row">
          <Box
            mr={3}
            sx={{
              width: '50%',
              padding: { mobile: 0, tablet: '30px 0' }
            }}
          >
            <ChangePasswordForm
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              userid={userid}
              fullname={fullname}
              roles={roles}
              departments={departments}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
};
