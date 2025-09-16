import React from 'react';
import { Grid } from '@mui/material';
import { useCurrentBreakpoint } from '@/utils';
import { FormikRadioButton, FormTextInput } from '@/components/FormikFields';

export const OtherCasaDetailsForm = () => {
  const { isTablet, setWidth, isMobile } = useCurrentBreakpoint();

  return (
    <Grid
      sx={{
        paddingLeft: '30px'
      }}
      container
      spacing={4}
    >
      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormTextInput
          name="floor"
          placeholder="Enter Default Amount"
          label="Default Amount"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormTextInput
          name="minAge"
          placeholder="Enter Minimum Age"
          label="Minimum Age"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormTextInput
          name="maxAge"
          placeholder="Enter Maximum Age"
          label="Maximum Age"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormikRadioButton
          name="checkBook"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow Cheque Book?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormikRadioButton
          name="phoneNo4AcctNumber"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Use Phone Number as Account Number"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormikRadioButton
          name="sweepIn"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow Sweep In?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormikRadioButton
          name="si"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow Standing Instruction?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormikRadioButton
          name="od"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow OD?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormikRadioButton
          name="lien"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Allow Lien?"
          value="0"
        />
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <FormikRadioButton
          name="stateInactive"
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Set to Inactive/Dormant A/C?"
          value="0"
        />
      </Grid>
    </Grid>
  );
};
