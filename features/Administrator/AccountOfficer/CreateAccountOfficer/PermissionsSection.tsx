import React from 'react';
import { Box } from '@mui/material';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import colors from '@/assets/colors';

export const PermissionsSection = () => {
  return (
    <Box
      sx={{
        padding: { mobile: 6, tablet: '30px 32px' },
        alignItems: { mobile: 'center', tablet: 'normal' },
        width: '50%',
        borderLeft: `1px solid ${colors.neutral300}`,
      }}
    >
      <LargeTitle title="Permissions" />
      <Box mt={2}>
        <RadioButtons
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          title="Is this Staff a Supervisor?"
          name="status"
          value="active"
        />
      </Box>
    </Box>
  );
};
