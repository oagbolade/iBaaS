import React from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import colors from '@/assets/colors';
import { FormSkeleton } from '@/components/Loaders';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useGetAccountOfficerByCode } from '@/api/admin/useAccountOfficer';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { encryptData } from '@/utils/encryptData';

export const PermissionsSection = () => {
  const officerCode = useGetParams('officercode') || '';
  const { officer } = useGetAccountOfficerByCode(encryptData(officerCode));

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
          id="createOfficerPermission"
          options={[
            { label: 'Yes', value: 1 },
            { label: 'No', value: 0 }
          ]}
          title="Is this Staff a Supervisor?"
          name="auth"
          value={`${isEditing ? officer?.auth : 0}`}
        />
      </Box>
    </Box>
  );
};
