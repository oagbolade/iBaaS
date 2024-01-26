import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSelectInput, FormTextInput } from '@/components/FormikFields';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { Loan } from '@/constants/Loan/selectOptions';

export const CreatePostingLimit = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (values: any, actions: { setSubmitting: Function }) => {
    actions.setSubmitting(false);
  };

  return (
    <Box>
      <Box>
        <LargeTitle title="Create New Limit" />
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
              <Grid mb={2} item={isTablet} mobile={12}>
                <FormSelectInput
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                  }}
                  name="role"
                  options={Loan.status}
                  label="Role"
                  placeholder="Teller"
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
                  label="Branch"
                  placeholder="Gbagada Branch"
                />{' '}
              </Grid>
              <Grid container>
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
                    placeholder="0.0"
                    label="Credit Limit ( Max amount for withdrawal )"
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="staffName"
                    placeholder="0.0"
                    label="Debit Limit ( Max amount for deposit )"
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="email"
                    placeholder="0.0"
                    label="CR Interbranch Limit"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="email"
                    placeholder="0.0"
                    label="CR Intrabranch Limit"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="email"
                    placeholder="0.0"
                    label="DR Intrabranch Limit"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="email"
                    placeholder="0.0"
                    label="DR Intrabranch Limit"
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="email"
                    placeholder="0.0"
                    label="Term Deposit Limit"
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                    }}
                    name="email"
                    placeholder="0.0"
                    label="Loan Limit"
                    required
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
