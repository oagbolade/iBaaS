import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Box } from '@mui/material';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import colors from '@/assets/colors';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { FormSkeleton } from '@/components/Loaders';
import { queryKeys } from '@/react-query/constants';

export interface UserData {
  userDetails?: {
    globalAuth?: number;
    authtype?: number;
    statement?: number;
    canauth?: number;
    isoperation?: number;
  };
}

export const PermissionsSection = () => {
  const { isLoading } = useGlobalLoadingState();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();
  const query = queryCache.findAll({
    queryKey: [queryKeys.getAccountOfficerByCode]
  }) as { state: { data?: UserData } }[];

  const authtype = (query && query[0]?.state?.data?.userDetails?.authtype) || 0;
  const statement =
    (query && query[0]?.state?.data?.userDetails?.statement) || 0;
  const globalAuth =
    (query && query[0]?.state?.data?.userDetails?.globalAuth) || 0;

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
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Is this a Non-DMB Institution?"
          name="plr"
          value={`${isEditing ? authtype : 0}`}
        />
      </Box>
      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Treat sub branch as branch?"
          name="non_dmb"
          value={`${isEditing ? statement : 0}`}
        />
      </Box>
      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow multiple accounts on same product?"
          name="dmb"
          value={`${isEditing ? globalAuth : 0}`}
        />
      </Box>
      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow system inventory"
          name="notice"
          value={`${isEditing ? globalAuth : 0}`}
        />
      </Box>
      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Require alert"
          name="inventory"
          value={`${isEditing ? globalAuth : 0}`}
        />
      </Box>
    </Box>
  );
};
