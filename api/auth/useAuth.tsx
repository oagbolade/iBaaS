import React, { useContext } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { AlertColor } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useUser } from './useUser';
import { UserLoginResponse } from '@/api/ResponseTypes/login';
import { axiosInstance, environment } from '@/axiosInstance';
import { MuiSnackbarContext } from '@/context/MuiSnackbarContext';
import { statusCodes } from '@/api/ResponseTypes/StatusCodes';
import {
  clearStoredUser,
  getLastPage,
  getStoredUser,
  setMenuItemsToLocalStorage
} from '@/utils/user-storage';
import { useGetParams } from '@/utils/hooks/useGetParams';

interface UseAuth {
  isLoading: boolean;
  login: (
    companyCode: string,
    username: string,
    password: string,
    onFirstTimeUser?: () => void
  ) => Promise<void>;
  signup: (
    companyCode: string,
    username: string,
    password: string
  ) => Promise<void>;
  signout: () => void;
}

interface ErrorResponseData {
  responseDescription?: string;
  message?: string;
  responseCode?: string;
}

axiosRetry(axiosInstance, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay, 
  retryCondition: (error: any) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export function useAuth(): UseAuth {
  const router = useRouter();
  const auth = useGetParams('auth');
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const { toggleSnackbar, setMessage, setSeverity } =
    useContext(MuiSnackbarContext);
  const SERVER_ERROR = 'There was an error contacting the server.';
  const { updateUser } = useUser();
  const toast = (message: string, severity: AlertColor) => {
    toggleSnackbar();
    setMessage(message);
    setSeverity(severity);
  };

  async function authServerCall(
    urlEndpoint: string,
    tenantid: string,
    userid: string,
    password: string,
    onFirstTimeUser?: () => void
  ): Promise<void> {
    try {
      setLoading(true);
      const { data }: AxiosResponse<UserLoginResponse> = await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: { tenantid, userid, password },
        headers: { 'Content-Type': 'application/json' }
      });

      // Debug log. Do not remove ⚠️
      console.log('Login response data:', data.menuItems); 
      setMenuItemsToLocalStorage(JSON.stringify(data.menuItems));
      
      if (data.responseCode === statusCodes.UNAUTHORIZED) {
        setLoading(false);
        const message = data.responseDescription || 'Unauthorized';
        toast(message, 'error');
        return;
      }
      if (data.responseCode === statusCodes.LOGIN_SUCCESS) {
        setLoading(false);
        sessionStorage.setItem('shouldRefreshDashboard', 'true');
        if (auth) {
          setTimeout(() => {
            window.location.href = `${getLastPage()}`;
          }, 3500);
          toast(
            'Login successful, redirecting to last visited page...',
            'success'
          );
        } else {
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);

          toast('Login successful, redirecting please wait...', 'success');
        }

        // update stored user data
        updateUser(data, tenantid);
      }
    } catch (errorResponse) {
      const axiosError = errorResponse as AxiosError;

      if (
        typeof onFirstTimeUser === 'function' &&
        (axiosError?.response?.data as ErrorResponseData)?.responseCode ===
          statusCodes.FIRST_TIME_LOGIN_RESET &&
        (axiosError?.response?.data as ErrorResponseData)
          ?.responseDescription ===
          'You must Change your Password at First Login or On Reset'
      ) {
        onFirstTimeUser();
      }

      setLoading(false);
      const message =
        axios.isAxiosError(errorResponse) &&
        errorResponse?.response?.data?.message
          ? errorResponse?.response?.data?.message
          : SERVER_ERROR;

      if (
        (axiosError?.response?.data as ErrorResponseData)?.responseDescription
      ) {
        toast(
          (axiosError?.response?.data as ErrorResponseData)
            ?.responseDescription as string,
          'error'
        );
        return;
      }

      toast(message, 'error');
    }
  }

  async function login(
    companyCode: string,
    username: string,
    password: string,
    onFirstTimeUser?: () => void
  ): Promise<void> {
    try {
      await 
       authServerCall(
      '/login/login',
      companyCode,
      username,
      password,
      onFirstTimeUser
    );
    } catch (error) {
      console.error("Login failed after retries:", error);
      throw error;
    }
  }

  async function signup(
    companyCode: string,
    username: string,
    password: string
  ): Promise<void> {
    authServerCall('/user', companyCode, username, password);
  }

  async function signout(): Promise<void> {
    const token = getStoredUser()?.token;

    if (!token) {
      setTimeout(() => {
        clearStoredUser();
        toast('Logout successful, redirecting please wait...', 'success');
        window.location.href = '/login';
        return;
      }, 1500);
    }

    try {
      const urlEndpoint = '/Login/Logout/Logout';

      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });
      sessionStorage.clear(); // clears all keys in sessionStorage

      clearStoredUser();

      toast('Logout successful, redirecting please wait...', 'success');

      setTimeout(() => {
        if (environment === 'production') {
          window.location.href = '/login';
          return;
        }

        window.location.href = '/login';
      }, 1500);
    } catch (errorResponse) {
      toast((errorResponse as { message: string })?.message, 'error');
    }
  }

  // Return the user object and auth methods
  return {
    isLoading,
    login,
    signup,
    signout
  };
}
