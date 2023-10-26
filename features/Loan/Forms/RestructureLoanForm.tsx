import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import {
  LargeTitle,
  Details,
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Formik, Form } from 'formik';
import { FormTextInput } from '@/components/FormikFields';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import colors from '@/assets/colors';
import { InterestSection } from './InterestSection';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export const Balance = ({ amount }: { amount: string }) => (
  <Typography
    sx={{
      color: `${colors.activeBlue400}`,
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '32px',
      position: 'relative',
      bottom: '20px',
    }}
  >
    {amount}
  </Typography>
);

export const RestructureLoanForm = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  return (
    <Box>
      <Box ml={{ mobile: 30, tablet: 0 }}>
        <LargeTitle title="Restructure Loan" />
      </Box>
      <Box
        ml={{ mobile: 60, tablet: 0 }}
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' },
        }}
      >
        <Formik
          initialValues={userInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={userSchema}
        >
          <Form>
            <Box mt={4}>
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
                    name="newRate"
                    placeholder="3.2"
                    label="New Rate (%)"
                    required
                  />{' '}
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
                    name="newTerm"
                    placeholder="5"
                    label="New Term (Months)"
                    required
                  />{' '}
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
                    name="startDate"
                    placeholder="04 August, 2023"
                    label="Start Date"
                    required
                  />{' '}
                </Grid>
                <Grid
                  container={isMobile}
                  item={isTablet}
                  justifyContent="center"
                  mobile={12}
                >
                  <InterestSection title="Outstanding Principal" />
                  <InterestSection title="Accrued Interest" />
                  <InterestSection title="Accrued Penal Interest" />
                  <InterestSection title="Accrued Estimated Interest" />
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
                    name="maturityDate"
                    placeholder="04 August, 2023"
                    label="Maturity Date"
                    required
                  />{' '}
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
                    name="totalDays"
                    placeholder="365"
                    label="Total Days"
                    required
                  />{' '}
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
                    name="principalOutstanding"
                    placeholder="33,432,432"
                    label="Principal Outstanding"
                    required
                  />{' '}
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
                    name="interestOutstanding"
                    placeholder="32,432"
                    label="Interest Outstanding"
                    required
                  />{' '}
                </Grid>
                <Grid
                  container={isMobile}
                  item={isTablet}
                  justifyContent="center"
                  mobile={12}
                  mb={2}
                  width={{mobile: '560px'}}
                >
                  <Box sx={{width: {mobile: '760px', tablet: '560px'}}}>
                    <DemoContainer components={['DatePicker']}>
                      <DateTimePicker name="datePicker" label="Posting Date" />
                    </DemoContainer>
                  </Box>
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
                    name="principalPayout"
                    placeholder="1,432,532.53"
                    label="Principal Payout"
                    required
                  />{' '}
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
                    name="interestPayout"
                    placeholder="2,532.53"
                    label="Interest Payout"
                    required
                  />{' '}
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
                <Grid
                  container={isMobile}
                  item={isTablet}
                  justifyContent="center"
                  mobile={12}
                >
                  <Box mr={{ mobile: 50, tablet: 0 }}>
                    <Details title="Balance After" />
                    <Balance amount="N132,432,543.43" />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
