'use client';
import React, { useEffect, useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AlertColor } from '@mui/material';
import { useRouter } from 'next/navigation';
import { LoginHeader } from './LoginHeader';
import { loginButton, loginIbaas } from './styles';
import ResetPassword from './ResetPassword';
import { InterSwitchImage } from '@/assets/interswitch/image';
import { login as userLoginSchema } from '@/schemas/auth';
import { loginInitialValues } from '@/constants/types';
import { PrimaryIconButton } from '@/components/Buttons';
import { FormTextInput } from '@/components/FormikFields';
import { useAuth } from '@/api/auth/useAuth';
import { useUser } from '@/api/auth/useUser';
import { MuiSnackbar } from '@/components/Snackbar';
import { MuiSnackbarContext } from '@/context/MuiSnackbarContext';
import { encryptData } from '@/utils/encryptData';
import { getStoredUser } from '@/utils/user-storage';
import { isTokenExistingOrExpired } from '@/utils/hooks/useAuthGuard';
import { environment } from '@/axiosInstance';
import { PageTitle } from '@/components/Typography';

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = React.useState(false);

  const { isLoading, login } = useAuth();
  const { user } = useUser();
  const { toggleSnackbar, setMessage, setSeverity } =
    useContext(MuiSnackbarContext);
  const toast = (message: string, severity: AlertColor) => {
    toggleSnackbar();
    setMessage(message);
    setSeverity(severity);
  };

  useEffect(() => {
    const tokenExpiration = getStoredUser()?.tokenExpire;

    if (isTokenExistingOrExpired(tokenExpiration)) {
      return;
    }

    if (user) {
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

      toast('Login successful, redirecting please wait...', 'success');
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [oldPassword, setOldPassword] = useState<string>('');
  const [userid, setUserId] = useState<string>('');

  const handleFirstTimeLogin = (oldPasscode: string, useridLogin: string) => {
    setIsFirstTimeUser(true);
    setOldPassword(oldPasscode);
    setUserId(useridLogin);
  };

  const onSubmit = (values: any) => {
    const encryptedPassword = encryptData(values.password);

    login(values.companyCode, values.username, encryptedPassword || '', () =>
      handleFirstTimeLogin(values.password, values.username)
    );
  };

  return (
    <Box
      sx={{
        padding: { desktop: '30px 200px 0 200px', mobile: '50px 50px 0 50px' },
        width: { desktop: '55vw', mobile: '100vw' }
      }}
    >
      <InterSwitchImage />
      <PageTitle title="IBaaS" styles={loginIbaas} />
      <LoginHeader />
      <Formik
        initialValues={loginInitialValues}
        onSubmit={(values) => {
          return onSubmit(values);
        }}
        validationSchema={userLoginSchema}
      >
        <Form autoComplete={environment === 'development' ? 'on' : 'off'}>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item mobile={12}>
                <FormTextInput
                  customStyle={{
                    width: '100%'
                  }}
                  type={environment === 'development' ? 'text' : 'search'}
                  name="companyCode"
                  placeholder="Enter company code"
                  label="Company Code"
                  autoComplete={environment === 'development' ? 'on' : 'off'}
                />
              </Grid>
              <Grid item mobile={12}>
                <FormTextInput
                  customStyle={{
                    width: '100%'
                  }}
                  name="username"
                  placeholder="Enter username"
                  type={environment === 'development' ? 'text' : 'search'}
                  label="Username"
                  autoComplete={environment === 'development' ? 'on' : 'off'}
                />
              </Grid>
              <Grid item mobile={12}>
                <FormTextInput
                  type={showPassword ? 'text' : 'password'}
                  customStyle={{
                    width: '100%'
                  }}
                  name="password"
                  placeholder="Enter password"
                  label="Password"
                  autoComplete={
                    environment === 'development' ? 'on' : 'new-password'
                  }
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  }
                />
              </Grid>
              {/* <Grid   // Hidden row for further discussion
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: { mobile: 'flex-start', desktop: 'flex-end' }
                }}
                item
                mobile={12}
                tablet={12}
                desktop={12}
              >
                <div>
                  <CheckboxInput label="Remember me" />
                </div>
                <div>
                  <PageTitle title="Forgot Password?" styles={forgotPassword} />
                </div>
              </Grid> */}
              <Grid container mt={7} ml={2} mobile={12}>
                <Grid item mobile={12}>
                  <PrimaryIconButton
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
      <ResetPassword
        isFirstTimeUser={isFirstTimeUser}
        setIsFirstTimeUser={setIsFirstTimeUser}
        oldPassword={oldPassword}
        userId={userid}
      />
    </Box>
  );
}
