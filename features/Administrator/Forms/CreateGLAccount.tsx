import React from 'react';
import { Box, Grid, FormLabel, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import { InfoSection } from '@/features/Administrator/GLAccount/CreateGLAccount/InfoSection';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  CheckboxInput,
  FormSelectInput,
  FormTextInput,
} from '@/components/FormikFields';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { Loan } from '@/constants/Loan/selectOptions';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { RadioButtonTitle } from '@/components/Revamp/Radio/style';

export const CreateGLAccount = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (values: any, actions: { setSubmitting: Function }) => {
    actions.setSubmitting(false);
  };

  return (
    <Box>
      <Box>
        <LargeTitle title="Create General Ledger" />
      </Box>
      <InfoSection />
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
                  label="Select General Ledger Type"
                  placeholder="Please Select"
                />{' '}
              </Grid>
              <Grid mb={2} item={isTablet} mobile={12}>
                <FormSelectInput
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                  }}
                  name="role"
                  options={Loan.status}
                  label="General Ledger Type Node"
                  placeholder="Please Select"
                />{' '}
              </Grid>
              <Grid mb={2} item={isTablet} mobile={12}>
                <FormSelectInput
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                  }}
                  name="role"
                  options={Loan.status}
                  label="Currency"
                  placeholder="NGN"
                />{' '}
              </Grid>
              <Grid mb={2} item={isTablet} mobile={12}>
                <FormSelectInput
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                  }}
                  name="role"
                  options={Loan.status}
                  label="General Ledger Type Class"
                  placeholder="Please Select"
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
                  label="General Ledger Account Number"
                  placeholder="Please Select"
                />{' '}
              </Grid>
              <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }}>
                <FormTextInput
                  customStyle={{
                    width: setWidth(isMobile ? '300px' : '100%'),
                  }}
                  name="email"
                  placeholder="Enter Description"
                  label="General Ledger Description"
                />{' '}
              </Grid>
              <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }}>
                <FormTextInput
                  customStyle={{
                    width: setWidth(isMobile ? '300px' : '100%'),
                  }}
                  name="email"
                  placeholder="0.0"
                  label="Book Balance"
                />{' '}
              </Grid>
              <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }}>
                <Box mt={2}>
                  <RadioButtons
                    options={[
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },
                    ]}
                    title="Pointing?"
                    name="status"
                    value="active"
                  />
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }}>
                <Box mt={2}>
                  <RadioButtons
                    options={[
                      { label: 'Debit', value: 'yes' },
                      { label: 'Credit', value: 'no' },
                    ]}
                    title="Pointing Type?"
                    name="status"
                    value="active"
                  />
                </Box>
              </Grid>
              <Grid
                item={isTablet}
                mobile={12}
                mr={{ mobile: 35, tablet: 0 }}
                mb={2}
              >
                <FormLabel sx={RadioButtonTitle}>Actions?</FormLabel>
                <Stack direction="row">
                  <CheckboxInput label="Swing" />
                  <CheckboxInput label="Populate General Ledger" />
                  <CheckboxInput label="Is System Posting?" />
                </Stack>
              </Grid>
              <Grid mb={2} item={isTablet} mobile={12}>
                <FormSelectInput
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                  }}
                  name="role"
                  options={Loan.status}
                  label="Status"
                  placeholder="Newly Created"
                />{' '}
              </Grid>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
