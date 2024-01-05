'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { LoginHeader } from './LoginHeader';
import { forgotPassword, loginButton } from './styles';
import InterSwitchImage from '@/assets/interswitch/image';
import { login as userLoginSchema } from '@/constants/schemas';
import { loginInitialValues } from '@/constants/types';
import { PrimaryIconButton } from '@/components/Buttons';
import { FormTextInput, CheckboxInput } from '@/components/FormikFields';
import { PageTitle } from '@/components/Typography';
import { handleRedirect } from '@/utils';
import { useAuth } from '@/api/auth/useAuth';
import { useUser } from '@/api/auth/useUser';
import { MuiSnackbar } from '@/components/Snackbar';

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const { isLoading, login } = useAuth();
  const { user } = useUser();

  if (user) {
    return handleRedirect(router, '/setup/business');
  }

  const handleClickShowPassword = () => {
    return setShowPassword((show) => {
      return !show;
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit = (values: any, actions: any) => {
    login(values.companyCode, values.username, values.password);
  };

  return (
    <Box
      sx={{
        padding: { desktop: '30px 200px 0 200px', mobile: '50px 50px 0 50px' },
        width: { desktop: '55vw', mobile: '100vw' },
      }}
    >
      <InterSwitchImage />
      <LoginHeader />
      <Formik
        initialValues={loginInitialValues}
        onSubmit={(values, actions) => {
          return onSubmit(values, actions);
        }}
        validationSchema={userLoginSchema}
      >
        <Form>
          <Box>
            <Grid container spacing={2}>
              <Grid item mobile={12}>
                <FormTextInput
                  customStyle={{
                    width: '100%',
                  }}
                  name="companyCode"
                  placeholder="Enter company code"
                  label="Company Code"
                />{' '}
              </Grid>
              <Grid item mobile={12}>
                <FormTextInput
                  customStyle={{
                    width: '100%',
                  }}
                  name="username"
                  placeholder="Enter username"
                  label="Username"
                />{' '}
              </Grid>
              <Grid item mobile={12}>
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
              <Grid item mobile={12} tablet={12} desktop={6}>
                <CheckboxInput label="Remember me" />
              </Grid>
              <PageTitle title="Forgot Password?" styles={forgotPassword} />
              <Grid container mt={7} ml={2} mobile={12}>
                <Grid item mobile={12}>
                  <PrimaryIconButton
                    // onClick={() => {
                    //   return handleRedirect(router, '/setup/business');
                    // }}
                    type="submit"
                    buttonTitle={isLoading ? 'Loading...' : 'Login'}
                    customStyle={loginButton}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>
      <MuiSnackbar />
    </Box>
  );
}
