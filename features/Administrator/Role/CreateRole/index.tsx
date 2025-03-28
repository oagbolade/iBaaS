'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Stack } from '@mui/material';
import { PermissionsSection } from './PermissionsSection';
import { PrimaryIconButton } from '@/components/Buttons';
import { CreateRole as CreateRoleForm } from '@/features/Administrator/Forms/CreateRole';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useGetRoleByID } from '@/api/admin/useRole';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { IPermissionValues } from '@/constants/types';

type PermissionNames = 'canauth' | 'isoperation';

export const CreateRole = () => {
  const roleid = useGetParams('roleid') || '';
  const { role, isLoading: areRolesLoading } = useGetRoleByID(
    encryptData(roleid)
  );

  const { setDirection } = useSetDirection();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPermission, setShowPermission] = useState<boolean>(false);
  const [permissionValues, setPermissionValues] = useState<IPermissionValues>({
    canauth: role?.canauth ? 1 : 0,
    isoperation: role?.isoperation ? 1 : 0
  });

  const { isLoading } = useGlobalLoadingState();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const handlePermissionChange = (value: boolean, name: PermissionNames) => {
    if (name === 'canauth') {
      setShowPermission(value);
    }

    setPermissionValues({
      ...permissionValues,
      [name]: value
    });
  };

  React.useEffect(() => {
    if (isEditing) {
      setShowPermission(Boolean(role?.canauth));
    }

    setPermissionValues({
      ...permissionValues,
      canauth: role?.canauth ? 1 : 0,
      isoperation: role?.isoperation ? 1 : 0
    });
  }, [areRolesLoading]);

  const actionButtons: Array<React.ReactNode> = [
    <Box ml={{ mobile: 12, desktop: 0 }}>
      <PrimaryIconButton
        type="submit"
        isLoading={isLoading}
        onClick={triggerSubmission}
        buttonTitle={`${isEditing ? 'Save Changes' : 'Create New Role'}`}
        customStyle={{ ...submitButton }}
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
              width: { mobile: '100%', desktop: '50%' },
              padding: { mobile: 0, tablet: '30px 0' }
            }}
          >
            <CreateRoleForm
              permissionValues={permissionValues}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              showPermission={showPermission}
            />
          </Box>
          <PermissionsSection
            permissionValues={permissionValues}
            handlePermission={handlePermissionChange}
          />
        </Stack>
      </Box>
    </>
  );
};
