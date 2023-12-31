import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import {
  LargeTitle,
  Details,
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput } from '@/components/FormikFields';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import colors from '@/assets/colors';

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

export const CancelLoanForm = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void },
  ) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  return (
    <Box>
      <Box>
        <LargeTitle title="Cancel Loan" />
      </Box>
      <Box
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
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="newRate"
                    placeholder="3.2"
                    label="New Rate (%)"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="newTerm"
                    placeholder="5"
                    label="New Term (Months)"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="startDate"
                    placeholder="04 August, 2023"
                    label="Start Date"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="maturityDate"
                    placeholder="04 August, 2023"
                    label="Maturity Date"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="totalDays"
                    placeholder="365"
                    label="Total Days"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="principalOutstanding"
                    placeholder="33,432,432"
                    label="Principal Outstanding"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="interestOutstanding"
                    placeholder="32,432"
                    label="Interest Outstanding"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="penalInterestOutstanding"
                    placeholder="32,432"
                    label="Penal Interest Outstanding"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="principalPayout"
                    placeholder="1,432,532.53"
                    label="Principal Payout"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="interestPayout"
                    placeholder="2,532.53"
                    label="Interest Payout"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="penalInterestPayout"
                    placeholder="2,532.53"
                    label="Penal Interest Payout"
                    required
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={8}>
                  <Box>
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
