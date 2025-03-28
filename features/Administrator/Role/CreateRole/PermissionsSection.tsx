import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import colors from '@/assets/colors';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { FormSkeleton } from '@/components/Loaders';
import { IPermissionValues } from '@/constants/types';

type PermissionNames = 'canauth' | 'isoperation';

type Props = {
  permissionValues: IPermissionValues;
  handlePermission?: (value: boolean, name: PermissionNames) => void;
};

export const PermissionsSection = ({
  handlePermission,
  permissionValues
}: Props) => {
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
          title="Can Authorise?"
          name="status"
          value={String(permissionValues?.canauth)}
          handleCheck={(value: boolean) => handlePermission?.(value, 'canauth')}
        />
      </Box>
      <Box mt={2}>
        <RadioButtons
          className="permissionOptions"
          options={[
            { label: 'Yes', value: 1 },
            { label: 'No', value: 0 }
          ]}
          title="Can Post Operation Transactions?"
          name="status"
          value={String(permissionValues?.isoperation)}
          handleCheck={(value: boolean) =>
            handlePermission?.(value, 'isoperation')
          }
        />
      </Box>
    </Box>
  );
};
