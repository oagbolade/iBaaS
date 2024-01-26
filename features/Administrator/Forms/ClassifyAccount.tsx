import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSelectInput, FormTextInput } from '@/components/FormikFields';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { Loan } from '@/constants/Loan/selectOptions';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';

export const ClassifyAccount = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (values: any, actions: { setSubmitting: Function }) => {
    actions.setSubmitting(false);
  };

  return (
    <Box>
      <Box>
        <LargeTitle title="Classify Account" />
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
                <Grid mb={2} item={isTablet} mobile={12}>
                  <Box mt={2}>
                    <RadioButtons
                      options={[
                        { label: 'Classify', value: 'De-Classify' },
                        { label: 'No', value: 'no' },
                      ]}
                      title="Please select"
                      name="status"
                      value="active"
                    />
                  </Box>
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="staffId"
                    placeholder="932048794392"
                    label="Account Number"
                  />{' '}
                </Grid>
                <Grid mb={2} item={isTablet} mobile={12}>
                  <FormSelectInput
                    customStyle={{
                      width: setWidth(),
                      fontSize: '14px',
                    }}
                    name="loanStatus"
                    options={Loan.status}
                    label="Classify Type"
                    placeholder="Active Interest Accrual"
                  />{' '}
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
