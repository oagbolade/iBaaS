'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import InterSwitchImage from '@/assets/interswitch/image';
import { LoginHeader } from './LoginHeader';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { forgotPassword, loginButton } from './styles';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { PrimaryIconButton } from '@/components/Buttons';
import { FormTextInput, CheckboxInput } from '@/components/TextFields';
import { PageTitle } from '@/components/Typography';
import Button from '@mui/material/Button';

import { handleRedirect } from '@/utils';

export const LoginForm = () => {
  const router = useRouter();
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
        padding: '30px 200px 0 200px',
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
                  customStyle={{
                    width: '100%',
                  }}
                  name="password"
                  placeholder="Enter password"
                  label="Password"
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                />{' '}
              </Grid>
              <Grid item md={6}>
                <CheckboxInput label="Remember me" />
              </Grid>
              <Grid item md={6}>
                <Button variant="text">
                  <PageTitle title="Forgot Password" styles={forgotPassword} />
                </Button>
              </Grid>
              <Grid container mt={7} ml={2}>
                <Grid item md={12}>
                  <PrimaryIconButton
                    onClick={() => handleRedirect(router, '/admin/users')}
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
