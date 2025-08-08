import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import colors from '@/assets/colors';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { FormSkeleton } from '@/components/Loaders';
import { useGetUserByID } from '@/api/admin/useAdminUsers';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';

export interface UserData {
  userDetails?: {
    globalAuth?: number;
    authtype?: number;
    statement?: number;
    canauth?: number;
    isoperation?: number;
    enable2FA?: string;
    VirtualUser?: string;
  };
}

export const PermissionsSection = () => {
  const userid = useGetParams('userid') || '';
  const { userDetails } = useGetUserByID(encryptData(userid as string));
  const { isLoading } = useGlobalLoadingState();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');

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
            { label: 'Yes', value: 1 },
            { label: 'No', value: 0 }
          ]}
          title="Does this staff supervise other staff?"
          name="status"
          value={`${isEditing ? userDetails?.isSupervisor : 0}`}
        />
      </Box>
      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: 1 },
            { label: 'No', value: 0 }
          ]}
          title="Can print statement?"
          name="status"
          value={`${isEditing ? userDetails?.statement : 0}`}
        />
      </Box>
      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: 1 },
            { label: 'No', value: 0 }
          ]}
          title="Virtual User?"
          name="VirtualUser"
          value={`${isEditing ? userDetails?.VirtualUser : 0}`}
        />
      </Box>
      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: 1 },
            { label: 'No', value: 0 }
          ]}
          title="Global Authoriser?"
          name="status"
          value={`${isEditing ? userDetails?.globalAuth : 0}`}
        />
      </Box>
      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Enable 2FA"
          name="enable2FA"
          value={`${isEditing ? userDetails?.enable2FA : '0'}`}
        />
      </Box>
    </Box>
  );
};
