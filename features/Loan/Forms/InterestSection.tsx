import React from 'react';
import { Box, Grid } from '@mui/material';
import colors from '@/assets/colors';
import { FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { ContainerStyle } from './styles';

type Props = {
  title: React.ReactNode;
};

export const InterestSection = ({ title }: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  return (
    <Box
      sx={{
        ...ContainerStyle,
      }}
    >
      <Grid container>
        <Grid
          container={isMobile}
          item={isTablet}
          justifyContent="center"
          mobile={12}
        >
          <FormTextInput
            customStyle={{
              width: setWidth(),
            }}
            name="penalInterestPayout"
            placeholder="2,532.53"
            label="Outstanding Principal"
            required
          />{' '}
        </Grid>
        <Grid
          my={2}
          container={isMobile}
          item={isTablet}
          justifyContent="center"
          mobile={12}
        >
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
        <Grid
          container={isMobile}
          item={isTablet}
          justifyContent="center"
          mobile={12}
        >
          <FormTextInput
            customStyle={{
              width: setWidth(),
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
