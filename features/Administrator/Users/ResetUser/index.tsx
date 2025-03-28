'use client';
import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { PermissionsSection } from './PermissionsSection';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ResetUserDetails } from '@/features/Administrator/Forms/ResetUserDetails';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { FormSkeleton } from '@/components/Loaders';
import { useGetRoles } from '@/api/admin/useRole';

type Props = {
  userid?: string;
  fullname?: string;
  roleId?: string;
};

export const ResetUser = ({ userid, fullname, roleId }: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { setDirection } = useSetDirection();
  const { isLoading } = useGlobalLoadingState();
  const { roles, isLoading: areRolesLoading } = useGetRoles();
  const [showPasswordField, setShowPasswordField] = useState(false);

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  if (areRolesLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

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
              padding: { mobile: 0, tablet: '30px 0' }
            }}
          >
            <ResetUserDetails
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              userid={userid}
              fullname={fullname}
              roles={roles}
              roleId={roleId}
              showPassWordField={showPasswordField}
            />
          </Box>
          <PermissionsSection setShowPasswordField={setShowPasswordField} />
        </Stack>
      </Box>
    </>
  );
};
