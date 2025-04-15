'use client';
import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { PermissionsSection } from './PermissionsSection';
import { CreateAccountOfficer as CreateAccountOfficerForm } from '@/features/Administrator/Forms/CreateAccountOfficer';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetDepartments } from '@/api/general/useDepartments';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useGetStatus } from '@/api/general/useStatus';
import { useGetAccountOfficers } from '@/api/admin/useAccountOfficer';
import { useGetAllUsers } from '@/api/admin/useAdminUsers';

export const CreateAccountOfficer = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { setDirection } = useSetDirection();
  const { isLoading } = useGlobalLoadingState();
  const { officers } = useGetAccountOfficers();
  const { users } = useGetAllUsers();

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
        buttonTitle={`${isEditing ? 'Save Changes' : 'Create Officer'}`}
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
              width: '100%',
              padding: { mobile: 0, tablet: '30px 0' }
            }}
          >
            {branches !== undefined &&
              officers !== undefined &&
              users !== undefined &&
              departments !== undefined &&
              status !== undefined && (
                <CreateAccountOfficerForm
                  officers={officers}
                  branches={branches}
                  departments={departments}
                  status={status}
                  isSubmitting={isSubmitting}
                  setIsSubmitting={setIsSubmitting}
                  users={users}
                />
              )}
          </Box>
          <PermissionsSection />
        </Stack>
      </Box>
    </>
  );
};
