import React, { useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { AlertColor } from '@mui/material';
import { useUser } from './useUser';
import { UserLoginResponse } from '@/constants/Responses';
import { axiosInstance } from '@/axiosInstance';
import { MuiSnackbarContext } from '@/context/MuiSnackbarContext';
import { statusCodes } from '@/constants/Responses/StatusCodes';

interface UseAuth {
  isLoading: boolean;
  login: (
    companyCode: string,
    username: string,
    password: string,
  ) => Promise<void>;
  signup: (
    companyCode: string,
    username: string,
    password: string,
  ) => Promise<void>;
  signout: () => void;
}

export function useAuth(): UseAuth {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const { toggleSnackbar, setMessage, setSeverity } =
    useContext(MuiSnackbarContext);
  const SERVER_ERROR = 'There was an error contacting the server.';
  const { clearUser, updateUser } = useUser();
  const toast = (message: string, severity: AlertColor) => {
    toggleSnackbar();
    setMessage(message);
    setSeverity(severity);
  };

  async function authServerCall(
    urlEndpoint: string,
    companyCode: string,
    username: string,
    password: string,
  ): Promise<void> {
    try {
      setLoading(true);
      const { data }: AxiosResponse<UserLoginResponse> = await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: { companyCode, username, password },
        headers: { 'Content-Type': 'application/json' },
      });

      if (data.responseCode === statusCodes.UNAUTHORIZED) {
        setLoading(false);
        const message = data.responseDescription || 'Unauthorized';
        toast(message, 'error');
        return;
      }

      if (data.responseCode === statusCodes.SUCCESS) {
        setLoading(false);
        setTimeout(() => {
          window.location.href = '/setup/business';
        }, 3000);
        toast('Login successfull, redirecting please wait...', 'success');

        // update stored user data
        updateUser(data);
      }
    } catch (errorResponse) {
      const message =
        axios.isAxiosError(errorResponse) &&
        errorResponse?.response?.data?.message
          ? errorResponse?.response?.data?.message
          : SERVER_ERROR;
      toast(message, 'error');
    }
  }

  async function login(
    companyCode: string,
    username: string,
    password: string,
  ): Promise<void> {
    authServerCall(
      `/login/login?tenantid=${companyCode}&userid=${username}&password=${password}`,
      companyCode,
      username,
      password,
    );
  }

  async function signup(
    companyCode: string,
    username: string,
    password: string,
  ): Promise<void> {
    authServerCall('/user', companyCode, username, password);
  }

  function signout(): void {
    // clear user from stored user data
    clearUser();
    toast('Logged out successfully', 'success');
  }

  // Return the user object and auth methods
  return {
    isLoading,
    login,
    signup,
    signout,
  };
}
