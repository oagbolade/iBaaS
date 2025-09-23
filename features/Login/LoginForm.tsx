'use client';
import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AlertColor } from '@mui/material';
import { LoginHeader } from './LoginHeader';
import { loginButton, loginFormStyle } from './styles';
import ResetPassword from './ResetPassword';
import { AuthenticationCode } from './AuthenticationCode';
import { login as userLoginSchema } from '@/schemas/auth';
import { loginInitialValues } from '@/constants/types';
import { PrimaryIconButton } from '@/components/Buttons';
import { FormTextInput } from '@/components/FormikFields';
import { useAuth } from '@/api/auth/useAuth';
import { MuiSnackbar } from '@/components/Snackbar';
import { MuiSnackbarContext } from '@/context/MuiSnackbarContext';
import { encryptData } from '@/utils/encryptData';
import { environment } from '@/axiosInstance';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { useAuth2faCheck } from '@/api/auth/use2FA';
import { UseGetAllAuth2faCheck } from '@/api/ResponseTypes/admin';
import {
  generateSessionId,
  getBroadcastChannel,
  setSessionActive
} from '@/utils/user-storage/broadcastChannel';

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = React.useState(false);

  const { isLoading, login } = useAuth();
  const { toggleSnackbar, setMessage, setSeverity } =
    useContext(MuiSnackbarContext);

  const toast = (message: string, severity: AlertColor) => {
    toggleSnackbar();
    setMessage(message);
    setSeverity(severity);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [oldPassword, setOldPassword] = useState<string>('');
  const [userid, setUserId] = useState<string>('');
  const [openModel, setOpenModel] = useState(false);
  const is2FARequired = process.env.NEXT_PUBLIC_ENABLE_2FA === 'true';
  const [loginCredentials, setLoginCredentials] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: check2fa } = useAuth2faCheck();
  const SESSION_KEY = 'active_session_id';

  const handleFirstTimeLogin = (oldPasscode: string, useridLogin: string) => {
    setIsFirstTimeUser(true);
    setOldPassword(oldPasscode);
    setUserId(useridLogin);
  };

  const handleClose = () => {
    setOpenModel(false);
    setLoginCredentials(null); // Clear credentials when modal closes
  };

  const handleVerifyCode = (authCode: string) => {
    if (!loginCredentials || !authCode) {
      toast('No credentials or authentication code provided', 'error');
      return;
    }
    const { companyCode, username, password } = loginCredentials;
    const encryptedPassword = encryptData(password);

    const newSessionId = generateSessionId();
    try {
      login(companyCode, username, encryptedPassword || '', () => {
        handleFirstTimeLogin(password, username);
        localStorage.setItem(SESSION_KEY, newSessionId);

        setSessionActive(username, newSessionId);
        setOldPassword(password);
      });

      handleClose(); // Close modal after verification
    } catch (error: any) {
      if (
        error.responseCode === '10' ||
        error.responseMessage?.includes('invalid token')
      ) {
        return toast('Invalid authentication code. Please try again.', 'error');
      }

      toast(
        `Login failed: ${error.responseMessage || 'Unknown error'}`,
        'error'
      );
    }
  };

  const onSubmit = (values: any) => {
    if (!values.companyCode || !values.username || !values.password) return;

    setIsSubmitting(true);

    const encryptedPassword = encryptData(values.password);
    const newSessionId = '80hjsismdd832hj';

    const handleSuccessfulLogin = () => {
      localStorage.setItem(SESSION_KEY, newSessionId);
      setOldPassword(values.password);
      setSessionActive(values.username, newSessionId);
      getBroadcastChannel()?.postMessage({
        type: 'SESSION_START',
        userId: values.username
      });
    };

    const loginCallback = () => {
      handleSuccessfulLogin();
      handleFirstTimeLogin(values.password, values.username);
      toast('Login successful, redirecting please wait...', 'success');
    };

    if (is2FARequired) {
      // Global config disables 2FA, login directly

      login(
        values.companyCode,
        values.username,
        encryptedPassword || '',
        loginCallback
      );
      localStorage.setItem(SESSION_KEY, newSessionId);

      setIsSubmitting(false);
    } else {
      // Global config enables 2FA, check backend status
      check2fa(
        { tenantId: values.companyCode, userId: values.username },
        {
          onSuccess: (data: UseGetAllAuth2faCheck) => {
            if (data.data.use2FA) {
              // Backend requires 2FA, show modal
              setOpenModel(true);
              setLoginCredentials(values);
              setOldPassword(values.password);
            } else {
              // Backend does not require 2FA, login directly
              login(
                values.companyCode,
                values.username,
                encryptedPassword || '',
                loginCallback
              );
            }
            localStorage.setItem(SESSION_KEY, newSessionId);

            setIsSubmitting(false);
          },
          onError: () => {
            setIsSubmitting(false);
            toast('Failed to verify 2FA status. Please try again.', 'error');
          }
        }
      );
    }
  };

  return (
    <Box className="p-10" sx={loginFormStyle}>
      <LoginHeader />

      <Formik
        initialValues={loginInitialValues}
        onSubmit={(values) => {
          return onSubmit(values);
        }}
        validationSchema={userLoginSchema}
      >
        <Form
          className="mt-10"
          autoComplete={environment === 'development' ? 'on' : 'off'}
        >
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
              required
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
              required
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
              required
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

          {/* 
            
            <Grid   // Hidden row for further discussion
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
              </Grid>
              
            */}

          <Grid mt={7} ml={2} mobile={12}>
            <Grid item mobile={12}>
              <PrimaryIconButton
                type="submit"
                buttonTitle={isLoading || isSubmitting ? 'Loading...' : 'Login'}
                customStyle={loginButton}
                disabled={isLoading || isSubmitting}
              />
            </Grid>
          </Grid>
        </Form>
      </Formik>

      {openModel && loginCredentials && (
        <ModalContainerV2
          form={
            <AuthenticationCode
              handleClose={handleClose}
              handleVerifyCode={handleVerifyCode}
              credentials={loginCredentials}
            />
          }
        />
      )}

      <MuiSnackbar />

      {isFirstTimeUser && (
        <ModalContainerV2
          form={
            <ResetPassword
              isFirstTimeUser={isFirstTimeUser}
              setIsFirstTimeUser={setIsFirstTimeUser}
              oldPassword={oldPassword}
              userId={userid}
            />
          }
        />
      )}
    </Box>
  );
}
