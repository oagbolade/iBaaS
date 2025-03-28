'use client';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { PermissionsSection } from './PermissionsSection';
import { CreateUserForm } from '@/features/Administrator/Forms/CreateUser';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetDepartments } from '@/api/general/useDepartments';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useGetStatus } from '@/api/general/useStatus';
import { useGetRoles } from '@/api/admin/useRole';

type Props = {
  userid?: string;
};

export const CreateUser = ({ userid }: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { setDirection } = useSetDirection();
  const { isLoading } = useGlobalLoadingState();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const actionButtons: Array<React.ReactNode> = [
    <Box ml={{ mobile: 12, desktop: 0 }}>
      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle={`${isEditing ? 'Save Changes' : 'Create User'}`}
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
        }}
      />
    </Box>
  ];

  const { branches } = useGetBranches();
  const { status } = useGetStatus();
  const { departments } = useGetDepartments();
  const { roles } = useGetRoles();

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
              width: { mobile: '100%', desktop: '50%' },
              padding: { mobile: 0, tablet: '30px 0' }
            }}
          >
            {branches !== undefined &&
              departments !== undefined &&
              roles !== undefined &&
              status !== undefined && (
                <CreateUserForm
                  userid={userid}
                  branches={branches}
                  roles={roles}
                  departments={departments}
                  status={status}
                  isSubmitting={isSubmitting}
                  setIsSubmitting={setIsSubmitting}
                />
              )}
          </Box>
          <PermissionsSection />
        </Stack>
      </Box>
    </>
  );
};
