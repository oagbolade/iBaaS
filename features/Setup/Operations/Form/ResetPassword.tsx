'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/Typography';
import { BatchContainer, BatchTitle } from '@/features/Operation/Forms/style';
import Grid from '@mui/material/Grid';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditOperations } from '@/constants/OperationOptions';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/schemas/auth';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

export const ResetPassword = () => {
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
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Reset Password" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  type={'password'}
                  customStyle={{
                    width: '100%'
                  }}
                  name="password"
                  placeholder="Enter Old Password"
                  label="Old Password"
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {<VisibilityOff />}
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  type={'password'}
                  customStyle={{
                    width: '100%'
                  }}
                  name="password"
                  placeholder="Enter New Password"
                  label="New Password"
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {<VisibilityOff />}
                    </IconButton>
                  }
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  type={'password'}
                  customStyle={{
                    width: '100%'
                  }}
                  name="password"
                  placeholder="Enter Re-enter New Password"
                  label="Re-enter New Password"
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {<VisibilityOff />}
                    </IconButton>
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
