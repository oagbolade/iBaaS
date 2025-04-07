/* eslint-disable no-use-before-define */
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
import { loginButton, loginFormStyle, loginIbaas } from './styles';
import ResetPassword from './ResetPassword';
import { AuthenticationCode } from './AuthenticationCode';
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
import {
  getStoredUser,
  savePasswordToLocalStorage
} from '@/utils/user-storage';
import { isTokenExistingOrExpired } from '@/utils/hooks/useAuthGuard';
import { environment } from '@/axiosInstance';
import { PageTitle } from '@/components/Typography';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { useAuth2faCheck } from '@/api/auth/use2FA';
import { UseGetAllAuth2faCheck } from '@/api/ResponseTypes/admin';
import {
  clearSession,
  generateSessionId,
  getBroadcastChannel,
  setSessionActive
} from '@/utils/user-storage/broadcastChannel';
import { shouldEnforce2FA } from '@/utils/use2FaConfig';

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = React.useState(false);
  const [isActiveTab, setIsActiveTab] = useState(true);

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
    const userId = getStoredUser()?.profiles.userid as string;
    const existingSession = localStorage.getItem('activeSession');
    const newSessionId = generateSessionId();
    const currentSession = localStorage.getItem('activeSession');
    const sessionData = currentSession ? JSON.parse(currentSession) : null;
    // eslint-disable-next-line no-use-before-define
    if (existingSession && existingSession !== userId) {
      setIsActiveTab(false);
      router.push('/login'); // Redirect user to login page
      return;
    }

    if (isTokenExistingOrExpired(tokenExpiration) && user) {
      setSessionActive(userId, newSessionId);
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

      toast('Login successful, redirecting please wait...', 'success');
    }
    const handleBroadcastMessage = (event: MessageEvent) => {
      if (event.data.type === 'SESSION_START' && event.data.userId !== userId) {
        setIsActiveTab(false);
        clearSession();
        router.push('/login'); // Redirect user to login page
      }
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        getBroadcastChannel()?.postMessage({ type: 'SESSION_END' });
      }
    };

    getBroadcastChannel()?.addEventListener('message', handleBroadcastMessage);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      getBroadcastChannel()?.removeEventListener(
        'message',
        handleBroadcastMessage
      );
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [oldPassword, setOldPassword] = useState<string>('');
  const [userid, setUserId] = useState<string>('');
  const [openModel, setOpenModel] = useState(false);
  const is2FARequired = shouldEnforce2FA();
  const [loginCredentials, setLoginCredentials] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: check2fa } = useAuth2faCheck();
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
        setSessionActive(username, newSessionId);
        setOldPassword(password);
        // Set session active after successful login
      });
      handleClose(); // Close modal after verification
    } catch (error: any) {
      if (
        error.responseCode === '10' ||
        error.responseMessage?.includes('invalid token')
      ) {
        toast('Invalid authentication code. Please try again.', 'error');
      } else {
        toast(
          `Login failed: ${error.responseMessage || 'Unknown error'}`,
          'error'
        );
      }
    }
  };

  const onSubmit = (values: any) => {
    if (!values.companyCode || !values.username || !values.password) return;

    const encryptedPassword = encryptData(values.password);
    const newSessionId = generateSessionId();

    const handleSuccessfulLogin = () => {
      setOldPassword(values.password);
      setSessionActive(values.username, newSessionId);
      getBroadcastChannel()?.postMessage({
        type: 'SESSION_START',
        userId: values.username
      });
    };

    if (is2FARequired) {
      setLoginCredentials(values);
      setOpenModel(true);
      setOldPassword(values.password);
      return;
    }

    check2fa(
      { tenantId: values.companyCode, userId: values.username },
      {
        onSuccess: (data: UseGetAllAuth2faCheck) => {
          const loginCallback = () => {
            handleSuccessfulLogin();
            if (!data.data.use2FA) {
              handleFirstTimeLogin(values.password, values.username);
              toast('Login successful, redirecting please wait...', 'success');
            }
          };
          login(
            values.companyCode,
            values.username,
            encryptedPassword || '',
            loginCallback
          );
          setIsSubmitting(false);
        },
        onError: () => setIsSubmitting(false) // Optional: Add error handling if needed
      }
    );
  };
  return (
    <Box sx={loginFormStyle}>
      <LoginHeader />
      <Formik
        initialValues={loginInitialValues}
        onSubmit={(values) => {
          return onSubmit(values);
        }}
        validationSchema={userLoginSchema}
      >
        <Form autoComplete={environment === 'development' ? 'on' : 'off'}>
          <Box sx={{ marginBottom: '90px' }}>
            <Grid container spacing={2} sx={{ marginBottom: '100px' }}>
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
                    buttonTitle={
                      isLoading || isSubmitting ? 'Loading...' : 'Login'
                    }
                    customStyle={loginButton}
                    disabled={isLoading || isSubmitting}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
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
