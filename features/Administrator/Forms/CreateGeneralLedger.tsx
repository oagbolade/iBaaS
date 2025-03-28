import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSelectInput, FormTextInput } from '@/components/FormikFields';
import { user as userSchema } from '@/schemas/auth';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { Loan } from '@/constants/Loan/selectOptions';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';

export const CreateGeneralLedger = () => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (values: any, actions: { setSubmitting: Function }) => {
    actions.setSubmitting(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} General Ledger`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={userInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={userSchema}
        >
          <Form>
            <Box mt={{ mobile: 2, tablet: 4 }}>
              <Grid mb={2} item={isTablet} mobile={12}>
                <FormSelectInput
                  customStyle={{
                    width: setWidth(isMobile ? '300px' : '100%'),
                    fontSize: '14px'
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
                    width: setWidth(isMobile ? '300px' : '100%'),
                    fontSize: '14px'
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
                      width: setWidth(isMobile ? '300px' : '100%')
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
                      width: setWidth(isMobile ? '300px' : '100%')
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
                      width: setWidth(isMobile ? '300px' : '100%')
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
                      width: setWidth(isMobile ? '300px' : '100%')
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
                      width: setWidth(isMobile ? '300px' : '100%')
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
                      width: setWidth(isMobile ? '300px' : '100%')
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
                      width: setWidth(isMobile ? '300px' : '100%')
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
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="email"
                    placeholder="0.0"
                    label="Loan Limit"
                    required
                  />{' '}
                </Grid>
                <Box mt={2}>
                  <RadioButtons
                    options={[
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' }
                    ]}
                    title="Pointing?"
                    name="status"
                    value="active"
                  />
                </Box>
                <Box mt={2}>
                  <RadioButtons
                    options={[
                      { label: 'Debit', value: 'yes' },
                      { label: 'Credit', value: 'no' }
                    ]}
                    title="Pointing Type?"
                    name="status"
                    value="active"
                  />
                </Box>
              </Grid>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
