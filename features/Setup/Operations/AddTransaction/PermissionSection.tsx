import React, { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Box } from '@mui/material';
import { UserData } from '@/features/Administrator/CreateUser/PermissionsSection';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import colors from '@/assets/colors';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { FormSkeleton } from '@/components/Loaders';
import { queryKeys } from '@/react-query/constants';
import { CheckboxInput } from '@/components/FormikFields';

type Props = {
  handlePermission?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const PermissionsSection = ({ handlePermission }: Props) => {
  const { isLoading } = useGlobalLoadingState();

  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();
  const query = queryCache.findAll({
    queryKey: [queryKeys.getAccountOfficerByCode]
  }) as { state: { data?: UserData } }[];

  const canauth = (query && query[0]?.state?.data?.userDetails?.canauth) || 0;
  const isoperation =
    (query && query[0]?.state?.data?.userDetails?.isoperation) || 0;
  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={1} />;
  }

  return (
    <Box
      sx={{
        padding: { mobile: 6, tablet: '30px 32px' },
        alignItems: { mobile: 'center', tablet: 'normal' },
        width: '50%',
        borderLeft: `1px solid ${colors.neutral300}`
      }}
    >
      <LargeTitle title="Permissions" />
      <Box mt={2}>
        <CheckboxInput
          className="permissionOptions"
          handleCheck={handlePermission}
          label="Allow Transaction Charges"
        />
      </Box>
    </Box>
  );
};
