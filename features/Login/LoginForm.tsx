'use client';
import React from 'react';
import Box from '@mui/material/Box';
import InterSwitchImage from '@/assets/interswitch/image';
import { LoginHeader } from './LoginHeader';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import { loginButton } from './styles';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { PrimaryIconButton } from '@/components/Buttons';
import { FormTextInput, CheckboxInput } from '@/components/TextFields';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (values: any, actions: any) => {
    console.log('values', values);
  };

  return (
    <Box
      sx={{
        padding: '40px 200px',
        width: '55vw',
      }}
    >
      <InterSwitchImage />
      <LoginHeader />
      <Formik
        initialValues={userInitialValues}
        onSubmit={(values, actions) => onSubmit(values, actions)}
        validationSchema={userSchema}
      >
        <Form>
          <Box>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <FormTextInput
                  customStyle={{
                    width: '100%',
                  }}
                  name="companyCode"
                  placeholder="Enter company code"
                  label="Company Code"
                />{' '}
              </Grid>
              <Grid item md={12}>
                <FormTextInput
                  customStyle={{
                    width: '100%',
                  }}
                  name="username"
                  placeholder="Enter username"
                  label="Username"
                />{' '}
              </Grid>
              <Grid item md={12}>
                <FormTextInput
                  type={showPassword ? 'text' : 'password'}
                  showPassword={showPassword}
                  customStyle={{
                    width: '100%',
                  }}
                  name="password"
                  placeholder="Enter password"
                  label="Password"
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                />{' '}
              </Grid>
              <Grid item md={6}>
                <CheckboxInput label="Remember me" />
              </Grid>
              <Grid container mt={7} ml={2}>
                <Grid item md={12}>
                  <PrimaryIconButton
                    type="submit"
                    buttonTitle="Login"
                    customStyle={loginButton}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};