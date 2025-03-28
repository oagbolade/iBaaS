'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/Typography';
import { BatchContainer, BatchTitle, totalText } from './style';
import Grid from '@mui/material/Grid';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditOperations } from '@/constants/OperationOptions';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/schemas/auth';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { actionButtons } from './BatchPosting';

export const DisbursementContainer = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={userInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={userSchema}
    >
      <Form>
        <Box sx={{ marginTop: '60px' }}>
          <TopActionsArea actionButtons={actionButtons} />
        </Box>
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 35, mobile: 2 }}>
            <Box ml={{ desktop: 6, mobile: 6 }}>
              <PageTitle title="Disbursement" styles={BatchTitle} />
            </Box>
            <Grid container>
              <Grid item ml={{ tablet: 4, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter name"
                    label="Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px')
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 4, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormSelectField
                    name="Currency"
                    options={EditOperations.department}
                    label="Currency"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px')
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 4, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="Cheque Number"
                    placeholder="Enter Cheque Number"
                    label="Cheque Number"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px')
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 4, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="Rate"
                    placeholder="."
                    label="Rate"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px')
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 4, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="Narration"
                    placeholder="Enter"
                    label="Narration"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px')
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 4, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <PageTitle title="Total Amount" />
                  <PageTitle title="₦0.00" styles={{ ...totalText }} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
