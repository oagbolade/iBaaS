import React from 'react';
import { Box, Grid } from '@mui/material';
import { ContainerStyle } from './styles';
import { FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';

type Props = {
  title: React.ReactNode;
};

export const InterestSection = ({ title }: Props) => {
  const { isTablet, setWidth, isMobile } = useCurrentBreakpoint();

  return (
    <Box
      sx={{
        ...ContainerStyle,
      }}
    >
      <Grid container>
        <Grid item={isTablet} mobile={12}>
          <FormTextInput
            customStyle={{
              width: setWidth(isMobile ? '230px' : '100%'),
            }}
            name="penalInterestPayout"
            placeholder="2,532.53"
            label="Outstanding Principal"
            required
          />{' '}
        </Grid>
        <Grid my={2} item={isTablet} mobile={12}>
          <RadioButtons
            options={[
              { label: 'Add', value: 'add' },
              { label: 'Write Off', value: 'writeOff' },
              { label: 'Partial Write Off', value: 'partialWriteOff' },
            ]}
            title="Actions"
            name="actions"
            value="mianAction"
          />
        </Grid>
        <Grid item={isTablet} mobile={12}>
          <FormTextInput
            customStyle={{
              width: setWidth(isMobile ? '230px' : '100%'),
            }}
            name="penalInterestPayout"
            placeholder="2,532.53"
            label="Penal Interest Payout"
            required
          />{' '}
        </Grid>
      </Grid>
    </Box>
  );
};
