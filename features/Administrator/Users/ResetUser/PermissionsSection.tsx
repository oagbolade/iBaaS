import React from 'react';
import { Box } from '@mui/material';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import colors from '@/assets/colors';
import { useGetUserByID } from '@/api/admin/useAdminUsers';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { FormSkeleton } from '@/components/Loaders';
import { encryptData } from '@/utils/encryptData';

type PermissionsSectionProps = {
  setShowPasswordField: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PermissionsSection = ({
  setShowPasswordField
}: PermissionsSectionProps) => {
  const userid = useGetParams('userid') || '';
  const { userDetails, isLoading } = useGetUserByID(
    encryptData(userid as string)
  );

  if (isLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  const handleStatusChange = (value: boolean) => {
    setShowPasswordField(value);
  };

  return (
    <Box
      mt={{ mobile: 2, desktop: 0 }}
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
          title="Can this user Login?"
          name="loginStatus"
          value={userDetails?.loginStatus?.toString() || '0'}
        />
      </Box>
      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow Multiple Login?"
          name="multiLogin"
          value={userDetails?.multilogin?.toString() || ''}
        />
      </Box>

      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Reset Password?"
          value="0"
          name="resetPassword"
          handleCheck={(e: any) => handleStatusChange(e)}
        />
      </Box>

      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Status Locked?"
          name="lockStatus"
          value={userDetails?.lockcount?.toString() || ''}
        />
      </Box>
    </Box>
  );
};
