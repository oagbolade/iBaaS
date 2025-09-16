import React from 'react';
import { Grid } from '@mui/material';
import { useCurrentBreakpoint } from '@/utils';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';

export const OtherDetailsForm = () => {
  const { isTablet } = useCurrentBreakpoint();

  return (
    <Grid
      sx={{
        paddingLeft: '30px'
      }}
      container
      spacing={4}
    >
      <Grid item={isTablet} mobile={12} tablet={6}>
        <RadioButtons
          name="manageCollection"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Manage Collection date?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <RadioButtons
          name="securityDepType"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Security Deposit Required?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <RadioButtons
          name="chkHealthInsurance"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Health Insurance?"
          value="0"
        />
      </Grid>
    </Grid>
  );
};
